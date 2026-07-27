import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const FEATURES = [
  {
    title: "Verified Buyer badges",
    description: "A quiet checkmark next to real customers who actually purchased — trust without noise.",
  },
  {
    title: "AI-powered summaries",
    description: "Every product's reviews distilled into what customers actually love and worry about.",
  },
  {
    title: "Moderation rules",
    description: "Auto-publish trustworthy reviews and hold the rest for a quick manual look.",
  },
  {
    title: "Beautiful widgets",
    description: "Review lists, rating badges and star summaries that match your storefront, pixel for pixel.",
  },
  {
    title: "Automated requests",
    description: "Ask verified customers for a review right when their experience is freshest.",
  },
  {
    title: "Brand Studio",
    description: "Tune every color, radius and type scale — no code, no theme editing required.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Collect",
    description: "Customers leave star ratings, written reviews and photos — manually, or through automated requests.",
  },
  {
    step: "02",
    title: "Moderate",
    description: "Trustworthy reviews auto-publish. Everything else waits in one clean queue for your approval.",
  },
  {
    step: "03",
    title: "Showcase",
    description: "Reviews go live across your storefront in widgets that feel like part of your brand, not a bolt-on.",
  },
];

export default function Home() {
  return (
    <>
      <section className="pt-20 pb-28 md:pt-28 md:pb-36">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Shopify Review App
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground">
                Build trust with every customer review.
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {siteConfig.description}
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button href="/pricing" size="lg">
                  Get Started
                </Button>
                <Button href="/features" variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] shadow-elevated">
              <Image
                src="/hero-dashboard.png"
                alt="Imagyn Reviews dashboard showing trust overview, rating distribution and AI-powered insights"
                width={1600}
                height={1000}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Everything you need"
            title="A complete review experience, out of the box."
            description="Every piece of the customer trust loop — collection, moderation and storefront presentation — in one app."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-[30px] shadow-elevated lg:order-1">
            <Image
              src="/hero-reviews.png"
              alt="Imagyn Reviews moderation queue with an AI summary and a customer review selected"
              width={1600}
              height={1000}
              className="h-auto w-full"
            />
          </div>
          <div className="order-1 flex flex-col gap-4 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Moderation
            </span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              A moderation queue that respects your time.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Set the bar once — minimum rating, verified purchases, banned words — and let
              Imagyn Reviews auto-publish what clears it. Everything else waits in a single,
              scannable queue with an AI summary of what customers are actually saying.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="How it works"
            title="From first review to storefront, in three steps."
          />

          <div className="grid gap-10 md:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-accent">{item.step}</span>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Start building trust today.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Free to install. Upgrade only when you need automated requests, AI summaries and
              photo reviews.
            </p>
            <Button href="/pricing" size="lg">
              Get Started
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
