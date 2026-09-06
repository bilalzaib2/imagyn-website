"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO_REVIEWS, ReviewCardVisual, Stars } from "./ReviewCard";
import { Reveal } from "@/components/Reveal";

const STAGES = [
  {
    key: "collect",
    eyebrow: "Collect",
    title: "A request goes out. A review comes back.",
    body: "Customers rate and write a review directly from a review request — no account, no friction.",
  },
  {
    key: "understand",
    eyebrow: "Understand",
    title: "Trustworthy reviews publish themselves.",
    body: "Set a minimum rating and a banned-word list once. Reviews that clear the bar auto-publish; everything else waits for you.",
  },
  {
    key: "showcase",
    eyebrow: "Showcase",
    title: "One review, everywhere it matters.",
    body: "The same approved review becomes a storefront review, a rating badge, and a collection-grid star — styled to match your brand.",
  },
] as const;

// The signature interaction: one review object visibly becomes Collect → Understand →
// Showcase as the visitor scrolls, using three IntersectionObserver triggers (one per
// stage) instead of a scroll-position listener — no per-frame scroll math, just three
// cheap, native, disconnect-when-done observers.
export function JourneySection() {
  const [activeStage, setActiveStage] = useState(0);
  const triggerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const observers = triggerRefs.map((ref, index) => {
      if (!ref.current) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStage(index);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      observer.observe(ref.current);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        {/* Desktop/tablet: the full pinned-panel scroll interaction. */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-[40vh] py-[10vh]">
            {STAGES.map((stage, index) => (
              <div key={stage.key} ref={triggerRefs[index]} className="flex flex-col gap-4">
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 motion-reduce:transition-none ${
                    activeStage === index ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {stage.eyebrow}
                </span>
                <h3
                  className={`text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] transition-colors duration-300 motion-reduce:transition-none ${
                    activeStage === index ? "text-foreground" : "text-muted-foreground/40"
                  }`}
                >
                  {stage.title}
                </h3>
                <p
                  className={`max-w-md text-base leading-relaxed transition-colors duration-300 motion-reduce:transition-none ${
                    activeStage === index ? "text-muted-foreground" : "text-muted-foreground/30"
                  }`}
                >
                  {stage.body}
                </p>
              </div>
            ))}
          </div>

          <div className="sticky top-32 h-[420px]">
            <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-border bg-surface">
              <StageVisual stage={activeStage} />
            </div>
          </div>
        </div>

        {/* Mobile/small tablet: pinning three stages behind ~250vh of scroll doesn't
            translate below lg — instead each stage gets its own text + illustration,
            revealed in sequence. Same storytelling, no scroll-position tracking needed. */}
        <div className="flex flex-col gap-16 lg:hidden">
          {STAGES.map((stage, index) => (
            <Reveal key={stage.key} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                  {stage.eyebrow}
                </span>
                <h3 className="text-[clamp(1.5rem,5vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground">
                  {stage.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">{stage.body}</p>
              </div>
              <div className="relative h-[300px] w-full overflow-hidden rounded-[28px] border border-border bg-surface">
                <StageVisual stage={index} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StageVisual({ stage }: { stage: number }) {
  const review = DEMO_REVIEWS[0];

  return (
    <div className="relative h-full w-full">
      {/* Collect */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-10 transition-all duration-500 motion-reduce:transition-none ${
          stage === 0 ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Review request</p>
            <p className="mt-1 text-sm font-semibold text-foreground">How was your order?</p>
            <div className="mt-3 flex justify-center">
              <Stars rating={5} size={18} />
            </div>
          </div>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-muted-foreground/40">
            <path d="M10 0v24m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <ReviewCardVisual review={review} variant="minimal" className="w-[220px]" />
        </div>
      </div>

      {/* Understand */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-10 transition-all duration-500 motion-reduce:transition-none ${
          stage === 1 ? "translate-x-0 opacity-100" : stage < 1 ? "translate-x-6 opacity-0" : "-translate-x-6 opacity-0"
        }`}
      >
        <div className="flex w-full max-w-[280px] flex-col gap-3">
          {DEMO_REVIEWS.slice(0, 3).map((r, i) => (
            <div key={r.name} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-soft">
              <div className="flex items-center gap-2">
                <Stars rating={r.rating} size={11} />
                <span className="text-xs font-medium text-foreground">{r.name}</span>
              </div>
              {r.rating >= 4 ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-ink">
                  ✓
                </span>
              ) : (
                <span className="text-[10px] font-medium uppercase text-muted-foreground">Review</span>
              )}
              <span className="sr-only">{i === 0 ? "auto-approved" : ""}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Showcase */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-10 transition-all duration-500 motion-reduce:transition-none ${
          stage === 2 ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
            <Stars rating={5} size={13} />
            <span className="text-xs font-semibold text-foreground">4.8 (128)</span>
          </div>
          <ReviewCardVisual review={review} variant="modern" className="w-[240px]" />
          <div className="flex gap-2">
            <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-lime-ink">★★★★★</span>
            <span className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-white">Collection grid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
