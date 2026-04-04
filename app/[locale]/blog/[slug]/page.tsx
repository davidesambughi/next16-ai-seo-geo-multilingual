import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { blogArticles, getBlogArticle, getBlogArticleContent } from "@/lib/data";
import type { Metadata } from "next";

// ISR: regenerate every 24 h — article content is stable but may be updated
export const revalidate = 86400;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getBlogArticle(slug);

  if (!article) return { title: "Article not found | Raising Kids in Portugal" };

  const content = getBlogArticleContent(article, locale);
  const canonicalUrl = `${BASE}/en/blog/${article.slug}`;

  return {
    title: `${content.title} | Raising Kids in Portugal`,
    description: content.intro.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${BASE}/en/blog/${article.slug}`,
        'pt': `${BASE}/pt/blog/${article.slug}`,
        'de': `${BASE}/de/blog/${article.slug}`,
        'fr': `${BASE}/fr/blog/${article.slug}`,
        'nl': `${BASE}/nl/blog/${article.slug}`,
        'es': `${BASE}/es/blog/${article.slug}`,
        'x-default': `${BASE}/en/blog/${article.slug}`,
      },
    },
    openGraph: {
      title: `${content.title} | Raising Kids in Portugal`,
      description: content.intro.slice(0, 160),
      url: canonicalUrl,
      siteName: "Raising Kids in Portugal",
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: article.author ? [article.author] : ["Raising Kids in Portugal Editorial Team"],
      images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} | Raising Kids in Portugal`,
      description: content.intro.slice(0, 160),
    },
  };
}

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const article = getBlogArticle(slug);
  const t = await getTranslations({ locale, namespace: "BlogDetail" });

  if (!article) notFound();

  const content = getBlogArticleContent(article, locale);
  const canonicalUrl = `${BASE}/en/blog/${article.slug}`;

  // FAQPage JSON-LD — only emitted when the article has FAQ items
  const faqSchema = content.faq && content.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faq.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  } : null;

  // Article JSON-LD — full schema for E-E-A-T and AI engine freshness signals
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.intro,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "url": canonicalUrl,
    "author": {
      "@type": "Person",
      "name": article.author || "Raising Kids in Portugal Editorial Team",
      "url": `${BASE}/en/about`,
      "worksFor": { "@type": "Organization", "name": "Raising Kids in Portugal", "url": BASE },
      ...(article.expertise && { "knowsAbout": article.expertise }),
    },
    "publisher": {
      "@type": "Organization",
      "name": "Raising Kids in Portugal",
      "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png` },
      "url": BASE,
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "articleSection": "Relocation Guides",
    "inLanguage": locale,
    "about": [
      { "@type": "Thing", "name": "International schools Portugal" },
      { "@type": "Thing", "name": "Expat families Portugal" },
      { "@type": "Place", "name": "Portugal" },
    ],
    ...(article.citations && { "citation": article.citations }),
    // SpeakableSpecification — allows voice AI (Google Assistant, Alexa) to read
    // the most important sections aloud and signals GEO priority content to crawlers.
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "#key-takeaways", "#faq"],
    },
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/${locale}/blog` },
      { "@type": "ListItem", "position": 3, "name": content.title, "item": canonicalUrl },
    ],
  };

  return (
    <main className="container mx-auto py-12 px-6 max-w-3xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Breadcrumbs />

      <article>
      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
        <time dateTime={article.datePublished}>{article.datePublished}</time>
        <span>·</span>
        <span>{article.readTime}</span>
        <span>·</span>
        <span>{t("byline")}</span>
      </div>

      {/* Title */}
      <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-3 leading-tight">
        {content.title}
      </h1>
      <p className="text-ink-muted text-base mb-8 italic">{content.subtitle}</p>

      {/* Intro */}
      <p className="text-lg text-ink-secondary leading-relaxed mb-10">{content.intro}</p>

      {/* Article sections */}
      <div className="space-y-10">
        {content.sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">
              {i + 1}. {section.heading}
            </h2>
            <p className="text-ink-secondary leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      {/* Key Takeaways — id used by Speakable schema and GEO crawlers */}
      {content.keyTakeaways && content.keyTakeaways.length > 0 && (
        <div id="key-takeaways" className="mt-12 bg-brand-50 border border-border rounded-2xl p-6">
          <h2 className="font-serif font-semibold text-xl text-ink-primary mb-4">Key Takeaways</h2>
          <ul className="space-y-3">
            {content.keyTakeaways.map((point) => (
              <li key={point} className="flex gap-3 text-ink-secondary text-sm leading-relaxed">
                <span className="text-brand mt-0.5 shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ — id used by Speakable schema; content matches FAQPage JSON-LD exactly */}
      {content.faq && content.faq.length > 0 && (
        <div id="faq" className="mt-10 space-y-6">
          <h2 className="font-serif font-semibold text-2xl text-ink-primary">Frequently Asked Questions</h2>
          {content.faq.map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
              <p className="text-ink-secondary leading-relaxed text-sm">{a}</p>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 bg-brand-50 border border-border rounded-2xl p-6 text-center">
        <h2 className="font-serif font-semibold text-xl text-ink-primary mb-2">{t("ctaHeading")}</h2>
        <p className="text-ink-muted text-sm mb-5">
          {t("ctaDescription")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" asChild>
            <Link href={article.cta.href}>{article.cta.text}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/school-finder">{t("ctaSchoolFinder")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/relocation-guide">{t("ctaRelocationGuide")}</Link>
          </Button>
        </div>
      </div>

      {/* Back to blog */}
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="text-sm text-ink-muted hover:text-brand transition-colors"
        >
          {t("backToAll")}
        </Link>
      </div>
      </article>

    </main>
  );
}
