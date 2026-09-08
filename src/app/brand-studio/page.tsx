import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { BrandTransformation } from "@/components/visuals/BrandTransformation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Brand Studio",
  description:
    "Design your Shopify review experience without touching a theme file — five starting styles, full control over color, typography and spacing.",
  path: "/brand-studio",
});

const CONTROLS = [
  { title: "Five starting styles", description: "Minimal, Modern, Editorial, Luxury and Custom — each a real, structural preset, not a color swap." },
  { title: "Color & typography", description: "Accent color, text color, font scale and letter spacing — applied to every widget at once." },
  { title: "Spacing & corners", description: "One slider for corner radius, one control for density (Compact, Balanced, Spacious)." },
  { title: "Card treatment", description: "Flat, spacing-separated or boxed review cards, with border, background and shadow control when boxed." },
];

export default function BrandStudioPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Brand Studio</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Design your review experience without touching a theme file.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Pick a starting style, then fine-tune color, typography, spacing and corner radius. Every change
              previews live — across the Product Reviews Widget, both rating badges, and the Review Carousel — before
              you save anything.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href="/pricing" size="lg">
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
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {CONTROLS.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 80}>
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
              Make it look like it was always part of your store.
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
