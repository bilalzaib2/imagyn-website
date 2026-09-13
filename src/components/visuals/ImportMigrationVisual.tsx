"use client";

import { useInView } from "@/lib/motion";
import { Stars } from "./ReviewCard";

// Import & Migration page hero visual. Encodes the real pipeline's own vocabulary
// (matched / needs your review / duplicate, source verified vs Imagyn verified) rather
// than a generic "uploading file" animation, so a merchant coming from another platform
// sees the actual safety model, not a decorative graphic. Every number here is clearly a
// small illustrative example, not a claim about any real store's data.
const SOURCES = ["Judge.me", "Loox", "Stamped", "Ali Reviews", "CSV"];

export function ImportMigrationVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground">Example import</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SOURCES.map((source, i) => (
          <span
            key={source}
            style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-all duration-500 motion-reduce:transition-none ${
              source === "Judge.me" ? "border-lime bg-lime-soft text-lime-ink" : "border-border text-muted-foreground"
            } ${inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          >
            {source}
          </span>
        ))}
      </div>

      <div
        className={`mt-6 grid grid-cols-3 gap-3 transition-all duration-500 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "260ms" : "0ms" }}
      >
        <div className="rounded-xl bg-surface p-3 text-center">
          <p className="text-lg font-semibold text-foreground">241</p>
          <p className="mt-1 text-[11px] leading-tight text-muted-foreground">Matched to a product</p>
        </div>
        <div className="rounded-xl bg-surface p-3 text-center">
          <p className="text-lg font-semibold text-foreground">4</p>
          <p className="mt-1 text-[11px] leading-tight text-muted-foreground">Need your review</p>
        </div>
        <div className="rounded-xl bg-surface p-3 text-center">
          <p className="text-lg font-semibold text-foreground">2</p>
          <p className="mt-1 text-[11px] leading-tight text-muted-foreground">Already imported</p>
        </div>
      </div>

      <div
        className={`mt-6 rounded-2xl border border-border p-4 transition-all duration-500 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "420ms" : "0ms" }}
      >
        <div className="flex items-center justify-between">
          <Stars rating={5} size={12} />
          <span className="text-[11px] font-medium text-muted-foreground">Priya K.</span>
        </div>
        <p className="mt-2 text-sm font-semibold text-foreground">Exactly as described</p>
        <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
          <p>Source said verified: yes</p>
          <p>Imagyn verified: not yet, until we can check it ourselves</p>
        </div>
      </div>
    </div>
  );
}
