import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
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
              <a
                href={`/compare/${comparison.slug}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft motion-reduce:hover:translate-y-0"
              >
                <h2 className="text-lg font-semibold text-foreground">
                  Imagyn Reviews vs {comparison.name}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{comparison.whatItIs}</p>
                <span className="mt-2 text-[14px] font-medium text-foreground">See the comparison →</span>
              </a>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
