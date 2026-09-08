"use client";

import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

const STAGES = ["compose", "sent", "opened", "reviewed"] as const;
type Stage = (typeof STAGES)[number];

const STAGE_LABEL: Record<Stage, string> = {
  compose: "Composing",
  sent: "Sent",
  opened: "Opened",
  reviewed: "Review submitted",
};

// Email Studio's real templating variables resolving into a real-looking send, then the
// tracked lifecycle (sent -> opened -> completed) the app's own ReviewRequestStatus enum
// actually has — not a generic "email marketing" graphic.
export function EmailStudioVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState<Stage>("compose");

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % STAGES.length;
      setStage(STAGES[i]);
    }, 1800);
    return () => clearInterval(id);
  }, [inView, reducedMotion]);

  const resolved = stage !== "compose";

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Review request email
        </span>
        <div className="flex items-center gap-1.5">
          {STAGES.map((s) => (
            <span
              key={s}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                STAGES.indexOf(s) <= STAGES.indexOf(stage) ? "bg-foreground" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm text-muted-foreground">Hi {resolved ? "Priya" : "{{customer_name}}"},</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          How was your{" "}
          <span className={resolved ? "font-semibold" : "text-muted-foreground"}>
            {resolved ? "Ceramic Pour-Over Set" : "{{product_name}}"}
          </span>
          ? We&apos;d love a quick review.
        </p>
        <span className="mt-3 inline-flex rounded-full bg-lime px-4 py-2 text-xs font-semibold text-lime-ink">
          Leave a review →
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <span className="rounded-full bg-surface px-4 py-1.5 text-xs font-medium text-foreground">
          {STAGE_LABEL[stage]}
        </span>
      </div>
    </div>
  );
}
