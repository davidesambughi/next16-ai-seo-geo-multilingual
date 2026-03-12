/**
 * geocode-schools.ts
 *
 * One-shot script to fill in missing coordinates in schools-database.json.
 * Uses Nominatim (OpenStreetMap) — free, no API key required.
 *
 * Usage:
 *   npx tsx scripts/geocode-schools.ts
 *
 * Rate limit: 1 request/second (Nominatim policy).
 * Results are written back into lib/data/raw/schools-database.json.
 */

import fs from "fs";
import path from "path";

const DB_PATH = path.resolve(
  __dirname,
  "../lib/data/raw/schools-database.json"
);

type RawCoordinates = { lat: number; lng: number } | null;
type RawSchool = {
  name: string;
  location?: {
    city?: string | null;
    region?: string | null;
    coordinates?: RawCoordinates;
  };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(
  name: string,
  city: string | null | undefined,
  region: string | null | undefined
): Promise<RawCoordinates> {
  const query = [name, city, region, "Portugal"]
    .filter(Boolean)
    .join(", ");
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Raising Kids in Portugal-geocoder/1.0" },
  });

  if (!res.ok) {
    console.error(`  HTTP ${res.status} for query: ${query}`);
    return null;
  }

  const results = (await res.json()) as Array<{ lat: string; lon: string }>;
  if (!results.length) {
    console.warn(`  No result for: ${query}`);
    return null;
  }

  return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
}

async function main() {
  const raw: RawSchool[] = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  const missing = raw.filter(
    (s) =>
      !s.location?.coordinates ||
      s.location.coordinates === null
  );

  console.log(`Found ${missing.length} school(s) with missing coordinates.\n`);

  if (missing.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  let resolved = 0;
  let failed = 0;

  for (const school of missing) {
    console.log(`Geocoding: ${school.name}`);
    const coords = await geocode(
      school.name,
      school.location?.city,
      school.location?.region
    );

    if (coords) {
      school.location!.coordinates = coords;
      console.log(`  ✓ ${coords.lat}, ${coords.lng}`);
      resolved++;
    } else {
      console.log(`  ✗ Failed — coordinates remain null`);
      failed++;
    }

    // Nominatim rate limit: max 1 req/sec
    await sleep(1100);
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(raw, null, 2), "utf-8");

  console.log(
    `\nDone. Resolved: ${resolved} | Failed: ${failed} | Written to: ${DB_PATH}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
