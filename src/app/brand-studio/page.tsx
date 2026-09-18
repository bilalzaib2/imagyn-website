import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { InfoCard } from "@/components/InfoCard";
import { ClosingCTA } from "@/components/ClosingCTA";
import { BrandTransformation } from "@/components/visuals/BrandTransformation";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Brand Studio",
  description:
    "Design your Shopify review experience without touching a theme file, five starting styles, full control over color, typography and spacing.",
  path: "/brand-studio",
});

const CONTROLS = [
  { title: "Five starting styles", description: "Minimal, Modern, Editorial, Luxury and Custom, each a real, structural preset, not a color swap." },
  { title: "Color & typography", description: "Accent color, text color, font scale and letter spacing, applied to every widget at once." },
  { title: "Spacing & corners", description: "One slider for corner radius, one control for density (Compact, Balanced, Spacious)." },
  { title: "Card treatment", description: "Flat, spacing separated or boxed review cards, with border, background and shadow control when boxed." },
];

export default function BrandStudioPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Brand Studio</span>
            <h1 className="text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Design your review experience without touching a theme file.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Pick a starting style, then fine tune color, typography, spacing and corner radius. Every change
              previews live, across the Product Reviews Widget, both rating badges, and the Review Carousel, before
              you save anything.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={siteConfig.appStoreUrl} size="lg">
                Get Started
              </Button>
              <Button href="/widgets" variant="secondary" size="lg">
                See the widgets
              </Button>
            </div>
          </div>
          <Reveal>
            <BrandTransformation />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="What you control" title="Real design tokens, not a color picker bolted onto a fixed template." align="left" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CONTROLS.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 80}>
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
            <Link href="/widgets" className="text-[15px] font-medium text-foreground hover:text-accent">
              Widgets →
            </Link>
            <a href="/features" className="text-[15px] font-medium text-foreground hover:text-accent">
              All features →
            </a>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Make it look like it was always part of your store." />
    </>
  );
}
