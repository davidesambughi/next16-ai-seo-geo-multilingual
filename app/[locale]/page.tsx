/**
 * Homepage — single editorial article.
 *
 * Architecture: one <article> wraps the entire page. Prose flows continuously
 * from top to bottom. Interactive components (QuizSection, LeadMagnetSection)
 * and editorial components (Hero, PillarsCardsSection, Testimonials) are
 * embedded within the article prose — not stacked as autonomous sections.
 *
 * Prose content: fully i18n'd via lib/content/homepage.ts (Option C pattern).
 * UI labels live in messages/*.json — useTranslations in sub-components.
 *
 * SEO: H1 in Hero (via i18n). H2s on prose sections carry keyword variants.
 * GEO: each paragraph is a citable, self-contained unit. Key entities
 *      (schools, neighborhoods, visas, statistics) are named explicitly.
 */

import Image from "next/image";
import Hero from "@/components/features/Hero";
import { PillarsCardsSection } from "@/components/features/PillarsCardsSection";
import { LeadMagnetSection } from "@/components/features/LeadMagnetSection";
import { QuizSection } from "@/components/features/quiz/QuizSection";
import { Testimonials } from "@/components/features/Testimonials";
import { featuredTestimonials, getTestimonialT } from "@/lib/data/testimonials";
import { JsonLd } from "@/components/JsonLd";
import { Link as I18nLink } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getHomeContent } from "@/lib/content/homepage";

