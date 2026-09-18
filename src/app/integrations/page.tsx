import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { InfoCard } from "@/components/InfoCard";
import { ClosingCTA } from "@/components/ClosingCTA";
import { DistributionVisual } from "@/components/visuals/DistributionVisual";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Integrations",
  description:
    "Imagyn Reviews is built natively on Shopify, and distributes your reviews to Google Shopping, a public review site, and any system that reads plain JSON.",
  path: "/integrations",
});

const INTEGRATIONS = [
  {
    name: "Shopify",
    status: "Native",
    description: "Built directly on the Shopify Admin API and Theme App Extensions, no separate account, no iframe hack, no data export required.",
  },
  {
    name: "Google Shopping",
    status: "Live",
    description: "A Merchant Center ready review feed, kept in sync with your approved reviews, no manual export.",
  },
  {
    name: "Public Review Site",
    status: "Live",
    description: "A shareable, public review page for every product, for an email signature, social bio, or ad landing page.",
  },
  {
    name: "JSON Feed",
    status: "Live",
    description: "A plain JSON review feed for any ad network, affiliate feed, or script that isn't Google Merchant Center.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <SectionHeading
            level="h1"
            eyebrow="Integrations"
            title="Native on Shopify. Distributed everywhere else."
            description="Imagyn Reviews doesn't just live on your storefront, your reviews reach the channels that actually drive traffic."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <DistributionVisual />
          </Reveal>
          <div className="flex flex-col gap-5 order-1 lg:order-2">
            <h2 className="text-subsection font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
              The same approved reviews, everywhere a customer might look.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A review your customer leaves once shows up on your product page, your storefront widgets, Google
              Shopping search results, and your public review site, kept in sync automatically as reviews are
              approved, edited or removed.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {INTEGRATIONS.map((item, index) => (
              <Reveal key={item.name} delayMs={index * 80}>
                <InfoCard title={item.name} description={item.description} badge={item.status} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <div className="flex flex-wrap gap-6">
            <a href="/public-review-site" className="text-[15px] font-medium text-foreground hover:text-accent">
              Public Review Site →
            </a>
            <Link href="/import" className="text-[15px] font-medium text-foreground hover:text-accent">
              Import & Migration →
            </Link>
            <a href="/features" className="text-[15px] font-medium text-foreground hover:text-accent">
              All features →
            </a>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Reviews that work as hard as your storefront." />
    </>
  );
}
