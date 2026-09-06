import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Pill } from "@/components/Pill";
import { CircleCluster } from "@/components/CircleCluster";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const CAPABILITIES = [
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
    title: "Review requests",
    description: "Ask customers for a review — manually today, automatically once approved for order data.",
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
    description: "Customers leave star ratings, written reviews and photos — manually, or through a review request.",
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
      {/* HERO — the product's own review UI is the proof, not a stock illustration. */}
      <section className="relative overflow-hidden bg-foreground pt-20 pb-24 md:pt-28 md:pb-32">
        <CircleCluster
          layout="corner"
          className="pointer-events-none absolute -right-6 -top-10 h-[220px] w-[280px] opacity-90 md:h-[320px] md:w-[400px]"
        />
        <Container className="relative grid items-center gap-16 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <Pill tone="light">Shopify Review App</Pill>
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
              Build trust with every <span className="text-lime">customer review</span>.
            </h1>
            <p className="text-lg leading-relaxed text-white/70">{siteConfig.description}</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href="/pricing" variant="lime" size="lg">
                Get Started
              </Button>
              <Button href="/features" variant="outline-light" size="lg">
                See Features
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] bg-white shadow-elevated">
            <Image
              src="/hero-reviews.png"
              alt="Imagyn Reviews moderation queue with an AI summary and a customer review selected"
              width={1600}
              height={1000}
              priority
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      {/* LIME — analytics is where the product proves itself with real numbers, so it
          earns the boldest section treatment on the page. Used exactly once. */}
      <section className="bg-lime py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Pill tone="dark">Analytics + AI</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-lime-ink">
              Know what your customers love.
            </h2>
            <p className="text-lg leading-relaxed text-lime-ink/70">
              Average rating, verified-review share and rating distribution at a glance — plus
              an AI-generated read on what customers consistently praise and flag, refreshed as
              new reviews come in.
            </p>
          </div>
          <div className="overflow-hidden rounded-[24px] bg-white shadow-elevated">
            <Image
              src="/hero-dashboard.png"
              alt="Imagyn Reviews dashboard showing trust overview, rating distribution and an AI spotlight"
              width={1600}
              height={1000}
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      {/* LIGHT — on-site widgets, the part a shopper actually sees. */}
      <section className="py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Pill tone="dark">On-site widgets</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Make every product more trusted.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Review lists, star-rating badges and collection-grid ratings — styled through
              Brand Studio so nothing looks bolted onto your theme.
            </p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-border shadow-elevated">
            <Image
              src="/feature-widgets.png"
              alt="Imagyn Reviews widget gallery — Product Reviews Widget, Product Rating Badge and Collection Rating Badge"
              width={1600}
              height={1000}
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      {/* BLACK — brand customization, the emotional close before the how-it-works beat. */}
      <section className="bg-foreground py-24 md:py-32">
        <Container className="flex flex-col items-start gap-6">
          <Pill tone="lime">Customization + conversion</Pill>
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
            Your reviews.
            <br />
            Your <span className="text-lime">brand</span>.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            Brand Studio hands you five starting styles — Minimal, Modern, Editorial, Luxury and
            Custom — then lets you fine-tune button style, radius and type until every widget
            looks like it shipped with your theme.
          </p>
        </Container>
      </section>

      {/* How it works — editorial numerals instead of another card row. */}
      <section className="py-24 md:py-32">
        <Container className="flex flex-col gap-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              How it works
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              From first review to storefront, in three steps.
            </h2>
          </div>

          <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="text-4xl font-semibold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities — a plain two-column list, not a grid of identical bordered cards. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col gap-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Everything you need
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              A complete review experience, out of the box.
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {CAPABILITIES.map((feature) => (
              <div key={feature.title} className="flex flex-col gap-2 border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA — the circle motif returns to bookend the hero. */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <CircleCluster
          layout="row"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] w-full opacity-20"
        />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
            Start building trust today.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            Free to install. Upgrade only when you need AI summaries, photo reviews and Brand
            Studio.
          </p>
          <Button href="/pricing" variant="lime" size="lg">
            Get Started
          </Button>
        </Container>
      </section>
    </>
  );
}
