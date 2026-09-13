import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Simple, transparent pricing for Imagyn Reviews. Free plan with unlimited reviews, or Pro for AI summaries and full brand control.",
  path: "/pricing",
});

type PlanFeature = { label: string; comingSoon?: boolean };

// Mirrors app/services/billing/plans.ts in the imagyn-reviews repo exactly, a separate
// codebase, so this is kept in sync by hand. Only two plans are ever merchant-facing there
// (PLAN_ORDER = ["starter", "growth"]); a third "Scale" tier exists in that file only to
// preserve existing subscribers' entitlements and must never appear here. `comingSoon`
// mirrors that file's own flag, a feature only renders without the tag if it has a real
// enforcement point in the app today. Update both files together.
const PLANS: {
  id: string;
  name: string;
  price: string;
  trial: string | null;
  tagline: string;
  features: PlanFeature[];
  popular: boolean;
}[] = [
  {
    id: "starter",
    name: "Free",
    price: "Free",
    trial: null,
    tagline: "Everything you need to start collecting reviews, free, no limits on the core.",
    features: [
      { label: "Unlimited reviews" },
      { label: "Unlimited review requests" },
      { label: "Automated initial review request emails" },
      { label: "Email Studio, customize your review request email" },
      { label: "Photo reviews" },
      { label: "Video reviews" },
      { label: "Review widgets & rating badges" },
      { label: "Moderation & merchant replies" },
      { label: "Unlimited CSV imports" },
      { label: "Verified buyer badge" },
      { label: "Helpful voting" },
      { label: "Core analytics" },
      { label: "SEO structured data" },
      { label: "Community support" },
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Pro",
    price: "$9.99",
    trial: "14-day free trial",
    tagline: "For stores that want AI, deeper automation, and full brand control.",
    features: [
      { label: "Everything in Free" },
      { label: "AI review summaries" },
      { label: "Automatic email reminders (3 & 7 days)" },
      { label: "Multiple email templates & reminder emails" },
      { label: "Advanced email styling", comingSoon: true },
      { label: "Advanced analytics", comingSoon: true },
      { label: "Custom branding" },
      { label: "Multiple widget themes" },
      { label: "Brand Studio" },
      { label: "Priority support" },
    ],
    popular: true,
  },
];

type ComparisonRow = { label: string; free: boolean | "soon"; pro: boolean | "soon" };
type ComparisonCategory = { name: string; rows: ComparisonRow[] };

// A category grouped comparison, not a flat feature dump, so a merchant can scan by the job
// they actually have rather than an alphabetical list. Mirrors app/services/billing/plans.ts
// and permissions.ts (kept in sync by hand, same as PLANS above): a row shows Free as
// available whenever permissions.ts grants it with no plan gate at all.
const COMPARISON: ComparisonCategory[] = [
  {
    name: "Collect",
    rows: [
      { label: "Unlimited reviews and review requests", free: true, pro: true },
      { label: "Automated initial review request emails", free: true, pro: true },
      { label: "Automatic email reminders", free: false, pro: true },
      { label: "Multiple email templates", free: false, pro: true },
      { label: "Photo and video reviews", free: true, pro: true },
    ],
  },
  {
    name: "Manage",
    rows: [
      { label: "Moderation rules and merchant replies", free: true, pro: true },
      { label: "Helpful voting", free: true, pro: true },
    ],
  },
  {
    name: "Display and brand",
    rows: [
      { label: "Review widgets and rating badges", free: true, pro: true },
      { label: "Multiple widget themes", free: false, pro: true },
      { label: "Brand Studio and custom branding", free: false, pro: true },
    ],
  },
  {
    name: "AI and analytics",
    rows: [
      { label: "Core analytics", free: true, pro: true },
      { label: "AI review summaries", free: false, pro: true },
      { label: "Advanced analytics", free: false, pro: "soon" },
    ],
  },
  {
    name: "Grow",
    rows: [
      { label: "Review Rewards, Coupons and Referrals", free: true, pro: true },
    ],
  },
  {
    name: "Trust and migration",
    rows: [
      { label: "Verified Buyer badge", free: true, pro: true },
      { label: "Trust and Certification", free: true, pro: true },
      { label: "Import and Migration, unlimited", free: true, pro: true },
      { label: "SEO structured data", free: true, pro: true },
    ],
  },
  {
    name: "Support",
    rows: [
      { label: "Community support", free: true, pro: true },
      { label: "Priority support", free: false, pro: true },
    ],
  },
];

const FAQS = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Free plan has no time limit and no card required. Pro includes a 14-day free trial before you're charged.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, upgrade or downgrade at any time from the app's Billing page. Changes take effect immediately, and Shopify handles billing on your store's regular invoice.",
  },
  {
    q: "What happens to my reviews if I downgrade?",
    a: "Nothing is ever deleted, hidden, or limited. Review collection, requests, widgets, and moderation are unlimited on the Free plan, downgrading only turns off Pro only features like AI summaries and Brand Studio.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees, ever. Pricing is a flat monthly rate billed through Shopify.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing that grows with your store."
            description="Start free, with no limits on the core. Upgrade only when you want AI summaries and full brand control."
          />
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-[28px] border p-8 ${
                  plan.popular
                    ? "border-accent shadow-elevated"
                    : "border-border"
                }`}
              >
                {plan.popular ? (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-[-0.02em] text-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" ? (
                    <span className="text-sm text-muted-foreground">/month</span>
                  ) : null}
                </p>
                {plan.trial ? (
                  <p className="mt-1 text-sm text-accent">{plan.trial}</p>
                ) : null}
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {plan.tagline}
                </p>

                <ul className="mt-8 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-start gap-3 text-[15px] ${
                        feature.comingSoon ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        {feature.label}
                        {feature.comingSoon ? (
                          <span className="ml-2 inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                            Coming soon
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={siteConfig.appUrl}
                  variant={plan.popular ? "primary" : "secondary"}
                  size="md"
                  className="mt-10 w-full"
                >
                  {plan.id === "starter" ? "Get Started Free" : `Start ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Full comparison" title="Every job, and which plan covers it." align="left" />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-sm font-semibold text-muted-foreground">Feature</th>
                  <th className="w-28 py-3 text-center text-sm font-semibold text-foreground">Free</th>
                  <th className="w-28 py-3 text-center text-sm font-semibold text-foreground">Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((category) => (
                  <React.Fragment key={category.name}>
                    <tr>
                      <td colSpan={3} className="pb-2 pt-6 text-sm font-semibold text-foreground">
                        {category.name}
                      </td>
                    </tr>
                    {category.rows.map((row) => (
                      <tr key={row.label} className="border-b border-border">
                        <td className="py-3 pr-4 text-[15px] text-muted-foreground">{row.label}</td>
                        <td className="py-3 text-center">
                          <ComparisonCell value={row.free} />
                        </td>
                        <td className="py-3 text-center">
                          <ComparisonCell value={row.pro} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="left" />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {FAQS.map((item) => (
              <div key={item.q} className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ComparisonCell({ value }: { value: boolean | "soon" }) {
  if (value === "soon") {
    return <span className="text-xs font-medium text-muted-foreground">Soon</span>;
  }
  if (value) {
    return (
      <span className="inline-flex text-accent" aria-label="Included">
        ✓
      </span>
    );
  }
  return <span className="sr-only">Not included</span>;
}
