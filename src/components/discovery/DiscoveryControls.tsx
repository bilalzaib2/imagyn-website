"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";
import type { Facet, ReviewSort } from "@/lib/discovery";
import { REVIEW_SORTS, formatCount } from "@/lib/discovery";

// The one control row every discovery surface uses: a mode switch, sort tabs, and a filter
// drawer. All state lives in the URL, which is what makes a filtered view shareable, indexable
// and back-button-correct — and means the server components below re-render from the query
// string rather than this component holding a second copy of the truth.
//
// Facets are passed in already counted by the API, and only facets with content behind them
// are ever rendered. That is deliberate: a filter that leads to an empty result set is the
// fastest way to make a young network feel broken.

const MODES = [
  { value: "reviews", label: "Reviews", href: "/reviews" },
  { value: "products", label: "Products", href: "/products" },
  { value: "stores", label: "Stores", href: "/stores" },
] as const;

export type DiscoveryMode = (typeof MODES)[number]["value"];

function SegmentedModes({ active }: { active: DiscoveryMode }) {
  const router = useRouter();

  return (
    <div className="inline-flex shrink-0 rounded-full border border-border bg-surface p-[3px]" role="tablist" aria-label="Browse by">
      {MODES.map((mode) => {
        const isActive = mode.value === active;
        return (
          <button
            key={mode.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => router.push(mode.href)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h14M6 10h8M8.5 14h3" />
    </svg>
  );
}

function DiscoveryControlsInner({
  mode,
  facets,
  total,
  showSort = true,
}: {
  mode: DiscoveryMode;
  facets?: { categories: Facet[]; stores: Facet[] };
  total?: number;
  showSort?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sort = (params.get("sort") as ReviewSort) || "latest";

  // Every filter change drops the cursor — otherwise a page-2 cursor from the previous filter
  // would be applied to a different result set.
  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
      next.delete("cursor");
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const toggleFlag = useCallback((key: string) => setParam(key, params.get(key) === "true" ? null : "true"), [params, setParam]);

  const activeCount = useMemo(
    () => ["verified", "withPhotos", "withVideo", "rating", "category", "store"].filter((k) => params.get(k)).length,
    [params],
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams();
    const keptSort = params.get("sort");
    if (keptSort) next.set("sort", keptSort);
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, pathname, router]);

  const categories = facets?.categories ?? [];
  const stores = facets?.stores ?? [];
  const hasFilters = categories.length > 0 || stores.length > 0 || mode === "reviews";

  return (
    <div className="sticky top-2 z-30">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-border bg-background/85 px-3 py-2.5 backdrop-blur-md">
        <SegmentedModes active={mode} />

        {showSort ? (
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto" role="tablist" aria-label="Sort by">
            {REVIEW_SORTS.map((option) => {
              const isActive = option.value === sort;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setParam("sort", option.value === "latest" ? null : option.value)}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] transition-colors ${
                    isActive ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="min-w-0 flex-1" />
        )}

        {typeof total === "number" ? (
          <span className="hidden shrink-0 text-[12px] tabular-nums text-muted-foreground sm:inline">
            {formatCount(total)} results
          </span>
        ) : null}

        {hasFilters ? (
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              activeCount > 0 || filtersOpen
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground"
            }`}
          >
            <FilterIcon />
            Filter
            {activeCount > 0 ? <span className="tabular-nums">{activeCount}</span> : null}
          </button>
        ) : null}
      </div>

      {filtersOpen && hasFilters ? (
        <div className="mt-2 grid gap-5 rounded-2xl border border-border bg-surface p-4 shadow-soft">
          {mode === "reviews" ? (
            <FilterGroup label="Show only">
              <FilterToggle label="Verified purchases" active={params.get("verified") === "true"} onClick={() => toggleFlag("verified")} />
              <FilterToggle label="With photos" active={params.get("withPhotos") === "true"} onClick={() => toggleFlag("withPhotos")} />
              <FilterToggle label="With video" active={params.get("withVideo") === "true"} onClick={() => toggleFlag("withVideo")} />
            </FilterGroup>
          ) : null}

          {mode === "reviews" ? (
            <FilterGroup label="Rating">
              {[5, 4, 3, 2, 1].map((star) => (
                <FilterToggle
                  key={star}
                  label={`${star} star${star === 1 ? "" : "s"}`}
                  active={params.get("rating") === String(star)}
                  onClick={() => setParam("rating", params.get("rating") === String(star) ? null : String(star))}
                />
              ))}
            </FilterGroup>
          ) : null}

          {categories.length > 0 ? (
            <FilterGroup label="Category">
              {categories.map((facet) => (
                <FilterToggle
                  key={facet.value}
                  label={facet.label}
                  count={facet.count}
                  active={params.get("category") === facet.value}
                  onClick={() => setParam("category", params.get("category") === facet.value ? null : facet.value)}
                />
              ))}
            </FilterGroup>
          ) : null}

          {stores.length > 0 ? (
            <FilterGroup label="Store">
              {stores.map((facet) => (
                <FilterToggle
                  key={facet.value}
                  label={facet.label}
                  count={facet.count}
                  active={params.get("store") === facet.value}
                  onClick={() => setParam("store", params.get("store") === facet.value ? null : facet.value)}
                />
              ))}
            </FilterGroup>
          ) : null}

          {activeCount > 0 ? (
            <div>
              <button
                type="button"
                onClick={clearAll}
                className="text-[13px] font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Clear all filters
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** useSearchParams() opts a component into client-side rendering, which Next requires to sit
 *  behind a Suspense boundary on any statically-generated page. Wrapping it here rather than at
 *  each call site means no future page can forget it and fail the production build. The
 *  fallback mirrors the real control row's height so the page doesn't jump as it hydrates. */
export function DiscoveryControls(props: Parameters<typeof DiscoveryControlsInner>[0]) {
  return (
    <Suspense fallback={<div className="sticky top-2 z-30 h-[58px] rounded-2xl border border-border bg-background/85" />}>
      <DiscoveryControlsInner {...props} />
    </Suspense>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterToggle({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground"
      }`}
    >
      {label}
      {typeof count === "number" ? <span className="tabular-nums opacity-60">{formatCount(count)}</span> : null}
    </button>
  );
}
