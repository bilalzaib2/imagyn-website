"use client";

import { useInView, useCountUp, usePrefersReducedMotion } from "@/lib/motion";

const RATING_DISTRIBUTION = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 22 },
  { stars: 3, pct: 7 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

// Replaces hero-dashboard.png. Built from real Analytics/AI-summary fields
// (averageRating, totalReviews, summary — see app/services/analytics.server.ts and
// aiSummary.server.ts) rendered as illustrative, clearly-labeled demo values — never
// implied as Imagyn's own usage numbers.
export function AnalyticsVisualization() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const rating = useCountUp(4.8, inView, 1000);
  const total = useCountUp(128, inView, 1300);

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Example data</p>
          <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-foreground">
            {reducedMotion ? "4.8" : rating.toFixed(1)}
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              avg. rating · {reducedMotion ? "128" : Math.round(total)} reviews
            </span>
          </p>
        </div>
        <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-lime-ink">+12% this month</span>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {RATING_DISTRIBUTION.map((row, i) => (
          <div key={row.stars} className="flex items-center gap-3">
            <span className="w-10 text-xs font-medium text-muted-foreground">{row.stars} star</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-accent-soft">
              <div
                style={{
                  width: inView ? `${row.pct}%` : "0%",
                  transitionDelay: inView ? `${i * 100}ms` : "0ms",
                }}
                className="h-full rounded-full bg-foreground transition-[width] duration-700 ease-out motion-reduce:transition-none"
              />
            </div>
            <span className="w-8 text-right text-xs text-muted-foreground">{row.pct}%</span>
          </div>
        ))}
      </div>

      <div
        className={`mt-6 rounded-2xl bg-surface p-4 transition-all duration-500 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "500ms" : "0ms" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI summary</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          &ldquo;Customers consistently praise the fit and fast shipping. A few mention sizing runs
          small.&rdquo;
        </p>
      </div>
    </div>
  );
}
