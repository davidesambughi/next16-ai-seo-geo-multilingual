/**
 * NeighborhoodsList — Phase 4 Rich Card
 *
 * Server Component. Renders all neighborhoods with:
 * - Vibe tagline badge
 * - "Commute Context" section with travel times to specific schools
 * - Lifestyle adjective pill badges
 * - Amenity emoji list
 * - Mobile-first layout
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


export async function NeighborhoodsList() {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "NeighborhoodsList" });
    const locationLabels: Record<string, string> = {
        "Lisbon Coast": t("locations.lisbonCoast"),
        "Central Lisbon": t("locations.centralLisbon"),
        "East Lisbon": t("locations.eastLisbon"),
        "Greater Lisbon": t("locations.greaterLisbon"),
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodsData.map((neighborhood) => {
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
    );
}

