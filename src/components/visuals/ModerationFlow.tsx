"use client";

import { DEMO_REVIEWS, Stars } from "./ReviewCard";
import { useInView } from "@/lib/motion";

// Incoming reviews -> moderation -> publish, matching the app's real rule (minimum rating +
// banned-word list auto-publish/auto-hold — see moderationRules.server.ts) rather than a
// generic "AI moderation" graphic.
const ROWS = [
  { review: DEMO_REVIEWS[0], outcome: "published" as const },
  { review: DEMO_REVIEWS[2], outcome: "published" as const },
  { review: DEMO_REVIEWS[1], outcome: "held" as const },
];

export function ModerationFlow() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Minimum rating: 4 stars &middot; banned words: on
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {ROWS.map(({ review, outcome }, i) => (
          <div
            key={review.name}
            style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            className={`flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 transition-all duration-500 motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <Stars rating={review.rating} size={12} />
              <span className="text-sm font-medium text-foreground">{review.name}</span>
            </div>
            {outcome === "published" ? (
              <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-lime-ink">
                Auto-published
              </span>
            ) : (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                Held for review
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
