import type { ComponentType } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { WidgetPreview } from "@/components/visuals/WidgetPreview";
import { CollectionFlow } from "@/components/visuals/CollectionFlow";
import { ModerationFlow } from "@/components/visuals/ModerationFlow";
import { AISummaryVisual } from "@/components/visuals/AISummaryVisual";
import { BrandTransformation } from "@/components/visuals/BrandTransformation";
import { SEOVisual } from "@/components/visuals/SEOVisual";
import { RewardsVisual } from "@/components/visuals/RewardsVisual";
import { DistributionVisual } from "@/components/visuals/DistributionVisual";
import { TrustCertificationVisual } from "@/components/visuals/TrustCertificationVisual";
import { ImportMigrationVisual } from "@/components/visuals/ImportMigrationVisual";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "Collection, moderation, AI insights, widgets and brand customization, everything Imagyn Reviews does for your Shopify store's customer reviews.",
  path: "/features",
});

const DETAIL_SECTIONS = [
  {
    eyebrow: "Collection",
    title: "Collect reviews the way customers actually give them.",
    description:
      "Star ratings, written reviews and customer photos, submitted directly on your storefront, or through a review request sent after a real purchase.",
    points: [
      "Manual and automated review requests, timed after fulfillment",
      "Photo reviews, with a moderated media gallery per product",
      "Verified Buyer badges on any review tied to a real order",
    ],
    visual: "collection",
    href: "/features/photo-video-reviews",
    exploreLabel: "Explore Photo & Video Reviews",
  },
  {
    eyebrow: "Moderation",
    title: "A moderation queue that respects your time.",
    description:
      "Configure once, minimum rating, verified purchase requirement, banned words and links, and let trustworthy reviews auto-publish while everything else waits for a quick look.",
    points: [
      "Rule-based auto-publish and auto-hold, no manual triage needed for most reviews",
      "One scannable queue for everything that needs a human decision",
      "Reply publicly to any review, right from the same screen",
    ],
    visual: "moderation",
    href: "/features/review-moderation",
    exploreLabel: "Explore Review Moderation",
  },
  {
    eyebrow: "AI Insights",
    title: "Know what customers think, without reading every review.",
    description:
      "Every product gets a generated summary of what reviewers consistently praise and what they flag, refreshed automatically as new reviews come in.",
    points: [
      "Plain language summary of themes across all approved reviews",
      "Surfaced directly in your moderation queue and dashboard",
      "Regenerates automatically as review volume grows",
    ],
    visual: "ai",
    href: "/ai",
    exploreLabel: "Explore AI Insights",
  },
  {
    eyebrow: "Widgets",
    title: "Storefront widgets that match your brand, not ours.",
    description:
      "Product review lists, star rating badges and collection grid ratings, styled through Brand Studio so nothing looks bolted on.",
    points: [
      "Product Reviews Widget: full review list, histogram and write a review form",
      "Product Rating Badge: a compact star and count signal near the buy box",
      "Collection Rating Badge: ratings across your collection and search grids",
    ],
    visual: "widgets",
    href: "/widgets",
    exploreLabel: "Explore Widgets",
  },
  {
    eyebrow: "Brand Studio",
    title: "Design your review experience without touching a theme file.",
    description:
      "Pick a starting style, then fine tune color, typography, spacing and corner radius, every change previews live before you save.",
    points: [
      "Five starting styles: Minimal, Modern, Editorial, Luxury and Custom",
      "Full control over button style, border radius and text size",
      "Changes apply instantly across every widget on your storefront",
    ],
    visual: "brand",
    href: "/brand-studio",
    exploreLabel: "Explore Brand Studio",
  },
  {
    eyebrow: "Trust & Certification",
    title: "A trust badge that has to earn it.",
    description:
      "Four independent checks, calculated from your store's own real data on their own schedule. No pillar can be talked into passing, and none of them are ever marked passed by hand.",
    points: [
      "Transparent review practices, secure payment methods, transparent policy and store history",
      "A review only earns a Verified Buyer badge when Imagyn can check it against an actual order",
      "Never affiliated with or a substitute for Shopify's own Built for Shopify program",
    ],
    visual: "trust",
    href: "/trust",
    exploreLabel: "Explore Trust & Certification",
  },
  {
    eyebrow: "SEO",
    title: "Reviews that help you get found, too.",
    description:
      "Approved reviews are synced as schema.org structured data on every product page, the kind of rich snippet markup search engines use to show star ratings directly in results.",
    points: [
      "Automatic Product / AggregateRating / Review JSON-LD",
      "Kept in sync as reviews are approved, edited or removed",
      "Zero extra requests on your storefront, rendered server-side",
    ],
    visual: "seo",
  },
  {
    eyebrow: "Rewards, Coupons & Referrals",
    title: "Give customers a real reason to come back.",
    description:
      "Three independent mechanisms, each issuing a real Shopify discount code automatically, no manual code generation, ever.",
    points: [
      "Review Rewards: a discount for a review meeting your own conditions, rating, verified purchase, photo or video",
      "Coupons: a standalone promotional campaign, independent of any review",
      "Referrals: a code your customers share, rewarding them the moment a friend's real order uses it",
    ],
    visual: "rewards",
    href: "/rewards",
    exploreLabel: "Explore Rewards, Coupons & Referrals",
  },
  {
    eyebrow: "Distribution",
    title: "Reviews that work beyond your storefront.",
    description:
      "The same approved reviews your widgets show, published in the formats other channels actually accept.",
    points: [
      "A Google Shopping ready feed, in the format Merchant Center accepts",
      "A public, shareable review page for an email signature, social bio or ad landing page",
      "A plain JSON feed for any ad network, affiliate feed or script that isn't Google Merchant Center",
    ],
    visual: "distribution",
    href: "/integrations",
    exploreLabel: "Explore Integrations",
  },
  {
    eyebrow: "Import & Migration",
    title: "Bring every review with you.",
    description:
      "Import your existing reviews from Judge.me, Loox, Stamped, Ali Reviews or a plain CSV, with a full preview before anything is committed and nothing ever fabricated along the way.",
    points: [
      "A full preview of matched, unmatched and duplicate rows before anything is imported",
      "An imported review never becomes an Imagyn verified review by itself",
      "Every import can be undone on its own, without touching any other review",
    ],
    visual: "import",
    href: "/import",
    exploreLabel: "Explore Import & Migration",
  },
];

