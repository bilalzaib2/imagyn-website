"use client";

import Link from "next/link";
import { useInView } from "@/lib/motion";

const CHANNELS = ["Google Shopping", "Public review page", "JSON feed"];
const SOURCES = ["Judge.me", "Loox", "Stamped", "CSV"];

// Reward, Grow and Switch used to be three consecutive full-width split sections, the
// same left-text/right-card shape repeated three times in a row. One real asymmetric bento
// (one wide tile, two stacked) says the same three things with actual grid rhythm instead
// of more zigzag, and gives Grow a dark tile so the group isn't three white cards in a row.
export function GrowthBento() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
      <div
        className={`flex flex-col gap-8 rounded-[28px] border border-border bg-white p-8 transition-all duration-700 motion-reduce:transition-none md:p-10 lg:col-span-2 lg:row-span-2 ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold text-muted-foreground">Reward</span>
          <h3 className="text-subsection font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
            Give customers a real reason to come back.
          </h3>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
            A discount for a review, a standalone coupon, or a code a friend redeems. Every
            one issues a real Shopify discount code automatically.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-lime px-4 py-2 text-[13px] font-semibold text-lime-ink">
            SUMMER15 issued
          </span>
          <span className="text-[13px] text-muted-foreground">
            15% off, triggered by a 5-star photo review
          </span>
        </div>
        <Link href="/rewards" className="mt-auto text-[14px] font-medium text-foreground hover:text-accent">
          See rewards, coupons &amp; referrals →
        </Link>
      </div>

      <div
        className={`flex flex-col justify-between gap-6 rounded-[28px] bg-foreground p-7 transition-all duration-700 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "120ms" : "0ms" }}
      >
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-white/50">Grow</span>
          <h3 className="text-lg font-semibold leading-snug text-white">
            Reviews that work beyond your storefront.
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((channel) => (
            <span key={channel} className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-medium text-white/80">
              {channel}
            </span>
          ))}
        </div>
        <Link href="/integrations" className="text-[13px] font-medium text-white transition-colors hover:text-lime">
          See integrations →
        </Link>
      </div>

      <div
        className={`flex flex-col justify-between gap-6 rounded-[28px] border border-border bg-white p-7 transition-all duration-700 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "220ms" : "0ms" }}
      >
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-muted-foreground">Switch</span>
          <h3 className="text-lg font-semibold leading-snug text-foreground">Bring every review with you.</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((source) => (
            <span key={source} className="rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground">
              {source}
            </span>
          ))}
        </div>
        <Link href="/import" className="text-[13px] font-medium text-foreground hover:text-accent">
          See import &amp; migration →
        </Link>
      </div>
    </div>
  );
}
