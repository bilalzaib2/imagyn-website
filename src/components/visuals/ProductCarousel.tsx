"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Stars } from "./ReviewCard";

// A real platform-overview carousel, five compact illustrations of real Imagyn surfaces
// (never a screenshot, never invented numbers) cycling automatically, pausing on hover or
// keyboard focus, and swipeable on touch. Every slide's own detailed version lives further
// down this page or on its own dedicated page; this is a fast preview, not a duplicate.
const SLIDES = [
  {
    eyebrow: "Widgets",
    title: "Reviews, right on the product page.",
    render: () => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Stars rating={5} size={14} />
          <span className="text-[11px] font-medium text-muted-foreground">Verified</span>
        </div>
        <p className="text-sm font-semibold text-foreground">Exactly as described</p>
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          Fits perfectly and the color is even better in person.
        </p>
      </div>
    ),
  },
  {
    eyebrow: "AI Insights",
    title: "What customers actually mean, distilled.",
    render: () => (
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-semibold tracking-wide text-muted-foreground">AI summary</p>
        <p className="text-[13px] leading-relaxed text-foreground">
          Customers consistently praise fit and fast shipping, with occasional sizing notes.
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-foreground">True to size</span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-foreground">Fast shipping</span>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Trust & Certification",
    title: "A badge that has to earn it.",
    render: () => (
      <div className="flex flex-col gap-2">
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
  {
    eyebrow: "Analytics",
    title: "Your reviews, read as a trend.",
    render: () => (
      <div className="flex items-end gap-2">
        {[40, 65, 50, 80, 95].map((h, i) => (
          <div key={i} className="w-6 rounded-t bg-foreground" style={{ height: `${h}px` }} />
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Brand Studio",
    title: "Every widget, styled to match your store.",
    render: () => (
      <div className="flex gap-2">
        {["Minimal", "Modern", "Editorial", "Luxury"].map((style) => (
          <span key={style} className="rounded-full border border-border px-3 py-1.5 text-[11px] font-medium text-foreground">
            {style}
          </span>
        ))}
      </div>
    ),
  },
];

export function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  const slide = SLIDES[index];

  return (
    <div
      className="rounded-[28px] border border-border bg-white p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.02em] text-accent">{slide.eyebrow}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent"
          >
            →
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{slide.title}</h3>

      <div
        key={index}
        className={`mt-5 min-h-[110px] rounded-2xl bg-surface p-5 ${reducedMotion ? "" : "animate-fade-in"}`}
      >
        {slide.render()}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.eyebrow}
            type="button"
            aria-label={`Go to ${s.eyebrow} slide`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
