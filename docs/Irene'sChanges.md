# Irene's Changes

## Scope of comparison

- Original clone reference: `3e478fe` (`updated schools-card 2`)
- Current checked-out commit: `d1ec1b8` (`welcome irene`)
- Current local state: multiple uncommitted changes on top of `d1ec1b8`

This document separates:

1. upstream changes received after clone
2. Irene's local changes made in the working tree after that pull

## Upstream change received after clone

After cloning at `3e478fe`, the repo was fast-forwarded to `d1ec1b8` via `git pull`.

Commit received:

- `d1ec1b8` `welcome irene`

Main contents of that upstream commit:

- Added onboarding documentation:
  - `docs/ONBOARDING.md`
  - `docs/TASK_ASSIGNMENT.md`
- Updated school data pipeline inputs:
  - `lib/data/raw/schools-database.json`
  - `lib/data/schools.ts`
  - `lib/types.ts`
- Adjusted school listing components:
  - `components/SchoolDirectory.tsx`
  - `components/SchoolsList.tsx`

## Irene local changes

These are the local changes currently present in the working tree and not yet committed.

### 1. Internationalization of guides and neighborhood content

Main goal: move visible guide/page copy out of hardcoded JSX and into i18n messages.

Changes:

- Refactored the neighborhoods guide page to read most visible content from `messages/*.json` instead of inline hardcoded English text.
  - `app/[locale]/top-neighborhoods/page.tsx`
- Refactored the relocation guide page with the same pattern.
  - `app/[locale]/relocation-guide/page.tsx`
- Added/expanded i18n content blocks for all supported locales:
  - `messages/en.json`
  - `messages/es.json`
  - `messages/pt.json`
  - `messages/de.json`
  - `messages/fr.json`
  - `messages/nl.json`

Content migrated into translations includes:

- page metadata
- sticky TOC labels
- page headers
- key takeaways
- section titles and section body copy
- comparison tables
- checklist cards
- FAQs
- CTA/related cards

### 2. Neighborhood cards and neighborhood data fallback localization

Main goal: localize the neighborhood list cards and improve behavior when a neighborhood does not have a full locale translation.

Changes:

- Localized neighborhood card UI labels:
  - commute
  - nearby
  - explore CTA
  - location labels such as `Lisbon Coast`, `Central Lisbon`, `East Lisbon`, `Greater Lisbon`
  - `components/NeighborhoodsList.tsx`
  - `messages/*.json` under `NeighborhoodsList`
- Added locale-aware fallback logic in neighborhood data:
  - localized fallback descriptions
  - localized commute wording when falling back from English
  - `lib/data/neighborhoods.ts`

### 3. School directory fixes and localization

Main goal: improve the school directory UX and remove remaining hardcoded English UI.

Changes:

- Added i18n support for:
  - filter labels
  - region names
  - curriculum labels
  - price filter labels
  - language filter labels
  - badges
  - pagination labels
  - CTA labels
  - `components/SchoolDirectory.tsx`
  - `messages/*.json` under `SchoolDirectory`
- Added pagination scroll behavior so page changes move the user back to the school directory anchor.
  - `components/SchoolDirectory.tsx`
  - `components/SchoolsList.tsx`
- Replaced the invalid mini-card key facts wrapper from `<dl>` to `<div>`.
  - `components/SchoolDirectory.tsx`
- Fixed region detection bug for Setubal/Setubal with the specific match instead of `includes("set")`.
  - `components/SchoolsList.tsx`
- Localized top picks / trust badges / acceptance labels / school directory heading text.
  - `components/SchoolsList.tsx`
  - `messages/*.json`

### 4. Navigation, breadcrumbs and scrolling UX

Main goal: make navigation clearer and keep page state more consistent while moving through the site.

Changes:

- Added active-state styling to the header navigation so the current section/page is visually marked.
  - `components/layout/Header.tsx`
- Localized breadcrumbs for known routes instead of relying only on slug formatting.
  - `components/Breadcrumbs.tsx`
