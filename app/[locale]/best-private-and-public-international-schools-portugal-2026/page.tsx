import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchoolsList } from "@/components/SchoolsList";
import { JsonLd } from "@/components/JsonLd";
import { schoolsData } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { School, Users, BarChart } from "lucide-react";
import { StickyTOC } from "@/components/StickyTOC";
import { getSchoolsGuideContent } from "@/lib/content/schools-guide";


interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "SchoolsGuidePage" });
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';
    const title = t("metaTitle");
    const description = t("metaDescription");
    return {
        title,
        description,
        alternates: {
            canonical: `${base}/en/best-private-and-public-international-schools-portugal-2026`,
            languages: {
                'en': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/en/best-private-and-public-international-schools-portugal-2026`,
                'pt': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/pt/melhores-escolas-internacionais-privadas-e-publicas-portugal-2026`,
                'de': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/de/beste-private-und-offentliche-internationale-schulen-portugal-2026`,
                'fr': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/fr/meilleures-ecoles-internationales-privees-et-publiques-portugal-2026`,
                'nl': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/nl/beste-prive-en-openbare-internationale-scholen-portugal-2026`,
                'es': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/es/mejores-escuelas-internacionales-privadas-y-publicas-portugal-2026`,
                'x-default': `${base}/en/best-private-and-public-international-schools-portugal-2026`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${base}/en/best-private-and-public-international-schools-portugal-2026`,
            siteName: "Raising Kids in Portugal",
            type: "article",
            images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

// ISR: pillar page regenerates every 12 h — school fee/acceptance data changes frequently
export const revalidate = 43200;

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    const c = getSchoolsGuideContent(locale);
    const schoolCount = schoolsData.length;

    const sections = [
        { id: "overview",     label: c.toc.overview },
        { id: "curriculum",   label: c.toc.curriculum },
        { id: "fees",         label: c.toc.fees },
        { id: "admissions",   label: c.toc.admissions },
        { id: "methodology",  label: c.toc.methodology },
        { id: "schools",      label: c.toc.schools },
        { id: "faq",          label: c.toc.faq },
    ];

    const speakableSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["#key-takeaways", "#faq"],
        },
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/en/best-private-and-public-international-schools-portugal-2026`,
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Best International Schools in Portugal 2026",
        "description": "Independent ranking of the top private and public international schools in Portugal, comparing IB, British and American curricula.",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/en/best-private-and-public-international-schools-portugal-2026`,
        "numberOfItems": schoolsData.length,
        "itemListElement": schoolsData.map((school, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "EducationalOrganization",
                "name": school.name,
                "description": school.translations.en.description,
                "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com'}/en/school/${school.slug}`,
                "address": { "@type": "PostalAddress", "addressLocality": school.location, "addressCountry": "PT" },
                ...(school.coordinates && {
                    "geo": { "@type": "GeoCoordinates", "latitude": school.coordinates.lat, "longitude": school.coordinates.lng },
                }),
            },
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "What is the best international school in Portugal?", "acceptedAnswer": { "@type": "Answer", "text": "St. Julian's School in Carcavelos, Cascais — with an 8% acceptance rate and top IB results — is broadly considered the best. For American curriculum families, CAISL offers the best value with US State Department backing." } },
            { "@type": "Question", "name": "How much do international schools cost in Portugal?", "acceptedAnswer": { "@type": "Answer", "text": "Annual fees range from €12,000 (United Lisbon) to €32,000 (TASIS Portugal). Most families budget €15,000–25,000 per child all-in. Many schools also charge a one-time registration fee of €500–3,000." } },
            { "@type": "Question", "name": "Which area is best for families near international schools?", "acceptedAnswer": { "@type": "Answer", "text": "Cascais and Estoril for St. Julian's School (coast lifestyle). Sintra for TASIS and CAISL (nature, hills). Parque das Nações for United Lisbon International School (city living)." } },
            { "@type": "Question", "name": "Do I need to visit schools in person before applying?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — always. The difference between a school's marketing and its actual atmosphere can be significant. Request a shadow day for your child at each shortlisted school before committing to an enrolment contract." } },
        ],
    };

    return (
        <main className="container mx-auto py-12 px-6 max-w-4xl">
            <JsonLd data={itemListSchema} />
            <JsonLd data={faqSchema} />
            <JsonLd data={speakableSchema} />
            <Breadcrumbs />
            <StickyTOC sections={sections} />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
                    <time dateTime="2026-02-01">{c.header.updatedDate}</time>
                    <span>·</span>
                    <span>{c.header.schoolsReviewedLabel.replace('{count}', String(schoolCount))}</span>
                    <span>·</span>
                    <span>{c.header.byline}</span>
                </div>
                <h1 className="font-serif font-semibold text-h1 text-ink-primary mb-5 leading-tight">
                    {c.header.h1}
                </h1>
                <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
                    {c.header.subtitle}
                </p>
            </div>

            {/* ── KEY TAKEAWAYS — GEO/AI OVERVIEW OPTIMISATION ── */}
            <div id="key-takeaways" className="bg-brand-50 border border-brand/20 rounded-2xl p-6 mb-8">
                <h2 className="section-overline mb-4">{c.keyTakeaways.heading}</h2>
                <ul className="space-y-2">
                    {c.keyTakeaways.items.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary leading-snug">
                            <span className="shrink-0 text-brand font-bold mt-0.5">✓</span>
                            <span>{i === 0 ? point.replace('{count}', String(schoolCount)) : point}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Featured image */}
            <div className="relative w-full aspect-4/3 sm:aspect-video overflow-hidden rounded-xl mb-10">
                <Image
                    src="/schools-img.jpg"
                    alt="International school campus in Portugal — Raising Kids in Portugal schools guide"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                />
            </div>

            {/* Table of contents */}
            <nav className="bg-surface-subtle border border-border rounded-xl p-6 mb-14">
                <h2 className="section-overline mb-4">{c.toc.heading}</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sections.map((s, i) => (
                        <li key={s.id}>
                            <a href={`#${s.id}`} className="text-sm text-brand hover:text-(--brand-hover) transition-colors">
                                {i + 1}. {s.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="space-y-16">

                {/* 1. Overview */}
                <section id="overview">
                    <h2 className="article-heading mb-5">{c.overview.h2}</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        {c.overview.p1}
                    </p>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        {c.overview.p2}
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                        {c.overview.p3Pre}
                        <Link href="/school-finder" className="text-brand hover:underline">
                            {c.overview.p3LinkText}
                        </Link>.
                    </p>
                </section>

                {/* 2. Curriculum */}
                <section id="curriculum">
                    <h2 className="article-heading mb-5">{c.curriculum.h2}</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        {c.curriculum.p1}
                    </p>
                    <div className="space-y-5 mb-6">
                        {c.curriculum.cards.map((item) => (
                            <div key={item.tag} className="border border-border rounded-xl p-6">
                                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${item.tagColor}`}>
                                    {item.tag}
                                </span>
                                <p className="text-xs text-ink-muted mb-3">{c.curriculum.offeredBy}: {item.school}</p>
                                <p className="text-sm text-ink-secondary leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-warm-light border border-border rounded-xl p-5">
                        <p className="text-sm text-ink-secondary leading-relaxed">
                            <strong>{c.curriculum.notePrefix}:</strong> {c.curriculum.noteText}
                        </p>
                    </div>
                    <p className="text-xs text-ink-muted mt-3">
                        {c.curriculum.ibSource}{" "}
                        <a
                            href="https://www.ibo.org/programmes/diploma-programme/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-ink-secondary transition-colors"
                        >
                            International Baccalaureate — Diploma Programme (IBO.org)
                        </a>
                    </p>
                </section>

                {/* 3. Fees */}
                <section id="fees">
                    <h2 className="article-heading mb-5">{c.fees.h2}</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        {c.fees.p1}
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-surface-subtle text-ink-primary">
                                    <th className="text-left p-3 rounded-tl-lg">School</th>
                                    <th className="text-left p-3">{c.fees.thTuition}</th>
                                    <th className="text-left p-3">{c.fees.thRegistration}</th>
                                    <th className="text-left p-3 rounded-tr-lg">{c.fees.thAllin}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { school: "St. Julian's School", tuition: "€16,000–26,000", reg: "€2,000–2,500", allin: "~€20,000–23,000" },
                                    { school: "TASIS Portugal", tuition: "€18,000–32,000", reg: "€2,500–3,000", allin: "~€23,000–30,000" },
                                    { school: "CAISL", tuition: "€14,000–24,000", reg: "€500–1,000", allin: "~€17,000–22,000" },
                                    { school: "United Lisbon", tuition: "€12,000–22,000", reg: "€1,000–1,500", allin: "~€14,000–19,000" },
                                ].map((row) => (
                                    <tr key={row.school} className="bg-card hover:bg-surface-subtle">
                                        <td className="p-3 font-medium text-ink-primary">{row.school}</td>
                                        <td className="p-3 text-ink-secondary">{row.tuition}</td>
                                        <td className="p-3 text-ink-secondary">{row.reg}</td>
                                        <td className="p-3 text-ink-primary font-medium">{row.allin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-ink-secondary leading-relaxed mb-3">
                        <strong>{c.fees.p2BoldLabel}:</strong> {c.fees.p2Text}
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                        <strong>{c.fees.p3BestValueLabel}:</strong> {c.fees.p3BestValueText}
                        <strong> {c.fees.p3MostExpensiveLabel}:</strong> {c.fees.p3MostExpensiveText}
                    </p>
                </section>

                {/* 4. Admissions */}
                <section id="admissions">
                    <h2 className="article-heading mb-5">{c.admissions.h2}</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        {c.admissions.p1}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {c.admissions.cards.map((item) => (
                            <div key={item.school} className="bg-surface-subtle border border-border rounded-xl p-5">
                                <h3 className="font-bold text-ink-primary mb-1">{item.school}</h3>
                                <div className="flex gap-4 text-xs text-ink-muted mb-3">
                                    <span>{c.admissions.acceptanceLabel}: <strong className="text-ink-secondary">{item.rate}</strong></span>
                                    <span>{c.admissions.waitLabel}: <strong className="text-ink-secondary">{item.wait}</strong></span>
                                </div>
                                <p className="text-xs text-ink-secondary leading-relaxed">{item.verdict}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-brand-50 border border-border rounded-xl p-5">
                        <h3 className="font-semibold text-ink-primary mb-2">{c.admissions.ruleH3}</h3>
                        <p className="text-sm text-ink-secondary leading-relaxed">
                            {c.admissions.ruleText}
                        </p>
                    </div>
                </section>

                {/* Respiro — Admissions → Methodology */}
                <div className="relative w-full aspect-21/9 overflow-hidden rounded-2xl">
                    <Image
                        src="/school-respiro-img.png"
                        alt="International school campus in Portugal — Raising Kids in Portugal editorial visit"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>

                {/* 5. Methodology */}
                <section id="methodology">
                    <h2 className="article-heading mb-5">{c.methodology.h2}</h2>
                    <p className="text-ink-secondary leading-relaxed mb-5">
                        {c.methodology.p1}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        {c.methodology.cards.map((item, i) => (
                            <div key={item.title} className="bg-card border border-border rounded-xl p-5 text-center shadow-(--shadow-hair) hover:shadow-md transition-all">
                                <div className="bg-warm-light/30 text-warm p-2.5 rounded-xl mx-auto w-fit mb-4 shadow-(--shadow-hair)">
                                    {i === 0 && <School className="h-5 w-5" />}
                                    {i === 1 && <Users className="h-5 w-5" />}
                                    {i === 2 && <BarChart className="h-5 w-5" />}
                                </div>
                                <h3 className="font-semibold text-ink-primary mb-2 text-h4 leading-tight">{item.title}</h3>
                                <p className="text-body-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-ink-secondary leading-relaxed">
                        {c.methodology.p2}
                    </p>
                </section>

                {/* 6. School cards */}
                <section id="schools">
                    <h2 className="article-heading mb-8">{c.schoolProfiles.h2}</h2>
                    <SchoolsList />
                </section>

                {/* 7. FAQ */}
                <section id="faq" className="bg-surface-subtle rounded-2xl p-8">
                    <h2 className="article-heading mb-6">{c.faq.h2}</h2>
                    <div className="space-y-6">
                        {c.faq.items.map(({ q, a }) => (
                            <div key={q} className="border-b border-border pb-5 last:border-0 last:pb-0">
                                <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                                <p className="text-ink-secondary text-sm leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Related Neighborhoods */}
            <section className="mt-16">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">{c.related.h2}</h2>
                <p className="text-ink-muted text-sm mb-6">{c.related.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {c.related.cards.map(({ title, desc }) => (
                        <Link href="/top-neighborhoods" key={title}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
                                <CardContent><p className="text-sm text-ink-secondary">{desc}</p></CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="mt-8 text-center">
                <p className="text-sm text-ink-muted">
                    Planning your move?{" "}
                    <Link href="/relocation-guide" className="text-brand font-medium hover:underline">
                        Read our complete family relocation guide →
                    </Link>
                </p>
            </div>
        </main>
    );
}
