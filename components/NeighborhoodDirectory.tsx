"use client";

/**
 * NeighborhoodDirectory — Client Component
 *
 * Renders the paginated, filterable directory of all neighborhoods.
 * Receives serialized minimal data from the NeighborhoodsList server component.
 *
 * Filters:
 *   - Sort: A→Z / Z→A
 *   - Area (region extracted from location field)
 *   - Price tier (from priceRangeLabel — 100% populated)
 *   - Family score (from familyFriendlyScore — 100% populated)
 *
 * Pagination: 12 per page.
 */

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NeighborhoodDirectoryItem {
  slug: string;
  name: string;
  location: string;
  area: string; // region extracted from location (part after comma, or full string)
  vibeAdjectives: string[];
  priceRangeLabel: string | null;
  familyFriendlyScore: number | null;
  isCurated: boolean;
}

interface Filters {
  sort: "az" | "za";
  area: string;
  price: string;
  familyScore: string;
}

const ITEMS_PER_PAGE = 12;

const PRICE_ORDER: Record<string, number> = {
  Affordable: 1,
  Mid: 2,
  "Upper-Mid": 3,
  High: 4,
};

const PRICE_LABELS: Record<string, string> = {
  Affordable: "Affordable",
  Mid: "Mid-Range",
  "Upper-Mid": "Upper-Mid",
  High: "High-End",
};

const PRICE_COLORS: Record<string, string> = {
  Affordable: "bg-green-50 text-green-700 border-green-100",
  Mid: "bg-blue-50 text-blue-700 border-blue-100",
  "Upper-Mid": "bg-amber-50 text-amber-700 border-amber-100",
  High: "bg-rose-50 text-rose-700 border-rose-100",
};

function familyScoreTier(score: number | null): string {
  if (score === null) return "Unknown";
  if (score >= 8) return "Excellent";
  if (score >= 7) return "Good";
  return "Moderate";
}

interface Props {
  neighborhoods: NeighborhoodDirectoryItem[];
}

export function NeighborhoodDirectory({ neighborhoods }: Props) {
  const [filters, setFilters] = useState<Filters>({
    sort: "az",
    area: "all",
    price: "all",
    familyScore: "all",
  });
  const [page, setPage] = useState(1);

  // Build dynamic area options from data
  const areaOptions = useMemo(() => {
    return ["all", ...Array.from(new Set(neighborhoods.map((n) => n.area))).sort()];
  }, [neighborhoods]);

  const filtered = useMemo(() => {
    let result = [...neighborhoods];

    if (filters.area !== "all") {
      result = result.filter((n) => n.area === filters.area);
    }

    if (filters.price !== "all") {
      result = result.filter((n) => n.priceRangeLabel === filters.price);
    }

    if (filters.familyScore !== "all") {
      result = result.filter((n) => familyScoreTier(n.familyFriendlyScore) === filters.familyScore);
    }

    result.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return filters.sort === "az" ? cmp : -cmp;
    });

    return result;
  }, [neighborhoods, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters({ sort: "az", area: "all", price: "all", familyScore: "all" });
    setPage(1);
  }

  function changePage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isFiltered =
    filters.area !== "all" ||
    filters.price !== "all" ||
    filters.familyScore !== "all";

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex items-center gap-1.5 text-ink-muted text-sm font-medium">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filter</span>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted font-medium">Sort</label>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-trust/30"
          >
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted font-medium">Area</label>
          <select
            value={filters.area}
            onChange={(e) => updateFilter("area", e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-trust/30"
          >
            {areaOptions.map((a) => (
              <option key={a} value={a}>
                {a === "all" ? "All Areas" : a}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted font-medium">Price Tier</label>
          <select
            value={filters.price}
            onChange={(e) => updateFilter("price", e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-trust/30"
          >
            <option value="all">All Prices</option>
            {Object.keys(PRICE_LABELS)
              .sort((a, b) => (PRICE_ORDER[a] ?? 99) - (PRICE_ORDER[b] ?? 99))
              .map((p) => (
                <option key={p} value={p}>
                  {PRICE_LABELS[p]}
                </option>
              ))}
          </select>
        </div>

        {/* Family score */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-muted font-medium">Family Score</label>
          <select
            value={filters.familyScore}
            onChange={(e) => updateFilter("familyScore", e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-trust/30"
          >
            <option value="all">All Scores</option>
            <option value="Excellent">Excellent (8+)</option>
            <option value="Good">Good (7)</option>
            <option value="Moderate">Moderate (6)</option>
          </select>
        </div>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="text-xs text-ink-muted underline hover:text-ink-primary self-end pb-1.5"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-muted">
        {filtered.length === neighborhoods.length
          ? `${neighborhoods.length} neighborhoods`
          : `${filtered.length} of ${neighborhoods.length} neighborhoods`}
      </p>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="py-16 text-center text-ink-muted">
          <p className="text-lg font-medium mb-2">No neighborhoods match your filters</p>
          <button onClick={clearFilters} className="text-sm underline hover:text-ink-primary">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((n) => (
            <div
              key={n.slug}
              className="relative flex flex-col rounded-xl border border-border bg-white p-4 hover:shadow-md transition-shadow"
            >
              {n.isCurated && (
                <span className="absolute top-3 right-3 text-xs font-bold text-warm bg-warm-light/40 border border-warm/20 px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}

              {/* Name + area */}
              <h3 className="font-semibold text-base text-ink-primary pr-16 leading-snug mb-1">
                {n.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-ink-muted mb-3">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{n.location}</span>
              </div>

              {/* Vibe pills */}
              {n.vibeAdjectives.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {n.vibeAdjectives.slice(0, 3).map((adj) => (
                    <span
                      key={adj}
                      className="text-xs px-2 py-0.5 rounded-full bg-surface-subtle border border-border text-ink-secondary"
                    >
                      {adj}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats row */}
              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/60 flex-wrap">
                {n.priceRangeLabel && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded border font-medium ${PRICE_COLORS[n.priceRangeLabel] ?? "bg-surface-subtle text-ink-muted border-border"}`}
                  >
                    {PRICE_LABELS[n.priceRangeLabel] ?? n.priceRangeLabel}
                  </span>
                )}
                {n.familyFriendlyScore !== null && (
                  <span className="text-xs text-ink-muted">
                    👨‍👩‍👧 {n.familyFriendlyScore}/10
                  </span>
                )}
              </div>

              <Link
                href={{ pathname: "/neighborhoods/[slug]", params: { slug: n.slug } }}
                className="mt-3 block w-full text-center text-sm font-medium text-trust border border-trust/30 rounded-lg py-1.5 hover:bg-trust/5 transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="sm"
              onClick={() => changePage(p)}
              className="w-9"
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
