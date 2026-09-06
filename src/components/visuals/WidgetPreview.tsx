"use client";

import { useEffect, useState } from "react";
import { DEMO_REVIEWS, Stars } from "./ReviewCard";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

const FORMATS = [
  { key: "list", label: "Product reviews widget" },
  { key: "badge", label: "Rating badge" },
  { key: "carousel", label: "Review carousel" },
  { key: "collection", label: "Collection ratings" },
] as const;

// Replaces feature-widgets.png. Cycles the same review object through the four real
// on-site widget formats (see app/routes/app.widgets.tsx) instead of a single static
// screenshot — the "one review, everywhere it matters" idea made concrete.
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
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
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
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Verified</span>
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
  );
}
