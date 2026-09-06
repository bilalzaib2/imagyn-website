"use client";

import { useEffect, useState } from "react";
import { DEMO_REVIEWS, ReviewCardVisual, Stars } from "./ReviewCard";
import { useCountUp, usePrefersReducedMotion } from "@/lib/motion";

// The hero's signature visual: review cards arrive and settle into a trust summary — the
// same "reviews become proof" idea the rest of the page develops, established up front.
// Entirely custom-built (no app screenshot): three real review cards drift in with a
// gentle stagger, and a rating/count chip counts up to illustrate what they become. Values
// are explicitly labeled as an example, never presented as Imagyn's own usage numbers.
export function HeroStream() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const rating = useCountUp(4.8, mounted, 1000);
  const count = useCountUp(128, mounted, 1200);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const cards = DEMO_REVIEWS.slice(0, 3);

  return (
    <div className="relative flex min-h-[420px] items-center justify-center">
      <div className="relative w-full max-w-[420px]">
        {cards.map((review, i) => (
          <div
            key={review.name}
            style={{
              transitionDelay: mounted ? `${i * 160}ms` : "0ms",
              zIndex: i,
              transform: mounted
                ? `translate(${i * 18}px, ${i * 34}px) rotate(${(i - 1) * 2.5}deg)`
                : `translate(${i * 18}px, ${i * 34 + 24}px) rotate(${(i - 1) * 2.5}deg)`,
            }}
            className={`absolute left-0 top-0 w-[280px] transition-all duration-700 ease-out motion-reduce:transition-none ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <ReviewCardVisual review={review} variant="modern" />
          </div>
        ))}

        {/* Spacer so the absolutely-positioned stack still reserves real layout height. */}
        <div aria-hidden="true" className="invisible w-[280px]">
          <ReviewCardVisual review={cards[0]} variant="modern" />
        </div>

        <div
          style={{ transitionDelay: mounted ? "560ms" : "0ms" }}
          className={`absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-lime px-5 py-3 shadow-elevated transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Stars rating={5} size={14} />
          <span className="text-sm font-semibold text-lime-ink">
            {reducedMotion ? "4.8" : rating.toFixed(1)} · {reducedMotion ? "128" : Math.round(count)} reviews
          </span>
        </div>
      </div>

      <span className="absolute bottom-0 right-0 text-[11px] uppercase tracking-wide text-white/30">
        Example storefront
      </span>
    </div>
  );
}
