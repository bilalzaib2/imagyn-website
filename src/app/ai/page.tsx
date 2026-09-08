import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AISummaryVisual } from "@/components/visuals/AISummaryVisual";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Insights",
  description:
    "Every product gets a plain-language AI summary of what reviewers consistently praise and flag — refreshed automatically as new reviews come in.",
  path: "/ai",
});

const DETAILS = [
  { title: "Generated from real reviews", description: "Every summary is built only from your store's own approved reviews — never invented, never generic." },
  { title: "Refreshes automatically", description: "As enough new approved reviews accumulate on a product, the summary regenerates on its own." },
  { title: "Surfaced where you already work", description: "Shown in the moderation queue, the product detail page, and the dashboard's AI Spotlight — no separate report to check." },
];

export default function AiPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">AI Insights</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Know what customers think, without reading every review.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A plain-language summary of the themes across every approved review for a product — what people
              consistently praise, what they flag, and a clear recommendation. Generated from your real data, never
              fabricated.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href="/pricing" size="lg">
                Get Started
              </Button>
              <Button href="/features" variant="secondary" size="lg">
                See all features
              </Button>
            </div>
          </div>
          <Reveal>
            <AISummaryVisual />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="From review volume to a decision, automatically." align="left" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {DETAILS.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 100}>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <div className="flex flex-wrap gap-6">
            <a href="/widgets" className="text-[15px] font-medium text-foreground hover:text-accent">
              Widgets →
            </a>
            <a href="/features" className="text-[15px] font-medium text-foreground hover:text-accent">
              All features →
            </a>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Let your reviews tell you what&apos;s working.
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
