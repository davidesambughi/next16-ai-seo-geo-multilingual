import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NeighborhoodsList } from "@/components/NeighborhoodsList";
import { JsonLd } from "@/components/JsonLd";
import { neighborhoodsData } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { StickyTOC } from "@/components/StickyTOC";

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface TocSection {
  id: string;
  label: string;
}

interface SchoolFirstRow {
  n: string;
  s: string;
  c: string;
  v: string;
}

interface CoastalCard {
  name: string;
  pros: string[];
  cons: string[];
}

interface LisbonCard {
  name: string;
  tag: string;
  content: string;
}

interface ChecklistItem {
  n: string;
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface RelatedItem {
  title: string;
  desc: string;
  href: string;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NeighborhoodsGuidePage" });
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${base}/en/family-friendly-neighborhoods-portugal`,
      languages: {
        en: `${base}/en/family-friendly-neighborhoods-portugal`,
        pt: `${base}/pt/bairros-familiares-portugal`,
        de: `${base}/de/familienfreundliche-nachbarschaften-portugal`,
        fr: `${base}/fr/quartiers-familiaux-portugal`,
        nl: `${base}/nl/gezinsvriendelijke-buurten-portugal`,
        es: `${base}/es/barrios-familiares-portugal`,
        "x-default": `${base}/en/family-friendly-neighborhoods-portugal`,
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${base}/en/family-friendly-neighborhoods-portugal`,
      siteName: "Raising Kids in Portugal",
      type: "article",
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: "Raising Kids in Portugal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export const revalidate = 43200;

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NeighborhoodsGuidePage" });

  const sections = t.raw("sections") as TocSection[];
  const keyTakeaways = t.raw("keyTakeaways") as string[];
  const schoolRows = t.raw("schoolFirst.rows") as SchoolFirstRow[];
  const coastalCards = t.raw("coastal.cards") as CoastalCard[];
  const lisbonCards = t.raw("lisbon.cards") as LisbonCard[];
  const checklist = t.raw("howToChoose.items") as ChecklistItem[];
  const faqs = t.raw("faq.items") as FaqItem[];
  const related = t.raw("related.items") as RelatedItem[];

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#key-takeaways", "#faq"] },
    url: `${base}/en/family-friendly-neighborhoods-portugal`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="container mx-auto py-12 px-6 max-w-4xl">
      <JsonLd data={speakableSchema} />
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
          <span>{t("header.reviewed", { count: neighborhoodsData.length })}</span>
          <span>·</span>
          <span>{t("header.editorial")}</span>
        </div>
        <h1 className="font-serif font-semibold text-h1 text-ink-primary mb-5 leading-tight">{t("header.title")}</h1>
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
        <Image src="/neighborhoods-img.jpg" alt={t("imageAlt")} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
      </div>

      <nav className="bg-surface-subtle border border-border rounded-xl p-6 mb-14">
        <h2 className="section-overline mb-4">{t("tocTitle")}</h2>
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
        <section id="overview">
          <h2 className="article-heading mb-5">{t("overview.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("overview.p1")}</p>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("overview.p2")}</p>
          <p className="text-ink-secondary leading-relaxed">
            {t("overview.p3")} <Link href="/best-private-and-public-international-schools-portugal-2026" className="text-brand hover:underline">{t("overview.schoolsGuideLink")}</Link>.
          </p>
        </section>

        <section id="school-first">
          <h2 className="article-heading mb-5">{t("schoolFirst.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-6">{t("schoolFirst.p1")}</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-ink-primary">
                  <th className="text-left p-3 rounded-tl-lg">{t("schoolFirst.headers.neighborhood")}</th>
                  <th className="text-left p-3">{t("schoolFirst.headers.closestSchool")}</th>
                  <th className="text-left p-3">{t("schoolFirst.headers.commute")}</th>
                  <th className="text-left p-3 rounded-tr-lg">{t("schoolFirst.headers.vibe")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schoolRows.map((row) => (
                  <tr key={row.n} className="bg-card hover:bg-surface-subtle">
                    <td className="p-3 font-medium text-ink-primary">{row.n}</td>
                    <td className="p-3 text-ink-secondary">{row.s}</td>
                    <td className="p-3 text-ink-secondary">{row.c}</td>
                    <td className="p-3 text-ink-muted italic text-xs">{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-warm-light border border-border rounded-xl p-5">
            <p className="text-sm text-ink-secondary leading-relaxed"><strong>{t("schoolFirst.noteLabel")}</strong> {t("schoolFirst.note")}</p>
          </div>
        </section>

        <section id="coastal">
          <h2 className="article-heading mb-5">{t("coastal.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("coastal.p1")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {coastalCards.map((item) => (
              <div key={item.name} className="bg-surface-subtle border border-border rounded-xl p-5">
                <h3 className="font-bold text-ink-primary mb-3 text-lg">{item.name}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-trust uppercase tracking-wide mb-1">{t("coastal.strengths")}</p>
                    <ul className="space-y-1">
                      {item.pros.map((p) => (
                        <li key={p} className="text-xs text-ink-secondary flex items-start gap-2"><span className="text-trust mt-0.5">?</span>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">{t("coastal.tradeoffs")}</p>
                    <ul className="space-y-1">
                      {item.cons.map((c) => (
                        <li key={c} className="text-xs text-ink-secondary flex items-start gap-2"><span className="text-ink-muted mt-0.5">-</span>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed"><strong>{t("coastal.verdictLabel")}</strong> {t("coastal.verdict")}</p>
        </section>

        <section id="sintra">
          <h2 className="article-heading mb-5">{t("sintra.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("sintra.p1")}</p>
          <p className="text-ink-secondary leading-relaxed mb-4">{t("sintra.p2")}</p>
          <div className="bg-trust-light border border-border rounded-xl p-5 mb-4">
            <p className="text-sm text-ink-secondary leading-relaxed"><strong>{t("sintra.bestForLabel")}</strong> {t("sintra.bestFor")}</p>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">{t("sintra.p3")}</p>
        </section>

        <section id="lisbon">
          <h2 className="article-heading mb-5">{t("lisbon.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-5">{t("lisbon.p1")}</p>
          <div className="space-y-5">
            {lisbonCards.map((item) => (
              <div key={item.name} className="border border-border rounded-xl p-6">
                <h3 className="font-bold text-ink-primary mb-1 text-lg">{item.name}</h3>
                <span className="inline-block text-xs text-brand bg-brand-50 px-2 py-0.5 rounded mb-3">{item.tag}</span>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-to-choose">
          <h2 className="article-heading mb-5">{t("howToChoose.title")}</h2>
          <p className="text-ink-secondary leading-relaxed mb-6">{t("howToChoose.p1")}</p>
          <div className="space-y-4">
            {checklist.map((item) => (
              <div key={item.n} className="flex gap-5 items-start">
                <div className="shrink-0 w-10 h-10 bg-brand text-primary-foreground rounded-xl flex items-center justify-center text-sm font-bold">{item.n}</div>
                <div className="flex-1 border border-border rounded-xl p-4 bg-card">
                  <h3 className="font-bold text-ink-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="neighborhoods">
          <h2 className="article-heading mb-8">{t("neighborhoodProfilesTitle")}</h2>
          <NeighborhoodsList />
        </section>

        <section id="faq" className="bg-surface-subtle rounded-2xl p-8">
          <h2 className="article-heading mb-6">{t("faq.title")}</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">{t("related.title")}</h2>
        <p className="text-ink-muted text-sm mb-6">{t("related.subtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {related.map(({ title, desc, href }) => (
            <Link href={href as "/best-private-and-public-international-schools-portugal-2026" | "/school-finder"} key={title}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-ink-secondary">{desc}</p></CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
