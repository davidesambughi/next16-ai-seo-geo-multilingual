/**
 * Breadcrumbs Mapping Configuration
 *
 * Maps URL segments (as they appear in the actual browser URL, per locale)
 * to their LOGICAL parent route key (the key used in i18n/routing.ts `pathnames`).
 *
 * next-intl's Link/redirect functions require the LOGICAL KEY, not the translated URL.
 * This map supports all 6 locales: en, pt, de, fr, nl, es.
 */

// ─── Schools ──────────────────────────────────────────────────────────────────
// Logical key: '/best-private-and-public-international-schools-portugal-2026'
// en-URL: /best-private-and-public-international-schools-portugal-2026
// (other locales: see routing.ts)

const SCHOOLS_LOGICAL_KEY =
  '/best-private-and-public-international-schools-portugal-2026' as const;

// ─── Neighborhoods ────────────────────────────────────────────────────────────
// Logical key: '/top-neighborhoods'
// en-URL: /family-friendly-neighborhoods-portugal

const NEIGHBORHOODS_LOGICAL_KEY = '/top-neighborhoods' as const;

// ─── Breadcrumb Mapping ───────────────────────────────────────────────────────
// Keys: the URL path SEGMENT as it appears in the browser for a given locale.
// Values: the LOGICAL route key to pass to next-intl Link / redirect.

// ─── Listing route keys ───────────────────────────────────────────────────────
// These are the LOGICAL keys for the school/neighborhood listing pages.
// Detail pages (e.g. /schools/[slug]) should show the listing as their parent crumb,
// not the pillar/guide page.
const SCHOOLS_LISTING_KEY = '/schools' as const;
const NEIGHBORHOODS_LISTING_KEY = '/neighborhoods' as const;

export const BREADCRUMB_MAPPING: Record<string, string> = {
  // English — listing parent for detail pages
  'school': SCHOOLS_LISTING_KEY,
  'schools': SCHOOLS_LISTING_KEY,
  'neighborhood': NEIGHBORHOODS_LISTING_KEY,
  'neighborhoods': NEIGHBORHOODS_LISTING_KEY,
  // The en SEO slug for neighborhoods pillar (direct navigation to pillar)
  'family-friendly-neighborhoods-portugal': NEIGHBORHOODS_LOGICAL_KEY,
  // The en SEO slug for schools pillar (direct navigation to pillar)
  'best-private-and-public-international-schools-portugal-2026': SCHOOLS_LOGICAL_KEY,

  // Portuguese
  'escola': SCHOOLS_LISTING_KEY,
  'escolas': SCHOOLS_LISTING_KEY,
  'bairro': NEIGHBORHOODS_LISTING_KEY,
  'bairros': NEIGHBORHOODS_LISTING_KEY,

  // German
  'schule': SCHOOLS_LISTING_KEY,
  'schulen': SCHOOLS_LISTING_KEY,
  'nachbarschaft': NEIGHBORHOODS_LISTING_KEY,
  'nachbarschaften': NEIGHBORHOODS_LISTING_KEY,

  // French
  'ecole': SCHOOLS_LISTING_KEY,
  'ecoles': SCHOOLS_LISTING_KEY,
  'quartier': NEIGHBORHOODS_LISTING_KEY,
  'quartiers': NEIGHBORHOODS_LISTING_KEY,

  // Dutch
  'school-zoeker': SCHOOLS_LOGICAL_KEY, // school-finder slug
  'scholen': SCHOOLS_LISTING_KEY,
  'buurt': NEIGHBORHOODS_LISTING_KEY,
  'buurten': NEIGHBORHOODS_LISTING_KEY,

  // Spanish
  'escuela': SCHOOLS_LISTING_KEY,
  'escuelas': SCHOOLS_LISTING_KEY,
  'barrio': NEIGHBORHOODS_LISTING_KEY,
  'barrios': NEIGHBORHOODS_LISTING_KEY,
};

/**
 * Returns the LOGICAL route key for use with next-intl Link/redirect,
 * given a URL segment from the actual browser URL.
 * Returns null if no mapping exists.
 */
export function getBreadcrumbPath(segment: string): string | null {
  const normalized = segment.toLowerCase();
  return BREADCRUMB_MAPPING[normalized] ?? null;
}
