import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { InfoCard } from "@/components/InfoCard";
import { ClosingCTA } from "@/components/ClosingCTA";
import { AnalyticsVisualization } from "@/components/visuals/AnalyticsVisualization";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Analytics",
  description:
    "See your rating distribution, review volume, and request performance at a glance, built from your store's real review data.",
  path: "/analytics",
});

const METRICS = [
  { title: "Rating distribution", description: "Every approved review, broken down star by star, spot a slipping product before it shows up in support tickets." },
  { title: "Request performance", description: "Scheduled, sent, completed, and completion rate, know whether your request schedule is actually working." },
  { title: "AI Spotlight", description: "The most recent AI summary generated for any of your products, surfaced right on your dashboard." },
];

export default function AnalyticsPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Analytics</span>
            <h1 className="text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Your reviews, read as a trend, not a pile.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A rating distribution, review volume over time, and review request completion rate, all built from
              your store&apos;s own real data, on your dashboard, no separate report to check.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={siteConfig.appStoreUrl} size="lg">
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
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {METRICS.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 100}>
                <InfoCard index={index} title={item.title} description={item.description} />
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
            <Link href="/ai" className="text-[15px] font-medium text-foreground hover:text-accent">
              AI Insights →
            </Link>
          </div>
        </Container>
      </section>

      <ClosingCTA title="See what's actually working." secondaryLabel="See AI Insights" secondaryHref="/ai" />
    </>
  );
}
