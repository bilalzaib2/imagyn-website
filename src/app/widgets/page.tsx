import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WidgetPreview } from "@/components/visuals/WidgetPreview";
import { WIDGET_SURFACES } from "@/lib/widgetSurfaces";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Widgets",
  description:
    "Product review lists, star rating badges, collection grid ratings and a store wide rollup for Shopify, styled through Brand Studio so nothing looks bolted on.",
  path: "/widgets",
});

const STEPS = [
  {
    title: "Choose a widget",
    description: "Pick from the Widgets page inside the app, each one shows exactly where it will appear before you add it.",
  },
  {
    title: "Add it to your theme",
    description: "One click opens the Shopify Theme Editor with the widget already selected, no manual embed code, no Liquid to write.",
  },
  {
    title: "Style it in Brand Studio",
    description: "Color, typography, corner radius and card treatment apply to every widget at once, live in preview before you save.",
  },
];

export default function WidgetsPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Widgets</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Storefront widgets that match your brand, not ours.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Five real widgets, one design system. Every star, badge and review card reads its style from Brand
              Studio, change your accent color once, and it updates everywhere reviews appear on your storefront.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href="/pricing" size="lg">
                Get Started
              </Button>
              <Button href="/brand-studio" variant="secondary" size="lg">
                Explore Brand Studio
              </Button>
            </div>
          </div>
          <Reveal>
            <WidgetPreview />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Five widgets" title="Reviews, wherever a customer is looking." align="left" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {WIDGET_SURFACES.map((widget, index) => (
              <Reveal key={widget.slug} delayMs={index * 80}>
                <a
                  href={`/widgets/${widget.slug}`}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent"
                >
                  <h3 className="text-lg font-semibold text-foreground">{widget.name}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{widget.summary}</p>
                  <span className="mt-2 text-[14px] font-medium text-foreground">See details →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="From theme editor to live storefront, in minutes." align="left" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 100}>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
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
            <a href="/brand-studio" className="text-[15px] font-medium text-foreground hover:text-accent">
              Brand Studio →
            </a>
            <Link href="/ai" className="text-[15px] font-medium text-foreground hover:text-accent">
              AI Insights →
            </Link>
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
              See your reviews, styled to match your store.
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