- Extended the sticky TOC to accept translated labels and dynamically reduce height near the footer to avoid overlap.
  - `components/StickyTOC.tsx`
- Added route-change scroll-to-top behavior.
  - new file: `components/ui/RouteScrollTop.tsx`
  - wired in: `app/[locale]/layout.tsx`

### 5. Map components upgraded from placeholder to real embeds

Main goal: replace static map stubs with real embedded Google Maps iframes and localize labels.

Changes:

- `components/features/SchoolMap.tsx`
  - replaced decorative placeholder with Google Maps iframe embed
  - added `lat`, `lng`, `openInMapsLabel`
- `components/features/NeighborhoodMap.tsx`
  - replaced placeholder with Google Maps iframe embed
  - added `lat`, `lng`, `exploreOnMapsLabel`, localized amenity labels
- Passed the new props from the detail pages:
  - `app/[locale]/schools/[slug]/page.tsx`
  - `app/[locale]/neighborhoods/[slug]/page.tsx`

### 6. Quiz and school finder adjustments

Main goal: remove remaining hardcoded English text and align structured data with rendered content.

Changes:

- Replaced the hardcoded `Your Results` overline in the quiz result with a translation key.
  - `components/features/quiz/QuizResult.tsx`
  - `messages/*.json`
- Added the missing third FAQ entry to the school finder FAQ schema.
  - `app/[locale]/school-finder/page.tsx`
- `components/features/quiz/QuizSection.tsx` and `components/features/quiz/QuizWidget.tsx` also show local modifications and should be reviewed before commit, although the diff shown here is minimal.

### 7. Supporting translation/message updates

The following translation areas were expanded to support the code changes above:

- `NeighborhoodsGuidePage`
- `RelocationGuidePage`
- `NeighborhoodsList`
- `SchoolDirectory`
- `Breadcrumbs`
- school detail / neighborhood detail map labels
- quiz result overline

Files:

- `messages/en.json`
- `messages/es.json`
- `messages/pt.json`
- `messages/de.json`
- `messages/fr.json`
- `messages/nl.json`

### 8. Lockfile update

- `package-lock.json` changed as part of local dependency/install state.

This is not a product feature by itself, but it is part of the local delta versus the original clone.

## Files currently modified locally

- `app/[locale]/layout.tsx`
- `app/[locale]/neighborhoods/[slug]/page.tsx`
- `app/[locale]/relocation-guide/page.tsx`
- `app/[locale]/school-finder/page.tsx`
- `app/[locale]/schools/[slug]/page.tsx`
- `app/[locale]/top-neighborhoods/page.tsx`
- `components/Breadcrumbs.tsx`
- `components/NeighborhoodsList.tsx`
- `components/SchoolDirectory.tsx`
- `components/SchoolsList.tsx`
- `components/StickyTOC.tsx`
- `components/features/NeighborhoodMap.tsx`
- `components/features/SchoolMap.tsx`
- `components/features/quiz/QuizResult.tsx`
- `components/features/quiz/QuizSection.tsx`
- `components/features/quiz/QuizWidget.tsx`
- `components/layout/Header.tsx`
- `components/ui/RouteScrollTop.tsx`
- `lib/data/neighborhoods.ts`
- `messages/de.json`
- `messages/en.json`
- `messages/es.json`
- `messages/fr.json`
- `messages/nl.json`
- `messages/pt.json`
- `package-lock.json`

## Summary

Relative to the original clone snapshot `3e478fe`, the current project state includes:

- one upstream pull (`d1ec1b8`) that added onboarding/docs and school data updates
- a broad local i18n pass across guides, neighborhood content, school directory UI, maps, breadcrumbs, nav state, and quiz/school-finder details
- one new utility component for route scroll restoration

The dominant theme of Irene's local work is:

- converting hardcoded English UI/content into locale-driven content
- improving navigation and pagination UX
- upgrading map placeholders into real embedded maps
