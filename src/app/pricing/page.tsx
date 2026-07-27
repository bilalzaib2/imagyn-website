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

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    trial: null,
    tagline: "Everything you need to start collecting reviews.",
    features: [
      "Up to 50 published reviews",
      "Manual review requests",
      "Basic review widget",
      "Standard email template",
      "Basic moderation",
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
      "Unlimited reviews",
      "AI review summaries",
      "Photo reviews",
      "Branded review request emails",
      "Automatic review requests",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29.99",
    trial: "14-day free trial",
    tagline: "Full control for high-volume stores.",
    features: [
      "Everything in Growth",
      "Video reviews",
      "Multiple email templates",
      "Advanced branding controls",
      "Priority support",
    ],
    popular: false,
  },
];

const FAQS = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Starter plan is free for as long as you use it, with no card required. Growth and Pro both include a 14-day free trial before you're charged.",
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
                    <li key={feature} className="flex items-start gap-3 text-[15px] text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {feature}
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
