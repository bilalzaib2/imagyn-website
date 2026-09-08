"use client";

import { DEMO_REVIEWS, Stars } from "./ReviewCard";
import { useInView } from "@/lib/motion";

// Many real reviews condensing into one plain-language read — the actual shape of the app's
// AI summary feature (a generated read of what reviews consistently praise/flag), not a
// generic "AI sparkle" graphic.
export function AISummaryVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <div className="flex flex-wrap justify-center gap-2">
        {DEMO_REVIEWS.map((r, i) => (
          <div
            key={r.name}
            style={{ transitionDelay: inView ? `${i * 70}ms` : "0ms" }}
            className={`flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 transition-all duration-500 motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <Stars rating={r.rating} size={10} />
          </div>
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`ghost-${i}`}
            style={{ transitionDelay: inView ? `${(i + 5) * 70}ms` : "0ms" }}
            className={`h-[26px] w-[52px] rounded-full border border-border bg-surface transition-all duration-500 motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-60" : "translate-y-2 opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className={`text-muted-foreground/40 transition-opacity duration-500 motion-reduce:transition-none ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: inView ? "900ms" : "0ms" }}
        >
          <path d="M8 0v18m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div
        style={{ transitionDelay: inView ? "1100ms" : "0ms" }}
        className={`mt-4 rounded-2xl bg-surface p-5 transition-all duration-500 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI summary</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          &ldquo;Customers consistently praise the fit and fast shipping. A few mention sizing runs
          small.&rdquo;
        </p>
      </div>
    </div>
  );
}
