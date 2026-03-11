# TrustFamily — Bug Tracker

Last updated: 2026-03-11 | Session: Bug-fix pass pre-go-live — 10/10 fix di codice completate ✓

---

## Sommario

| # | Bug | Stato | Fase |
|---|-----|-------|------|
| 1 | Breadcrumb: slug formattato invece del nome reale | `done` | bug-fix |
| 2 | Breadcrumb: link parent punta al pillar invece della listing | `done` | bug-fix |
| 3 | SchoolDirectory: filtro "English Medium" ha falsi positivi | `done (codice)` | bug-fix + fase JSON |
| 4 | RouteScrollTop sovrascrive lo scroll verso hash anchor | `done` | bug-fix |
| 5 | FAQ JSON-LD school-finder non coincide con l'HTML | `done` | bug-fix |
| 6 | NeighborhoodsList: intestazioni sezioni non i18n'd | `done` | bug-fix |
| 7 | ~12 scuole con `englishAsPrimary: null` nel JSON | `deferred` | fase JSON |
| 8 | Valori `priceRangeLabel` non normalizzati nei neighborhood | `deferred` | fase JSON |
| 9 | Form contatti: `replyto` mancante nel payload Web3Forms | `done` | bug-fix |
| 10 | Contact page: titolo e sottotitolo hardcoded EN | `done` | bug-fix |

---

## Dettaglio bug

### Bug 1 — Breadcrumb: slug formattato invece del nome reale dell'entità
- **Causa:** Codice
- **File:** `components/Breadcrumbs.tsx:56–61`, `app/[locale]/schools/[slug]/page.tsx`, `app/[locale]/neighborhoods/[slug]/page.tsx`
- **Descrizione:** Il componente usa `formatSegment(slug)` come fallback per il leaf node. Perde apostrofi, punti, maiuscole speciali (es. "st-julians-school" → "St Julians School" invece di "St. Julian's School").
- **Fix:** Aggiungere prop `leafLabel?: string`; le detail page passano `entity.name`.
- **Fase:** bug-fix
- **Stato:** `done` — prop `leafLabel?` aggiunto a `Breadcrumbs.tsx`; `school.name` / `neighborhood.name` passati dalle detail page.

---

### Bug 2 — Breadcrumb: link parent punta al pillar invece della listing
- **Causa:** Codice
- **File:** `lib/breadcrumbs.ts:31–34`
- **Descrizione:** `"schools"` mappato a `/best-private-and-public-international-schools-portugal-2026` invece di `/schools`. Idem per `"neighborhoods"`.
- **Fix:** Aggiornare 2 valori in `BREADCRUMB_MAPPING`.
- **Fase:** bug-fix
- **Stato:** `done` — `BREADCRUMB_MAPPING` aggiornato: "schools"→`/schools`, "neighborhoods"→`/neighborhoods`.

---

### Bug 3 — SchoolDirectory: filtro "English Medium" ha falsi positivi
- **Causa:** Codice + Dati
- **File:** `components/SchoolDirectory.tsx:111`
- **Descrizione:** Condizione `s.englishAsPrimary === false` esclude solo i `false` espliciti. ~12 scuole con `englishAsPrimary === null` passano il filtro come falsi positivi.
- **Fix codice:** Cambiare in `s.englishAsPrimary !== true`.
- **Fix dati:** Popolare il campo `englishAsPrimary` nelle ~12 scuole mancanti (fase JSON).
- **Fase:** bug-fix (codice) + fase JSON (dati)
- **Stato:** `done (codice)` — `s.englishAsPrimary !== true`. Fix dati: `deferred` a fase JSON.

---

### Bug 4 — RouteScrollTop sovrascrive lo scroll verso hash anchor
- **Causa:** Codice
- **File:** `components/ui/RouteScrollTop.tsx:16`
- **Descrizione:** `RouteScrollTop` chiama `window.scrollTo({ top: 0 })` su ogni cambio di pathname, incluse le navigazioni verso `/#quiz`. Il browser viene riportato in cima invece di scrollare all'anchor.
- **Fix:** Aggiungere `if (window.location.hash) return;` prima dello scrollTo.
- **Fase:** bug-fix
- **Stato:** `done` — aggiunto `if (window.location.hash) return;` prima dello scrollTo.