// ISR: homepage content is stable — regenerate every 12 h
export const revalidate = 43200;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';
  const ogLocaleMap: Record<string, string> = {
    en: 'en_US', pt: 'pt_PT', de: 'de_DE', fr: 'fr_FR', nl: 'nl_NL', es: 'es_ES',
  };

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        'en': `${base}/en`,
        'pt': `${base}/pt`,
        'de': `${base}/de`,
        'fr': `${base}/fr`,
        'nl': `${base}/nl`,
        'es': `${base}/es`,
        'x-default': `${base}/en`,
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${base}/${locale}`,
      siteName: "Raising Kids in Portugal",
      locale: ogLocaleMap[locale] ?? locale,
      type: "website",
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const c = getHomeContent(locale);
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    "name": "Raising Kids in Portugal",
    "url": base,
    "logo": {
      "@type": "ImageObject",
      "url": `${base}/logo.png`,
      "width": 200,
      "height": 60,
    },
    "description": "Independent intelligence platform for international families relocating to Portugal. Verified school comparisons, neighborhood guides, and relocation resources.",
    "foundingDate": "2024",
    "areaServed": "PT",
    "knowsAbout": [
      "International schools in Portugal",
      "Family relocation to Portugal",
      "Expat neighborhoods Lisbon",
      "IB British American curriculum comparison",
    ],
    // TODO: add real social profile URLs before launch
    "sameAs": [
      "https://www.linkedin.com/company/raisingkidsinportugal",
    ],
    "review": featuredTestimonials.map((t) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.attribution },
      "reviewBody": getTestimonialT(t, "en").quote,
      "datePublished": "2024-01-01",
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${base}/${locale}#webpage`,
    "url": `${base}/${locale}`,
    "name": "Raising Kids in Portugal — Family Relocation Guide",
    "description": "Independent intelligence for families relocating to Portugal: verified school comparisons, neighborhood guides, visa information, and a personalized school-matching tool.",
    "inLanguage": locale,
    "isPartOf": { "@type": "WebSite", "@id": `${base}/#website` },
    "about": { "@type": "Organization", "@id": `${base}/#organization` },
    "dateModified": new Date().toISOString().split("T")[0],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Raising Kids in Portugal",
    "url": base,
    "description": "Independent intelligence for families relocating to Portugal — verified school comparisons, neighborhood guides, and relocation resources.",
    "inLanguage": ["en", "pt", "de", "fr", "nl", "es"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${base}/en/school-finder?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={webPageSchema} />

      {/*
        ══════════════════════════════════════════════════════════════
        THE ARTICLE — single continuous editorial flow.
        Every element below is part of one magazine article.
        The reader encounters Hero → Prose → Pillars → Prose → Quiz →
        Prose → LeadMagnet → Prose → Testimonials by reading, not clicking.
        ══════════════════════════════════════════════════════════════
      */}
      <article className="overflow-x-hidden">

        {/* ── ARTICLE HEADER ─────────────────────────────────────────
            H1 + editorial overline + opening image.
            Hero is an embedded article header, not a standalone section.
        ──────────────────────────────────────────────────────────── */}
        <header className="px-6">
          <div className="max-w-7xl mx-auto">
            <Hero />
          </div>
        </header>

        {/* ── PROSE BLOCK 1: WHY PORTUGAL ────────────────────────────
            Primary keyword: "relocating to Portugal with a family"
            Entities: Portugal, Lisbon, safety ranking, international schools,
            St. Julian's, TASIS, CAISL, United Lisbon, D7, cost of living.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-20 items-start">

              {/* Main prose column */}
              <div className="max-w-2xl">
                <h2 id="why-portugal-families" className="article-heading mb-6">
                  {c.block1.h2}
                </h2>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block1.p1}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block1.p2Pre}
                  <a
                    href="https://www.economicsandpeace.org/research/global-peace-index/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-2 hover:text-brand/80"
                  >
                    {c.block1.p2LinkText}
                  </a>
                  {c.block1.p2Post}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block1.p3}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed">
                  {c.block1.p4}
                </p>
              </div>

              {/* Pull-stat sidebar — desktop only, sticky */}
              <aside className="hidden lg:flex flex-col gap-10 sticky top-24 self-start" aria-label="Key statistics">
                <div>
                  <p className="font-serif text-[68px] font-bold leading-none text-brand/20 select-none" aria-hidden="true">#7</p>
                  <hr className="border-brand/20 my-3" />
                  <p className="text-body-sm text-ink-secondary leading-snug">
                    {c.block1.stat1Desc}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-[68px] font-bold leading-none text-brand/20 select-none" aria-hidden="true">300+</p>
                  <hr className="border-brand/20 my-3" />
                  <p className="text-body-sm text-ink-secondary leading-snug">
                    {c.block1.stat2Desc}
                  </p>
                </div>
                {/* Editorial image — fills sidebar gap below stats */}
                <div>
                  <div className="relative w-full aspect-4/3 overflow-hidden">
                    <Image
                      src="/repiro2-img.png"
                      alt={c.block1.imageAlt}
                      fill
                      loading="lazy"
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-caption text-ink-muted mt-2 leading-snug">
                    {c.block1.imageCaption}
                  </p>
                </div>
              </aside>

            </div>
          </div>
        </div>

        {/* ── PILLAR SPREAD ───────────────────────────────────────────
            The three guides appear here as the article's "what we cover".
            PillarsCardsSection has its own i18n'd editorial intro.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 py-20 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <PillarsCardsSection />
          </div>
        </div>

        {/* ── PROSE BLOCK 2: THE SCHOOL-FIRST PRINCIPLE ──────────────
            Keyword: "international schools near Lisbon", acceptance rates.
            This is Raising Kids in Portugal's core editorial thesis — the insight that
            differentiates the guide from generic relocation resources.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-20 items-start">

              <div className="max-w-2xl">
                <h2 id="school-first-principle" className="article-heading mb-6">
                  {c.block2.h2}
                </h2>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block2.p1}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block2.p2}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed">
                  {c.block2.p3}
                </p>
              </div>

              {/* Stat sidebar — 8% acceptance rate + editorial principle */}
              <aside className="hidden lg:flex flex-col gap-10 sticky top-24 self-start" aria-label="Key statistics">
                <div>
                  <p className="font-serif text-[68px] font-bold leading-none text-brand/20 select-none" aria-hidden="true">8%</p>
                  <hr className="border-brand/20 my-3" />
                  <p className="text-body-sm text-ink-secondary leading-snug">
                    {c.block2.statDesc}
                  </p>
                </div>
                <blockquote className="border-l-2 border-brand/30 pl-4">
                  <p className="font-serif italic text-body text-ink-primary leading-relaxed">
                    {c.block2.blockquote}
                  </p>
                  <footer className="mt-2">
                    <p className="text-caption text-ink-muted">{c.block2.blockquoteAuthor}</p>
                  </footer>
                </blockquote>
              </aside>

            </div>
          </div>
        </div>

        {/* ── QUIZ — embedded editorial tool ─────────────────────────
            Introduced by a prose bridge before the component.
            The QuizSection uses its own layout but lives inside the article.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 pt-8 pb-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <p className="text-body text-ink-secondary leading-relaxed max-w-2xl">
              {c.quizBridge.pre}
              <I18nLink href="/school-finder" className="text-brand underline underline-offset-2 hover:text-brand/80">
                {c.quizBridge.linkText}
              </I18nLink>
              {c.quizBridge.post}
            </p>
          </div>
        </div>
        <div className="bg-surface-subtle">
          <QuizSection locale={locale} />
        </div>

        {/* ── RESPIRO — editorial image moment ───────────────────────
            Full-bleed image break in the article flow.
        ──────────────────────────────────────────────────────────── */}
        <div className="relative w-full aspect-21/9 overflow-hidden">
          <Image
            src="/homepage-respiro1-img.png"
            alt={c.respiroAlt}
            fill
            loading="lazy"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjEiIGhlaWdodD0iOSIgZmlsbD0iI2U4ZTVlMCIvPjwvc3ZnPg=="
            className="object-cover"
          />
        </div>

        {/* ── PROSE BLOCK 3 + LEAD MAGNET — side-by-side editorial layout ──
            Left: E-E-A-T narrative (methodology + independence pledge).
            Right: signup form card — the CTA that follows naturally from the prose.
            Shared bg-surface-subtle creates a clear section break.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="px-6 py-16 border-t border-border bg-surface-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">

              {/* Left: E-E-A-T prose */}
              <div className="max-w-2xl">
                <h2 id="independent-intelligence" className="article-heading mb-6">
                  {c.block3.h2}
                </h2>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block3.p1}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  {c.block3.p2}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-8">
                  {c.block3.p3Pre}
                  <a
                    href="https://www.aima.gov.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-2 hover:text-brand/80"
                  >
                    {c.block3.p3LinkText}
                  </a>
                  {c.block3.p3Post}
                </p>

                <p className="text-body text-ink-secondary leading-relaxed pl-4 border-l-2 border-brand/30 italic">
                  {c.block3.quote}
                </p>
              </div>

              {/* Right: lead magnet form card (compact — no duplicate copy) */}
              <div className="lg:sticky top-24">
                <LeadMagnetSection compact locale={locale} />
              </div>

            </div>
          </div>
        </div>

        {/* ── TESTIMONIALS — pull quotes closing the article ──────────
            The article closes with the voices of the families it serves.
            Section header is part of the article prose; quotes are below.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 border-t border-border">
          <div className="max-w-7xl mx-auto pt-16 pb-4">
            <p className="section-overline mb-3">{t("testimonialsOverline")}</p>
            <h2 className="section-heading max-w-lg">
              {t("testimonialsH2")}
            </h2>
          </div>
        </div>
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <Testimonials />
          </div>
        </div>

      </article>
    </main>
  );
}
