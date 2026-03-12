# Raising Kids in Portugal — Backlog Miglioramenti Tecnici

Questo file raccoglie idee, miglioramenti e technical debt individuati durante lo sviluppo
ma non implementati per scelta (complessità, priorità, scope). Non è un bug tracker —
quelli sono bug confermati. Questi sono miglioramenti desiderabili con un trade-off esplicito.

---

## Form di contatto

### [FORM-1] Sostituire dropdown scuole/quartieri con campi qualificanti strutturati
- **Contesto:** I dropdown `interestedSchool` e `interestedNeighborhood` espongono
  rispettivamente 77 e 64 opzioni — UX difficile da navigare, basso tasso di utilizzo atteso.
- **Proposta:** Sostituire con 3 campi che qualificano meglio il lead:
  - **Budget annuale scuola** — Select: "Sotto €15.000 / €15.000–€25.000 / Oltre €25.000"
  - **Età dei figli** — Input testo libero (es. "6, 9, 14") o select multi-value
  - **Timeline trasferimento** — Select: "Entro 3 mesi / Entro 12 mesi / Solo esplorando"
- **Impatto:** Migliore qualificazione del lead, riduzione attrito nel form.
- **Dipendenze:** Aggiornare `leadSchema` (Zod), `submitLead` (actions.ts), `Form` (form.tsx),
  e tutti e 6 i `messages/*.json`.
- **Priorità:** Post-lancio (non blocca il go-live).

---

### [FORM-2] Silent failure Web3Forms — monitoraggio e fallback
- **Contesto:** In `lib/actions.ts`, se la chiamata a Web3Forms fallisce (es. key errata,
  timeout, errore 5xx), il codice logga l'errore nei Vercel logs ma restituisce comunque
  `success: true` all'utente. Il lead è potenzialmente perso senza notifica.
- **Attuale:** `console.error('[LEAD_FALLBACK]', ...)` — recuperabile solo manualmente
  dai log Vercel.
- **Proposta A (semplice):** Aggiungere alert email via Vercel Log Drains o una seconda
  chiamata a un webhook (es. make.com/n8n) come fallback in caso di errore API.
- **Proposta B (robusta):** Aggiungere rate limiting via Upstash Redis (già commentato
  in actions.ts) + persistenza lead su database (es. Vercel Postgres o Neon) come
  safety net indipendente da Web3Forms.
- **Priorità:** Post-lancio, da implementare appena il volume di lead giustifica il costo.

---

## Scuole

### [SCHOOLS-1] Testo narrativo per 73 scuole importate
- **Contesto:** 73 scuole su 77 hanno solo l'auto-descrizione generata da `buildAutoDescription()`
  in `lib/data/schools.ts`. Nessun contenuto editoriale (verdict, parentWhisper, highlights).
- **Opzione A:** Scraping headless con Playwright dai siti ufficiali delle scuole.
- **Opzione B:** Batch generation via Claude API (anthropic SDK) con prompt strutturato
  per ogni scuola.
- **Priorità:** Post-lancio — da pianificare come progetto separato.

---

## Validazione form

### [FORM-3] Validazione client-side real-time
- **Contesto:** Il form usa React 19 Server Actions con `useActionState`. Gli errori
  di validazione appaiono solo dopo il round-trip al server (Zod server-side).
  Non c'è validazione on-blur o real-time.
- **Proposta:** Aggiungere React Hook Form + zodResolver per validazione client-side
  parallela, mantenendo la validazione server-side come layer di sicurezza.
- **Trade-off:** Aggiunge dipendenza (`react-hook-form`) e complessità al componente.
  L'UX attuale è accettabile per il volume di lead atteso al lancio.
- **Priorità:** Post-lancio.
