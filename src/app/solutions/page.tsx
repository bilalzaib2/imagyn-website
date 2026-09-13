import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
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
            eyebrow="Solutions"
            title="The same platform, three different priorities."
            description="What matters most from a review platform changes as a store grows. Find where your store is today."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid gap-6 md:grid-cols-3">
          {MERCHANT_SEGMENTS.map((segment, index) => (
            <Reveal key={segment.slug} delayMs={index * 80}>
              <a
                href={`/solutions/${segment.slug}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent"
              >
                <h2 className="text-lg font-semibold text-foreground">{segment.name}</h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{segment.summary}</p>
                <span className="mt-2 text-[14px] font-medium text-foreground">See priorities →</span>
              </a>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Wherever you are, start free.
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
