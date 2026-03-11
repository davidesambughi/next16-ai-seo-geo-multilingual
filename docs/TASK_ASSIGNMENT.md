# TrustFamily — Team Task Board
> Last updated: 2026-03-03

---

## Team

| Member | Role | Strengths in this project |
|---|---|---|
| **Dev A** (original) | Full-stack + SEO | Deep context on architecture, data pipeline, SEO schemas |
| **Dev B** (new) | Full-stack | Frontend components, bug fixes, feature parity |

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔴 | Launch blocker — must be done before going live |
| 🟡 | Important but not blocking launch |
| 🟢 | Post-launch |
| ✅ | Done |
| ⏳ | Waiting on external input |
| ❌ | To do |
| 🅰 | Assigned to Dev A |
| 🅱 | Assigned to Dev B |

---

## ✅ Completed Before Sprint 1 (2026-03-10)

| Task | Status |
|---|---|
| Create `/contact` page with lead form | ✅ Done |
| Create `/privacy` page (GDPR stub) | ✅ Done |
| Create `/terms` page (terms stub) | ✅ Done |
| Wire "Contact" button on school + neighborhood detail pages → `/contact` | ✅ Done |
| Build: 497 pages, zero TypeScript errors | ✅ Verified |

---

## SPRINT 1 — Immediate (unblocked, do now)

These tasks can be started today with no external dependencies.

### Quick Bug Fixes (~30 min total) → **Dev B**
> Good first tasks to get familiar with the codebase.

| # | Task | File | Effort | Status |
|---|---|---|---|---|
| B7 | Fix `extractRegion`: `loc.includes("set")` is too generic — change to `loc.includes("setúbal") \|\| loc.includes("setubal")` | `components/SchoolsList.tsx:71` | 5 min | ❌ **🅱** |
| B9 | Add scroll-to-top on pagination change in SchoolDirectory | `components/SchoolDirectory.tsx` (pagination handler) | 10 min | ❌ **🅱** |
| B10 | Replace `<dl>` with `<div>` in mini-card key facts (semantic HTML) | `components/SchoolDirectory.tsx:193` | 5 min | ❌ **🅱** |
| B-quiz-ui | Fix "Your Results" hardcoded EN in QuizResult — use `t.resultsTitle` prop instead | `components/features/quiz/QuizResult.tsx:39` | 5 min | ❌ **🅱** |
| B-faq-sf | Add missing 3rd FAQ to FAQPage schema in school-finder (schema has 2 items, HTML renders 3) | `app/[locale]/school-finder/page.tsx:69-92` | 10 min | ❌ **🅱** |

---

### Google Maps Embed → **Dev B**

**Task:** Replace the current "Open in Maps" link stub in `SchoolMap.tsx` and `NeighborhoodMap.tsx` with a real Google Maps iframe embed.

**Details:**
- Use the free Google Maps embed URL (no API key): `https://maps.google.com/maps?q={lat},{lng}&output=embed`
- The iframe should show the school/neighborhood location
- Keep the "Open in Maps" external link below the iframe as a fallback
- Fix B5 at the same time: i18n the "Open in Maps" / "Explore on Maps" label text and the amenity labels (Schools/Cafés/Parks)

**Files to edit:**
- `components/features/SchoolMap.tsx`
- `components/features/NeighborhoodMap.tsx`

**Effort:** ~1h | **Status:** ❌ **🅱**

---

### Neighborhood Filters + Pagination → **Dev B**

**Task:** Add client-side filters and pagination to `NeighborhoodsList.tsx`, mirroring the exact pattern used in `SchoolDirectory.tsx`.

**Details:**
1. Create `components/NeighborhoodDirectory.tsx` as a `"use client"` component (same pattern as `SchoolDirectory.tsx`)
2. Define a minimal `NeighborhoodDirectoryItem` serialized type (slug, name, location, region, pricing tier, family score, vibe)
3. Filters to implement: region (Lisbon / Porto / Algarve / Other), price tier (budget / mid / premium), family score (filter by min score)
4. Pagination: 12 per page, with scroll-to-top on page change
5. Mini-card: neighborhood name, vibe one-liner, region, price tier badge, family score

