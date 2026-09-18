import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Why Imagyn",
  description:
    "Why Shopify merchants choose Imagyn Reviews: honest pricing, a review platform built natively on Shopify, practical AI, real verification, and reviews you can bring with you.",
  path: "/why-imagyn",
});

const REASONS = [
  {
    title: "Pricing that stays simple",
    description:
      "Free covers unlimited reviews and requests, with no usage based fees that punish you for growing. Pro is one flat price for AI and full brand control.",
    href: "/pricing",
    linkLabel: "See pricing",
  },
  {
    title: "Built natively on Shopify",
    description:
      "No separate dashboard to learn, no iframe hack, no data export required. Every feature runs directly on Shopify's own Admin API and Theme App Extensions.",
    href: "/integrations",
    linkLabel: "See integrations",
  },
  {
    title: "AI that stays practical",
    description:
      "Every summary is generated only from a store's own approved reviews. Never invented, never generic, never dressed up as more than it is.",
    href: "/ai",
    linkLabel: "See AI Insights",
  },
  {
    title: "Verification you can trust",
    description:
      "A review only earns a Verified Buyer badge when Imagyn can check it against an actual order. Trust & Certification runs the same way, checks that actually run, never a purchased seal.",
    href: "/trust",
    linkLabel: "See Trust & Certification",
  },
  {
    title: "Bring your reviews with you",
    description:
      "Switching platforms should not mean losing years of customer feedback. Import from Judge.me, Loox, Stamped, Ali Reviews or a plain CSV, with a full preview before anything is committed.",
    href: "/import",
    linkLabel: "See Import & Migration",
  },
];

export default function WhyImagynPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            level="h1"
            eyebrow="Why Imagyn"
            title="A review platform built to be trusted, not just installed."
            description="Five reasons Shopify merchants choose Imagyn Reviews over a generic review widget."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="flex flex-col divide-y divide-border">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delayMs={index * 60} className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[1fr_2fr] md:gap-14">
              <h2 className="text-xl font-semibold text-foreground">{reason.title}</h2>
              <div className="flex flex-col items-start gap-3">
                <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{reason.description}</p>
                <a href={reason.href} className="text-[15px] font-medium text-foreground hover:text-accent">
                  {reason.linkLabel} →
                </a>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <Link href="/compare" className="text-[15px] font-medium text-foreground hover:text-accent">
            See a full, feature-by-feature comparison →
          </Link>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              See it running on your own store.
            </h2>
            <Button href={siteConfig.appStoreUrl} size="lg">
              Get Started
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
