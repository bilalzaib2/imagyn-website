"use client";

import { useInView } from "@/lib/motion";

// Three real distribution surfaces — see googleReviewFeed.server.ts (the same eligible-
// review set served as both a Google-Merchant-Center-ready XML feed and a plain JSON feed
// for any other channel) and reviewSite.server.ts (the public, shareable review page). No
// fabricated integrations or partner logos — only channels the app actually generates today.
const CHANNELS = [
  {
    name: "Google Shopping",
    description: "Approved reviews as a Merchant Center-ready feed",
    status: "Feed ready",
  },
  {
    name: "Public review page",
    description: "A shareable page listing your real approved reviews",
    status: "Always on",
  },
  {
    name: "Other channels",
    description: "The same reviews as plain JSON, for any ad network or script",
    status: "Feed ready",
  },
];

export function DistributionVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rounded-[28px] border border-border bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Your approved reviews, everywhere shoppers look
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {CHANNELS.map((channel, i) => (
          <div
            key={channel.name}
            style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            className={`flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 transition-all duration-500 motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">{channel.name}</span>
              <span className="text-[13px] text-muted-foreground">{channel.description}</span>
            </div>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold text-foreground">
              {channel.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
