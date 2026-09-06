"use client";

import { useEffect, useState } from "react";
import { DEMO_REVIEWS, ReviewCardVisual } from "./ReviewCard";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

// Maps directly to the app's real 5 Brand Studio presets
// (app/services/appearance.presets.ts): minimal, modern, editorial, luxury, custom.
const PRESETS = ["minimal", "modern", "editorial", "luxury", "custom"] as const;

export function BrandTransformation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const id = setInterval(() => setActive((v) => (v + 1) % PRESETS.length), 2200);
    return () => clearInterval(id);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset, i) => (
          <button
            key={preset}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              active === i ? "bg-foreground text-white" : "bg-accent-soft text-muted-foreground"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center py-4">
        <ReviewCardVisual review={DEMO_REVIEWS[1]} variant={PRESETS[active]} className="w-full max-w-[320px]" />
      </div>
    </div>
  );
}
