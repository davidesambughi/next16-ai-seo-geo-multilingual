# Quick Start: Continue Blog Translations

## What's Done ✅

The infrastructure is complete and tested. Article 1 is fully translated into all 5 languages (PT, DE, FR, NL, ES).

**Files created:**
- `lib/data/blog-translations.ts` - PT & DE for Article 1
- `lib/data/blog-translations-fr.ts` - FR for Article 1
- `lib/data/blog-translations-nl.ts` - NL for Article 1
- `lib/data/blog-translations-es.ts` - ES for Article 1
- `lib/data/blog-translations-index.ts` - Translation index
- `lib/data/BLOG_TRANSLATIONS_GUIDE.md` - Full developer guide

**Code updated:**
- `app/[locale]/blog/page.tsx` - Uses translated content
- `app/[locale]/blog/[slug]/page.tsx` - Uses translated content with GEO/LLM metadata
- `lib/data/blog.ts` - Extended with translation support + GEO/LLM fields

## How to Continue

### To Add Article 2 Translations (Cascais vs Estoril)

1. **Open `lib/data/blog-translations.ts`** and add Portuguese + German:
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
   ```

2. **Open `lib/data/blog-translations-fr.ts`** and add French translation

3. **Open `lib/data/blog-translations-nl.ts`** and add Dutch translation

4. **Open `lib/data/blog-translations-es.ts`** and add Spanish translation

5. **Update `lib/data/blog-translations-index.ts`**:
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
   };
   ```

6. **Run diagnostics** to verify:
   ```bash
   npm run lint
   ```

## Article Slugs (for reference)

1. ✅ `how-to-choose-international-school-portugal` - DONE
2. `cascais-vs-estoril-expat-families`
3. `true-cost-international-school-fees-portugal`
4. `what-age-enrol-child-international-school-portugal`
5. `healthcare-children-portugal-expat-families`

## GEO/LLM Metadata Already Added

All 5 articles in `lib/data/blog.ts` now have:
- `author` - "Raising Kids in Portugal Editorial Team"
- `expertise` - Array of expertise areas
- `citations` - Array of sources cited

This enables:
- E-E-A-T signals for Google
- LLM training data attribution
- Voice AI (Speakable schema)
- Better GEO performance

## Testing

After adding translations:
1. Run `npm run lint` to check for errors
2. Visit `/pt/blog` to see Portuguese blog listing
3. Visit `/pt/blog/cascais-vs-estoril-expat-families` to see translated article
4. Check JSON-LD in page source for correct metadata

## Need Help?

See `lib/data/BLOG_TRANSLATIONS_GUIDE.md` for detailed instructions.
