import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { LinkCard } from "@/components/LinkCard";
import { ClosingCTA } from "@/components/ClosingCTA";
import { MERCHANT_SEGMENTS } from "@/lib/merchantSegments";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Imagyn Reviews for wherever your Shopify store is today: a brand new store, a growing store automating its workflow, or a store switching platforms and bringing its reviews along.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            level="h1"
            eyebrow="Solutions"
            title="The same platform, three different priorities."
            description="What matters most from a review platform changes as a store grows. Find where your store is today."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MERCHANT_SEGMENTS.map((segment, index) => (
            <Reveal key={segment.slug} delayMs={index * 80}>
              <LinkCard
                headingLevel="h2"
                href={`/solutions/${segment.slug}`}
                title={segment.name}
                description={segment.summary}
                ctaLabel="See priorities"
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <div className="flex flex-wrap gap-6">
            <a href="/pricing" className="text-[15px] font-medium text-foreground hover:text-accent">
              Pricing →
            </a>
            <a href="/why-imagyn" className="text-[15px] font-medium text-foreground hover:text-accent">
              Why Imagyn →
            </a>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Wherever you are, start free." />
    </>
  );
}
