import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Pill } from "@/components/Pill";
import { CircleCluster } from "@/components/CircleCluster";
import { Reveal } from "@/components/Reveal";
import { HeroStream } from "@/components/visuals/HeroStream";
import { EmailStudioVisual } from "@/components/visuals/EmailStudioVisual";
import { AutomationTimeline } from "@/components/visuals/AutomationTimeline";
import { AnalyticsVisualization } from "@/components/visuals/AnalyticsVisualization";
import { WidgetPreview } from "@/components/visuals/WidgetPreview";
import { JourneySection } from "@/components/visuals/JourneySection";
import { BrandTransformation } from "@/components/visuals/BrandTransformation";
import { RewardsVisual } from "@/components/visuals/RewardsVisual";
import { DistributionVisual } from "@/components/visuals/DistributionVisual";
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
  {
    title: "Rewards, coupons & referrals",
    description: "Real Shopify discount codes for a review, a standalone campaign, or a friend's first order.",
  },
  {
    title: "Distribution",
    description: "A Google Shopping-ready feed, a public review page, and JSON for any other channel.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — an animated, custom-built visual of reviews arriving and settling into
          trust, not a screenshot of the app's own UI. */}
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

          <HeroStream />
        </Container>
      </section>

      {/* LIGHT — Collect: the review request email itself, with its real merge tokens
          resolving and the send moving through its actual lifecycle. */}
      <section className="py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">Collect</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Ask at the right moment.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every review request is a real email, personalized with the customer&apos;s name,
              your store name and the product they bought — written and styled in Email
              Studio, sent under your name.
            </p>
          </Reveal>
          <EmailStudioVisual />
        </Container>
      </section>

      {/* LIGHT — Automation: when requests go out, with zero manual work. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">Automation</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Set the schedule once. It runs itself.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A request goes out after fulfillment, with reminders on your own schedule if a
              customer hasn&apos;t reviewed yet — and stops the moment they do.
            </p>
          </Reveal>
          <AutomationTimeline />
        </Container>
      </section>

      {/* LIME — analytics is where the product proves itself with real numbers, so it
          earns the boldest section treatment on the page. Used exactly once. */}
      <section className="bg-lime py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">Analytics + AI</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-lime-ink">
              Know what your customers love.
            </h2>
            <p className="text-lg leading-relaxed text-lime-ink/70">
              Average rating, verified-review share and rating distribution at a glance — plus
              an AI-generated read on what customers consistently praise and flag, refreshed as
              new reviews come in.
            </p>
          </Reveal>
          <AnalyticsVisualization />
        </Container>
      </section>

      {/* LIGHT — on-site widgets, the part a shopper actually sees. Cycles the same
          review through all four real widget formats instead of one static screenshot. */}
      <section className="py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">On-site widgets</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Make every product more trusted.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Review lists, star-rating badges and collection-grid ratings — styled through
              Brand Studio so nothing looks bolted onto your theme.
            </p>
          </Reveal>
          <WidgetPreview />
        </Container>
      </section>

      {/* SIGNATURE INTERACTION — the same review object visibly becomes
          Collect → Understand → Showcase as the visitor scrolls. */}
      <JourneySection />

      {/* LIGHT — Reward: the fourth real stage, three independent mechanisms. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">Reward</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Give customers a real reason to come back.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A discount for leaving a review, a standalone coupon campaign, or a code your
              best customers share with friends — every one issues a real Shopify discount
              code automatically.
            </p>
          </Reveal>
          <RewardsVisual />
        </Container>
      </section>

      {/* BLACK — brand customization, the emotional close before capabilities. */}
      <section className="bg-foreground py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-6">
            <Pill tone="lime">Customization + conversion</Pill>
            <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Your reviews.
              <br />
              Your <span className="text-lime">brand</span>.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Brand Studio hands you five starting styles — Minimal, Modern, Editorial, Luxury
              and Custom — then lets you fine-tune button style, radius and type until every
              widget looks like it shipped with your theme.
            </p>
          </Reveal>
          <BrandTransformation />
        </Container>
      </section>

      {/* LIGHT — Grow: the fifth real stage, reviews reaching shoppers beyond your storefront. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">Grow</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Reviews that work beyond your storefront.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A Google Shopping-ready feed, a shareable public review page, and a plain-JSON
              feed for anything else — the same approved reviews, reaching shoppers wherever
              they&apos;re already looking.
            </p>
          </Reveal>
          <DistributionVisual />
        </Container>
      </section>

      {/* Capabilities — a plain two-column list, not a grid of identical bordered cards. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Everything you need
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              A complete review experience, out of the box.
            </h2>
          </Reveal>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {CAPABILITIES.map((feature, i) => (
              <Reveal key={feature.title} delayMs={i * 60} className="flex flex-col gap-2 border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Reveal>
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
