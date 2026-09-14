"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { DEMO_REVIEWS, ReviewCardVisual, Stars } from "./ReviewCard";

// Illustrative rating distribution for the Store Reviews slide (5-star down to 1-star, as
// percentages). Not real merchant data — see the "Example storefront" caption below the
// composition, the same honesty convention DEMO_REVIEWS uses everywhere else on this site.
const RATING_DISTRIBUTION = [78, 15, 4, 2, 1];

// The hero's signature visual: a real product showcase carousel cycling through five actual
// Imagyn surfaces (Store Reviews, Product Reviews Widget, Review Carousel, AI Summary, Trust
// Badge — see widgetSurfaces.ts and TrustCertificationVisual.tsx for the real feature names
// and copy these are drawn from), replacing the previous abstract floating-card composition.
// Same autoplay/pause/swipe/keyboard/reduced-motion architecture as ProductCarousel further
// down this page, just built at hero scale with richer, more faithful slide content.
const SLIDES = [
  {
    key: "store-reviews",
    eyebrow: "Store Reviews",
    render: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-semibold tracking-[-0.02em] text-foreground">4.8</span>
          <div className="flex flex-col gap-1">
            <Stars rating={5} size={15} />
            <span className="text-[12px] text-muted-foreground">128 reviews across your catalog</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {RATING_DISTRIBUTION.map((width, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 text-[11px] text-muted-foreground">{5 - i}</span>
              <div className="h-1.5 flex-1 rounded-full bg-border">
                <div className="h-1.5 rounded-full bg-lime" style={{ width: `${width}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          Rolled up from every real, approved product review in your store.
        </p>
      </div>
    ),
  },
  {
    key: "product-reviews",
    eyebrow: "Product Reviews Widget",
    render: () => (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Stars rating={5} size={13} />
            <span className="text-sm font-semibold text-foreground">4.8 (128)</span>
          </div>
          <span className="rounded-full bg-lime px-3 py-1.5 text-[11px] font-semibold text-lime-ink">
            Write a review →
          </span>
        </div>
        <ReviewCardVisual review={DEMO_REVIEWS[0]} variant="modern" />
      </div>
    ),
  },
  {
    key: "review-carousel",
    eyebrow: "Review Carousel",
    render: () => (
      <div className="flex flex-col gap-3">
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          Your best approved reviews, pulled from across the whole catalog.
        </p>
        <div className="flex gap-2 sm:gap-3">
          {DEMO_REVIEWS.slice(0, 3).map((review) => (
            <div key={review.name} className="min-w-0 flex-1 rounded-xl border border-border p-2.5 sm:p-3">
              <Stars rating={review.rating} size={10} />
              <p className="mt-1.5 truncate text-[11px] font-semibold text-foreground sm:text-[12px]">
                {review.title}
              </p>
              <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-[11px]">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "ai-summary",
    eyebrow: "AI Review Summary",
    render: () => (
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-wide text-muted-foreground">AI summary</p>
        <p className="text-[14px] leading-relaxed text-foreground">
          Customers consistently praise fit and fast shipping, with occasional sizing notes on
          larger orders.
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-lime-soft px-2.5 py-1 text-[11px] font-medium text-lime-ink">
            True to size
          </span>
          <span className="rounded-full bg-lime-soft px-2.5 py-1 text-[11px] font-medium text-lime-ink">
            Fast shipping
          </span>
          <span className="rounded-full bg-lime-soft px-2.5 py-1 text-[11px] font-medium text-lime-ink">
            Great packaging
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "trust-badge",
    eyebrow: "Trust & Certification",
    render: () => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-surface px-4 py-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-ink">
            ✓
          </span>
          <span className="text-[13px] font-semibold text-foreground">Verified Buyer</span>
        </div>
        {["Transparent review practices", "Secure payment methods", "Verified store history"].map((label) => (
          <div key={label} className="flex items-center gap-2 text-[12px] text-foreground">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime text-[9px] font-bold text-lime-ink">
              ✓
            </span>
            {label}
          </div>
        ))}
      </div>
    ),
  },
];

const AUTOPLAY_MS = 4000;

export function HeroProductShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  const slide = SLIDES[index];

  return (
    <div className="flex w-full flex-col items-center md:items-end">
      <div
        className="w-full max-w-[620px] overflow-hidden rounded-[28px] bg-white shadow-elevated"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") goTo(index - 1);
          if (e.key === "ArrowRight") goTo(index + 1);
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
      >
        <div className="p-6 md:p-8">
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">{slide.eyebrow}</span>
          <div
            key={slide.key}
            aria-live="polite"
            className={`mt-5 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] ${
              reducedMotion ? "" : "animate-fade-in"
            }`}
          >
            {slide.render()}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-border bg-surface px-6 py-4">
          <button
            type="button"
            aria-label="Previous surface"
            onClick={() => goTo(index - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-label={`Go to ${s.eyebrow}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next surface"
            onClick={() => goTo(index + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent"
          >
            →
          </button>
        </div>
      </div>
      <span className="mt-4 text-[11px] tracking-wide text-white/40">Example storefront</span>
    </div>
  );
}
