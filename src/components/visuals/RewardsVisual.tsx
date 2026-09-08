"use client";

import { Stars } from "./ReviewCard";
import { useInView } from "@/lib/motion";

// Three real, independent reward mechanisms — not one generic "loyalty" graphic. Matches
// the app's actual feature set: Review Rewards (a discount triggered by a review meeting
// merchant-set conditions), Coupons (a standalone campaign, no review required), and
// Referrals (a friend's real order triggers the referrer's reward) — see
// rewards.server.ts / coupons.server.ts / referrals.server.ts.
const ROWS = [
  {
    label: "Review Reward",
    detail: "5★ review with a photo",
    trigger: <Stars rating={5} size={12} />,
    result: "15% off issued",
  },
  {
    label: "Coupon",
    detail: '"Summer Sale" campaign',
    trigger: (
      <span className="text-[13px] font-medium text-foreground">Sent to customer</span>
    ),
    result: "Code SUMMER15 issued",
  },
  {
    label: "Referral",
    detail: "Friend's order uses the code",
    trigger: <span className="text-[13px] font-medium text-foreground">Order #10482</span>,
    result: "Referrer rewarded",
  },
];

export function RewardsVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Real Shopify discount codes — issued automatically
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            className={`flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 transition-all duration-500 motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {row.label}
              </span>
              <div className="flex items-center gap-2">
                {row.trigger}
                <span className="text-[13px] text-muted-foreground">{row.detail}</span>
              </div>
            </div>
            <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-lime-ink">
              {row.result}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
