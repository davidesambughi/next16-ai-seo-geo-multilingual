import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "AboutPage" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical: `${BASE}/en/about`,
            languages: {
                'en': `${BASE}/en/about`,
                'pt': `${BASE}/pt/sobre`,
                'de': `${BASE}/de/uber`,
                'fr': `${BASE}/fr/a-propos`,
                'nl': `${BASE}/nl/over`,
                'es': `${BASE}/es/sobre`,
                'x-default': `${BASE}/en/about`,
            },
        },
        openGraph: {
            title: t("metaTitle"),
            description: t("metaDescription"),
            url: `${BASE}/en/about`,
            siteName: "Raising Kids in Portugal",
            type: "website",
            images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
    };
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "AboutPage" });
    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

    const stats = [
        { value: t("stat1Value"), label: t("stat1Label") },
        { value: t("stat2Value"), label: t("stat2Label") },
        { value: t("stat3Value"), label: t("stat3Label") },
        { value: t("stat4Value"), label: t("stat4Label") },
    ];

    const principles = [
        { title: t("principle1Title"), body: t("principle1Body") },
        { title: t("principle2Title"), body: t("principle2Body") },
        { title: t("principle3Title"), body: t("principle3Body") },
        { title: t("principle4Title"), body: t("principle4Body") },
    ];

    const doNots = [
        t("doNot1"),
        t("doNot2"),
        t("doNot3"),
        t("doNot4"),
        t("doNot5"),
    ];

    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Raising Kids in Portugal",
        "description":
            "Independent intelligence platform for international families relocating to Portugal. Provides verified school comparisons, neighborhood guides, and relocation resources.",
        "url": base,
        "foundingDate": "2024",
        "areaServed": "PT",
        "knowsAbout": [
            "International schools in Portugal",
            "Family relocation to Portugal",
            "Expat neighborhoods Lisbon",
            "IB British American curriculum comparison",
        ],
        // sameAs: add social/directory profiles when available
        // "sameAs": ["https://www.linkedin.com/company/raisingkidsinportugal"],
    };

    // Person schema — E-E-A-T signal: editorial team with domain expertise
    const editorialPersonSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Raising Kids in Portugal Editorial Team",
        "jobTitle": "Education & Relocation Intelligence",
        "description": "A team of consultants who have guided 200+ international families through school selection and relocation to Portugal. Conducted 50+ in-person school visits across St. Julian's School, TASIS Portugal, CAISL, and United Lisbon International School.",
        "worksFor": {
            "@type": "Organization",
            "name": "Raising Kids in Portugal",
            "url": base,
        },
        "knowsAbout": [
            "International schools in Portugal",
            "IB Diploma Programme",
            "British curriculum schools",
            "American curriculum schools",
            "Family relocation to Portugal",
            "Portugal D7 visa",
            "Portugal Digital Nomad visa",
            "Cascais expat community",
            "Sintra schools",
        ],
        "url": `${base}/en/about`,
    };

    return (
        <main className="container mx-auto py-12 px-6 max-w-4xl">
            <JsonLd data={orgSchema} />
            <JsonLd data={editorialPersonSchema} />
            <Breadcrumbs />

            {/* Hero */}
            <div className="mb-14">
                <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-5 leading-tight">
                    {t("h1")}
                </h1>
                <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
                    {t("opening")}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center bg-surface-subtle rounded-xl p-6 border border-border">
                        <p className="font-serif text-3xl font-semibold text-brand mb-1">{stat.value}</p>
                        <p className="text-sm text-ink-muted">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* What we do */}
            <section className="mb-14">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-5">{t("whatWeDoH2")}</h2>
                <div className="prose max-w-none text-ink-secondary space-y-4">
                    <p>{t("whatWeDo1")}</p>
                    <p>{t("whatWeDo2")}</p>
                    <p>{t("whatWeDo3")}</p>
                </div>
            </section>

            {/* Principles */}
            <section className="mb-14">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-6">{t("howWeOperateH2")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((p) => (
                        <div key={p.title} className="bg-surface-subtle border border-border rounded-xl p-6">
                            <h3 className="font-semibold text-ink-primary mb-2">{p.title}</h3>
                            <p className="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Who we serve */}
            <section className="mb-14">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-5">{t("whoWeServeH2")}</h2>
                <p className="text-ink-secondary leading-relaxed mb-4">{t("whoWeServe1")}</p>
                <p className="text-ink-secondary leading-relaxed">{t("whoWeServe2")}</p>
            </section>

            {/* What we don't do */}
            <section className="mb-14 rounded-2xl bg-brand-50 border border-border p-8">
                <h2 className="font-serif font-semibold text-xl text-ink-primary mb-4">{t("whatWeDoNotH2")}</h2>
                <ul className="space-y-3 text-ink-secondary text-sm">
                    {doNots.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="text-brand mt-0.5 font-bold text-base leading-none">✗</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* CTA */}
            <section className="text-center py-10 border-t border-border">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">{t("ctaH2")}</h2>
                <p className="text-ink-muted mb-6">{t("ctaText")}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/school-finder">{t("ctaBtn1")}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/best-private-and-public-international-schools-portugal-2026">
                            {t("ctaBtn2")}
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
