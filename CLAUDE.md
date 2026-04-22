# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

No test suite is configured. Validate changes with `npm run build`.

## Architecture

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-intl 4.x, Framer Motion, Radix UI/shadcn.

### Middleware

Next.js 16 renamed `middleware.ts` → **`proxy.ts`**. This file runs next-intl middleware for locale detection and routing on all non-asset requests.

### i18n

- 6 locales: `en` (default), `pt`, `de`, `fr`, `nl`, `es`
- **`i18n/routing.ts`** is the single source of truth for all typed routes + locale-specific pathnames. Adding a new route here is required or TypeScript will error.
- UI strings live in `messages/{locale}.json`; next-intl resolves automatically.
- Server components: `getLocale()` from `next-intl/server`; client components: `useLocale()` from `next-intl`.
- **Navigation**: always import `Link`, `useRouter`, `redirect` from `@/i18n/navigation` (typed, locale-aware) — never from `next/link` or `next/navigation` directly.

### Data Layer

All school and neighborhood data originates from `lib/data/raw/*.json` (77 schools, 64 neighborhoods).

**Translation pattern (Opzione C):**
```typescript
translations: { en: T } & Partial<Record<LocaleKey, T>>
```
Helper functions (`getSchoolT`, `getNeighborhoodT`, `getTestimonialT`) always fall back to `translations.en`. JSON-LD schemas always use `translations.en` (canonical EN data).

Key data files:
- `lib/data/index.ts` — barrel re-export for `schoolsData` and `neighborhoodsData`
- `lib/data/schools.ts` — schoolsData + `getSchoolT()` + `buildAutoDescription()`
- `lib/data/neighborhoods.ts` — neighborhoodsData + `getNeighborhoodT()`
- `lib/data/testimonials.ts` — testimonials + `getTestimonialT()`
- `lib/data/blog.ts` — BlogArticle type, blogArticles, `getBlogArticle()`
- `lib/data/blog-translations-index.ts` — aggregates all blog translations into `blogTranslationsMap` keyed by slug; each locale's translations live in separate `blog-translations*.ts` files imported here
- `lib/types.ts` — all shared types: School, Neighborhood, Testimonial, LocaleKey
- `lib/content/schools-guide.ts` — `GUIDE_SCHOOL_FACTS` (acceptance rates, wait times — single source of truth)
- `lib/content/homepage.ts` — homepage editorial content (hero copy, pillar summaries)
- `lib/actions.ts` — Server Action `submitLead()`: Zod validation → allowlist check → Web3Forms API; honeypot field (trap) blocks bots at step 0
- `lib/schemas/lead-form.ts` — Zod schema for the lead capture form
- `lib/breadcrumbs.ts` — `buildBreadcrumbs()` helper for BreadcrumbList JSON-LD + `<Breadcrumbs>` component
- `components/seo/SchoolSchema.tsx` — EducationalOrganization JSON-LD (used by school detail pages)
- `components/JsonLd.tsx` — generic JSON-LD wrapper used on all pages
- `components/form.tsx` — lead capture form (`"use client"`, React 19 `useActionState` bound to `submitLead`)

### Server vs. Client Components

Directory listing pages use a split pattern:
- **Server Component** (`SchoolsList.tsx`, `NeighborhoodsList.tsx`): fetches data, renders curated editorial cards
- **Client Component** (`SchoolDirectory.tsx`, `NeighborhoodDirectory.tsx`, `"use client"`): receives minimal serialized props, handles filtering + pagination (12 per page)

### Route Structure

```
app/
├── layout.tsx                    # Root layout — sets metadataBase globally
├── [locale]/
│   ├── layout.tsx                # Locale layout — html/body, Header, Footer, NextIntlClientProvider
│   ├── page.tsx                  # Homepage
│   ├── schools/[slug]/page.tsx   # School detail
│   ├── neighborhoods/[slug]/page.tsx
│   ├── best-private-and-public-international-schools-portugal-2026/page.tsx
│   ├── top-neighborhoods/page.tsx
│   ├── relocation-guide/page.tsx
│   ├── school-finder/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── sitemap.ts
├── robots.ts
└── opengraph-image.tsx           # OG image at 1200×630
```

### SEO/GEO Conventions

Every page must have:
- `generateMetadata` with canonical, `alternates` (all 6 locales), OG + twitter images
- `export const revalidate` for ISR (43200 for homepage/pillars, 86400 for detail/blog)
- `x-default` hreflang pointing to `/en/...`
- JSON-LD via `<JsonLd>` component

Detail pages resolve locale-specific paths via `routing.pathnames` (never hardcode).

FAQPage JSON-LD must exactly match rendered FAQ HTML (Google rich snippet requirement).

Speakable schema: `cssSelector: ["#key-takeaways", "#faq"]` on all pillar guides — those section IDs must be present in the rendered HTML.

### Component Organization

```
components/
├── layout/          # Header, Footer
├── features/        # Domain components (Hero, Testimonials, quiz/, maps, etc.)
├── seo/             # JSON-LD schema components (SchoolSchema, etc.)
└── ui/              # shadcn/Radix primitives
```

`lib/utils.ts` exports `cn(...inputs)` (clsx + tailwind-merge) — use for all conditional className merging.

### Blog Translation Architecture

Blog articles have 5 entries, each translated into all 6 locales. To keep `blog.ts` readable, translations are split across per-locale files (`blog-translations.ts`, `blog-translations-fr.ts`, etc.) and aggregated in `blog-translations-index.ts` into `blogTranslationsMap[slug][locale]`. When adding a new article, add its translation exports to the relevant per-locale files and register them in the index.

### TypeScript Gotchas

- next-intl hash links: `href={{ pathname: "/", hash: "quiz" }}` not `href="/#quiz"`
- `neighborhoodSlug` is optional on `School` type — render neighborhood cards conditionally
- Slug sanitization: `decodeURIComponent` + accent transliteration (é→e, ç→c, etc.)
- Route pathname vs. URL mismatch: `/schools/[slug]` (internal key in `routing.ts`) maps to `/school/[slug]` (actual URL, singular); same for `/neighborhoods/[slug]` → `/neighborhood/[slug]`

### Docs Reference

- `docs/BUG-TRACKER.md` — historical bug log (all 11 bugs are `done`; useful for context on current code patterns)
- `docs/IMPROVEMENTS.md` — post-launch improvement backlog (form lead fields, narrative text for 73 imported schools, client-side validation)

### Environment Variables

- `NEXT_PUBLIC_BASE_URL` — canonical domain (`https://raisingkidsinportugal.com` on Vercel, `http://localhost:3000` locally via `.env.local`)
- `WEB3FORMS_ACCESS_KEY` — lead form submission (Web3Forms); if unset, lead data is logged to Vercel logs as fallback
