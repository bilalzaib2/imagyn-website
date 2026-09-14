"use client";

import { useEffect, useState } from "react";
import { DEMO_REVIEWS, ReviewCardVisual, Stars } from "./ReviewCard";
import { useCountUp, usePrefersReducedMotion, useScrollProgress } from "@/lib/motion";

// The hero's signature visual: four real product surfaces (a review card, an AI summary
// chip, a verified trust chip, and a rating/count analytics chip) arrive in a fast, layered
// composition, then continue to drift subtly as the visitor scrolls (see useScrollProgress)
// so the hero reads as alive rather than a single static illustration. Entirely custom
// built from the same primitives every other page visual on this site uses (Stars,
// ReviewCardVisual), never a screenshot, never invented business numbers — the rating/count
// chip is explicitly labeled an example. A separate, simpler stacked layout renders on
// mobile (below) rather than shrinking this absolute-position composition, which would
// either overflow or become illegibly small on a narrow screen.
export function HeroComposition() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const rating = useCountUp(4.8, mounted, 550);
  const count = useCountUp(128, mounted, 650);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const review = DEMO_REVIEWS[0];

  // Scroll drift: a small extra offset layered on top of each card's resting transform,
  // driven by real scroll position through the hero's own bounds. Zero when the user
  // prefers reduced motion (the hook itself returns progress 0 in that case).
  const drift = (multiplier: number) => progress * multiplier;

  const stage = (delayMs: number, from: string) => ({
    transitionDelay: mounted ? `${delayMs}ms` : "0ms",
    transform: mounted ? "translate(0, 0) rotate(0deg)" : from,
  });

  return (
    <div ref={ref} className="relative flex min-h-[460px] items-center justify-center">
      {/* Desktop and up: the full layered composition. */}
      <div className="relative hidden h-[400px] w-full max-w-[440px] md:block">
        {/* Review card, the anchor surface, slightly rotated. */}
        <div
          style={{
            ...stage(0, "translate(-8px, 24px) rotate(-6deg)"),
            zIndex: 2,
          }}
          className={`absolute left-2 top-8 w-[240px] transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div style={{ transform: `translateY(${drift(-14)}px)` }}>
            <ReviewCardVisual review={review} variant="modern" />
          </div>
        </div>

        {/* AI summary chip, floats top right, arrives second. */}
        <div
          style={{
            ...stage(70, "translate(20px, -16px) rotate(4deg)"),
            zIndex: 3,
          }}
          className={`absolute right-0 top-0 w-[188px] rounded-2xl bg-white p-4 shadow-elevated transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div style={{ transform: `translate(${drift(10)}px, ${drift(-18)}px) rotate(${drift(2)}deg)` }}>
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
        </div>

        {/* Verified trust chip, floats left, arrives third. */}
        <div
          style={{
            ...stage(140, "translate(-32px, 8px) rotate(-8deg)"),
            zIndex: 4,
          }}
          className={`absolute -left-4 bottom-24 flex items-center gap-2 rounded-2xl bg-foreground px-4 py-3 shadow-elevated transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            style={{ transform: `translate(${drift(-16)}px, ${drift(10)}px)` }}
            className="flex items-center gap-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-ink">
              ✓
            </span>
            <span className="text-[12px] font-semibold text-white">Verified Buyer</span>
          </div>
        </div>

        {/* Rating and count chip, arrives last, the settling moment. */}
        <div
          style={{
            ...stage(210, "translate(24px, 20px) rotate(3deg)"),
            zIndex: 5,
          }}
          className={`absolute bottom-0 right-2 flex items-center gap-3 rounded-full bg-lime px-5 py-3 shadow-elevated transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div style={{ transform: `translateY(${drift(-8)}px)` }} className="flex items-center gap-3">
            <Stars rating={5} size={14} />
            <span className="text-sm font-semibold text-lime-ink">
              {reducedMotion ? "4.8" : rating.toFixed(1)} · {reducedMotion ? "128" : Math.round(count)} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: a deliberate stacked composition, not the desktop layout shrunk down.
          No absolute positioning, no scroll drift (kept calm and performant on a touch
          scroll), a quick fade-and-rise entrance per card. */}
      <div className="flex w-full max-w-[360px] flex-col gap-3 md:hidden">
        <div
          style={{ transitionDelay: mounted ? "0ms" : "0ms" }}
          className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <ReviewCardVisual review={review} variant="modern" />
        </div>
        <div
          style={{ transitionDelay: mounted ? "80ms" : "0ms" }}
          className={`flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-ink">
              ✓
            </span>
            <span className="text-[12px] font-semibold text-foreground">Verified Buyer</span>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">AI summary ready</span>
        </div>
        <div
          style={{ transitionDelay: mounted ? "150ms" : "0ms" }}
          className={`flex items-center gap-3 rounded-full bg-lime px-5 py-3 self-start shadow-soft transition-all duration-300 ease-out motion-reduce:transition-none ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
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
