import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Sun, ShieldCheck, GraduationCap } from "lucide-react";
import { StickyTOC } from "@/components/StickyTOC";

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface TocSection {
  id: string;
  label: string;
}

interface StatCard {
  title: string;
  desc: string;
}

interface VisaCard {
  tag: string;
  title: string;
  content: string;
}

interface CostRow {
  item: string;
  value: string;
  note: string;
}

interface TimelineStep {
  months: string;
  title: string;
  tasks: string[];
}

interface FaqItem {
  q: string;
  a: string;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RelocationGuidePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${BASE}/en/family-relocation-guide-2026`,
      languages: {
        en: `${BASE}/en/family-relocation-guide-2026`,
        pt: `${BASE}/pt/guia-relocacao-familia-2026`,
        de: `${BASE}/de/familien-umzugs-guide-2026`,
        fr: `${BASE}/fr/guide-relocalisation-famille-2026`,
        nl: `${BASE}/nl/familie-verhuisgids-2026`,
        es: `${BASE}/es/guia-relocacion-familia-2026`,
        "x-default": `${BASE}/en/family-relocation-guide-2026`,
      },
    },
  };
}

export const revalidate = 43200;

export default async function RelocationGuidePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RelocationGuidePage" });

  const sections = t.raw("sections") as TocSection[];
  const keyTakeaways = t.raw("keyTakeaways") as string[];
  const statCards = t.raw("whyPortugal.cards") as StatCard[];
  const visaCards = t.raw("visas.cards") as VisaCard[];
  const costRows = t.raw("costOfLiving.rows") as CostRow[];
  const timeline = t.raw("timeline.steps") as TimelineStep[];
  const faqs = t.raw("faq.items") as FaqItem[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="container mx-auto py-12 px-6 max-w-4xl">
      <JsonLd data={faqSchema} />
      <Breadcrumbs />
      <StickyTOC
        sections={sections}
        title={t("sticky.title")}
        mobileSectionsTitle={t("sticky.sections")}
        mobileButtonLabel={t("sticky.title")}
        scrollingLabel={t("sticky.scrolling")}
      />

      <div className="mb-6">
        <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
          <time dateTime="2026-02-01">{t("header.updated")}</time>
          <span>·</span>
          <span>{t("header.readTime")}</span>
          <span>·</span>
          <span>{t("header.editorial")}</span>
        </div>
        <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-5 leading-tight">{t("header.title")}</h1>
        <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">{t("header.subtitle")}</p>
      </div>

      <div id="key-takeaways" className="bg-brand-50 border border-brand/20 rounded-2xl p-6 mb-8">
        <h2 className="section-overline mb-4">{t("keyTakeawaysTitle")}</h2>
        <ul className="space-y-2">
          {keyTakeaways.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-ink-secondary leading-snug">
              <span className="shrink-0 text-brand font-bold mt-0.5">?</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-full aspect-4/3 sm:aspect-video overflow-hidden rounded-xl mb-10">
        <Image src="/softLanding-img.png" alt={t("imageAlt")} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
      </div>

      <nav className="bg-surface-subtle border border-border rounded-xl p-6 mb-12">
        <h2 className="section-overline mb-4">{t("tocTitle")}</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                {i + 1}. {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-16">
        <section id="why-portugal">
          <h2 className="article-heading mb-5">{t("whyPortugal.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("whyPortugal.p1")}</p>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("whyPortugal.p2")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {statCards.map((item, index) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border shadow-(--shadow-hair) hover:shadow-md transition-all">
                <div className="bg-warm-light/30 text-warm p-2.5 rounded-xl w-fit mb-4 shadow-(--shadow-hair)">
                  {index === 0 ? <Sun className="h-5 w-5" /> : null}
                  {index === 1 ? <ShieldCheck className="h-5 w-5" /> : null}
                  {index === 2 ? <GraduationCap className="h-5 w-5" /> : null}
                </div>
                <h3 className="font-semibold text-ink-primary mb-2 text-h4 leading-tight">{item.title}</h3>
                <p className="text-body-sm text-ink-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-3">{t("whyPortugal.sourceLabel")} <a href="https://www.visionofhumanity.org/maps/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-secondary transition-colors">Global Peace Index 2025</a></p>
        </section>

        <section id="visas">
          <h2 className="article-heading mb-5">{t("visas.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-6">{t("visas.p1")}</p>
          <div className="space-y-6">
            {visaCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand mb-3">{card.tag}</span>
                <h3 className="font-semibold text-ink-primary mb-2">{card.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{card.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="schools">
          <h2 className="article-heading mb-5">{t("schools.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("schools.p1")}</p>
          <Button asChild variant="outline">
            <Link href="/best-private-and-public-international-schools-portugal-2026">{t("schools.cta")}</Link>
          </Button>
        </section>

        <section id="neighborhoods">
          <h2 className="article-heading mb-5">{t("neighborhoods.title")}</h2>
          <p className="text-ink-secondary leading-relaxed">{t("neighborhoods.p1")}</p>
        </section>

        <section id="housing">
          <h2 className="article-heading mb-5">{t("housing.title")}</h2>
          <p className="text-ink-secondary leading-relaxed">{t("housing.p1")}</p>
        </section>

        <section id="cost-of-living">
          <h2 className="article-heading mb-5">{t("costOfLiving.title")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-ink-primary">
                  <th className="text-left p-3 rounded-tl-lg">{t("costOfLiving.headers.item")}</th>
                  <th className="text-left p-3">{t("costOfLiving.headers.value")}</th>
                  <th className="text-left p-3 rounded-tr-lg">{t("costOfLiving.headers.note")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {costRows.map((row) => (
                  <tr key={row.item} className="bg-card hover:bg-surface-subtle">
                    <td className="p-3 font-medium text-ink-primary">{row.item}</td>
                    <td className="p-3 text-ink-secondary">{row.value}</td>
                    <td className="p-3 text-ink-secondary">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="healthcare">
          <h2 className="article-heading mb-5">{t("healthcare.title")}</h2>
          <p className="text-ink-secondary leading-relaxed">{t("healthcare.p1")}</p>
        </section>

        <section id="children-integration">
          <h2 className="article-heading mb-5">{t("children.title")}</h2>
          <p className="text-ink-secondary leading-relaxed">{t("children.p1")}</p>
        </section>

        <section id="timeline">
          <h2 className="article-heading mb-5">{t("timeline.title")}</h2>
          <div className="space-y-4">
            {timeline.map((step) => (
              <div key={step.months} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-wide text-ink-muted mb-1">{step.months}</p>
                <h3 className="font-semibold text-ink-primary mb-3">{step.title}</h3>
                <ul className="space-y-1">
                  {step.tasks.map((task) => (
                    <li key={task} className="text-sm text-ink-secondary">• {task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-surface-subtle rounded-2xl p-8">
          <h2 className="article-heading mb-6">{t("faq.title")}</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16 bg-brand-50 border border-border rounded-2xl p-8 text-center">
        <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">{t("cta.title")}</h2>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">{t("cta.body")}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/school-finder">{t("cta.quiz")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/best-private-and-public-international-schools-portugal-2026">{t("cta.compare")}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
