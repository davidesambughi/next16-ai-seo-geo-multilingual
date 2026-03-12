import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { blogArticles, getBlogArticle } from "@/lib/data";
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

  const canonicalUrl = `${BASE}/en/blog/${article.slug}`;

  return {
    title: `${article.title} | Raising Kids in Portugal`,
    description: article.intro.slice(0, 160),
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
      title: `${article.title} | Raising Kids in Portugal`,
      description: article.intro.slice(0, 160),
      url: canonicalUrl,
      siteName: "Raising Kids in Portugal",
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ["Raising Kids in Portugal Editorial Team"],
      images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Raising Kids in Portugal`,
      description: article.intro.slice(0, 160),
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

  const canonicalUrl = `${BASE}/en/blog/${article.slug}`;

  // Article JSON-LD — full schema for E-E-A-T and AI engine freshness signals
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.intro,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "url": canonicalUrl,
    "author": {
      "@type": "Person",
      "name": "Raising Kids in Portugal Editorial Team",
      "url": `${BASE}/en/about`,
      "worksFor": { "@type": "Organization", "name": "Raising Kids in Portugal", "url": BASE },
    },
    "publisher": {
      "@type": "Organization",
      "name": "Raising Kids in Portugal",
      "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png` },
      "url": BASE,
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "articleSection": "Relocation Guides",
    "inLanguage": "en",
    "about": [
      { "@type": "Thing", "name": "International schools Portugal" },
      { "@type": "Thing", "name": "Expat families Portugal" },
      { "@type": "Place", "name": "Portugal" },
    ],
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/en` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/en/blog` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": canonicalUrl },
    ],
  };

  return (
    <main className="container mx-auto py-12 px-6 max-w-3xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs />

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
        {article.title}
      </h1>
      <p className="text-ink-muted text-base mb-8 italic">{article.subtitle}</p>

      {/* Intro */}
      <p className="text-lg text-ink-secondary leading-relaxed mb-10">{article.intro}</p>

      {/* Article sections */}
      <div className="space-y-10">
        {article.sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">
              {i + 1}. {section.heading}
            </h2>
            <p className="text-ink-secondary leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

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

    </main>
  );
}
