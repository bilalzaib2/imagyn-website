import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AnalyticsVisualization } from "@/components/visuals/AnalyticsVisualization";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Analytics",
  description:
    "See your rating distribution, review volume, and request performance at a glance — built from your store's real review data.",
  path: "/analytics",
});

const METRICS = [
  { title: "Rating distribution", description: "Every approved review, broken down star by star — spot a slipping product before it shows up in support tickets." },
  { title: "Request performance", description: "Scheduled, sent, completed, and completion rate — know whether your request schedule is actually working." },
  { title: "AI Spotlight", description: "The most recent AI summary generated for any of your products, surfaced right on your dashboard." },
];

export default function AnalyticsPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Analytics</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Your reviews, read as a trend — not a pile.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A rating distribution, review volume over time, and review-request completion rate — all built from
              your store&apos;s own real data, on your dashboard, no separate report to check.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href="/pricing" size="lg">
                Get Started
              </Button>
              <Button href="/ai" variant="secondary" size="lg">
                See AI Insights
              </Button>
            </div>
          </div>
          <Reveal>
            <AnalyticsVisualization />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="What you see" title="One dashboard, not a dozen exported spreadsheets." align="left" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {METRICS.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 100}>
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7">
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
            <a href="/review-requests" className="text-[15px] font-medium text-foreground hover:text-accent">
              Review Requests →
            </a>
            <a href="/ai" className="text-[15px] font-medium text-foreground hover:text-accent">
              AI Insights →
            </a>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              See what&apos;s actually working.
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
