"use client";

import { DEMO_REVIEWS, ReviewCardVisual, Stars } from "./ReviewCard";
import { useInView } from "@/lib/motion";

// Features page — Collection section. A compact, static (not scroll-tracked) version of the
// same "request becomes review" idea JourneySection's Collect stage tells at the signature-
// interaction scale — reused here as its own self-contained visual for a section that doesn't
// need the full scroll-driven treatment.
export function CollectionFlow() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const review = DEMO_REVIEWS[3];

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <div className="flex flex-col items-center gap-4 py-4">
        <div
          className={`rounded-2xl bg-surface px-6 py-4 text-center transition-all duration-500 motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Review request</p>
          <p className="mt-1 text-sm font-semibold text-foreground">Sent after fulfillment</p>
        </div>

        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-muted-foreground/40">
          <path d="M10 0v24m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div
          className={`transition-all duration-500 motion-reduce:transition-none ${inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: inView ? "150ms" : "0ms" }}
        >
          <div className="flex justify-center pb-2">
            <Stars rating={5} size={20} />
          </div>
        </div>

        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-muted-foreground/40">
          <path d="M10 0v24m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div
          className={`transition-all duration-500 motion-reduce:transition-none ${inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: inView ? "300ms" : "0ms" }}
        >
          <ReviewCardVisual review={review} variant="minimal" className="w-[260px]" />
        </div>
      </div>
    </div>
  );
}
