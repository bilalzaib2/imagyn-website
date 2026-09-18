import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Pill } from "@/components/Pill";
import { CircleCluster } from "@/components/CircleCluster";
import { Reveal } from "@/components/Reveal";
import { HeroIntro } from "@/components/visuals/HeroIntro";
import { HeroProductShowcase } from "@/components/visuals/HeroProductShowcase";
import { EmailStudioVisual } from "@/components/visuals/EmailStudioVisual";
import { AutomationTimeline } from "@/components/visuals/AutomationTimeline";
import { SignalShowcase } from "@/components/visuals/SignalShowcase";
import { WidgetPreview } from "@/components/visuals/WidgetPreview";
import { JourneySection } from "@/components/visuals/JourneySection";
import { BrandTransformation } from "@/components/visuals/BrandTransformation";
import { GrowthBento } from "@/components/visuals/GrowthBento";
import { TrustCertificationVisual } from "@/components/visuals/TrustCertificationVisual";
import { ProductCarousel } from "@/components/visuals/ProductCarousel";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { COMPARISONS } from "@/lib/comparisons";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} · ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const CAPABILITIES = [
  {
    title: "Verified Buyer badges",
    description: "A quiet checkmark next to real customers who actually purchased. Trust without noise.",
  },
  {
    title: "AI powered summaries",
    description: "Every product's reviews distilled into what customers actually love and worry about.",
  },
  {
    title: "Moderation rules",
    description: "Auto publish trustworthy reviews and hold the rest for a quick manual look.",
  },
  {
    title: "Beautiful widgets",
    description: "Review lists, rating badges and star summaries that match your storefront, pixel for pixel.",
  },
  {
    title: "Review requests",
    description: "Ask customers for a review, manually today, automatically once approved for order data.",
  },
  {
    title: "Brand Studio",
    description: "Tune every color, radius and type scale. No code, no theme editing required.",
  },
  {
    title: "Rewards, coupons & referrals",
    description: "Real Shopify discount codes for a review, a standalone campaign, or a friend's first order.",
  },
  {
    title: "Distribution",
    description: "A Google Shopping ready feed, a public review page, and JSON for any other channel.",
  },
  {
    title: "Trust & Certification",
    description: "Four independent checks, calculated from your own real data. Never purchased.",
  },
  {
    title: "Import & Migration",
    description: "Bring your reviews from Judge.me, Loox, Stamped, Ali Reviews or a plain CSV.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO, a real product showcase carousel (Store Reviews -> Product Reviews Widget ->
          Review Carousel -> AI Summary -> Trust & Certification, on loop) rather than
          decorative shapes, so the visual hierarchy comes from typography, real product UI
          and motion instead of abstract circles. Background keeps the same tonal
          green-black system as the footer (forest -> forest-surface). */}
      <section
        className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32"
        style={{ background: "linear-gradient(160deg, var(--color-forest), var(--color-forest-surface))" }}
      >
        <Container className="relative grid grid-cols-1 items-center gap-10 sm:gap-16 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <HeroIntro>
            <Pill tone="light">Shopify Review App</Pill>
            <h1 className="text-[clamp(2.75rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              Build trust with every <span className="text-lime">customer review</span>.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-white/70">{siteConfig.description}</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.appStoreUrl} variant="light" size="lg">
                Get Started
              </Button>
              <Button href="/features" variant="outline-light" size="lg">
                See Features
              </Button>
            </div>
          </HeroIntro>

          <HeroProductShowcase />
        </Container>
      </section>

      {/* LIGHT, a fast platform overview before the page walks through each stage on its
          own: five real surfaces, cycling automatically. */}
      <section className="py-24 md:py-28">
        <Container className="flex flex-col items-center gap-10">
          <div className="max-w-xl text-center">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">The platform</span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              One system, five real surfaces.
            </h2>
          </div>
          <div className="w-full max-w-xl">
            <ProductCarousel />
          </div>
        </Container>
      </section>

      {/* LIGHT, Collect: the review request email itself, with its real merge tokens
          resolving and the send moving through its actual lifecycle. */}
      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Pill tone="dark">Collect</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Ask at the right moment.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every review request is a real email, personalized with the customer&apos;s name,
              your store name and the product they bought, written and styled in Email Studio,
              sent under your name.
            </p>
          </Reveal>
          <EmailStudioVisual />
        </Container>
      </section>

      {/* LIGHT, Automation: visual leads (order swapped from the Collect section above it),
          breaking the left-text/right-visual repetition before it sets in as a pattern. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <AutomationTimeline />
          </Reveal>
          <Reveal className="flex flex-col gap-5 lg:order-2" delayMs={80}>
            <Pill tone="dark">Automation</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Set the schedule once. It runs itself.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A request goes out after fulfillment, with reminders on your own schedule if a
              customer hasn&apos;t reviewed yet, and stops the moment they do.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* DARK (foreground), the page's one oversized-number moment, not another
          left-text/right-card split. Full-width and typography-led, breaking the zigzag
          rhythm the sections above it run, and dark rather than a lime flood, keeping the
          brand green to a single accent (the stars) instead of a whole section background. */}
      <section className="bg-foreground py-24 md:py-32">
        <Container className="flex flex-col items-center gap-12">
          <Reveal className="max-w-lg text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Analytics + AI</span>
            <h2 className="mt-4 text-section font-semibold leading-[1.1] tracking-[-0.035em] text-white">
              Know what your customers love.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Average rating, verified review share and rating distribution at a glance, plus an
              AI generated read on what customers consistently praise and flag.
            </p>
          </Reveal>
          <Reveal delayMs={100} className="w-full">
            <SignalShowcase />
          </Reveal>
        </Container>
      </section>

      {/* LIGHT, on-site widgets: a full-width showcase, not another split zigzag. Text
          centered above, the storefront preview given real width below to actually read as
          a showcase rather than a card squeezed into half a row. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col items-center gap-12">
          <Reveal className="max-w-xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Storefront widgets</span>
            <h2 className="mt-4 text-section font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Make every product more trusted.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Review lists, star rating badges and collection grid ratings, styled through Brand
              Studio so nothing looks bolted onto your theme.
            </p>
          </Reveal>
          <Reveal delayMs={100} className="w-full">
            <WidgetPreview />
          </Reveal>
        </Container>
      </section>

      {/* SIGNATURE INTERACTION, the same review object visibly becomes
          Collect → Understand → Showcase as the visitor scrolls. */}
      <JourneySection />

      {/* LIGHT, Reward + Grow + Switch: these were three consecutive full-width split
          sections (the same left-text/right-card shape three times in a row). One real
          asymmetric bento says the same three things with actual grid rhythm instead. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col gap-14">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.02em] text-muted-foreground">Beyond the storefront</span>
            <h2 className="mt-4 text-section font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Reviews that reward, reach further, and travel with you.
            </h2>
          </Reveal>
          <GrowthBento />
        </Container>
      </section>

      {/* DARK (forest), Trust: its own homepage moment, since Imagyn's certification model
          (four real, repeatable checks, never purchased) is more differentiated than a
          typical review app's trust story. Real product UI floats above the dark
          background exactly as it does on a light section, unchanged internally. */}
      <section className="bg-forest py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <TrustCertificationVisual />
          </Reveal>
          <Reveal className="flex flex-col gap-5 lg:order-2" delayMs={80}>
            <Pill tone="lime">Trust</Pill>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
              A trust badge that has to earn it.
            </h2>
            <p className="text-lg leading-relaxed text-sage">
              Four independent checks, calculated from your store&apos;s own real data on their
              own schedule. No pillar can be talked into passing, and a review only earns a
              Verified Buyer badge when Imagyn can check it against an actual order.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* BLACK, brand customization, the emotional close before capabilities. */}
      <section className="bg-foreground py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-6">
            <Pill tone="light">Customization + conversion</Pill>
            <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Your reviews.
              <br />
              Your brand.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Brand Studio hands you five starting styles, Minimal, Modern, Editorial, Luxury
              and Custom, then lets you tune button style, radius and type until every widget
              looks like it shipped with your theme.
            </p>
          </Reveal>
          <BrandTransformation />
        </Container>
      </section>

      {/* Capabilities: a dense reference strip, not a repeat of the sections above. Every
          item here already got its own full moment earlier on this page, so each entry
          stays to one short, concrete sentence here — enough to be useful on its own (for
          a reader skimming just this section, or an AI system extracting it) without
          doubling the page length by restating the fuller copy above verbatim. */}
      <section className="border-t border-border py-20 md:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal className="max-w-xl">
            <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground">
              A complete review experience, out of the box.
            </h2>
          </Reveal>

          <Reveal>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((feature, index) => (
                <li key={feature.title} className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold text-accent/60">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[14.5px] font-semibold text-foreground">{feature.title}</span>
                  <span className="text-[13px] leading-relaxed text-muted-foreground">{feature.description}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Pricing at a glance: the homepage never showed a number before this, so a visitor
          had to click through to /pricing just to learn a free plan exists at all. Real
          figures only, pulled from the same two plans /pricing itself defines — this is a
          glimpse, not a duplicate of that page's full feature-by-feature table. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col gap-14">
          <Reveal className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Pricing</span>
            <h2 className="mt-4 text-section font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Free to start. Simple when you grow.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal className="flex flex-col gap-5 rounded-[28px] border border-border p-8">
              <div>
                <p className="text-sm font-semibold text-foreground">Free</p>
                <p className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground">$0</p>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Unlimited reviews and requests, photo and video reviews, widgets and
                moderation. No time limit, no credit card.
              </p>
              <Button href={siteConfig.appStoreUrl} variant="secondary" size="md" className="mt-auto w-fit">
                Get Started Free
              </Button>
            </Reveal>

            <Reveal delayMs={80} className="flex flex-col gap-5 rounded-[28px] border border-accent p-8 shadow-elevated">
              <div>
                <p className="text-sm font-semibold text-foreground">Pro</p>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-[-0.02em] text-foreground">$9.99</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </p>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Everything in Free, plus AI review summaries, automatic reminder emails and
                full Brand Studio customization. 14-day free trial.
              </p>
              <Button href={siteConfig.appStoreUrl} size="md" className="mt-auto w-fit">
                Start Pro
              </Button>
            </Reveal>
          </div>

          <a href="/pricing" className="text-[15px] font-medium text-foreground hover:text-accent">
            See the full plan comparison →
          </a>
        </Container>
      </section>

      {/* Why Imagyn: the homepage never named a competitor or said "why choose us" before
          this. Real differentiators only, the same ones /why-imagyn and each /compare/[x]
          page make in full — this is a condensed pointer to that content, not a duplicate
          of it. The three differentiator blocks are prose, deliberately not a comparison
          table (a table implies row-by-row parity claims about a competitor this page
          never verified point-by-point; the real, sourced comparison lives on /compare).
          The row of per-competitor links below is what actually connects a merchant
          evaluating a specific alternative straight to that page. */}
      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col gap-14">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.02em] text-muted-foreground">Why Imagyn</span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Not the only review app. The one built to be trusted.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
            <Reveal className="flex flex-col gap-2">
              <p className="text-[15px] font-semibold text-foreground">Built natively on Shopify</p>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                No separate dashboard, no iframe hack. Every feature runs on Shopify&apos;s own
                Admin API and Theme App Extensions.
              </p>
            </Reveal>
            <Reveal delayMs={60} className="flex flex-col gap-2">
              <p className="text-[15px] font-semibold text-foreground">Verification you can trust</p>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                An imported review never becomes a Verified Buyer review by itself. Switching
                never quietly inflates your numbers.
              </p>
            </Reveal>
            <Reveal delayMs={120} className="flex flex-col gap-2">
              <p className="text-[15px] font-semibold text-foreground">Pricing that stays simple</p>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                One flat Pro price, not a bill that grows with your order volume. Free has no
                usage limits on the core.
              </p>
            </Reveal>
          </div>

          <Reveal className="flex flex-col gap-4 border-t border-border pt-10">
            <p className="text-[13px] font-medium text-muted-foreground">
              Evaluating a specific alternative? See the factual, side-by-side breakdown.
            </p>
            <div className="flex flex-wrap gap-3">
              {COMPARISONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="rounded-[10px] border border-border px-4 py-2.5 text-[14px] font-medium text-foreground transition-colors hover:border-foreground"
                >
                  Imagyn vs {c.name}
                </Link>
              ))}
              <Link
                href="/why-imagyn"
                className="px-4 py-2 text-[14px] font-medium text-foreground hover:text-accent"
              >
                More reasons merchants choose Imagyn →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Closing CTA, the circle motif returns to bookend the hero. */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <CircleCluster
          layout="row"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] w-full opacity-20"
        />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
            Start building trust today.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            Free to install. Upgrade only when you need AI summaries, photo reviews and Brand
            Studio.
          </p>
          <Button href={siteConfig.appStoreUrl} variant="light" size="lg">
            Get Started
          </Button>
        </Container>
      </section>
    </>
  );
}
