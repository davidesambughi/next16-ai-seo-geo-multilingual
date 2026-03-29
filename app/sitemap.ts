import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { schoolsData, neighborhoodsData, blogArticles } from '@/lib/data';

const host = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';

/**
 * Resolves the translated URL for a logical pathname key and a given locale.
 * Returns the locale-specific path from routing.ts pathnames, or the key itself
 * as a fallback (for routes where key === URL, e.g. '/about').
 */
function resolveLocalePath(
  logicalKey: keyof typeof routing.pathnames,
  locale: string
): string {
  const pathData = routing.pathnames[logicalKey];
  if (typeof pathData === 'string') return pathData;
  return (pathData as Record<string, string>)[locale] ?? logicalKey;
}

/** Build a full sitemap entry with all hreflang alternates. */
function buildEntry(
  logicalKey: keyof typeof routing.pathnames,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  lastModified: Date = new Date('2026-02-01')
): MetadataRoute.Sitemap[number] {
  const enPath = resolveLocalePath(logicalKey, 'en');
  const canonical = `${host}/en${enPath === '/' ? '' : enPath}`;

  const languages = Object.fromEntries(
    routing.locales.map((locale) => {
      const path = resolveLocalePath(logicalKey, locale);
      return [locale, `${host}/${locale}${path === '/' ? '' : path}`];
    })
  );

  return {
    url: canonical,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Static pages ─────────────────────────────────────────────────────────
  // NOTE: only include pages that actually exist as app/[locale]/*/page.tsx.
  // /contact, /privacy, /terms are NOT yet implemented — add them when pages exist.
  const staticEntries = [
    buildEntry('/', 1.0, 'weekly', new Date('2026-02-01')),
    buildEntry('/best-private-and-public-international-schools-portugal-2026', 0.9, 'weekly', new Date('2026-02-10')),
    buildEntry('/top-neighborhoods', 0.9, 'weekly', new Date('2026-02-01')),
    buildEntry('/relocation-guide', 0.8, 'monthly', new Date('2026-02-01')),
    buildEntry('/school-finder', 0.8, 'monthly', new Date('2026-01-15')),
    buildEntry('/about', 0.6, 'yearly', new Date('2026-01-01')),
    buildEntry('/schools', 0.7, 'weekly', new Date('2026-02-10')),
    buildEntry('/neighborhoods', 0.7, 'weekly', new Date('2026-02-01')),
  ];

  // ── 2. Dynamic school pages ──────────────────────────────────────────────────
  // Only curated schools (with editorial content) are indexed. Imported schools
  // have noindex on their pages and are excluded here to avoid wasting crawl budget.
  const curatedSchools = schoolsData.filter((s) => Boolean(s.translations.en.verdict));
  const schoolEntries: MetadataRoute.Sitemap = curatedSchools.flatMap((school) =>
    routing.locales.map((locale) => {
      // Logical key for dynamic route: '/schools/[slug]'
      const logicalKey = '/schools/[slug]';
      const pathData = routing.pathnames[logicalKey];
      // e.g. en → '/school/[slug]', pt → '/escola/[slug]'
      const templatePath =
        typeof pathData === 'string'
          ? pathData
          : (pathData as Record<string, string>)[locale] ?? `/school/[slug]`;

      const resolvedPath = templatePath.replace('[slug]', school.slug);
      const url = `${host}/${locale}${resolvedPath}`;

      // Build alternates across locales for this specific slug
      const languages = Object.fromEntries(
        routing.locales.map((l) => {
          const tmpl =
            typeof pathData === 'string'
              ? pathData
              : (pathData as Record<string, string>)[l] ?? `/school/[slug]`;
          return [l, `${host}/${l}${tmpl.replace('[slug]', school.slug)}`];
        })
      );

      return {
        url,
        lastModified: new Date('2026-02-10'),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: { languages },
      };
    })
  );

  // ── 3. Dynamic neighborhood pages ───────────────────────────────────────────
  const neighborhoodEntries: MetadataRoute.Sitemap = neighborhoodsData.flatMap(
    (neighborhood) =>
      routing.locales.map((locale) => {
        const logicalKey = '/neighborhoods/[slug]';
        const pathData = routing.pathnames[logicalKey];
        const templatePath =
          typeof pathData === 'string'
            ? pathData
            : (pathData as Record<string, string>)[locale] ?? `/neighborhood/[slug]`;

        const resolvedPath = templatePath.replace('[slug]', neighborhood.slug);
        const url = `${host}/${locale}${resolvedPath}`;

        const languages = Object.fromEntries(
          routing.locales.map((l) => {
            const tmpl =
              typeof pathData === 'string'
                ? pathData
                : (pathData as Record<string, string>)[l] ?? `/neighborhood/[slug]`;
            return [l, `${host}/${l}${tmpl.replace('[slug]', neighborhood.slug)}`];
          })
        );

        return {
          url,
          lastModified: new Date('2026-02-01'),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          alternates: { languages },
        };
      })
  );

  // ── 4. Blog post pages ───────────────────────────────────────────────────────
  // Blog is English-only for now — canonical URL is /en/blog/[slug]
  const blogEntries: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${host}/en/blog/${article.slug}`,
    lastModified: new Date(article.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${host}/en/blog/${article.slug}`,
      },
    },
  }));

  // Blog listing page
  const blogListEntry: MetadataRoute.Sitemap = [
    {
      url: `${host}/en/blog`,
      lastModified: new Date(blogArticles[blogArticles.length - 1].dateModified),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${host}/en/blog`,
        },
      },
    },
  ];

  return [...staticEntries, ...schoolEntries, ...neighborhoodEntries, ...blogListEntry, ...blogEntries];
}
