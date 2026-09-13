"use client";

import { useInView } from "@/lib/motion";

// Trust & Certification page hero visual. Mirrors the app's real pillar model (four
// independent, pure function checks, see trustCertification.server.ts) rather than a
// generic shield or badge graphic, so the page's central claim ("checks that actually run")
// is visible in the visual itself, not just the copy next to it.
const PILLARS = [
  { label: "Transparent review practices", state: "met" as const },
  { label: "Secure payment methods", state: "met" as const },
  { label: "Transparent shipping and refund policy", state: "met" as const },
  { label: "Verified store history", state: "pending" as const },
];

export function TrustCertificationVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground">Example certification</p>

      <div className="mt-4 flex flex-col gap-2">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.label}
            style={{ transitionDelay: inView ? `${i * 110}ms` : "0ms" }}
            className={`flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-all duration-500 motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                pillar.state === "met" ? "bg-lime text-lime-ink" : "bg-accent-soft text-muted-foreground"
              }`}
            >
              {pillar.state === "met" ? "✓" : "···"}
            </span>
            <span className="text-[13px] font-medium text-foreground">{pillar.label}</span>
          </div>
        ))}
      </div>

      <div
        className={`mt-5 rounded-2xl bg-surface p-4 transition-all duration-500 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "480ms" : "0ms" }}
      >
        <p className="text-sm font-semibold text-foreground">Certification: in progress</p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
          Three of four checks pass today. The badge only shows a store as certified once every
          pillar genuinely passes, checked again on its own schedule, never on request.
        </p>
      </div>
    </div>
  );
}
