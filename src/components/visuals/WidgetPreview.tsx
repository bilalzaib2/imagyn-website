"use client";

import { useEffect, useState } from "react";
import { DEMO_REVIEWS, Stars } from "./ReviewCard";
import { CircleCluster } from "@/components/CircleCluster";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

const FORMATS = [
  { key: "list", label: "Product reviews widget" },
  { key: "badge", label: "Rating badge" },
  { key: "carousel", label: "Review carousel" },
  { key: "collection", label: "Collection ratings" },
] as const;

// Cycles the same review object through the four real
// on-site widget formats (see app/routes/app.widgets.tsx) instead of a single static
// screenshot, the "one review, everywhere it matters" idea made concrete.
export function WidgetPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const id = setInterval(() => setActive((v) => (v + 1) % FORMATS.length), 2600);
    return () => clearInterval(id);
  }, [inView, reducedMotion]);

  const review = DEMO_REVIEWS[0];

  return (
    <div ref={ref} className="overflow-hidden rounded-[28px] border border-border bg-white shadow-elevated">
      {/* Storefront chrome: frames every widget format as it actually appears, sitting on a
          real product page, rather than a card floating with no context. The "product" tile
          reuses the brand's own circle motif as an abstract stand-in, never a stock photo
          pretending to be a real product. */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-5 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="ml-2 flex-1 truncate rounded-full border border-border bg-white px-3 py-1.5 text-[11px] text-muted-foreground">
          yourstore.myshopify.com/products/example
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
            <CircleCluster layout="corner" color="var(--muted-foreground)" className="h-9 w-9" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-foreground">Classic Knit Sweater</p>
            <p className="text-[13px] text-muted-foreground">$48.00</p>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((format, i) => (
              <button
                key={format.key}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === i ? "bg-foreground text-white" : "bg-accent-soft text-muted-foreground"
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>

          <div className="relative mt-6 flex h-[160px] items-center justify-center">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none ${
                active === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-full max-w-[320px] rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <Stars rating={review.rating} size={13} />
                  <span className="text-[10px] font-semibold text-muted-foreground">Verified</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{review.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{review.body}</p>
              </div>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none ${
                active === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2">
                <Stars rating={5} size={14} />
                <span className="text-sm font-semibold text-foreground">4.8 (128)</span>
              </div>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-500 motion-reduce:transition-none ${
                active === 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              {DEMO_REVIEWS.slice(0, 3).map((r) => (
                <div key={r.name} className="w-[110px] rounded-xl border border-border p-3">
                  <Stars rating={r.rating} size={9} />
                  <p className="mt-1.5 text-[11px] font-semibold leading-tight text-foreground">{r.title}</p>
                </div>
              ))}
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-500 motion-reduce:transition-none ${
                active === 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex w-[90px] flex-col items-center gap-2">
                  <div className="h-16 w-16 rounded-xl bg-accent-soft" aria-hidden="true" />
                  <span className="flex items-center gap-1 text-[11px] font-medium text-foreground">
                    <Stars rating={5} size={9} />
                    (24)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
