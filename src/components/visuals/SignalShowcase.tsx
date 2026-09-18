"use client";

import { useInView, useCountUp, usePrefersReducedMotion } from "@/lib/motion";
import { Stars } from "./ReviewCard";

// The homepage's one deliberate oversized-number moment. Deliberately NOT the shared
// AnalyticsVisualization card (used on /analytics against a light surface) — this is a
// dark, full-width, typography-led composition, breaking the left-text/right-card zigzag
// this same story used to run in. Lime is spent in exactly one place here (the stars),
// keeping the accent rare on a page that otherwise reads black/white/neutral.
export function SignalShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const rating = useCountUp(4.8, inView, 1100);
  const total = useCountUp(128, inView, 1400);

  return (
    <div ref={ref} className="flex flex-col items-center gap-10 text-center">
      <p
        className={`text-[clamp(4rem,11vw,7.5rem)] font-semibold leading-none tracking-[-0.045em] text-white transition-opacity duration-700 motion-reduce:transition-none ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        {reducedMotion ? "4.8" : rating.toFixed(1)}
      </p>
      <div className="flex flex-col items-center gap-3">
        <Stars rating={5} size={20} color="var(--lime)" emptyColor="rgba(255,255,255,0.15)" />
        <p className="text-[13px] text-white/50">
          {reducedMotion ? "128" : Math.round(total)} example reviews, refreshed automatically
        </p>
      </div>
      <p className="max-w-md text-lg leading-relaxed text-white/80">
        &ldquo;Customers consistently praise the fit and fast shipping. A few mention sizing
        runs small.&rdquo;
      </p>
      <span className="text-[11px] font-medium text-white/30">Illustrative example data</span>
    </div>
  );
}
