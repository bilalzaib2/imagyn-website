import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AutomationTimeline } from "@/components/visuals/AutomationTimeline";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Review Requests",
  description:
    "Ask every customer for a review, manually or on autopilot — a request goes out after fulfillment, with configurable reminders until they review or unsubscribe.",
  path: "/review-requests",
});

const DETAILS = [
  { title: "Manual or automatic", description: "Send a request to any past order by hand, or turn on automatic requests after every fulfillment." },
  { title: "Configurable delay & reminders", description: "Choose how long to wait after fulfillment, and how many days between each reminder — Imagyn stops the moment a review comes in." },
  { title: "Real unsubscribe, always honored", description: "Every email carries a real unsubscribe link. Once a customer opts out, they're never emailed again for that store." },
];

export default function ReviewRequestsPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Review Requests</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              A request goes out. A review comes back.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Ask customers for a review the way that fits your store — one at a time, or automatically after every
              fulfilled order, with a reminder schedule you control end to end.
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
            <AutomationTimeline />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="Built to respect the customer on the other end." align="left" />
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
            <a href="/analytics" className="text-[15px] font-medium text-foreground hover:text-accent">
              Analytics →
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
              Stop chasing reviews by hand.
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
