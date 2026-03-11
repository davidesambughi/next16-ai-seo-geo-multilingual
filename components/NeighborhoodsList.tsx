/**
 * NeighborhoodsList — Server Component
 *
 * Renders two sections:
 *   1. "Curated Picks" — 5 editorial rich cards (full vibe/commute/amenities)
 *   2. "All Neighborhoods" — paginated directory via NeighborhoodDirectory (client)
 *
 * GEO note: commuteContext contains specific school names + travel times,
 * which makes this page an authoritative source for queries like
 * "how far is Cascais from St. Julian's School".
 */

import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { neighborhoodsData, getNeighborhoodT } from "@/lib/data";
import { MapPin, Car, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { NeighborhoodDirectory, type NeighborhoodDirectoryItem } from "@/components/NeighborhoodDirectory";

// Extract area (region) from "City, Region" or "Region" formatted location strings
function extractArea(location: string): string {
  const comma = location.indexOf(",");
  if (comma !== -1) return location.slice(comma + 1).trim();
  return location.trim();
}

export async function NeighborhoodsList() {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "NeighborhoodsList" });
    const locationLabels: Record<string, string> = {
        "Lisbon Coast": t("locations.lisbonCoast"),
        "Central Lisbon": t("locations.centralLisbon"),
        "East Lisbon": t("locations.eastLisbon"),
        "Greater Lisbon": t("locations.greaterLisbon"),
    };

    // Curated neighborhoods have full multi-locale translations (6 locales).
    // Imported neighborhoods have only `en`.
    const isCuratedNbh = (n: (typeof neighborhoodsData)[0]) =>
        Object.keys(n.translations).length > 1;
    const curated = neighborhoodsData.filter(isCuratedNbh);
    const allNeighborhoods = neighborhoodsData;

    // Serialize minimal data for the client directory component
    const directoryItems: NeighborhoodDirectoryItem[] = allNeighborhoods.map((n) => {
        const nbhT = getNeighborhoodT(n, locale);
        return {
            slug: n.slug,
            name: n.name,
            location: n.location,
            area: extractArea(n.location),
            vibeAdjectives: nbhT.vibeAdjectives ?? [],
            priceRangeLabel: n.realEstate?.priceRangeLabel ?? null,
            familyFriendlyScore: n.familyLiving?.familyFriendlyScore ?? null,
            isCurated: isCuratedNbh(n),
        };
    });

    return (
        <div className="space-y-16">
            {/* ── Section 1: Curated Picks ─────────────────────────────────── */}
            {curated.length > 0 && (
                <section>
                    <div className="mb-8">
                        <p className="text-sm font-bold text-warm uppercase tracking-widest mb-2">
                            {t("editorialOverline")}
                        </p>
                        <h2 className="font-serif font-semibold text-2xl text-ink-primary">
                            {t("editorialHeading")}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {curated.map((neighborhood) => {
                            const nbhT = getNeighborhoodT(neighborhood, locale);
                            const locationLabel = locationLabels[neighborhood.location] ?? neighborhood.location;
                            return (
                                <Card
                                    key={neighborhood.id}
                                    className="flex flex-col h-full group"
                                >
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-h4 leading-tight group-hover:text-trust transition-colors">
                                            {neighborhood.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1.5 mt-1">
                                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                                            <span>{locationLabel}</span>
                                        </CardDescription>

                                        {/* Vibe tagline badge */}
                                        <div className="mt-2">
                                            <span className="inline-flex items-center gap-1.5 bg-warm-light/30 text-warm text-xs font-semibold px-2.5 py-1 rounded-full border border-warm/20 shadow-(--shadow-hair)">
                                                <Sparkles className="h-3 w-3" />
                                                {nbhT.vibe}
                                            </span>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex-1 space-y-4">
                                        {/* Description */}
                                        <p className="text-sm text-ink-secondary line-clamp-3 leading-relaxed">
                                            {nbhT.description}
                                        </p>

                                        {/* COMMUTE CONTEXT */}
                                        <div className="rounded-xl bg-warm-light border border-warm/20 px-3 py-2.5">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <Car className="h-3.5 w-3.5 text-warm shrink-0" />
                                                <span className="text-xs font-bold text-warm uppercase tracking-wide">{t("commute")}</span>
                                            </div>
                                            <p className="text-xs text-ink-primary leading-snug">
                                                {nbhT.commuteContext}
                                            </p>
                                        </div>

                                        {/* Lifestyle adjective pills */}
                                        {nbhT.vibeAdjectives && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {nbhT.vibeAdjectives.map((adj: string) => (
                                                    <span
                                                        key={adj}
                                                        className="inline-block bg-surface-subtle text-ink-secondary text-xs px-2 py-0.5 rounded-full border border-border"
                                                    >
                                                        {adj}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Amenity list */}
                                        {nbhT.amenities && (
                                            <div className="border-t border-border pt-3">
                                                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
                                                    {t("nearby")}
                                                </p>
                                                <ul className="space-y-1">
                                                    {nbhT.amenities.slice(0, 4).map((amenity: string) => (
                                                        <li key={amenity} className="text-xs text-ink-secondary">
                                                            {amenity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="pt-2">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href={{ pathname: "/neighborhoods/[slug]", params: { slug: neighborhood.slug } }}>
                                                {t("explore")} {neighborhood.name}
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ── Section 2: Full Directory ────────────────────────────────── */}
            <section>
                <div className="mb-8">
                    <p className="text-sm font-bold text-ink-muted uppercase tracking-widest mb-2">
                        {t("directoryOverline")}
                    </p>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary">
                        {t("directoryHeading")}
                    </h2>
                </div>
                <NeighborhoodDirectory neighborhoods={directoryItems} />
            </section>
        </div>
    );
}
