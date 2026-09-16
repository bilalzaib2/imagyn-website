import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ModerationFlow } from "@/components/visuals/ModerationFlow";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Review Moderation",
  description:
    "Rule-based review moderation for Shopify: auto-publish trustworthy reviews, hold the rest for a quick look, and reply publicly, all included on the Free plan.",
  path: "/features/review-moderation",
});

const RULES = [
  "Auto-publish reviews at or above a minimum star rating you set.",
  "Optionally require the reviewer to be a verified buyer before a review can auto-publish.",
  "Always hold reviews that contain a link, profanity, or a banned word or phrase you define.",
  "Get an email notification whenever a review is held for your review.",
];

const FAQS = [
  {
    q: "Is moderation included on the Free plan?",
    a: "Yes. Moderation rules and merchant replies are included on every plan, including Free.",
  },
  {
    q: "Do I have to review every single review by hand?",
    a: "No. Reviews that clear your own rules auto-publish; only what doesn't clear the bar lands in one queue for a quick manual decision.",
  },
  {
    q: "Can I reply to a review publicly?",
    a: "Yes, from the same moderation queue screen, without switching to a different part of the app.",
  },
];

export default function ReviewModerationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Review Moderation", path: "/features/review-moderation" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Review Moderation</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              A moderation queue that respects your time.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Configure once, minimum rating, verified purchase requirement, banned words and
              links, and let trustworthy reviews auto-publish while everything else waits for a
              quick look. Included on every plan, including Free.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={siteConfig.appStoreUrl} size="lg">
                Get Started Free
              </Button>
              <Button href="/docs#moderation" variant="secondary" size="lg">
                See setup docs
              </Button>
            </div>
          </div>
          <Reveal>
            <ModerationFlow />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Moderation rules" title="Rules you set once, that keep working." align="left" />
          <ul className="mt-10 flex max-w-2xl flex-col gap-4">
            {RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-3 text-[15px] text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {rule}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
              One scannable queue for everything that needs a human decision.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Everything that doesn&apos;t clear your rules lands in a single queue, not scattered
              across tabs. Reply publicly to any review right from the same screen.
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
            <Link href="/features/photo-video-reviews" className="text-[15px] font-medium text-foreground hover:text-accent">
              Photo & Video Reviews →
            </Link>
            <Link href="/trust" className="text-[15px] font-medium text-foreground hover:text-accent">
              Trust & Certification →
            </Link>
            <Link href="/pricing" className="text-[15px] font-medium text-foreground hover:text-accent">
              Pricing →
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Spend less time moderating, not more.
            </h2>
            <Button href={siteConfig.appStoreUrl} size="lg">
              Get Started Free
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
