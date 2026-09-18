import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { NumberedList } from "@/components/NumberedList";
import { ClosingCTA } from "@/components/ClosingCTA";
import { DistributionVisual } from "@/components/visuals/DistributionVisual";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Public Review Site",
  description:
    "A shareable, public review page for every product on your Shopify store, built from your real approved reviews, for an email signature, social bio or ad landing page.",
  path: "/public-review-site",
});

const DETAILS = [
  {
    title: "A real page for every product",
    description: "Every product with approved reviews gets its own public page, generated automatically, never hand built.",
  },
  {
    title: "Always current",
    description: "The same reviews your storefront widgets show. Approve, edit or remove a review, and the public page reflects it immediately.",
  },
  {
    title: "Made to be shared",
    description: "A clean, fast page built for a place your storefront theme cannot reach: an email signature, a social bio, or an ad landing page.",
  },
];

export default function PublicReviewSitePage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Public Review Site</span>
            <h1 className="text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Your reviews, off your storefront too.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A shareable, public page for every product, built from your real approved
              reviews, for the places your storefront theme cannot reach.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={siteConfig.appStoreUrl} size="lg">
                Get Started
              </Button>
              <Button href="/integrations" variant="secondary" size="lg">
                See integrations
              </Button>
            </div>
          </div>
          <Reveal>
            <DistributionVisual />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="Generated from your real reviews, always current." align="left" />
          <div className="mt-14">
            <NumberedList items={DETAILS} />
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <div className="flex flex-wrap gap-6">
            <a href="/trust" className="text-[15px] font-medium text-foreground hover:text-accent">
              Trust & Certification →
            </a>
            <a href="/integrations" className="text-[15px] font-medium text-foreground hover:text-accent">
              Integrations →
            </a>
            <a href="/features" className="text-[15px] font-medium text-foreground hover:text-accent">
              All features →
            </a>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Give your reviews somewhere else to live." />
    </>
  );
}
