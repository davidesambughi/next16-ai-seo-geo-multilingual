# Raising Kids in Portugal Relocation Funnel — Team Onboarding
> Last updated: 2026-03-03

---

## What Is This Project?

**Raising Kids in Portugal** is a multilingual content and lead-generation website for international families relocating to Portugal. It is an SEO-first, editorial-quality guide that helps families choose the right school and neighborhood — and then convert them into leads for a relocation agency.

**Three content pillars:**
1. **International Schools** — comparison of 77 schools across Portugal, with filters, detail pages, and a matching quiz
2. **Family Neighborhoods** — 64 neighborhoods with real estate data, lifestyle scores, and detailed profiles
3. **Relocation Guide** — step-by-step guide (visas, timeline, logistics)

**Lead capture:** a 7-field contact form integrated with Web3Forms (email backend). Every page has a CTA pointing to the form.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js (App Router) | 16.1.6 | Framework, ISR, server actions |
| React | 19.2.3 | UI |
| TypeScript | 5 (strict) | Type safety — zero TS errors enforced |
| Tailwind CSS | v4 | Styling |
| next-intl | 4.8.3 | i18n — 6 locales: `en`, `pt`, `de`, `fr`, `nl`, `es` |
| Zod | 4.3.6 | Form validation |
| shadcn/ui + Radix UI | — | UI components |
| Framer Motion | 12 | Animations |
| Web3Forms | — | Form email backend (no server required) |
| Vercel | — | Hosting + ISR |

---

## Project Structure (Key Directories)

```
app/
  layout.tsx                    ← Root layout, metadataBase for SEO
  [locale]/                     ← All pages are under a locale segment
    page.tsx                    ← Homepage
    about/page.tsx
    best-private-and-public.../page.tsx   ← Schools pillar page
    top-neighborhoods/page.tsx            ← Neighborhoods pillar page
    relocation-guide/page.tsx             ← Relocation guide
    school-finder/page.tsx                ← School quiz landing page
    schools/[slug]/page.tsx               ← Individual school detail
    neighborhoods/[slug]/page.tsx         ← Individual neighborhood detail
    blog/page.tsx                         ← Blog listing
    blog/[slug]/page.tsx                  ← Blog article

components/
  SchoolsList.tsx               ← Server component: Top Picks + passes data to SchoolDirectory
  SchoolDirectory.tsx           ← Client component: filters, pagination, mini-cards (77 schools)
  NeighborhoodsList.tsx         ← Server component: neighborhoods listing (NO pagination yet)
  features/                     ← Hero, Testimonials, Quiz, Maps, etc.
  layout/                       ← Header, Footer
  ui/                           ← shadcn/ui base components

lib/
  types.ts                      ← ALL shared TypeScript types (School, Neighborhood, etc.)
  data/schools.ts               ← 4 curated + 73 imported schools; buildAutoDescription()
  data/neighborhoods.ts         ← 5 curated + 59 imported neighborhoods
  data/raw/schools-database.json          ← Raw school data (77 valid entries)
  data/raw/neighborhoods-database.json    ← Raw neighborhood data (64 entries)
  schemas/lead-form.ts          ← Zod schema for the contact form
  actions.ts                    ← Server action: submitLead() → Web3Forms API

i18n/
  routing.ts                    ← IMPORTANT: all typed routes live here; add new routes here
  navigation.ts                 ← Typed Link + redirect() wrappers

docs/
  ONBOARDING.md                 ← This file
  TASK_ASSIGNMENT.md            ← Team task board (sprint items, bug tracker, backlog)
  SUPERVISOR_PRESENTATION.md    ← Project overview for supervisors (English)
```

---

## The i18n Pattern (Read This Carefully)

All translatable data (schools, neighborhoods, testimonials, blog) uses **Option C**:

```typescript
// Type definition
translations: { en: T } & Partial<Record<LocaleKey, T>>

// Usage in components
const t = getSchoolT(school, locale)
// getSchoolT returns: school.translations[locale] ?? school.translations.en
```

- English (`en`) is always the fallback
- If a locale translation is missing → falls back silently to EN
- JSON-LD schemas **always** use `translations.en` (canonical structured data)
- Server components: `getLocale()` from `next-intl/server`
- Client components: `useLocale()` from `next-intl`

