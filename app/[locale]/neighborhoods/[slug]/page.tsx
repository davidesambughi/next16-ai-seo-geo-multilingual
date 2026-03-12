import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { neighborhoodsData, getNeighborhoodT, schoolsData } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Check, GraduationCap, Coins, Car, Sparkles, TrendingUp, TrendingDown, Users, Globe, Home, Train, Wifi } from "lucide-react";

import { NeighborhoodMap } from "@/components/features/NeighborhoodMap";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug, locale } = await params;
    const neighborhood = neighborhoodsData.find((n) => n.slug === slug);
    const t = await getTranslations({ locale, namespace: "Metadata" });

    if (!neighborhood) return { title: t("title") };

    const nbhT = getNeighborhoodT(neighborhood, locale);
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';
    const title = `${neighborhood.name} — Family Friendly Neighborhood Portugal | Raising Kids in Portugal`;
    const description = `${nbhT.description} Vibe: ${nbhT.vibe}. ${nbhT.highlights.join(", ")}.`;
    const neighborhoodPaths = routing.pathnames['/neighborhoods/[slug]'] as Record<string, string>;
    const canonical = `${base}/en${neighborhoodPaths.en.replace('[slug]', neighborhood.slug)}`;
    const languages = Object.fromEntries(
        (routing.locales as readonly string[]).map(loc => [
            loc,
            `${base}/${loc}${neighborhoodPaths[loc].replace('[slug]', neighborhood.slug)}`,
        ])
    ) as Record<string, string>;
    languages['x-default'] = canonical;
    return {
        title,
        description,
        alternates: { canonical, languages },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "Raising Kids in Portugal",
            type: "website",
            images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export const revalidate = 86400;

export function generateStaticParams() {
    return neighborhoodsData.map((n) => ({
        slug: n.slug,
    }));
}

// ── Score bar helper ────────────────────────────────────────────────────────
function ScoreBar({ label, score }: { label: string; score: number }) {
    const pct = Math.round((score / 10) * 100);
    const color = score >= 8 ? "bg-green-500" : score >= 6 ? "bg-amber-400" : "bg-red-400";
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-ink-secondary">{label}</span>
                <span className="text-sm font-semibold text-ink-primary">{score}/10</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

// ── Price cell helper ───────────────────────────────────────────────────────
function PriceCell({ label, value, prefix = "€" }: { label: string; value?: number; prefix?: string }) {
    if (!value) return null;
    return (
        <div className="bg-slate-50 rounded-lg px-4 py-3">
            <p className="text-xs text-ink-muted mb-1">{label}</p>
            <p className="font-semibold text-ink-primary">{prefix}{value.toLocaleString("en-EU")}<span className="text-xs text-ink-muted">/mo</span></p>
        </div>
    );
}

export default async function NeighborhoodDetailPage(props: PageProps) {
    const { slug, locale } = await props.params;
    const neighborhood = neighborhoodsData.find((n) => n.slug === slug);

    if (!neighborhood) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "NeighborhoodDetail" });
    const nbhT = getNeighborhoodT(neighborhood, locale);

    const enT = neighborhood.translations.en;
    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

    // Destructure optional structured data for convenience
    const { realEstate, familyLiving, demographics, costOfLiving, expatCommunity, transport } = neighborhood;

    const placeSchema = {
        "@context": "https://schema.org",
        "@type": "Place",
        "@id": `${base}/en/neighborhood/${neighborhood.slug}#place`,
        "name": neighborhood.name,
        "description": enT.description,
        "url": `${base}/neighborhood/${neighborhood.slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": neighborhood.name,
            "addressRegion": neighborhood.location,
            "addressCountry": "PT",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": neighborhood.coordinates.lat,
            "longitude": neighborhood.coordinates.lng,
        },
        ...(enT.amenities?.length && {
            "amenityFeature": enT.amenities.map((a: string) => ({
                "@type": "LocationFeatureSpecification",
                "name": a,
                "value": true,
            })),
        }),
    };

    const schoolsInArea = schoolsData.filter((s) => s.neighborhoodSlug === neighborhood.slug);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${base}/en` },
            { "@type": "ListItem", "position": 2, "name": "Family-Friendly Neighborhoods", "item": `${base}/en/family-friendly-neighborhoods-portugal` },
            { "@type": "ListItem", "position": 3, "name": neighborhood.name, "item": `${base}/en/neighborhood/${neighborhood.slug}` },
        ],
    };

    // Derive city label for map search from location field (B4 fix)
    const mapCity = neighborhood.location;

    return (
        <div className="container mx-auto py-12 px-6">
            <JsonLd data={placeSchema} />
            <JsonLd data={breadcrumbSchema} />
            <Breadcrumbs leafLabel={neighborhood.name} />

            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
                <Image
                    src="/neighborhoods-img.jpg"
                    alt={`Family-friendly neighborhood: ${neighborhood.name}, Portugal`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{neighborhood.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{neighborhood.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg" asChild>
                        <Link href="/contact">{t("contactBtn")}</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ── MAIN CONTENT (2/3) ────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-8">

                    {/* About */}
                    <section className="prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">{t("aboutHeading", { name: neighborhood.name })}</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">{nbhT.description}</p>
                    </section>

                    {/* Why Families — pros/highlights */}
                    {nbhT.highlights.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">{t("whyFamiliesHeading")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {nbhT.highlights.map((highlight: string, index: number) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                        <Check className="h-5 w-5 text-green-600 shrink-0" />
                                        <span className="font-medium">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Pros & Cons (available for imported neighborhoods) */}
                    {nbhT.cons && nbhT.cons.length > 0 && (
                        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Pros already shown above; show Cons only */}
                            <div className="rounded-xl border border-red-100 bg-red-50/40 px-5 py-4">
                                {/* TODO i18n: "Things to consider" */}
                                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-3">Things to consider</h3>
                                <ul className="space-y-2">
                                    {nbhT.cons.map((con: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                            <span className="text-red-400 mt-0.5 shrink-0">–</span>
                                            {con}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* Commute Context */}
                    {nbhT.commuteContext && (
                        <section className="rounded-xl bg-warm-light/30 border border-warm/20 px-6 py-5 shadow-(--shadow-hair)">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-warm-light/50 p-1.5 rounded-lg text-warm shadow-(--shadow-hair)">
                                    <Car className="h-4 w-4" />
                                </div>
                                <h2 className="text-xs font-bold text-warm uppercase tracking-wider">{t("commuteContextLabel")}</h2>
                            </div>
                            <p className="text-ink-secondary text-sm leading-relaxed font-medium">{nbhT.commuteContext}</p>
                        </section>
                    )}

                    {/* Family Living Scores */}
                    {familyLiving && (
                        <section>
                            {/* TODO i18n: "Family Living Scores" */}
                            <h2 className="text-2xl font-bold mb-5">Family Living Scores</h2>
                            <div className="space-y-4">
                                {familyLiving.familyFriendlyScore != null && (
                                    <ScoreBar label="Family friendly" score={familyLiving.familyFriendlyScore} />
                                )}
                                {familyLiving.safetyScore != null && (
                                    <ScoreBar label="Safety" score={familyLiving.safetyScore} />
                                )}
                                {familyLiving.walkabilityScore != null && (
                                    <ScoreBar label="Walkability" score={familyLiving.walkabilityScore} />
                                )}
                                {familyLiving.greenSpacesScore != null && (
                                    <ScoreBar label="Green spaces" score={familyLiving.greenSpacesScore} />
                                )}
                            </div>
                            {/* Beach + Noise badges */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {familyLiving.beachAccess === true && (
                                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                                        🏖 Beach access{familyLiving.beachDistanceKm ? ` (${familyLiving.beachDistanceKm} km)` : ""}
                                    </span>
                                )}
                                {familyLiving.beachAccess === false && (
                                    <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-xs font-medium px-3 py-1 rounded-full border border-slate-200">
                                        No direct beach access
                                    </span>
                                )}
                                {familyLiving.noiseLevel && (
                                    <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 text-xs font-medium px-3 py-1 rounded-full border border-slate-200">
                                        🔊 Noise: {familyLiving.noiseLevel}
                                    </span>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Property Prices */}
                    {realEstate && (realEstate.avgRent1BedEur || realEstate.avgRent2BedEur || realEstate.avgRent3BedEur || realEstate.avgPricePerSqmBuyEur) && (
                        <section>
                            {/* TODO i18n: "Property Prices" */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Property Prices</h2>
                                {realEstate.dataDate && (
                                    <span className="text-xs text-ink-muted bg-slate-100 px-2 py-1 rounded">Data: {realEstate.dataDate}</span>
                                )}
                            </div>

                            {/* Rent prices */}
                            {(realEstate.avgRent1BedEur || realEstate.avgRent2BedEur || realEstate.avgRent3BedEur) && (
                                <div className="mb-4">
                                    <p className="text-sm text-ink-muted mb-2 font-medium">Monthly rental (est.)</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <PriceCell label="1-bedroom" value={realEstate.avgRent1BedEur} />
                                        <PriceCell label="2-bedroom" value={realEstate.avgRent2BedEur} />
                                        <PriceCell label="3-bedroom" value={realEstate.avgRent3BedEur} />
                                    </div>
                                </div>
                            )}

                            {/* Buy price + trend */}
                            <div className="flex flex-wrap gap-3">
                                {realEstate.avgPricePerSqmBuyEur && (
                                    <div className="bg-slate-50 rounded-lg px-4 py-3">
                                        <p className="text-xs text-ink-muted mb-1">Buy price per m²</p>
                                        <p className="font-semibold text-ink-primary">€{realEstate.avgPricePerSqmBuyEur.toLocaleString("en-EU")}</p>
                                    </div>
                                )}
                                {realEstate.priceRangeLabel && (
                                    <div className="bg-slate-50 rounded-lg px-4 py-3">
                                        <p className="text-xs text-ink-muted mb-1">Price range</p>
                                        <p className="font-semibold text-ink-primary">{realEstate.priceRangeLabel}</p>
                                    </div>
                                )}
                                {realEstate.priceTrendYoyPct != null && (
                                    <div className="bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-2">
                                        {realEstate.priceTrendYoyPct >= 0
                                            ? <TrendingUp className="h-4 w-4 text-green-600" />
                                            : <TrendingDown className="h-4 w-4 text-red-500" />
                                        }
                                        <div>
                                            <p className="text-xs text-ink-muted mb-0.5">Annual trend</p>
                                            <p className={`font-semibold text-sm ${realEstate.priceTrendYoyPct >= 0 ? "text-green-700" : "text-red-600"}`}>
                                                {realEstate.priceTrendYoyPct > 0 ? "+" : ""}{realEstate.priceTrendYoyPct}%
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Vibe Adjectives + Amenities */}
                    {(nbhT.vibeAdjectives?.length > 0 || nbhT.amenities?.length > 0) && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">{t("lifestyleAmenitiesHeading")}</h2>
                            {nbhT.vibeAdjectives?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {nbhT.vibeAdjectives.map((adj: string) => (
                                        <span key={adj} className="inline-block bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">{adj}</span>
                                    ))}
                                </div>
                            )}
                            {nbhT.amenities?.length > 0 && (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {nbhT.amenities.map((amenity: string) => (
                                        <li key={amenity} className="flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-100 rounded-lg px-3 py-2">
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    )}

                    {/* Demographics */}
                    {demographics && (demographics.expatPopulationPct != null || demographics.predominantExpatNationalities?.length || demographics.englishFriendliness) && (
                        <section>
                            {/* TODO i18n: "Community & Demographics" */}
                            <h2 className="text-2xl font-bold mb-4">Community & Demographics</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {demographics.expatPopulationPct != null && (
                                    <div className="bg-slate-50 rounded-xl px-5 py-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="h-4 w-4 text-ink-muted" />
                                            <p className="text-xs text-ink-muted font-medium">Expat population</p>
                                        </div>
                                        <p className="text-2xl font-bold text-ink-primary">{demographics.expatPopulationPct}%</p>
                                    </div>
                                )}
                                {demographics.englishFriendliness && (
                                    <div className="bg-slate-50 rounded-xl px-5 py-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Globe className="h-4 w-4 text-ink-muted" />
                                            <p className="text-xs text-ink-muted font-medium">English friendliness</p>
                                        </div>
                                        <p className="text-xl font-bold text-ink-primary">{demographics.englishFriendliness}</p>
                                    </div>
                                )}
                                {demographics.predominantExpatNationalities?.length && (
                                    <div className="bg-slate-50 rounded-xl px-5 py-4 sm:col-span-2">
                                        <p className="text-xs text-ink-muted font-medium mb-2">Main expat communities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {demographics.predominantExpatNationalities.map((nat: string) => (
                                                <span key={nat} className="bg-white border border-slate-200 text-slate-700 text-sm px-3 py-1 rounded-full">{nat}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Cost of Living */}
                    {costOfLiving && (costOfLiving.totalMonthlyEstimateEur != null || costOfLiving.comparedToLisbonCenterPct != null) && (
                        <section className="rounded-xl border border-border bg-surface-subtle px-6 py-5">
                            {/* TODO i18n: "Cost of Living" */}
                            <h2 className="text-xl font-bold mb-4">Cost of Living</h2>
                            <div className="flex flex-wrap gap-4">
                                {costOfLiving.totalMonthlyEstimateEur != null && (
                                    <div>
                                        <p className="text-xs text-ink-muted mb-1">Est. monthly family budget</p>
                                        <p className="text-2xl font-bold text-ink-primary">
                                            €{costOfLiving.totalMonthlyEstimateEur.toLocaleString("en-EU")}
                                            <span className="text-sm font-normal text-ink-muted">/mo</span>
                                        </p>
                                        <p className="text-xs text-ink-muted mt-0.5">Incl. rent, groceries, utilities, school</p>
                                    </div>
                                )}
                                {costOfLiving.comparedToLisbonCenterPct != null && (
                                    <div className="border-l border-border pl-4">
                                        <p className="text-xs text-ink-muted mb-1">vs. Lisbon center</p>
                                        <p className={`text-2xl font-bold ${costOfLiving.comparedToLisbonCenterPct <= 0 ? "text-green-700" : "text-amber-600"}`}>
                                            {costOfLiving.comparedToLisbonCenterPct > 0 ? "+" : ""}{costOfLiving.comparedToLisbonCenterPct}%
                                        </p>
                                        <p className="text-xs text-ink-muted mt-0.5">
                                            {costOfLiving.comparedToLisbonCenterPct < 0 ? "cheaper" : "more expensive"}
                                        </p>
                                    </div>
                                )}
                                {costOfLiving.costLevel && (
                                    <div className="border-l border-border pl-4">
                                        <p className="text-xs text-ink-muted mb-1">Cost level</p>
                                        <p className="text-xl font-bold text-ink-primary">{costOfLiving.costLevel}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Expat Community */}
                    {expatCommunity && (expatCommunity.strength || expatCommunity.digitalNomadFriendly != null || expatCommunity.nhrTaxRegimePopular != null) && (
                        <section>
                            {/* TODO i18n: "Expat Community" */}
                            <h2 className="text-2xl font-bold mb-4">Expat Community</h2>
                            <div className="flex flex-wrap gap-3">
                                {expatCommunity.strength && (
                                    <div className="bg-slate-50 rounded-xl px-5 py-4">
                                        <p className="text-xs text-ink-muted mb-1">Community strength</p>
                                        <p className="font-bold text-ink-primary">{expatCommunity.strength}</p>
                                    </div>
                                )}
                                {expatCommunity.digitalNomadFriendly === true && (
                                    <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-xl border border-purple-100">
                                        <Wifi className="h-4 w-4" />
                                        Digital nomad friendly
                                    </span>
                                )}
                                {expatCommunity.nhrTaxRegimePopular === true && (
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-xl border border-emerald-100">
                                        💶 NHR tax regime popular
                                    </span>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Transport */}
                    {transport && (transport.publicTransportQuality || transport.metroAccess != null || transport.trainLines?.length) && (
                        <section>
                            {/* TODO i18n: "Transport" */}
                            <h2 className="text-2xl font-bold mb-4">Transport</h2>
                            <div className="flex flex-wrap gap-3">
                                {transport.publicTransportQuality && (
                                    <div className="bg-slate-50 rounded-xl px-5 py-4">
                                        <p className="text-xs text-ink-muted mb-1">Public transport</p>
                                        <p className="font-bold text-ink-primary">{transport.publicTransportQuality}</p>
                                    </div>
                                )}
                                {transport.metroAccess === true && (
                                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-xl border border-blue-100">
                                        🚇 Metro access
                                    </span>
                                )}
                                {transport.metroAccess === false && (
                                    <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-500 text-sm font-medium px-4 py-2 rounded-xl border border-slate-200">
                                        No metro
                                    </span>
                                )}
                                {transport.trainLines?.length && (
                                    <div className="bg-slate-50 rounded-xl px-5 py-4">
                                        <p className="text-xs text-ink-muted mb-2">Train lines</p>
                                        <div className="flex flex-wrap gap-1">
                                            {transport.trainLines.map((line: string) => (
                                                <span key={line} className="bg-white border border-slate-200 text-slate-700 text-xs px-2 py-1 rounded-full">{line}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Schools in area */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("schoolsInAreaHeading", { name: neighborhood.name })}</h2>
                        {schoolsInArea.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {schoolsInArea.map((school) => (
                                    <Card key={school.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>{school.name}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1 mt-1">
                                                        <MapPin className="h-4 w-4" /> {school.location}
                                                    </CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={{ pathname: '/schools/[slug]', params: { slug: school.slug } }}>{t("viewSchoolBtn")}</Link>
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4" />
                                                    {school.curriculum}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Coins className="h-4 w-4" />
                                                    {school.fees}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic">{t("noSchoolsText")}</p>
                        )}
                    </section>
                </div>

                {/* ── SIDEBAR (1/3) ─────────────────────────────────────── */}
                <div className="space-y-6">

                    {/* Vibe Check */}
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-900">{t("vibeCheckTitle")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-medium text-blue-800 mb-2">
                                {nbhT.vibe}
                            </p>
                            <p className="text-sm text-blue-700">
                                {t("vibeCheckBody")}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Quick stats sidebar card (if structured data available) */}
                    {(familyLiving?.safetyScore != null || demographics?.expatPopulationPct != null || costOfLiving?.costLevel) && (
                        <Card>
                            <CardHeader>
                                {/* TODO i18n: "At a glance" */}
                                <CardTitle>At a glance</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {familyLiving?.safetyScore != null && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-ink-muted">Safety</span>
                                        <span className="font-semibold">{familyLiving.safetyScore}/10</span>
                                    </div>
                                )}
                                {familyLiving?.walkabilityScore != null && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-ink-muted">Walkability</span>
                                        <span className="font-semibold">{familyLiving.walkabilityScore}/10</span>
                                    </div>
                                )}
                                {demographics?.expatPopulationPct != null && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-ink-muted">Expat population</span>
                                        <span className="font-semibold">{demographics.expatPopulationPct}%</span>
                                    </div>
                                )}
                                {demographics?.englishFriendliness && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-ink-muted">English</span>
                                        <span className="font-semibold">{demographics.englishFriendliness}</span>
                                    </div>
                                )}
                                {costOfLiving?.costLevel && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-ink-muted">Cost level</span>
                                        <span className="font-semibold">{costOfLiving.costLevel}</span>
                                    </div>
                                )}
                                {realEstate?.avgRent2BedEur && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-ink-muted">Rent (2-bed)</span>
                                        <span className="font-semibold">€{realEstate.avgRent2BedEur.toLocaleString("en-EU")}/mo</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Map — B4 fix: use mapCity (derived from neighborhood.location) instead of hardcoded "Lisbon" */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">{t("exploreAreaHeading")}</h3>
                        <NeighborhoodMap
                            neighborhoodName={neighborhood.name}
                            city={mapCity}
                            lat={neighborhood.coordinates.lat}
                            lng={neighborhood.coordinates.lng}
                            exploreOnMapsLabel={t("exploreOnMaps")}
                            amenityLabels={{
                                schools: t("amenitySchools"),
                                cafes: t("amenityCafes"),
                                parks: t("amenityParks"),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
