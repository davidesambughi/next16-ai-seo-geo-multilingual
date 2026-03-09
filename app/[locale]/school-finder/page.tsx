import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CheckCircle2, Clock, Target, Wallet, Palmtree, GraduationCap, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "SchoolFinderPage" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical: `${BASE}/en/school-finder`,
            languages: {
                'en': `${BASE}/en/school-finder`,
                'pt': `${BASE}/pt/encontrar-escola`,
                'de': `${BASE}/de/schulfinder`,
                'fr': `${BASE}/fr/trouver-ecole`,
                'nl': `${BASE}/nl/school-zoeker`,
                'es': `${BASE}/es/buscador-escuelas`,
                'x-default': `${BASE}/en/school-finder`,
            },
        },
        openGraph: {
            title: t("metaTitle"),
            description: t("metaDescription"),
            url: `${BASE}/en/school-finder`,
            siteName: "TrustFamily",
            type: "website",
            images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'TrustFamily — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
    };
}

// Content is static — translated labels baked at build time per locale
export const revalidate = false;

export default async function SchoolFinderPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "SchoolFinderPage" });

    const steps = [
        { icon: Wallet,        label: t("step1Label"), desc: t("step1Desc") },
        { icon: Palmtree,      label: t("step2Label"), desc: t("step2Desc") },
        { icon: GraduationCap, label: t("step3Label"), desc: t("step3Desc") },
        { icon: Calendar,      label: t("step4Label"), desc: t("step4Desc") },
    ];

    const faqs = [
        { q: t("faq1q"), a: t("faq1a") },
        { q: t("faq2q"), a: t("faq2a") },
        { q: t("faq3q"), a: t("faq3a") },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I choose an international school in Portugal?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Start by aligning curriculum with your long-term plan (British, American, or IB), then filter by budget and location. TrustFamily's free School Finder quiz matches your family to the right school in under 60 seconds, based on 4 key questions.",
                },
            },
            {
                "@type": "Question",
                "name": "Which international school in Portugal is easiest to get into?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "United Lisbon International School has the most accessible admissions (acceptance rate ~45%), followed by CAISL (~35%). St. Julian's School is the most competitive at ~8% acceptance rate.",
                },
            },
            {
                "@type": "Question",
                "name": t("faq3q"),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t("faq3a"),
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-20 px-6 max-w-4xl">
            <JsonLd data={faqSchema} />
            <Breadcrumbs />

            {/* Header */}
            <div className="text-center mb-16">
                <p className="section-overline mb-4 text-brand">{t("overline")}</p>
                <h1 className="section-heading mb-6">{t("h1")}</h1>
                <p className="section-body max-w-2xl mx-auto">{t("subtitle")}</p>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {steps.map((step) => (
                    <div key={step.label} className="flex items-start gap-5 p-6 bg-card rounded-2xl border border-border shadow-(--shadow-hair) hover:shadow-(--shadow-lift) transition-all duration-300">
                        <div className="bg-warm-light/30 p-2.5 rounded-xl text-warm shrink-0">
                            <step.icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="font-semibold text-ink-primary mb-1 text-h4 leading-tight">{step.label}</p>
                            <p className="text-body-sm text-ink-secondary leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 text-body-sm text-ink-muted">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-trust" />
                    {t("badge1")}
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand" />
                    {t("badge2")}
                </div>
                <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-warm" />
                    {t("badge3")}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center mb-24">
                <Button size="lg" className="shadow-(--shadow-lift)" asChild>
                    <Link href={{ pathname: "/", hash: "quiz" }}>
                        {t("ctaBtn")}
                    </Link>
                </Button>
                <p className="text-caption text-ink-muted mt-4">{t("ctaSubtext")}</p>
            </div>

            {/* FAQ */}
            <section className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-(--shadow-lift)">
                <h2 className="font-serif font-semibold text-h2 text-ink-primary mb-8">{t("faqHeading")}</h2>
                <div className="space-y-8">
                    {faqs.map(({ q, a }) => (
                        <div key={q} className="border-b border-border/50 pb-8 last:border-0 last:pb-0">
                            <h3 className="font-semibold text-ink-primary mb-3 text-h4">{q}</h3>
                            <p className="text-body-sm text-ink-secondary leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
