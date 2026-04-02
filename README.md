# Raising Kids in Portugal — Relocation Funnel

A content-driven lead generation site for expat families relocating to Portugal. Helps families research international schools and family-friendly neighborhoods, then captures consultation leads.

**Live site:** [raisingkidsinportugal.com](https://raisingkidsinportugal.com)

---

## The Problem

Families relocating to Portugal face a fragmented research process — school directories have no cost/curriculum comparison, neighborhood guides are generic, and there's no single source that answers "which school fits my family." The result is months of forum-diving with no qualified guidance.

This site consolidates 77 schools and 64 neighborhoods into a structured, searchable resource with editorial curation, then converts research-mode visitors into consultation leads.

---

## Tech Stack

| Layer     | Choice                                    | Why                                                                               |
| --------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router)                   | ISR per content type; Server Components avoid shipping unused data to the browser |
| i18n      | next-intl 4.x                             | Typed locale-aware routing; locale-specific URL path segments (not just prefixes) |
| Styling   | Tailwind CSS v4, shadcn/ui, Framer Motion | Utility-first with composable primitives; no runtime CSS-in-JS                    |
| Forms     | Zod + Server Actions + Web3Forms          | Zero backend infrastructure; Zod runs on server before any external call          |
| Language  | TypeScript (strict)                       | End-to-end type safety from raw JSON → data layer → page props                    |

---

## Architecture

### Data Pipeline

Raw school and neighborhood data lives in `lib/data/raw/*.json` (scraped, 77 schools / 64 neighborhoods). The data layer (`lib/data/schools.ts`, `lib/data/neighborhoods.ts`) maps raw JSON to strongly-typed `School` and `Neighborhood` interfaces, computing derived fields like `ageRange`, `curriculum`, and auto-generated descriptions where editorial copy isn't available.

4 curated schools have full editorial content (verdict, parent quotes, trust badges). The remaining 73 are imported with `buildAutoDescription()` generating factual summaries from structured fields.

### Translation Pattern (Option C)

All translatable data uses a required-EN, optional-other-locale pattern:

```typescript
translations: { en: T } & Partial<Record<LocaleKey, T>>
```

`getSchoolT(school, locale)` always falls back to `translations.en` — no null checks at render time. JSON-LD schemas exclusively use `translations.en` (canonical data for Google).

### Server / Client Component Split

Directory listing pages (`/schools`, `/neighborhoods`) split into two components to avoid shipping 77+ full data objects to the browser:

- **`SchoolsList.tsx`** (Server Component) — renders the 4 editorial "Top Picks" cards with full data
- **`SchoolDirectory.tsx`** (Client Component) — receives a minimal `SchoolDirectoryItem[]` shape (12 fields vs. 30+), handles client-side filtering (region, curriculum, price range, language) and pagination (12 per page)

This keeps the client bundle lean while preserving rich editorial rendering on the server.

### i18n Routing

`i18n/routing.ts` is the single source of truth for all routes. Locale-specific path segments are defined per route — not just locale-prefixed:

```
/en/family-relocation-guide-2026
/pt/guia-relocacao-familia-2026
/de/familien-umzugs-guide-2026
```

TypeScript errors at build time if a new route is added to the filesystem without a corresponding entry in `routing.ts`. Navigation (`Link`, `useRouter`, `redirect`) is always imported from `@/i18n/navigation` for type safety.

### Lead Form

`lib/actions.ts` is a Server Action that runs three layers before any external call:

1. **Honeypot** — hidden `trap` field silently rejects bots at step 0
2. **Zod validation** — structural + format validation (`lib/schemas/lead-form.ts`)
3. **Allowlist check** — school and neighborhood values validated against canonical data arrays (prevents direct POST bypass of the browser `<Select>`)

Lead data is submitted to Web3Forms. If the API key is absent (local dev), data is logged to stderr for recovery — the user sees a success response either way.

### SEO / GEO

Every page implements:

- `generateMetadata` with canonical URL, `alternates` (all 6 locales + `x-default`), OG + Twitter images
- ISR (`revalidate = 43200` for homepage/pillar pages, `86400` for detail/blog)
- JSON-LD schema per page type: `Organization`, `WebSite`, `EducationalOrganization`, `Place`, `FAQPage`, `ItemList`, `BreadcrumbList`, `Article`
- **Speakable schema** (`cssSelector: ["#key-takeaways", "#faq"]`) on all three pillar guides for AI Overview eligibility
- `public/llms.txt` — citation policy for AI inference bots; training bots disallowed via `robots.txt`

FAQPage JSON-LD is authored to exactly match rendered HTML question/answer text (Google rich snippet requirement).

---

## Project Structure

```
app/[locale]/           # All pages under locale segment
lib/
  data/                 # Typed data layer + raw JSON
    raw/                # schools-database.json, neighborhoods-database.json
  content/              # Long-form prose content (all 6 locales inline)
  actions.ts            # Lead form Server Action
  schemas/              # Zod schemas
  types.ts              # Shared interfaces (School, Neighborhood, LocaleKey…)
components/
  features/             # Domain components: Hero, QuizSection, SchoolMap, etc.
  layout/               # Header, Footer
  ui/                   # shadcn primitives
  seo/                  # JSON-LD components (SchoolSchema, etc.)
i18n/
  routing.ts            # Single source of truth for all typed routes
messages/               # UI strings per locale (*.json)
proxy.ts                # next-intl middleware (Next.js 16: renamed from middleware.ts)
```

---

## Local Development

```bash
npm install
# create .env.local with: NEXT_PUBLIC_BASE_URL=http://localhost:3000
npm run dev       # localhost:3000
npm run build     # No test suite — build is the validation gate
npm run lint
```

**Environment variables:**

| Variable               | Purpose                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL` | Canonical domain (`https://raisingkidsinportugal.com` in production) |
| `WEB3FORMS_ACCESS_KEY` | Lead form submissions — omit locally to log leads to console instead |

---

## What I'd Do Differently

- **Static data in a database.** The raw JSON pipeline works but makes additions manual. A Postgres table (Neon) with a simple admin form would allow non-technical editors to add schools without touching code.
- **Playwright scraping as a build step.** School narrative text is missing for 73 imported schools. I'd add a headless scraping step to CI — run once, cache the output, generate copy programmatically.
- **Rate limiting on the Server Action.** The honeypot is lightweight but not sufficient for sustained abuse. Upstash Redis (`@upstash/ratelimit`) would add IP-based throttling with no infrastructure overhead on Vercel.