const VISUALS: Record<string, ComponentType> = {
  collection: CollectionFlow,
  moderation: ModerationFlow,
  ai: AISummaryVisual,
  widgets: WidgetPreview,
  brand: BrandTransformation,
  trust: TrustCertificationVisual,
  seo: SEOVisual,
  rewards: RewardsVisual,
  distribution: DistributionVisual,
  import: ImportMigrationVisual,
};

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            level="h1"
            eyebrow="Features"
            title="Everything you need to turn customers into proof."
            description="A complete review system for Shopify, from the first star rating to the widget that shows it off."
          />
        </Container>
      </section>

      {DETAIL_SECTIONS.map((section, index) => {
        const Visual = section.visual ? VISUALS[section.visual] : null;

        return (
        <section key={section.title} className="border-t border-border py-24 md:py-28">
          <Container
            className={section.visual ? "grid items-center gap-14 lg:grid-cols-2" : ""}
          >
            {Visual ? (
              <div className={index % 2 === 1 ? "order-2 lg:order-1" : "order-2"}>
                <Visual />
              </div>
            ) : null}

            <div
              className={`flex flex-col gap-5 ${section.visual ? (index % 2 === 1 ? "order-1 lg:order-2" : "order-1") : "max-w-2xl"}`}
            >
              <span className="text-xs font-semibold tracking-[0.02em] text-accent">
                {section.eyebrow}
              </span>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
                {section.title}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{section.description}</p>
              <ul className="mt-2 flex flex-col gap-3">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
              {"href" in section && section.href ? (
                <a
                  href={section.href}
                  className="mt-1 text-[15px] font-medium text-foreground hover:text-accent"
                >
                  {section.exploreLabel} →
                </a>
              ) : null}
            </div>
          </Container>
        </section>
        );
      })}

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              See it running on your own store.
            </h2>
            <Button href="/pricing" size="lg">
              Get Started
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
