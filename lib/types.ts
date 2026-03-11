/**
 * Shared domain types for TrustFamily Relocation.
 *
 * Both School and Neighborhood are consumed by:
 *   - lib/schools-data.ts / lib/neighborhoods-data.ts (data)
 *   - components/SchoolsList.tsx / NeighborhoodsList.tsx (render)
 *   - app/[locale]/schools/[slug]/page.tsx (detail + JSON-LD)
 *   - app/[locale]/neighborhoods/[slug]/page.tsx (detail + JSON-LD)
 *   - app/[locale]/best-private-.../page.tsx (ItemList JSON-LD)
 *   - app/[locale]/top-neighborhoods/page.tsx (ItemList JSON-LD)
 *
 * Phase 5 upgrade path: becomes the Zod schema for Supabase/Prisma.
 */

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

// ── Neighborhood structured data (non-translatable) ──────────────────────────

export interface NeighborhoodRealEstate {
  avgRent1BedEur?: number;
  avgRent2BedEur?: number;
  avgRent3BedEur?: number;
  avgPricePerSqmBuyEur?: number;
  priceRangeLabel?: string;    // "Low" | "Mid" | "High" | "Very High"
  priceTrendYoyPct?: number;   // YoY % change (positive = rising)
  dataDate?: string;           // e.g. "2025-Q4"
}

export interface NeighborhoodFamilyLiving {
  familyFriendlyScore?: number; // 0–10
  safetyScore?: number;         // 0–10
  walkabilityScore?: number;    // 0–10
  greenSpacesScore?: number;    // 0–10
  beachAccess?: boolean;
  beachDistanceKm?: number;
  noiseLevel?: string;          // "Quiet" | "Moderate" | "Busy" | "Active"
}

export interface NeighborhoodDemographics {
  expatPopulationPct?: number;
  predominantExpatNationalities?: string[];
  englishFriendliness?: string; // "High" | "Medium" | "Low"
}

export interface NeighborhoodCostOfLiving {
  totalMonthlyEstimateEur?: number;
  comparedToLisbonCenterPct?: number; // negative = cheaper than Lisbon
  costLevel?: string;                 // "Average" | "High" | "Low" | "Very High"
}

export interface NeighborhoodExpatCommunity {
  strength?: string;             // "Strong" | "Moderate" | "Low"
  digitalNomadFriendly?: boolean;
  nhrTaxRegimePopular?: boolean;
}

export interface NeighborhoodTransportInfo {
  publicTransportQuality?: string; // "Good" | "Fair" | "Limited"
  metroAccess?: boolean;
  trainLines?: string[];
}

// ── i18n translation buckets (Opzione C) ─────────────────────────────────────
// Only `en` is required; other locales are optional and fall back to `en`.

export interface SchoolTranslation {
  description?: string;
  verdict?: string;
  parentWhisper?: string;
  highlights?: string[];
  trustBadges?: string[];
}

export interface TestimonialTranslation {
  quote: string;
}

export interface Testimonial {
  id: number;
  attribution: string;
  detail: string;
  translations: { en: TestimonialTranslation } & Partial<
    Record<LocaleKey, TestimonialTranslation>
  >;
}

export interface NeighborhoodTranslation {
  vibe: string;
  description: string;
  highlights: string[];        // pros / reasons families love it
  cons?: string[];             // optional: only populated from JSON import (EN only)
  commuteContext: string;
  vibeAdjectives: string[];
  amenities: string[];
}

export type LocaleKey = "pt" | "de" | "fr" | "nl" | "es";

export interface School {
  // ── Core identity ───────────────────────────────────────────────
  id: string;
  slug: string;
  name: string;
  location: string;
  neighborhoodSlug?: string;  // optional: curated schools set this; imported schools don't

  // ── Academic profile (non-translatable) ─────────────────────────
  curriculum: string;
  fees: string;

  // ── Trust Intelligence ──────────────────────────────────────────
  inspectionDate?: string;
  acceptanceRate?: string;
  visitCount?: number;
  feeDocument?: string;

  // ── Enriched data from scraper (imported schools) ────────────────
  ageRange?: string;           // e.g. "3–18"
  schoolType?: string;         // "International" | "Private" | etc.
  website?: string;            // school website URL
  englishAsPrimary?: boolean;  // English is primary language of instruction
  schoolBusRoutes?: boolean;   // school bus service available
  dataConfidence?: "High" | "Medium" | "Low";
  studentCount?: number;       // total students enrolled
  // New enriched fields from updated JSON schema
  admissionProcess?: string;   // scraped admission process text
  extracurriculars?: string[];  // extracurricular activities list
  transport?: string;          // transport info (from expat_family_features.transport)
  languageSupport?: string;    // language support info
  rawDescription?: string[];   // description keywords/facts array from raw JSON
  qualifications?: string[];   // e.g. ["IGCSE", "A-Level", "IB Diploma"]
  classSize?: number;          // average students per class
  nationalities?: number;      // number of student nationalities
  snippet?: string;            // school-specific sentences from narrative_context
  coverImageUrl?: string;      // school cover photo URL (from images.cover_url)
  imageAlt?: string;           // alt text for cover image
  rawRegion?: string;          // raw location.region value from JSON (e.g. "Lisbon Region")

  // ── Phase 4: SEO/GEO structured data ───────────────────────────
  coordinates: GeoCoordinates | null;

  // ── i18n translations ───────────────────────────────────────────
  translations: { en: SchoolTranslation } & Partial<
    Record<LocaleKey, SchoolTranslation>
  >;
}

export interface Neighborhood {
  // ── Core identity ───────────────────────────────────────────────
  id: string;
  slug: string;
  name: string;
  location: string;

  // ── SEO/GEO structured data ─────────────────────────────────────
  coordinates: GeoCoordinates;

  // ── Structured data (non-translatable, from JSON database) ──────
  realEstate?: NeighborhoodRealEstate;
  familyLiving?: NeighborhoodFamilyLiving;
  demographics?: NeighborhoodDemographics;
  costOfLiving?: NeighborhoodCostOfLiving;
  expatCommunity?: NeighborhoodExpatCommunity;
  transport?: NeighborhoodTransportInfo;

  // ── i18n translations ───────────────────────────────────────────
  translations: { en: NeighborhoodTranslation } & Partial<
    Record<LocaleKey, NeighborhoodTranslation>
  >;
}
