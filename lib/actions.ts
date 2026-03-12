'use server';

import { z } from 'zod';
import { leadSchema } from '@/lib/schemas/lead-form';
import { schoolsData, neighborhoodsData } from '@/lib/data';

export type State = {
  errors?: {
    [K in keyof z.infer<typeof leadSchema>]?: string[];
  };
  message?: string | null;
  success?: boolean;
};

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Bot protection options:
//   Option A — Upstash Redis (best for Vercel serverless):
//     import { Ratelimit } from '@upstash/ratelimit';
//     Limit: 5 submissions per IP per hour.
//
//   Option B — Vercel Edge Middleware (proxy.ts):
//     Use the `@vercel/edge` rate limiting helpers on the /api route.
//
//   Option C — Honeypot field ✅ implemented:
//     Hidden <input name="trap"> in the form; bots fill it, humans don't.
//     Checked as Step 0 before any other work.
//
// Required env vars: WEB3FORMS_ACCESS_KEY (Step 3) | UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (Option A only)
// ─────────────────────────────────────────────────────────────────────────────

// Allowlists derived from the canonical data arrays.
// Validated server-side to prevent bypassing the UI <Select> via direct POST.
const VALID_SCHOOL_NAMES = new Set(schoolsData.map((s) => s.name));
const VALID_NEIGHBORHOOD_NAMES = new Set(neighborhoodsData.map((n) => n.name));

export async function submitLead(prevState: State, formData: FormData): Promise<State> {
  // 0 — Honeypot: bots fill the hidden trap field, humans leave it empty
  const trap = formData.get('trap');
  if (trap) {
    return { success: true, message: 'Lead created successfully.' };
  }

  // 1 — Structural + format validation (Zod)
  const validatedFields = leadSchema.safeParse({
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    nationality: formData.get('nationality'),
    phone: formData.get('phone'),
    interestedSchool: formData.get('interestedSchool'),
    interestedNeighborhood: formData.get('interestedNeighborhood'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Lead.',
      success: false,
    };
  }

  const data = validatedFields.data;

  // 2 — Allowlist validation for select fields
  // Rejects values that bypassed the browser UI (e.g. direct HTTP POST)
  if (data.interestedSchool && !VALID_SCHOOL_NAMES.has(data.interestedSchool)) {
    return {
      errors: { interestedSchool: ['Invalid school selection.'] },
      success: false,
    };
  }
  if (data.interestedNeighborhood && !VALID_NEIGHBORHOOD_NAMES.has(data.interestedNeighborhood)) {
    return {
      errors: { interestedNeighborhood: ['Invalid neighborhood selection.'] },
      success: false,
    };
  }

  // 3 — Web3Forms: invia email con i dati del lead (zero infrastruttura)
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn('[LEAD_NO_KEY] WEB3FORMS_ACCESS_KEY not set. Lead:', JSON.stringify(data));
  } else {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Nuovo lead — Raising Kids in Portugal Relocation',
          from_name: 'Raising Kids in Portugal Funnel',
          replyto: data.email,
          // Campi del lead
          'Full Name': data.fullName,
          Email: data.email,
          Phone: data.phone ?? '',
          Nationality: data.nationality,
          'Interested School': data.interestedSchool ?? '',
          'Interested Neighborhood': data.interestedNeighborhood ?? '',
          Message: data.message ?? '',
          Timestamp: new Date().toISOString(),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? `HTTP ${res.status}`);
    } catch (err) {
      // Non blocchiamo l'utente — dati recuperabili dai Vercel logs
      console.error('[LEAD_FALLBACK]', JSON.stringify({
        timestamp: new Date().toISOString(),
        error: String(err),
        ...data,
      }));
    }
  }

  return {
    success: true,
    message: 'Lead created successfully.',
  };
}
