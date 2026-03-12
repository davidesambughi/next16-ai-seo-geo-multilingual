"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Coins, Users, Filter, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SchoolDirectoryItem = {
  slug: string;
  name: string;
  location: string;
  region: string;
  curriculum: string;
  curriculumTag: string;
  fees: string;
  feesMin: number | null;
  ageRange: string | null;
  englishAsPrimary: boolean | null;
  isCurated: boolean;
  extracurriculars: string[] | null;
  website: string | null;
  isFullProfile: boolean;
  qualifications: string[] | null;
  classSize: number | null;
  nationalities: number | null;
  snippet: string | null;
};

type Filters = {
  region: string;
  curriculum: string;
  price: string;
  language: string;
};

type DirectoryT = (key: string, values?: Record<string, string | number>) => string;

const ITEMS_PER_PAGE = 12;
const MAX_EXTRACURRICULARS = 3;

function translateRegion(region: string, t: DirectoryT): string {
  const map: Record<string, string> = {
    "Algarve": t("regionAlgarve"),
    "Porto & North": t("regionPortoNorth"),
    "Cascais & Sintra": t("regionCascaisSintra"),
    "Lisbon": t("regionLisbon"),
    "Central Portugal": t("regionCentralPortugal"),
    "Madeira": t("regionMadeira"),
    "Other Portugal": t("regionOtherPortugal"),
  };

  return map[region] ?? region;
}

function translateCurriculumTag(tag: string, t: DirectoryT): string {
  const map: Record<string, string> = {
    "British": t("curriculumBritish"),
    "American": t("curriculumAmerican"),
    "IB": t("curriculumIB"),
    "French": t("curriculumFrench"),
    "Portuguese": t("curriculumPortuguese"),
    "German": t("curriculumGerman"),
    "Spanish": t("curriculumSpanish"),
    "Other": t("curriculumOther"),
  };

  return map[tag] ?? tag;
}

export function SchoolDirectory({ schools }: { schools: SchoolDirectoryItem[] }) {
  const t = useTranslations("SchoolDirectory") as DirectoryT;

  const [filters, setFilters] = useState<Filters>({
    region: "all",
    curriculum: "all",
    price: "all",
    language: "all",
  });
  const [page, setPage] = useState(1);

  const regions = useMemo(() => {
    const set = new Set(schools.map((s) => s.region));
    return Array.from(set).sort();
  }, [schools]);

  const curricula = useMemo(() => {
    const set = new Set(schools.map((s) => s.curriculumTag));
    return Array.from(set).sort();
  }, [schools]);

  const isFiltered =
    filters.region !== "all" ||
    filters.curriculum !== "all" ||
    filters.price !== "all" ||
    filters.language !== "all";

  const filtered = useMemo(() => {
    return schools.filter((s) => {
      if (filters.region !== "all" && s.region !== filters.region) return false;
      if (filters.curriculum !== "all" && s.curriculumTag !== filters.curriculum) return false;

      if (filters.price !== "all") {
        const min = s.feesMin;
        if (filters.price === "under10k" && (min === null || min >= 10_000)) return false;
        if (filters.price === "10k-20k" && (min === null || min < 10_000 || min >= 20_000)) return false;
        if (filters.price === "over20k" && (min === null || min < 20_000)) return false;
        if (filters.price === "contact" && min !== null) return false;
      }

      if (filters.language === "english" && s.englishAsPrimary !== true) return false;
      return true;
    });
  }, [schools, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters({ region: "all", curriculum: "all", price: "all", language: "all" });
    setPage(1);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    const anchor = document.getElementById("full-school-directory");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-5 p-4 sm:p-5 bg-surface-subtle border border-border rounded-xl">
        <div className="flex items-center justify-between gap-1.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-ink-muted" />
            <span className="text-sm font-medium text-ink-primary">{t("filterLabel")}</span>
          </div>
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="lg:hidden flex items-center gap-1 text-xs text-ink-muted hover:text-ink-primary transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              {t("clearFilters")}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3 flex-1 w-full">
          <select
            value={filters.region}
            onChange={(e) => updateFilter("region", e.target.value)}
            aria-label={t("filterByRegionAria")}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 lg:py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
          >
            <option value="all">{t("allRegions")}</option>
            {regions.map((r) => (
              <option key={r} value={r}>{translateRegion(r, t)}</option>
            ))}
          </select>

          <select
            value={filters.curriculum}
            onChange={(e) => updateFilter("curriculum", e.target.value)}
            aria-label={t("filterByCurriculumAria")}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 lg:py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
          >
            <option value="all">{t("allCurricula")}</option>
            {curricula.map((c) => (
              <option key={c} value={c}>{translateCurriculumTag(c, t)}</option>
            ))}
          </select>

          <select
            value={filters.price}
            onChange={(e) => updateFilter("price", e.target.value)}
            aria-label={t("filterByAnnualFeesAria")}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 lg:py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
          >
            <option value="all">{t("anyPrice")}</option>
            <option value="under10k">{t("priceUnder10k")}</option>
            <option value="10k-20k">{t("price10k20k")}</option>
            <option value="over20k">{t("priceOver20k")}</option>
            <option value="contact">{t("priceContact")}</option>
          </select>

          <select
            value={filters.language}
            onChange={(e) => updateFilter("language", e.target.value)}
            aria-label={t("filterByLanguageAria")}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 lg:py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
          >
            <option value="all">{t("anyLanguage")}</option>
            <option value="english">{t("englishMedium")}</option>
          </select>
        </div>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="hidden lg:flex items-center gap-1 text-xs text-ink-muted hover:text-ink-primary shrink-0 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            {t("clearFilters")}
          </button>
        )}
      </div>

      <p className="text-xs text-ink-muted mb-4">
        {t("resultsCount", { count: filtered.length })}
        {isFiltered ? ` ${t("filteredFromTotal", { total: schools.length })}` : ""}
      </p>

      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {paginated.map((school) => (
            <SchoolMiniCard key={school.slug} school={school} t={t} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <p className="text-ink-muted mb-2 text-sm">{t("noSchoolsMatch")}</p>
          <button onClick={clearFilters} className="text-sm text-brand hover:underline">
            {t("clearAllFilters")}
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => changePage(page - 1)}>
            {t("previous")}
          </Button>
          <span className="text-sm text-ink-secondary tabular-nums">
            {t("pageOf", { page, total: totalPages })}
          </span>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => changePage(page + 1)}>
            {t("next")}
          </Button>
        </div>
      )}
    </div>
  );
}

