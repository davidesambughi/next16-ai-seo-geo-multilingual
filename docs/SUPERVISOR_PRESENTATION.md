# Raising Kids in Portugal Relocation Funnel — Project Overview
> Last updated: 2026-03-10 | Verified against actual codebase

---

## What We Built

**Raising Kids in Portugal** is a multilingual lead-generation website for international families relocating to Portugal. Families use it to research schools and neighborhoods, then submit a contact form to engage the agency.

**Three content pillars:**

1. **International Schools** — 77 verified schools with curriculum, fees, age range, language of instruction, and GPS data. Filterable directory with pagination. 4 schools have full editorial content (expert verdict, parent tips). 73 have structured data + auto-generated descriptions.
2. **Family-Friendly Neighborhoods** — 64 neighborhoods with real estate prices, family living scores, demographics, cost of living, expat community data, and transport links. 5 have full editorial content.
3. **Relocation Guide** — step-by-step guide covering visas, timelines, cost of living, and the entire move process.

**Lead capture:** a 7-field contact form with email validation, spam protection, and a backend that delivers submissions directly to the agency inbox.

**Languages:** English · Portuguese · German · French · Dutch · Spanish (all 6 fully functional)

**Stack:** Next.js 16 · TypeScript · Tailwind CSS · Vercel

---

## What Is Complete and Working

| Area | Status |
|---|---|
| Homepage | ✅ Complete — hero, school quiz, lead form, testimonials, pillar section |
| School Finder quiz | ✅ Working — 4-question quiz matching families to schools and neighborhoods |
| Schools pillar page | ✅ Complete — editorial top picks + directory of 77 schools with filters and pagination |
| Individual school pages (77) | ✅ Complete — curriculum, fees, location, age range, contact info |
| Neighborhoods pillar page | ✅ Complete — all 64 neighborhoods listed with links to detail pages |
| Individual neighborhood pages (64) | ✅ Complete — real estate, family scores, transport, demographics, cost of living |
| Relocation Guide | ✅ Complete — full editorial guide with FAQ, timeline, visa information |
| Blog | ✅ Working — listing page + 3 articles |
| About page | ✅ Complete |
| Lead capture form | ✅ Built, validated, and wired to email backend |
| 6-language UI | ✅ All pages, all buttons, all error messages translated |
| SEO architecture | ✅ Complete — canonical URLs, hreflang, structured data (JSON-LD), open graph, ISR |
| TypeScript | ✅ Zero compilation errors |

---

## MVP Status — What Needs to Happen Before Launch

The code is complete and building cleanly (497 pages, zero TypeScript errors as of 2026-03-10). Two infrastructure steps remain before going live:

### ✅ Fixed: Contact, Privacy, and Terms pages
Pages created and building correctly:
- `/contact` — full contact form with validation
- `/privacy` — GDPR-compliant privacy policy stub
- `/terms` — terms of service stub

### ✅ Fixed: Contact button on school and neighborhood pages
Every school and neighborhood detail page had a dead "Contact" button with no action. Now wired to `/contact`.

### ⏳ Remaining: Set environment variables on Vercel (5 min)
Two environment variables are missing from the production environment:
- `NEXT_PUBLIC_BASE_URL=https://raisingkidsinportugal.com` — without this, all structured data links point to the wrong URL in production
- `WEB3FORMS_ACCESS_KEY=<key>` — without this, form submissions are logged but not emailed to the agency

For the Web3Forms key: go to [web3forms.com](https://web3forms.com), enter the agency email address, receive the key. Then add both variables in the Vercel project dashboard under Settings → Environment Variables.

### ⏳ Remaining: Configure custom domain on Vercel (30 min)
`raisingkidsinportugal.com` needs to be connected to the Vercel project. Standard process: add domain in Vercel, update DNS at registrar, wait for SSL.

**Total remaining effort before launch: ~35 minutes (both are infrastructure steps, no code changes needed)**

---

## After MVP — Post-Launch Improvements

These are real improvements that matter but do not block the launch.

### Content (high value)
- **Enriched school descriptions** — 73 imported schools currently show auto-generated factual descriptions. A parallel scraping project is preparing narrative text (150-300 words) for ~61 of them. Integrating this data would take ~4-5 hours once the data arrives.
- **Per-school and per-neighborhood photos** — currently all school pages share one generic photo, all neighborhood pages share another. Sourcing individual photos for the 4 curated schools and 5 curated neighborhoods (9 photos total) would significantly improve quality on those pages.

### UX
- **Neighborhood filters and pagination** — schools have a filterable directory (region, curriculum, price, language). Neighborhoods currently have a simple list. Building the same filter/pagination pattern for neighborhoods would take ~3 hours (the pattern is already built for schools).
- **Embedded maps** — school and neighborhood pages currently show a "View on Maps" link. Replacing with an embedded Google Maps iframe (free, no API key required) would take ~1-2 hours.
- **Scroll-to-top on school pagination** — when a user clicks "Next page" in the school directory, the new results appear but the page doesn't scroll up. Minor UX fix, ~10 minutes.

### SEO (post-launch, requires live domain)
- Google Search Console setup and sitemap submission
- Rich Results Test validation on all structured data schemas
- Vercel Analytics
- Social profile URLs in Organization schema (once social accounts are active)

### Infrastructure
- Rate limiting on the contact form (currently uses honeypot spam protection only; rate limiting via Vercel Edge would prevent abuse at scale)

---

## Key Numbers

| Metric | Value |
|---|---|
| Total pages | ~160+ (77 school detail + 64 neighborhood detail + pillar pages + blog, × 6 locales) |
| Schools in database | 77 verified (92 raw, 15 filtered out as low-confidence) |
| Neighborhoods in database | 64 |
| Languages | 6 (en, pt, de, fr, nl, es) |
| Blog articles | 3 |
| JSON-LD schema types | 10 (Organization, WebSite, EducationalOrganization, Place, Article, FAQPage, HowTo, Speakable, BreadcrumbList, Person) |
| TypeScript errors | 0 |

---

## Technical Architecture (brief)

The site uses Next.js Incremental Static Regeneration (ISR): pages are pre-rendered at build time and automatically refreshed in the background (every 12-24 hours). This means fast page loads, zero database queries at request time, and no server to maintain beyond Vercel's standard hosting.

All 160+ pages are pre-built and served from the CDN. The only server-side logic is the contact form submission.

---

## Open Bugs (Known, Non-Blocking)

| # | Description | Severity | Fix time |
|---|---|---|---|
| B-form | ~~"Contact" button on school/neighborhood detail pages~~ | ✅ Fixed | — |
| B7 | Region filter: `loc.includes("set")` is too generic — could misclassify edge cases | Low | 5 min |
| B9 | Pagination: no scroll-to-top on page change in school directory | Low | 10 min |
| B10 | `<dl>` element in mini-card has invalid children (semantic HTML) | Low | 5 min |
| B5 | "Open in Maps" label hardcoded in English in map components | Low | 15 min |

---

## Documents in This Folder

| File | Purpose |
|---|---|
| `SUPERVISOR_PRESENTATION.md` | This file — project overview for supervisors |
| `ONBOARDING.md` | Developer onboarding guide — architecture, patterns, golden rules |
| `TASK_ASSIGNMENT.md` | Working task board — sprint items, bug assignments, backlog |
