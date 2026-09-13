"use client";

import { useEffect, useState } from "react";
import { DEMO_REVIEWS, ReviewCardVisual, Stars } from "./ReviewCard";
import { useCountUp, usePrefersReducedMotion } from "@/lib/motion";

// The hero's signature visual: four real product surfaces (a review card, an AI summary
// chip, a verified trust chip, and a rating/count analytics chip) drift into a loose,
// layered composition rather than a single stack, so the hero reads as "a platform" rather
// than "a review widget." Entirely custom-built from the same primitives every other page
// visual on this site uses (Stars, ReviewCardVisual), never a screenshot, never invented
// business numbers — the rating/count chip is explicitly labeled an example.
export function HeroComposition() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const rating = useCountUp(4.8, mounted, 1000);
  const count = useCountUp(128, mounted, 1200);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const review = DEMO_REVIEWS[0];

  const stage = (delayMs: number, from: string) => ({
    transitionDelay: mounted ? `${delayMs}ms` : "0ms",
    transform: mounted ? "translate(0, 0) rotate(0deg)" : from,
  });

  return (
    <div className="relative flex min-h-[460px] items-center justify-center">
      <div className="relative h-[400px] w-full max-w-[440px]">
        {/* Review card — the anchor surface, slightly rotated. */}
        <div
          style={{
            ...stage(0, "translate(-8px, 40px) rotate(-6deg)"),
            zIndex: 2,
          }}
          className={`absolute left-2 top-8 w-[240px] transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <ReviewCardVisual review={review} variant="modern" />
        </div>

        {/* AI summary chip — floats top right, arrives second. */}
        <div
          style={{
            ...stage(180, "translate(20px, -24px) rotate(4deg)"),
            zIndex: 3,
          }}
          className={`absolute right-0 top-0 w-[188px] rounded-2xl bg-white p-4 shadow-elevated transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[10px] font-semibold tracking-wide text-muted-foreground">AI summary</p>
          <p className="mt-2 text-[12px] leading-relaxed text-foreground">
            Customers consistently praise fit and fast shipping.
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[10px] font-medium text-lime-ink">
              True to size
            </span>
            <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[10px] font-medium text-lime-ink">
              Fast shipping
            </span>
          </div>
        </div>

        {/* Verified trust chip — floats left, arrives third. */}
        <div
          style={{
            ...stage(340, "translate(-32px, 10px) rotate(-8deg)"),
            zIndex: 4,
          }}
          className={`absolute -left-4 bottom-24 flex items-center gap-2 rounded-2xl bg-foreground px-4 py-3 shadow-elevated transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-ink">
            ✓
          </span>
          <span className="text-[12px] font-semibold text-white">Verified Buyer</span>
        </div>

        {/* Rating and count chip — arrives last, the settling moment. */}
        <div
          style={{
            ...stage(520, "translate(24px, 28px) rotate(3deg)"),
            zIndex: 5,
          }}
          className={`absolute bottom-0 right-2 flex items-center gap-3 rounded-full bg-lime px-5 py-3 shadow-elevated transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Stars rating={5} size={14} />
          <span className="text-sm font-semibold text-lime-ink">
            {reducedMotion ? "4.8" : rating.toFixed(1)} · {reducedMotion ? "128" : Math.round(count)} reviews
          </span>
        </div>
      </div>

      <span className="absolute bottom-0 left-0 text-[11px] tracking-wide text-white/30">Example storefront</span>
    </div>
  );
}
