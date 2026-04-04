# Blog Translations Guide

## Overview

Blog translations are organized in separate TypeScript files for maintainability and easier CMS migration (Phase 5).

## Current Structure

- `blog.ts` - Main blog data with English content and GEO/LLM metadata
- `blog-translations.ts` - Portuguese (PT) and German (DE) translations for article 1
- `blog-translations-fr.ts` - French (FR) translations for article 1
- `blog-translations-nl.ts` - Dutch (NL) translations for article 1
- `blog-translations-es.ts` - Spanish (ES) translations for article 1
- `blog-translations-index.ts` - Index mapping translations to articles

## How to Add Translations

### Step 1: Create Translation Files

For each new article, create translations in the existing language files:

**Example: Adding article 2 (Cascais vs Estoril) translations**

In `blog-translations.ts`, add:
```typescript
export const cascaisVsEstorilPT: BlogTranslation = {
  title: "Cascais vs Estoril: Qual é melhor para famílias expatriadas?",
  subtitle: "...",
  intro: "...",
  sections: [...],
  keyTakeaways: [...],
  faq: [...],
  cta: { text: "..." },
};

export const cascaisVsEstorilDE: BlogTranslation = {
  // German translation
};
```

Repeat for `blog-translations-fr.ts`, `blog-translations-nl.ts`, and `blog-translations-es.ts`.

### Step 2: Update the Index

In `blog-translations-index.ts`, add the new article mapping:

```typescript
export const blogTranslationsMap = {
  'how-to-choose-international-school-portugal': { ... },
  'cascais-vs-estoril-expat-families': {
    pt: cascaisVsEstorilPT,
    de: cascaisVsEstorilDE,
    fr: cascaisVsEstorilFR,
    nl: cascaisVsEstorilNL,
    es: cascaisVsEstorilES,
  },
  // ... more articles
};
```

### Step 3: Verify

Run diagnostics to ensure no TypeScript errors:
```bash
npm run lint
```

## BlogTranslation Interface

```typescript
interface BlogTranslation {
  title: string;
  subtitle: string;
  intro: string;
  sections: BlogSection[];
  keyTakeaways?: string[];
  faq?: BlogFaqItem[];
  cta: { text: string };
}
```

## GEO/LLM Metadata

Each article in `blog.ts` includes:
- `author` - Author name for schema.org
- `expertise` - Array of expertise areas (for E-E-A-T signals)
- `citations` - Array of sources cited (for LLM training data attribution)

Example:
```typescript
{
  slug: "how-to-choose-international-school-portugal",
  title: "How to Choose an International School in Portugal (2026 Guide)",
  author: "Raising Kids in Portugal Editorial Team",
  expertise: ["international school selection", "Portugal education", ...],
  citations: ["St. Julian's School admission data 2026", ...],
  // ... rest of article
}
```

## How Content is Rendered

1. **Blog listing page** (`/blog`):
   - Calls `getBlogArticleContent(article, locale)` for each article
   - Falls back to English if translation not available

2. **Individual article page** (`/blog/[slug]`):
   - Calls `getBlogArticleContent(article, locale)` to get translated content
   - Includes translated metadata in JSON-LD schemas
   - Supports voice AI (Speakable schema) for key sections

## Future: CMS Migration (Phase 5)

When migrating to Sanity/Contentful:
1. Export translations from these files
2. Import into CMS as separate documents per language
3. Update `getBlogArticleContent()` to fetch from CMS instead
4. Keep the same interface for zero breaking changes

## Remaining Articles to Translate

- [ ] Article 2: "cascais-vs-estoril-expat-families"
- [ ] Article 3: "true-cost-international-school-fees-portugal"
- [ ] Article 4: "what-age-enrol-child-international-school-portugal"
- [ ] Article 5: "healthcare-children-portugal-expat-families"

Each article needs translations in: PT, DE, FR, NL, ES (5 languages × 4 articles = 20 translations remaining)
