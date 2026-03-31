import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { SchoolSchema } from "@/components/seo/SchoolSchema";
import { schoolsData, getSchoolT } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, GraduationCap, Coins, Quote, Sparkles, Globe, Bus, Users } from "lucide-react";

import { SchoolMap } from "@/components/features/SchoolMap";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug, locale } = await params;
    const school = schoolsData.find((s) => s.slug === slug);
    const t = await getTranslations({ locale, namespace: "Metadata" });

    if (!school) return { title: t("title") };

    const schoolT = getSchoolT(school, locale);
    const isCurated = Boolean(school.translations.en.verdict);
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';
    const title = `${school.name} — International School Portugal`;
    const description = `${schoolT.description} Curriculum: ${school.curriculum}. Annual fees: ${school.fees}. Location: ${school.location}.`;
    const schoolPaths = routing.pathnames['/schools/[slug]'] as Record<string, string>;
    const canonical = `${base}/en${schoolPaths.en.replace('[slug]', school.slug)}`;
    const languages = Object.fromEntries(
        (routing.locales as readonly string[]).map(loc => [
            loc,
            `${base}/${loc}${schoolPaths[loc].replace('[slug]', school.slug)}`,
        ])
    ) as Record<string, string>;
    languages['x-default'] = canonical;
    return {
        title,
        description,
        alternates: { canonical, languages },
        ...(isCurated ? {} : { robots: { index: false, follow: false } }),
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

// ISR: regenerate every 24 h so school data stays fresh without full rebuilds
export const revalidate = 86400;

// Generate static params only for curated schools (editorial content).
// Imported schools remain accessible on-demand (ISR) but are not pre-built.
export function generateStaticParams() {
    return schoolsData
        .filter((s) => Boolean(s.translations.en.verdict))
        .map((school) => ({ slug: school.slug }));
}

export default async function SchoolDetailPage(props: PageProps) {
    const { slug, locale } = await props.params;
    const school = schoolsData.find((s) => s.slug === slug);

    if (!school) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "SchoolDetail" });
    const schoolT = getSchoolT(school, locale);

    return (
        <div className="container mx-auto py-12 px-6">
            <SchoolSchema 
                name={school.name}
                description={school.translations.en.description}
                slug={school.slug}
                location={school.location}
                fees={school.fees}
                curriculum={school.curriculum}
                coordinates={school.coordinates}
                acceptanceRate={school.acceptanceRate}
                inspectionDate={school.inspectionDate}
            />
            <Breadcrumbs leafLabel={school.name} />

            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
                <Image
                    src="/schools-img.jpg"
                    alt={`${school.name} — international school campus in ${school.location}, Portugal`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-1">{school.name}</h1>
                    <p className="text-sm font-medium text-brand mb-2">{t("h1Tagline")}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{school.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg" asChild>
                        <Link href="/contact">{t("contactBtn")}</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {schoolT.description && (
                        <section className="prose max-w-none">
                            <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-4">{t("aboutHeading")}</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">{schoolT.description}</p>
                        </section>
                    )}

                    {/* THE VERDICT — curated schools only */}
                    {schoolT.verdict && (
                        <section className="rounded-xl bg-warm-light/30 border border-warm/20 px-6 py-5 shadow-(--shadow-hair)">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-warm-light/50 p-1.5 rounded-lg text-warm shadow-(--shadow-hair)">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <p className="text-xs font-bold text-warm uppercase tracking-wider">{t("verdictLabel")}</p>
                            </div>
                            <p className="text-ink-primary font-medium leading-relaxed">{schoolT.verdict}</p>
                        </section>
                    )}

                    {/* PARENT WHISPER — curated schools only */}
                    {schoolT.parentWhisper && (
                        <section className="rounded-xl bg-surface-subtle border border-border px-6 py-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-white p-1.5 rounded-lg text-ink-muted shadow-(--shadow-hair) border border-border">
                                    <Quote className="h-4 w-4" />
                                </div>
                                <h2 className="text-xs font-bold text-ink-muted uppercase tracking-wider">{t("parentWhisperLabel")}</h2>
                            </div>
                            <p className="text-ink-secondary italic leading-relaxed">{schoolT.parentWhisper}</p>
                        </section>
                    )}

                    {schoolT.highlights && schoolT.highlights.length > 0 && (
                        <section>
                            <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-4">{t("keyHighlightsHeading")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {schoolT.highlights.map((highlight: string, index: number) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                        <Check className="h-5 w-5 text-green-600" />
                                        <span className="font-medium">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("detailsCardTitle")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-sm font-medium">{t("curriculumLabel")}</span>
                                </div>
                                <p className="font-medium">{school.curriculum}</p>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <Coins className="h-4 w-4" />
                                    <span className="text-sm font-medium">{t("annualFeesLabel")}</span>
                                </div>
                                <p className="font-medium">{school.fees}</p>
                            </div>
                            {school.ageRange && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span className="text-sm font-medium">{t("ageRangeLabel")}</span>
                                    </div>
                                    <p className="font-medium">{school.ageRange}</p>
                                </div>
                            )}
                            {school.studentCount && (
                                <div className="border-t pt-4">
                                    <span className="text-sm text-muted-foreground">{school.studentCount} students enrolled</span>
                                </div>
                            )}
                            {school.classSize && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span className="text-sm font-medium">Class size</span>
                                    </div>
                                    <p className="font-medium">~{school.classSize} students per class</p>
                                </div>
                            )}
                            {school.nationalities && (
                                <div className="border-t pt-4">
                                    <span className="text-sm text-muted-foreground">{school.nationalities}+ student nationalities</span>
                                </div>
                            )}
                            {school.qualifications && school.qualifications.length > 0 && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                        <GraduationCap className="h-4 w-4" />
                                        <span className="text-sm font-medium">Qualifications</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {school.qualifications.map((q) => (
                                            <span
                                                key={q}
                                                className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
                                            >
                                                {q}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {school.englishAsPrimary && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 text-green-700">
                                        <Check className="h-4 w-4" />
                                        <span className="text-sm font-medium">English-medium instruction</span>
                                    </div>
                                </div>
                            )}
                            {school.schoolBusRoutes && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Bus className="h-4 w-4" />
                                        <span className="text-sm font-medium">School bus available</span>
                                    </div>
                                </div>
                            )}
                            {school.website && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                        <Globe className="h-4 w-4" />
                                        <span className="text-sm font-medium">Website</span>
                                    </div>
                                    <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                                        {school.website.replace(/^https?:\/\//, "")}
                                    </a>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* B1 fix: only show neighborhood card for curated schools with a real slug */}
                    {school.neighborhoodSlug && (
                        <Card className="bg-blue-50 border-blue-100">
                            <CardHeader>
                                <CardTitle className="text-blue-900">{t("neighborhoodMatchTitle")}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-blue-800 mb-4">
                                    {t("neighborhoodMatchText", { schoolName: school.name, neighborhood: school.neighborhoodSlug })}
                                </p>
                                <Button variant="outline" className="w-full bg-white text-blue-900 border-blue-200 hover:bg-blue-100" asChild>
                                    <Link href={{ pathname: '/neighborhoods/[slug]', params: { slug: school.neighborhoodSlug } }}>
                                        {t("neighborhoodExploreBtn", { neighborhood: school.neighborhoodSlug })}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Location Map — only shown when coordinates are available */}
                    {school.coordinates && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">{t("locationHeading")}</h3>
                            <SchoolMap
                                schoolName={school.name}
                                location={school.location}
                                lat={school.coordinates.lat}
                                lng={school.coordinates.lng}
                                openInMapsLabel={t("openInMaps")}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
