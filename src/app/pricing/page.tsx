import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Simple, transparent pricing for Imagyn Reviews. Start free, upgrade for AI summaries, photo reviews and automated review requests.",
  path: "/pricing",
});

type PlanFeature = { label: string; comingSoon?: boolean };

// Mirrors app/services/billing/plans.ts in the imagyn-reviews repo — a separate codebase, so
// this list is kept in sync by hand. `comingSoon` features are real roadmap commitments, not
// available today; per the pre-launch truthfulness pass, only features with an actual
// enforcement point in the app render without that tag. Update both files together.
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
    name: "Starter",
    price: "Free",
    trial: null,
    tagline: "Everything you need to start collecting reviews.",
    features: [
      { label: "Up to 50 reviews" },
      { label: "Manual review requests" },
      { label: "Basic review widgets" },
      { label: "Basic moderation" },
      { label: "Email notifications" },
      { label: "Verified buyer badge" },
      { label: "CSV import (limited)" },
      { label: "Community support" },
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$9.99",
    trial: "14-day free trial",
    tagline: "For stores actively growing customer trust.",
    features: [
      { label: "Everything in Starter" },
      { label: "Unlimited reviews" },
      { label: "Unlimited CSV imports" },
      { label: "Automatic review requests", comingSoon: true },
      { label: "Automatic email reminders", comingSoon: true },
      { label: "AI review summaries" },
      { label: "Photo reviews" },
      { label: "Advanced analytics", comingSoon: true },
      { label: "Custom branding" },
      { label: "Multiple widget themes" },
      { label: "Brand Studio" },
      { label: "Priority support" },
    ],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$29.99",
    trial: "14-day free trial",
    tagline: "For high-volume stores that need white-label control.",
    features: [
      { label: "Everything in Growth" },
      { label: "Video reviews", comingSoon: true },
      { label: "White label", comingSoon: true },
      { label: "Custom email domain (SMTP, Resend, Postmark)", comingSoon: true },
      { label: "API access", comingSoon: true },
      { label: "Webhooks", comingSoon: true },
      { label: "Unlimited team members", comingSoon: true },
      { label: "Premium support" },
    ],
    popular: false,
  },
];

const FAQS = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Starter plan is free for as long as you use it, with no card required. Growth and Scale both include a 14-day free trial before you're charged.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes — upgrade or downgrade at any time from the app's Billing page. Changes take effect immediately, and Shopify handles billing on your store's regular invoice.",
  },
  {
    q: "What happens to my reviews if I downgrade?",
    a: "Nothing is ever deleted. If you're over the Starter plan's published-review limit, the most recent reviews stay published and older ones simply stop counting toward new publishes until you're back under the limit.",
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
            description="Start free. Upgrade only when you need automated requests, AI summaries and photo reviews."
          />
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
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
