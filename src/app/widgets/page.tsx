import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { LinkCard } from "@/components/LinkCard";
import { NumberedList } from "@/components/NumberedList";
import { ClosingCTA } from "@/components/ClosingCTA";
import { WidgetPreview } from "@/components/visuals/WidgetPreview";
import { WIDGET_SURFACES } from "@/lib/widgetSurfaces";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

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
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Widgets</span>
            <h1 className="text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Storefront widgets that match your brand, not ours.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Five real widgets, one design system. Every star, badge and review card reads its style from Brand
              Studio, change your accent color once, and it updates everywhere reviews appear on your storefront.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={siteConfig.appStoreUrl} size="lg">
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
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WIDGET_SURFACES.map((widget, index) => (
              <Reveal key={widget.slug} delayMs={index * 80}>
                <LinkCard href={`/widgets/${widget.slug}`} title={widget.name} description={widget.summary} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="From theme editor to live storefront, in minutes." align="left" />
          <div className="mt-14">
            <NumberedList items={STEPS} />
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

      <ClosingCTA title="See your reviews, styled to match your store." secondaryLabel="Explore Brand Studio" secondaryHref="/brand-studio" />
    </>
  );
}
