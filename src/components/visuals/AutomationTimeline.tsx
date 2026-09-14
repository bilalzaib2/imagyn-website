"use client";

import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

// Mirrors the real automatic-request lifecycle (see review-request.server.ts /
// reviewRequestScheduler.server.ts in the app repo): a review request is created on
// fulfillment, waits a merchant-configured delay, sends, then follows up with reminders at
// configurable day offsets (3 & 7 days is the common default) until reviewed.
const STEPS = [
  { label: "Order fulfilled", detail: "Trigger" },
  { label: "Wait 2 days", detail: "Configurable delay" },
  { label: "Request sent", detail: "Email #1" },
  { label: "Reminder", detail: "Day 3" },
  { label: "Reminder", detail: "Day 7" },
  { label: "Review submitted", detail: "Sequence ends" },
];

export function AutomationTimeline() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    // Reduced motion shows every step already complete via the render-time fallback below,
    // instead of a setState call here, this effect only ever runs the staggered animation.
    if (!inView || reducedMotion) return;
    const timers = STEPS.map((_, i) => setTimeout(() => setActiveStep(i), 260 * (i + 1)));
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const effectiveActiveStep = reducedMotion ? STEPS.length - 1 : activeStep;

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      {/* Mobile & tablet: a purpose-built vertical timeline row per step (marker + connector
          column beside a content column), not the desktop composition shrunk down. The
          connector is a real flex-1 line inside the marker column, so it stretches to match
          each row's own content height and always meets the next dot cleanly. */}
      <div className="flex flex-col md:hidden">
        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1;
          return (
            <div key={`${step.label}-${step.detail}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none ${
                    effectiveActiveStep >= i ? "border-foreground bg-foreground" : "border-border bg-white"
                  }`}
                >
                  {effectiveActiveStep >= i ? <span className="h-1.5 w-1.5 rounded-full bg-lime" /> : null}
                </span>
                {!isLast ? (
                  <div className="mt-1 w-px flex-1 bg-border">
                    <div
                      style={{ height: effectiveActiveStep > i ? "100%" : "0%" }}
                      className="w-full bg-foreground transition-all duration-300 motion-reduce:transition-none"
                    />
                  </div>
                ) : null}
              </div>
              <div className={`flex flex-col gap-0.5 ${isLast ? "" : "pb-6"}`}>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                    effectiveActiveStep >= i ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-xs text-muted-foreground">{step.detail}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: the original spacious horizontal composition, unchanged. */}
      <div className="hidden md:flex md:items-start md:gap-0">
        {STEPS.map((step, i) => (
          <div key={`${step.label}-${step.detail}`} className="relative flex flex-1 flex-col items-center gap-3 text-center">
            {i > 0 ? (
              <div className="absolute left-[-50%] top-[15px] h-px w-full bg-border">
                <div
                  style={{
                    width: effectiveActiveStep >= i ? "100%" : "0%",
                  }}
                  className="h-full bg-foreground transition-all duration-300 motion-reduce:transition-none"
                />
              </div>
            ) : null}
            <div
              className={`z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none ${
                effectiveActiveStep >= i ? "border-foreground bg-foreground" : "border-border bg-white"
              }`}
            >
              {effectiveActiveStep >= i ? <span className="h-1.5 w-1.5 rounded-full bg-lime" /> : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className={`text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                  effectiveActiveStep >= i ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                {step.label}
              </span>
              <span className="text-xs text-muted-foreground">{step.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