function SchoolMiniCard({ school, t }: { school: SchoolDirectoryItem; t: DirectoryT }) {
  const extraCount =
    school.extracurriculars && school.extracurriculars.length > MAX_EXTRACURRICULARS
      ? school.extracurriculars.length - MAX_EXTRACURRICULARS
      : 0;

  const visibleExtras = school.extracurriculars?.slice(0, MAX_EXTRACURRICULARS);

  return (
    <div className="group border border-border rounded-xl p-4 bg-card hover:border-brand/30 hover:shadow-sm transition-all flex flex-col h-full">
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand border border-brand/15">
          {translateCurriculumTag(school.curriculumTag, t)}
        </span>

        {school.englishAsPrimary && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
            {t("englishBadge")}
          </span>
        )}

        {school.isCurated && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-warm-light text-warm border border-warm/20">
            {t("featuredBadge")}
          </span>
        )}

        {!school.isCurated && (
          <span
            className={`ml-auto flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
              school.isFullProfile
                ? "bg-green-50 text-green-700 border-green-100"
                : "bg-surface-subtle text-ink-muted border-border"
            }`}
            title={school.isFullProfile ? t("fullProfileTitle") : t("partialProfileTitle")}
          >
            {school.isFullProfile ? (
              <CheckCircle2 className="h-3 w-3 shrink-0" />
            ) : (
              <AlertCircle className="h-3 w-3 shrink-0" />
            )}
            {school.isFullProfile ? t("fullProfileBadge") : t("partialProfileBadge")}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-sm text-ink-primary leading-snug mb-1.5 flex-1 group-hover:text-brand transition-colors">
        {school.name}
      </h3>

      <div className="flex items-center gap-1 text-xs text-ink-muted mb-3">
        <MapPin className="h-3 w-3 shrink-0" />
        <span>{school.location}</span>
      </div>

      {school.snippet && (
        <p className="text-xs text-ink-muted italic leading-relaxed line-clamp-2 mb-3">
          {school.snippet}
        </p>
      )}

      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
          <Coins className="h-3 w-3 text-warm shrink-0" />
          <span>{school.fees}</span>
        </div>

        {school.ageRange && (
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Users className="h-3 w-3 shrink-0" />
            <span>{t("agesLabel", { ageRange: school.ageRange })}</span>
          </div>
        )}

        {(school.classSize || school.nationalities) && (
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            {school.classSize && <span>{t("perClass", { count: school.classSize })}</span>}
            {school.nationalities && <span>{t("nationalities", { count: school.nationalities })}</span>}
          </div>
        )}
      </div>

      {visibleExtras && visibleExtras.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {visibleExtras.map((activity) => (
            <span
              key={activity}
              className="text-xs px-1.5 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border"
            >
              {activity}
            </span>
          ))}

          {extraCount > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border">
              {t("extraMore", { count: extraCount })}
            </span>
          )}
        </div>
      )}

      {school.qualifications && school.qualifications.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {school.qualifications.slice(0, 4).map((q) => (
            <span
              key={q}
              title={q}
              className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
            >
              {q}
            </span>
          ))}
        </div>
      )}

      {school.isCurated ? (
        <Link
          href={{ pathname: "/schools/[slug]", params: { slug: school.slug } }}
          className="block w-full text-center text-xs font-medium text-brand border border-brand/25 rounded-lg py-2 hover:bg-brand-50 transition-colors mt-auto"
        >
          {t("viewProfile")}
        </Link>
      ) : school.website ? (
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-xs font-medium text-brand border border-brand/25 rounded-lg py-2 hover:bg-brand-50 transition-colors mt-auto"
        >
          {t("officialWebsite")}
        </a>
      ) : null}
    </div>
  );
}
