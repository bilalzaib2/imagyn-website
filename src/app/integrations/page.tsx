import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
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
    description: "Built directly on the Shopify Admin API and Theme App Extensions — no separate account, no iframe hack, no data export required.",
  },
  {
    name: "Google Shopping",
    status: "Live",
    description: "A Merchant Center-ready review feed, kept in sync with your approved reviews — no manual export.",
  },
  {
    name: "Public Review Site",
    status: "Live",
    description: "A shareable, public review page for every product — for an email signature, social bio, or ad landing page.",
  },
  {
    name: "JSON Feed",
    status: "Live",
    description: "A plain-JSON review feed for any ad network, affiliate feed, or script that isn't Google Merchant Center.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <SectionHeading
            eyebrow="Integrations"
            title="Native on Shopify. Distributed everywhere else."
            description="Imagyn Reviews doesn't just live on your storefront — your reviews reach the channels that actually drive traffic."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <DistributionVisual />
          </Reveal>
          <div className="flex flex-col gap-5 order-1 lg:order-2">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
              The same approved reviews, everywhere a customer might look.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A review your customer leaves once shows up on your product page, your storefront widgets, Google
              Shopping search results, and your public review site — kept in sync automatically as reviews are
              approved, edited or removed.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {INTEGRATIONS.map((item, index) => (
              <Reveal key={item.name} delayMs={index * 80}>
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-ink">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Reviews that work as hard as your storefront.
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