---

### Bug 5 — FAQ JSON-LD school-finder non coincide con l'HTML
- **Causa:** Codice
- **File:** `app/[locale]/school-finder/page.tsx:74–89`
- **Descrizione:** FAQ item 1 e 2 nel JSON-LD hanno testo EN hardcoded. L'HTML usa `t("faq1q")` etc. Per locale ≠ EN, JSON-LD e HTML non coincidono — viola il requisito Google per rich snippets FAQPage.
- **Fix:** Sostituire stringhe hardcoded con `t("faq1q")`, `t("faq1a")`, `t("faq2q")`, `t("faq2a")`.
- **Fase:** bug-fix
- **Stato:** `done` — JSON-LD usa `t("faq1q")`, `t("faq1a")`, `t("faq2q")`, `t("faq2a")` per tutti e 3 gli item.

---

### Bug 6 — NeighborhoodsList: intestazioni sezioni non i18n'd
- **Causa:** Codice
- **File:** `components/NeighborhoodsList.tsx:68–70, 167–170` + `messages/*.json` (6 file)
- **Descrizione:** "Editorial Picks", "Our Top Neighborhood Recommendations", "Full Directory", "All Neighborhoods in Portugal" sono stringhe EN hardcoded. `SchoolsList.tsx` è già correttamente i18n'd.
- **Fix:** Aggiungere 4 chiavi alla namespace NeighborhoodsList in tutti e 6 i file messages; sostituire le stringhe con `t()`.
- **Fase:** bug-fix
- **Stato:** `done` — 4 chiavi aggiunte in tutti e 6 i file `messages/*.json`; `NeighborhoodsList.tsx` usa `t()`.

---

### Bug 9 — Form contatti: `replyto` mancante nel payload Web3Forms
- **Causa:** Codice
- **File:** `lib/actions.ts`
- **Descrizione:** Il payload inviato a Web3Forms non include `replyto: data.email`. Rispondendo alle email ricevute, la risposta va all'indirizzo di default Web3Forms invece che al lead.
- **Fix:** Aggiungere `replyto: data.email` al body della fetch.
- **Fase:** bug-fix
- **Stato:** `done` — aggiunto `replyto: data.email` nel payload Web3Forms in `lib/actions.ts`.

---

### Bug 10 — Contact page: titolo e sottotitolo hardcoded EN
- **Causa:** Codice
- **File:** `app/[locale]/contact/page.tsx`
- **Descrizione:** "Contact Us" e il sottotitolo sono stringhe EN hardcoded. La page non usa `t()` né una namespace dedicata.
- **Fix:** Aggiungere chiavi nella namespace ContactPage in tutti e 6 i messages/*.json; usare `t()` nella page.
- **Fase:** bug-fix
- **Stato:** `done` — namespace `ContactPage` aggiunta in 6 `messages/*.json`; `app/[locale]/contact/page.tsx` usa `t("h1")` e `t("subtitle")`.

---

### Bug 7 — ~12 scuole con `englishAsPrimary: null` nel JSON
- **Causa:** Dati
- **File:** `lib/data/raw/schools-database.json`
- **Descrizione:** ~12 scuole importate hanno `expat_family_features.english_as_primary` assente o null. Il filtro language le esclude dopo la fix del Bug 3, anche se potrebbero essere EN-medium.
- **Fix:** Verificare e popolare il campo nelle scuole mancanti.
- **Fase:** fase JSON
- **Stato:** `deferred`

---

### Bug 8 — Valori `priceRangeLabel` non normalizzati nei neighborhood
- **Causa:** Dati
- **File:** `lib/data/raw/neighborhoods-database.json`
- **Descrizione:** Il filtro price in `NeighborhoodDirectory` usa match esatto contro `"Affordable"`, `"Mid"`, `"Upper-Mid"`, `"High"`. Se il JSON ha varianti (es. "Upper Mid", "High-End"), il filtro non funziona per quei record.
- **Fix:** Verificare tutti i valori di `priceRangeLabel` nel JSON e normalizzarli.
- **Fase:** fase JSON
- **Stato:** `deferred`