**Reference:** Read `components/SchoolDirectory.tsx` in full before starting — replicate the exact same architecture.

**Files to create/edit:**
- `components/NeighborhoodDirectory.tsx` (new)
- `components/NeighborhoodsList.tsx` (add pass-through to NeighborhoodDirectory)

**Effort:** ~3h | **Status:** ❌ **🅱**

---

### ContactBtn Fix (school + neighborhood detail pages) ✅ DONE

Button now links to `/contact` page using `<Button asChild><Link href="/contact">`.
- `app/[locale]/schools/[slug]/page.tsx`
- `app/[locale]/neighborhoods/[slug]/page.tsx`

---

## SPRINT 1 — Immediate → **Dev A**

### Infrastructure Setup

| Task | Notes | Status |
|---|---|---|
| Add `NEXT_PUBLIC_BASE_URL=https://trustfamily.com` to Vercel env vars | Without this, all JSON-LD URLs are wrong in production | ❌ **🅰** |
| Configure custom domain `trustfamily.com` on Vercel | Verify DNS + SSL | ❌ **🅰** |
| Add `WEB3FORMS_ACCESS_KEY` to Vercel + `.env.local` | Get from web3forms.com using agency email | ⏳ **🅰** |

---

### Per-School and Per-Neighborhood Images → **Dev A**

**Task:** Add individual images for the 4 curated schools and 5 curated neighborhoods. Currently all school/neighborhood pages share a single generic image (`schools-img.jpg` / `neighborhoods-img.jpg`).

**Details:**
- Source or create 4 school images + 5 neighborhood images (can be stock, editorial, or illustrative)
- Place in `public/` (e.g., `public/schools/st-julians.jpg`, `public/neighborhoods/cascais.jpg`)
- Add an `image` field to the curated school/neighborhood entries in `lib/data/schools.ts` and `lib/data/neighborhoods.ts`
- Update detail pages to use `school.image ?? "/schools-img.jpg"` (keep fallback)

**Files to edit:**
- `lib/data/schools.ts` (4 curated entries)
- `lib/data/neighborhoods.ts` (5 curated entries)
- `app/[locale]/schools/[slug]/page.tsx` (use per-school image)
- `app/[locale]/neighborhoods/[slug]/page.tsx` (use per-neighborhood image)

**Effort:** ~2h (image sourcing) + 1h (code) | **Status:** ❌ **🅰**

---

## SPRINT 2 — Waiting on New School JSON (Dev A leads, Dev B supports)

> These tasks are blocked until the enriched school JSON arrives from the scraper project.
> Expected data: `description`, `admission_process`, `language_support`, `extracurricular_activities`, `transport` for ~61 schools (TIER A).

### Update School Type + Data Pipeline → **Dev A**

| Step | Task | File |
|---|---|---|
| 1 | Read new JSON structure, identify new/removed fields | `lib/data/raw/schools-database.json` (to be replaced) |
| 2 | Update `School` type with new fields | `lib/types.ts` |
| 3 | Update `importedSchools` mapping in data file | `lib/data/schools.ts` |
| 4 | Update `buildAutoDescription` (or remove for TIER A, keep for TIER B) | `lib/data/schools.ts` |
| 5 | Update `normalizeCurriculum` if new curriculum types appear | `components/SchoolsList.tsx` |
| 6 | Update `extractRegion` if `location.city` coverage improves (fix B6) | `components/SchoolsList.tsx` |
| 7 | Re-verify bugs B8 (fees contact filter) and B11 (curriculum "Other") | `components/SchoolDirectory.tsx`, `SchoolsList.tsx` |

**Effort:** ~4h | **Status:** ⏳ **🅰**

### Update School Detail Page for New Sections → **Dev B** (after Dev A finishes type updates)

| Step | Task | File |
|---|---|---|
| 1 | Add `admission_process` section to school detail page (TIER A only, conditional) | `app/[locale]/schools/[slug]/page.tsx` |
| 2 | Add `extracurricular_activities` section (TIER A only, conditional) | `app/[locale]/schools/[slug]/page.tsx` |
| 3 | Add `language_support` to sidebar (all tiers, conditional) | `app/[locale]/schools/[slug]/page.tsx` |
| 4 | Add `transport` section (TIER A only, conditional) | `app/[locale]/schools/[slug]/page.tsx` |
| 5 | Replace `buildAutoDescription` text with real `description` for TIER A schools | `app/[locale]/schools/[slug]/page.tsx` |

