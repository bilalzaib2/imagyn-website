import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { LinkCard } from "@/components/LinkCard";
import { ClosingCTA } from "@/components/ClosingCTA";
import { COMPARISONS } from "@/lib/comparisons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compare",
  description:
    "How Imagyn Reviews compares to Judge.me, Loox and Stamped on pricing, review collection, photo and video reviews, moderation, AI features and customization.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            level="h1"
            eyebrow="Compare"
            title="How Imagyn Reviews compares."
            description="A factual, feature-by-feature look at Imagyn Reviews next to the other Shopify review apps merchants consider most often. Not a hit piece, just the real differences."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COMPARISONS.map((comparison, index) => (
            <Reveal key={comparison.slug} delayMs={index * 80}>
              <LinkCard
                headingLevel="h2"
                href={`/compare/${comparison.slug}`}
                title={`Imagyn Reviews vs ${comparison.name}`}
                description={comparison.whatItIs}
                ctaLabel="See the comparison"
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <ClosingCTA title="See the difference on your own store." primaryLabel="Get Started Free" />
    </>
  );
}
