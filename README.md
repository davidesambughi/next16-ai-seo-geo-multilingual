# RaisingKidsInPortugal

A multilingual content and lead-generation website for international families relocating to Portugal with children. The site consolidates research across 77 international schools and 64 family-friendly neighborhoods into a structured, searchable editorial guide — then converts research-mode visitors into consultation leads for a relocation agency.

**Live:** [raisingkidsinportugal.com](https://raisingkidsinportugal.com)

---

## What It Does

Three content pillars, each optimized for search in 6 languages:

| Pillar | Content |
|---|---|
| **International Schools** | 77 schools with filters (region, curriculum, price, language), detail pages, and a school-matching quiz |
| **Family Neighborhoods** | 64 neighborhoods with real-estate data, lifestyle scores, expat community info, and transport |
| **Relocation Guide** | Step-by-step guide covering visas, timelines, healthcare, and logistics |

Every page is fully localized in **English, Portuguese, German, French, Dutch, and Spanish** — with locale-specific URL paths, hreflang tags, and JSON-LD structured data throughout.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js App Router | 16 | Framework, Server Components, Server Actions, ISR |
| React | 19 | UI |
| TypeScript | 5 (strict) | End-to-end type safety — zero errors enforced |
| Tailwind CSS | v4 | Styling |
| next-intl | 4.x | i18n — 6 locales with locale-specific URL path segments |
| Zod | 4.x | Lead form validation (server-side) |
| shadcn/ui + Radix UI | — | Accessible UI primitives |
| Framer Motion | 12 | Animations |
| Web3Forms | — | Lead form email backend (no custom server required) |
| Vercel | — | Hosting + ISR revalidation |

---

## Running Locally

**Requirements:** Node.js 18+, npm

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file (see Environment Variables below)
# Create a new file called .env.local in the project root

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` to `/en` automatically via next-intl middleware (`proxy.ts`).

```bash
npm run build   # Production build — also the validation gate (catches TS errors)
npm run start   # Run production build locally
npm run lint    # ESLint check
```

> No test suite is configured. Run `npm run build` to validate before pushing.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Canonical base URL — used for SEO canonical tags, sitemap, and OG images
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Web3Forms key — routes lead form submissions to the agency inbox
# Get a free key at https://web3forms.com
# If omitted locally, submitted lead data is logged to the console instead
WEB3FORMS_ACCESS_KEY=your_key_here
```

| Variable | Local | Production (Vercel) |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | `https://raisingkidsinportugal.com` |
| `WEB3FORMS_ACCESS_KEY` | Optional (logs to console) | Required |

---

## Architecture Overview

### Data Layer

All school and neighborhood data originates from `lib/data/raw/*.json`. The data layer maps raw JSON to typed `School` / `Neighborhood` interfaces, computing derived fields and auto-generating descriptions for the 73 imported schools. 4 curated schools have full editorial content (verdict, parent quotes, highlights).

### i18n Routing

`i18n/routing.ts` is the single source of truth for all typed routes. Every route defines locale-specific path segments (not just locale prefixes), for example:

```
/en/family-relocation-guide-2026
/pt/guia-relocacao-familia-2026
/de/familien-umzugs-guide-2026
```

Always import `Link`, `useRouter`, and `redirect` from `@/i18n/navigation` — never from `next/link` or `next/navigation`.

### Server / Client Split

Listing pages split into a Server Component (renders editorial Top Picks) + a Client Component that receives a minimal serialized data shape and handles client-side filtering and pagination. This keeps the client bundle lean.

### Lead Form

`lib/actions.ts` (Server Action) runs three layers before any external call: a honeypot check, Zod schema validation, and an allowlist check against canonical school/neighborhood slugs. Submissions go to Web3Forms.

### SEO / GEO

Every page has `generateMetadata` with canonical URL, full `alternates` for all 6 locales + `x-default`, OG/Twitter images, ISR revalidation, and JSON-LD structured data. Pillar guide pages include Speakable schema targeting `#key-takeaways` and `#faq` elements for AI Overview eligibility.

---

## Project Structure

```
app/[locale]/           # All pages live under a locale segment
lib/
  data/                 # Typed data layer + raw JSON source files
  content/              # Editorial copy (hero text, guide facts)
  schemas/              # Zod validation schemas
  actions.ts            # Lead form Server Action
  types.ts              # All shared TypeScript interfaces
components/
  features/             # Domain components: Hero, quiz, maps, school cards, etc.
  layout/               # Header, Footer
  seo/                  # JSON-LD schema components
  ui/                   # shadcn/Radix UI primitives
i18n/
  routing.ts            # ← Add every new route here first
  navigation.ts         # Typed navigation exports
messages/               # UI strings per locale (en.json, pt.json, …)
proxy.ts                # next-intl middleware (Next.js 16 renamed middleware.ts → proxy.ts)
```

---

## Documentation

| File | Contents |
|---|---|
| `CLAUDE.md` | Architecture reference for AI coding assistants |
|