**Effort:** ~3h | **Blocker:** Dev A must finish type updates first | **Status:** ⏳ **🅱**

---

## SPRINT 3 — Pre-Launch Smoke Test (both)

> To be done together before pushing to production.

| # | Check | Who |
|---|---|---|
| 1 | Form submission end-to-end: fill form → check email arrives | 🅰 + 🅱 |
| 2 | Quiz end-to-end: complete quiz → verify school/neighborhood results are correct links | 🅱 |
| 3 | All school detail pages load without 500 errors (77 pages) | 🅱 (script or manual spot-check) |
| 4 | All neighborhood detail pages load without 500 errors (64 pages) | 🅱 (spot-check) |
| 5 | Filters + pagination on school directory work correctly | 🅱 |
| 6 | Filters + pagination on neighborhood directory work correctly (after Sprint 1) | 🅱 |
| 7 | Hreflang + canonical correct in page source (check 3-4 pages) | 🅰 |
| 8 | JSON-LD schemas valid — paste homepage + 1 school detail into [Rich Results Test](https://search.google.com/test/rich-results) | 🅰 |
| 9 | `NEXT_PUBLIC_BASE_URL` set on Vercel → confirm JSON-LD URLs use `trustfamily.com` in production | 🅰 |
| 10 | `npm run build` completes with zero TypeScript errors | 🅰 + 🅱 |

---

## POST-LAUNCH Backlog (no assignee yet)

| Task | Priority | Notes |
|---|---|---|
| Google Search Console setup + sitemap submission | 🟢 | First thing after launch |
| Rich Results validation on all schema types | 🟢 | Use Google Rich Results Test |
| Vercel Analytics | 🟢 | |
| IndexNow API for fast indexing | 🟢 | |
| i18n translations for 59 imported neighborhoods | 🟢 | Currently EN only |
| Narrative text for TIER B schools (16 schools) | 🟢 | Option: AI batch via Claude API |
| OG image locale-aware (per-locale text overlay) | 🟢 | Currently generic |
| Blog: expand from 3 to 20+ articles | 🟢 | |
| `sameAs` in Organization schema | 🟢 | When social profiles active |
| B5 polish: Maps labels fully i18n'd | 🟢 | Low priority (maps already working) |

---

## Current Bug Tracker

| # | Description | File | Owner | Status |
|---|---|---|---|---|
| B5 | Maps labels hardcoded EN ("Open in Maps", amenity labels) | `SchoolMap.tsx`, `NeighborhoodMap.tsx` | 🅱 | Fixed with Maps Embed task |
| B6 | Region filter unreliable (35% schools → "Other Portugal") | `SchoolsList.tsx` extractRegion | 🅰 | ⏳ After new JSON |
| B7 | `includes("set")` too generic in extractRegion | `SchoolsList.tsx:71` | 🅱 | ❌ Sprint 1 |
| B8 | Price "contact" filter catches schools with no fee data | `SchoolDirectory.tsx` | 🅰 | ⏳ After new JSON |
| B9 | No scroll-to-top on pagination change | `SchoolDirectory.tsx` | 🅱 | ❌ Sprint 1 |
| B10 | `<dl>` without `<dt>`/`<dd>` in mini-card | `SchoolDirectory.tsx:193` | 🅱 | ❌ Sprint 1 |
| B11 | Curriculum "Other" too broad for useful filtering | `SchoolsList.tsx` normalizeCurriculum | 🅰 | ⏳ After new JSON |
| B-form | "Contact" button dead in school/neighborhood detail pages | `schools/[slug]/page.tsx` | 🅱 | ✅ Fixed — links to /contact |
| B-faq-sf | FAQPage schema has 2 items, HTML renders 3 FAQs | `school-finder/page.tsx:69-92` | 🅱 | ❌ Sprint 1 |
| B-quiz-ui | "Your Results" hardcoded EN in QuizResult | `QuizResult.tsx:39` | 🅱 | ❌ Sprint 1 |
