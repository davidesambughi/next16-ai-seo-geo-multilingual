import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { blogArticles } from "@/lib/data";

/**
 * Blog listing page — shows teasers with links to individual /blog/[slug] pages.
 * Full article content lives on individual pages (prevents duplicate content).
 *
 * GEO: Blog schema with valid URLs, Article authorship signals, freshness dates.
 * Phase 5: Replace static data with CMS (Sanity / Contentful) fetch.
 */
interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

// ISR: regenerate every 24 h when new articles are published
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE}/en/blog`,
      languages: {
        'en': `${BASE}/en/blog`,
        'pt': `${BASE}/pt/blog`,
        'de': `${BASE}/de/blog`,
        'fr': `${BASE}/fr/blog`,
        'nl': `${BASE}/nl/blog`,
        'es': `${BASE}/es/blog`,
        'x-default': `${BASE}/en/blog`,
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${BASE}/en/blog`,
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

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Raising Kids in Portugal Relocation Blog",
    "description":
      "Expert guides on choosing international schools, comparing Portugal neighborhoods, and planning a family relocation.",
    "url": `${BASE}/en/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Raising Kids in Portugal",
      "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png` },
    },
    "blogPost": blogArticles.map((a) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "description": a.intro.slice(0, 160),
      "datePublished": a.datePublished,
      "dateModified": a.dateModified,
      "url": `${BASE}/en/blog/${a.slug}`,
      "author": {
        "@type": "Person",
        "name": "Raising Kids in Portugal Editorial Team",
        "url": `${BASE}/en/about`,
      },
      "publisher": {
        "@type": "Organization",
        "name": "Raising Kids in Portugal",
        "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png` },
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE}/en/blog/${a.slug}` },
    })),
  };

  return (
    <main className="container mx-auto py-12 px-6 max-w-4xl">
      <JsonLd data={blogListSchema} />
      <Breadcrumbs />

      <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-3">
        {t("h1")}
      </h1>
      <p className="text-lg text-ink-muted mb-12">
        {t("subtitle")}
      </p>

      <div className="space-y-10">
        {blogArticles.map((article) => (
          <article key={article.slug} className="border-b border-border pb-10 last:border-0">
            {/* Meta row */}
            <div className="flex items-center gap-3 text-xs text-ink-muted mb-3">
              <time dateTime={article.datePublished}>{article.datePublished}</time>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>

            {/* Title — links to individual page */}
            <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-1 hover:text-brand transition-colors">
              <Link href={{ pathname: '/blog/[slug]', params: { slug: article.slug } }}>
                {article.title}
              </Link>
            </h2>
            <p className="text-ink-muted text-sm mb-4 italic">{article.subtitle}</p>

            {/* Teaser (first 220 chars of intro) */}
            <p className="text-ink-secondary leading-relaxed mb-5">
              {article.intro.slice(0, 220)}…
            </p>

            {/* Read more CTA */}
            <Link
              href={{ pathname: '/blog/[slug]', params: { slug: article.slug } }}
              className="inline-flex items-center text-sm font-medium text-brand hover:text-[var(--brand-hover)] transition-colors"
            >
              {t("readMore")}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
