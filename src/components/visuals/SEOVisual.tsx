"use client";

import { Stars } from "./ReviewCard";
import { useInView } from "@/lib/motion";

// Review -> structured data -> search snippet. Deliberately makes no ranking promises — just
// shows the real, shipped mechanism (JSON-LD synced from approved reviews) as a search-result
// preview, which is what actually happens today.
export function SEOVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <div className="flex flex-col items-center gap-4 py-2">
        <div
          className={`flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 transition-all duration-500 motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <Stars rating={5} size={13} />
          <span className="text-xs font-semibold text-foreground">4.8 (128)</span>
        </div>

        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-muted-foreground/40">
          <path d="M8 0v18m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div
          style={{ transitionDelay: inView ? "150ms" : "0ms" }}
          className={`w-full max-w-[300px] rounded-xl border border-border bg-surface p-3 font-mono text-[10px] leading-relaxed text-muted-foreground transition-all duration-500 motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {"{ \"@type\": \"AggregateRating\", \"ratingValue\": \"4.8\" }"}
        </div>

        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-muted-foreground/40">
          <path d="M8 0v18m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div
          style={{ transitionDelay: inView ? "300ms" : "0ms" }}
          className={`w-full max-w-[300px] rounded-xl border border-border p-4 transition-all duration-500 motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <p className="text-[13px] text-[#1a0dab]">Example Product – yourstore.com</p>
          <div className="mt-1 flex items-center gap-1.5">
            <Stars rating={5} size={11} />
            <span className="text-[11px] text-muted-foreground">Rating: 4.8 · 128 reviews</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Example search result snippet — illustrative, not a ranking guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
