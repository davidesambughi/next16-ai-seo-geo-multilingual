/**
 * SchoolsList â€” Server Component
 *
 * Renders the #schools section of the pillar page in two distinct parts:
 *
 *   1. TOP PICKS  â€” 4 hand-curated schools with full editorial rich cards
 *                   (verdict, parentWhisper, trust badges, acceptance rate)
 *
 *   2. SCHOOL DIRECTORY â€” all 77 schools in a compact 3-col grid with
 *                         client-side filters (region / curriculum / price /
 *                         language) and pagination (12 per page).
 *
 * Data flow:
 *   - schoolsData is read once on the server at request time (ISR)
 *   - Only a minimal SchoolDirectoryItem shape is serialised and sent to the
 *     browser â€” not the full School objects (avoids shipping translations, JSON-LD
 *     fields, and other unused data to the client bundle)
 *
 * GEO note: verdict + parentWhisper content on the rich cards is deliberately
 * written as citable, factual statements â€” optimised for AI Overviews.
 */

import { Link } from "@/i18n/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { schoolsData, getSchoolT, type School } from "@/lib/data";
import {
  MapPin,
  GraduationCap,
  Coins,
  CalendarCheck,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";
import { MethodologyBadge } from "./MethodologyBadge";
import { getLocale, getTranslations } from "next-intl/server";
import { SchoolDirectory, type SchoolDirectoryItem } from "./SchoolDirectory";

// â”€â”€ Helpers (server-only, run at build / revalidation time) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Map raw JSON location.region values to canonical filter buckets.
 * Used as the primary source when available.
 */
function normalizeRawRegion(rawRegion: string): string | null {
  switch (rawRegion) {
    case "Algarve":                  return "Algarve";
    case "Porto Region":
    case "North Portugal":           return "Porto & North";
    case "Lisbon":
    case "Lisbon Region":
    case "Setúbal Region":           return "Lisbon";
    case "Central Portugal":         return "Central Portugal";
    case "Madeira":                  return "Madeira";
    default:                         return null; // unknown/generic â†’ fall through
  }
}

/**
 * Map a free-form location string to a canonical region for filter buckets.
 * Checks city-level keywords first (catches Cascais & Sintra specifically),
 * then falls back to the raw JSON region value, then to "Other Portugal".
 */
function extractRegion(location: string, rawRegion?: string): string {
  const loc = location.toLowerCase();
  if (loc.includes("algarve")) return "Algarve";
  if (
    loc.includes("porto") ||
    loc.includes("braga") ||
    loc.includes("aveiro") ||
    loc.includes("matosinhos")
  )
    return "Porto & North";
  if (
    loc.includes("sintra") ||
    loc.includes("cascais") ||
    loc.includes("carcavelos") ||
    loc.includes("estoril")
  )
    return "Cascais & Sintra";
  if (
    loc.includes("lisbon") ||
    loc.includes("lisboa") ||
    loc.includes("almada") ||
    loc.includes("setúbal") ||
    loc.includes("setubal")
  )
    return "Lisbon";
  // Fall back to raw JSON region when city matching fails
  if (rawRegion) {
    const normalized = normalizeRawRegion(rawRegion);
    if (normalized) return normalized;
  }
  return "Other Portugal";
}

/**
 * Normalise a curriculum string to one of the primary filter tags.
 * Uses the first comma-separated token as the primary curriculum type.
 */
function normalizeCurriculum(curriculum: string): string {
  const first = curriculum.split(",")[0].trim();
  if (/^british/i.test(first)) return "British";
  if (/^american/i.test(first)) return "American";
  if (/^IB/i.test(first) || first === "IB Diploma") return "IB";
  if (/^french|français/i.test(first)) return "French";
  if (/^portuguese/i.test(first)) return "Portuguese";
  if (/^german/i.test(first)) return "German";
  if (/^spanish/i.test(first)) return "Spanish";
  return "Other";
}

/** Parse the formatted fee string (e.g. "?7,200 â€“ ?13,995") to a numeric min. */
function parseFeesMin(fees: string): number | null {
  const match = fees.match(/€([\d,]+)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

/**
 * Determine whether a school has the 5 core profile fields populated.
 * Key fields: curriculum, fees, ageRange, qualifications, extracurriculars.
 */
function computeIsFullProfile(school: School): boolean {
  return (
    school.curriculum !== "International" &&
    school.fees !== "Contact school" &&
    Boolean(school.ageRange) &&
    Boolean(school.qualifications?.length) &&
    Boolean(school.extracurriculars?.length)
  );
}

// â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export async function SchoolsList() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "SchoolDetail" });

  // â”€â”€ Split curated vs. all â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Curated schools are identified by the presence of an editorial verdict.
  const curatedSchools = schoolsData.filter(
    (s) => Boolean(s.translations.en.verdict),
  );

  // â”€â”€ Build minimal serialisable data for the Directory client component â”€â”€â”€â”€â”€
  // Only fields needed for display + filtering â€” keeps the client payload small.
  const directoryData: SchoolDirectoryItem[] = schoolsData.map((school) => ({
    slug: school.slug,
    name: school.name,
    location: school.location,
    region: extractRegion(school.location, school.rawRegion),
    curriculum: school.curriculum,
    curriculumTag: normalizeCurriculum(school.curriculum),
    fees: school.fees,
    feesMin: parseFeesMin(school.fees),
    ageRange: school.ageRange ?? null,
    englishAsPrimary: school.englishAsPrimary ?? null,
    isCurated: Boolean(school.translations.en.verdict),
    extracurriculars: school.extracurriculars ?? null,
    website: school.website ?? null,
    isFullProfile: computeIsFullProfile(school),
    qualifications: school.qualifications ?? null,
    classSize: school.classSize ?? null,
    nationalities: school.nationalities ?? null,
    snippet: school.snippet ?? null,
  }));

  return (
    <div className="space-y-16">

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PART 1 â€” EDITORIAL TOP PICKS (4 curated)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h3 className="font-serif font-semibold text-xl text-ink-primary">
            {t("editorialTopPicks")}
          </h3>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-warm-light text-warm border border-warm/20">
            {t("raisingKidsInPortugalVerified")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curatedSchools.map((school) => {
            const schoolT = getSchoolT(school, locale);
            return (
              <Card key={school.id} className="flex flex-col h-full group">
                <CardHeader className="pb-3">
                  {/* Trust badges + acceptance rate */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {schoolT.trustBadges &&
                        schoolT.trustBadges.map((badge) => (
                          <MethodologyBadge
                            key={badge}
                            type="independent"
                            label={badge}
                          />
                        ))}
                    </div>
                    {school.acceptanceRate && (
                      <div className="flex items-center gap-1 text-xs text-ink-muted whitespace-nowrap shrink-0">
                        <Users className="h-3 w-3" />
                        <span>
                          {t("acceptanceLabel")}:{" "}
                          <strong className="text-ink-secondary">
                            {school.acceptanceRate}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-h3 leading-tight group-hover:text-brand transition-colors">
                    {school.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 mt-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{school.location}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Description */}
                  {schoolT.description && (
                    <p className="text-sm text-ink-secondary line-clamp-3 leading-relaxed">
                      {schoolT.description}
                    </p>
                  )}

                  {/* Key stats */}
                  <div className="flex flex-col gap-2 text-sm border-t border-border pt-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-brand shrink-0" />
                      <span className="font-medium text-ink-primary">
                        {t("curriculumLabel")}:
                      </span>
                      <span className="text-ink-secondary">
                        {school.curriculum}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-warm shrink-0" />
                      <span className="font-medium text-ink-primary">
                        {t("annualFeesLabel")}:
                      </span>
                      <span className="text-ink-secondary">{school.fees}</span>
                    </div>
                    {school.inspectionDate && (
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        <CalendarCheck className="h-3 w-3 shrink-0" />
                        <span>{t("raisingKidsInPortugalInspectedLabel")}: {school.inspectionDate}</span>
                        {school.visitCount && (
                          <span>| {school.visitCount} {t("visitsLabel")}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* THE VERDICT */}
                  {schoolT.verdict && (
                    <div className="rounded-xl bg-brand-light border border-brand/20 px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-brand" />
                        <span className="text-xs font-bold text-brand uppercase tracking-wide">
                          {t("verdictLabel")}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-ink-primary leading-snug">
                        {schoolT.verdict}
                      </p>
                    </div>
                  )}

                  {/* PARENT WHISPER */}
                  {schoolT.parentWhisper && (
                    <div className="rounded-xl bg-surface-subtle border border-border px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Quote className="h-3.5 w-3.5 text-ink-muted" />
                        <span className="text-xs font-bold text-ink-muted uppercase tracking-wide">
                          {t("parentWhisperLabel")}
                        </span>
                      </div>
                      <p className="text-sm text-ink-secondary italic leading-snug">
                        {schoolT.parentWhisper}
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-2">
                  <Button asChild className="w-full">
                    <Link
                      href={{
                        pathname: "/schools/[slug]",
                        params: { slug: school.slug },
                      }}
                    >
                      {t("viewFullSchoolProfile")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PART 2 â€” FULL SCHOOL DIRECTORY (all 77)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div id="full-school-directory">
        <div className="mb-6">
          <h3 className="font-serif font-semibold text-xl text-ink-primary mb-1">
            {t("fullSchoolDirectory")}
          </h3>
          <p className="text-sm text-ink-muted">
            {t("schoolsAcrossPortugal", { count: schoolsData.length })}
          </p>
        </div>

        {/* Client component: receives only the minimal serialised data */}
        <SchoolDirectory schools={directoryData} />
      </div>

    </div>
  );
}