---

## Data: Schools

**77 valid schools** (92 raw → 15 filtered: Low confidence + Wikipedia entries)

| Category | Count | Content quality |
|---|---|---|
| Curated (editorial) | 4 | Full: description, verdict, parentWhisper, highlights — 6 locales |
| Imported (from JSON scraper) | 73 | Structured data + auto-generated description |

**How to identify curated schools:** `Boolean(school.translations.en.verdict) === true`

**Key fields on `School` type:**
- `slug`, `name`, `location` (city, country, coordinates)
- `curriculum`, `curriculumTag`, `fees` (text), `feesMin`, `feesMax`
- `ageRange`, `schoolType`, `website`, `englishAsPrimary`
- `dataConfidence` — `"high"` | `"medium"` | `"low"` (all 77 are high/medium)
- `translations` — i18n content (description, verdict, etc.)

---

## Data: Neighborhoods

**64 total neighborhoods** (5 curated + 59 imported)

All 64 have: name, coordinates, vibe description, pros/cons, real estate data, family scores, demographics, cost of living, expat community, transport info.

---

## SEO Architecture (Why It Matters)

This project is heavily SEO-optimized. Every page has:
- **Canonical URL** + **hreflang** for all 6 locales + `x-default`
- **JSON-LD structured data** (Organization, EducationalOrganization, Place, FAQPage, Article, etc.)
- **ISR revalidation** (12h for pillar pages, 24h for detail pages)
- **Key Takeaways boxes** with `id="key-takeaways"` on all guides (for Google AI Overviews)
- **Speakable schema** on all guides (cssSelector: `["#key-takeaways", "#faq"]`)

**Do not remove or break any of these.** If you add a FAQ section to a page, it must match the FAQPage JSON-LD schema exactly.

---

## Environment Variables

| Variable | Local (`.env.local`) | Production (Vercel) |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | `https://raisingkidsinportugal.com` ← **not yet set on Vercel** |
| `WEB3FORMS_ACCESS_KEY` | *(empty, waiting)* | *(waiting for agency email)* |

`.env.local` is gitignored. Create it locally:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
WEB3FORMS_ACCESS_KEY=
```

---

## Current Project Status (Summary)

### What's fully done ✅
- Multilingual UI — all pages, all 6 locales
- SEO/GEO architecture (JSON-LD, hreflang, canonical, ISR)
- Homepage, 3 pillar guides, about page
- School detail pages (4 curated + 73 with auto-descriptions)
- Neighborhood detail pages (5 curated + 59 imported, all fields mapped)
- School listing with filters + pagination (SchoolDirectory client component)
- Blog (3 articles + listing page + schemas)
- Contact form (UI + Zod validation + Web3Forms backend)
- School quiz (in homepage at `#quiz`)

### What's waiting on external input ⏳
- **New enriched school JSON** from the scraper project (expected: descriptions for 61 schools)
- **WEB3FORMS_ACCESS_KEY** from agency email
- **Vercel env vars** (`NEXT_PUBLIC_BASE_URL`) — needs infrastructure access

### Known bugs to fix ❌
See `docs/TASK_ASSIGNMENT.md` for the full list with assignments.

---

## How to Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The app uses Next.js App Router with middleware (`proxy.ts`) for locale detection.

---

## Golden Rules

1. **Never break TypeScript** — run `npm run build` before pushing; zero TS errors is required
2. **Never add a route without updating `i18n/routing.ts`** — you will get TS errors everywhere
3. **JSON-LD schemas must match rendered HTML** — especially FAQPage (Google will reject mismatches)
4. **i18n data pattern** — always use `getSchoolT` / `getNeighborhoodT` helpers, never direct property access
5. **Server vs Client components** — SchoolDirectory and quiz components are `"use client"`; all others are server components by default. Do not add `"use client"` without a reason.
6. **Minimal data to client** — when passing school/neighborhood data to client components, use the minimal serialized type (e.g., `SchoolDirectoryItem`), not the full `School` object

---

## Questions?

Read `docs/TASK_ASSIGNMENT.md` for sprint tasks, bug assignments, and the backlog.
Read `docs/SUPERVISOR_PRESENTATION.md` for a non-technical project overview.
Ask your teammate for context on any architectural decision.
