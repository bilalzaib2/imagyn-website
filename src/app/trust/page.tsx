import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TrustCertificationVisual } from "@/components/visuals/TrustCertificationVisual";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Trust & Certification",
  description:
    "An honest trust badge for your Shopify store, built from checks that actually run against your own real data, refreshed on a schedule, never purchased.",
  path: "/trust",
});

const PILLARS = [
  {
    title: "Transparent review practices",
    description: "Your moderation rules and review handling are visible and consistent, not hidden behind a curated feed.",
  },
  {
    title: "Secure payment methods",
    description: "Your store accepts payment methods with a real dispute path, so a customer has recourse if something goes wrong.",
  },
  {
    title: "Transparent shipping and refund policy",
    description: "A shipping and refund policy exists and states real timeframes, so a shopper knows what to expect before buying.",
  },
  {
    title: "Verified store history",
    description: "Your store has been operating long enough, and publishing enough of its reviews, to mean something.",
  },
];

const FAQS = [
  {
    q: "Is this the same as Shopify's Built for Shopify badge?",
    a: "No. Trust & Certification is Imagyn's own check, run against your store's own data. It is not affiliated with, endorsed by, or a substitute for Shopify's own Built for Shopify program.",
  },
  {
    q: "Can I pay to get certified?",
    a: "No. Certification is never purchased and never manually granted. Every pillar is calculated from real, already available data every time it runs.",
  },
  {
    q: "What happens if a pillar stops passing?",
    a: "The badge reflects your current, real status. If a pillar that used to pass no longer does, certification pauses until it passes again on a later check.",
  },
  {
    q: "Does an imported review count toward my verified total?",
    a: "Only if Imagyn can genuinely verify it. A review imported from another platform keeps a private note of what that platform claimed, but it never counts as an Imagyn verified review on its own. See the Import & Migration page for the full explanation.",
  },
];

export default function TrustPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Trust & Certification</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              A trust badge that has to earn it every time.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Four independent checks, calculated from your store&apos;s own real data on their
              own schedule. No pillar can be talked into passing, and none of them are ever
              marked passed by hand.
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
            <TrustCertificationVisual />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Four pillars" title="Every pillar is a real, repeatable check." align="left" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILLARS.map((item, index) => (
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

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-[28px] border border-border bg-surface p-8">
              <p className="text-sm font-semibold text-foreground">A note on verified reviews</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                A review only earns a real Verified Buyer badge when Imagyn can check it against
                an actual order. A rating a customer left without buying, or one carried over
                from another platform, is never quietly treated the same way.
              </p>
            </div>
          </Reveal>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
              Verified means verified, on purpose.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Trust only works if the word underneath it is honest. Your certified store status,
              your verified review count, and your trust badge all read from the same real
              numbers a shopper could check themselves.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="left" />
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {FAQS.map((item) => (
              <div key={item.q} className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/import" className="text-[15px] font-medium text-foreground hover:text-accent">
              Import & Migration →
            </Link>
            <Link href="/widgets" className="text-[15px] font-medium text-foreground hover:text-accent">
              Widgets →
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
              Earn a badge that means what it says.
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
