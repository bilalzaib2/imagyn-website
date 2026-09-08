import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "Imagyn Reviews is built by Imagyn Studios — a focused, Shopify-native review platform, built to be genuinely used, not just installed.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "Built natively on Shopify",
    description: "Every feature is built directly on Shopify's own Admin API and Theme App Extensions — no separate dashboard to learn, no iframe hack, no data export required.",
  },
  {
    title: "Nothing advertised that isn't real",
    description: "If a feature is listed on this site or in the app, it works today. We'd rather say less than overclaim — pricing and feature pages are kept in sync with what's actually shipped.",
  },
  {
    title: "Never fabricated data",
    description: "Ratings, review counts and AI summaries are always generated from a store's real, approved reviews — never invented, never padded.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="A focused review platform, built to be used."
            description={`${siteConfig.name} is built by Imagyn Studios — one product, built for Shopify merchants who want their reviews to look like part of their store, not a plugin.`}
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 100}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-7">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Have a question we haven&apos;t answered here?
            </h2>
            <Button href="/contact" size="lg">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
