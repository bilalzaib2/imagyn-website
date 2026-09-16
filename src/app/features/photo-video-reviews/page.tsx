import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { CollectionFlow } from "@/components/visuals/CollectionFlow";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Photo & Video Reviews",
  description:
    "Collect photo and video reviews on your Shopify store, included on the Free plan, with a moderated media gallery on every product.",
  path: "/features/photo-video-reviews",
});

const FAQS = [
  {
    q: "Are photo and video reviews included on the Free plan?",
    a: "Yes. Both are included on the Free plan, with no separate charge or upgrade required to turn them on.",
  },
  {
    q: "Where do customer photos and videos show up?",
    a: "In the Product Reviews Widget's media gallery on the product page, alongside the review they were submitted with, styled through Brand Studio like every other widget.",
  },
  {
    q: "Are photo and video reviews moderated the same way as text reviews?",
    a: "Yes. They pass through the same moderation queue and rules as every other review, so a photo or video only publishes when it clears your own moderation settings.",
  },
];

export default function PhotoVideoReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Photo & Video Reviews", path: "/features/photo-video-reviews" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Photo & Video Reviews</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Let customers show it, not just say it.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Star ratings and written reviews, plus real customer photos and video, submitted
              directly on your storefront or through a review request sent after a real
              purchase. Included on the Free plan, with a moderated media gallery on every
              product.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={siteConfig.appStoreUrl} size="lg">
                Get Started Free
              </Button>
              <Button href="/widgets/product-reviews" variant="secondary" size="lg">
                See the Product Reviews Widget
              </Button>
            </div>
          </div>
          <Reveal>
            <CollectionFlow />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="Part of the same review, not a separate system." align="left" />
          <ul className="mt-10 flex max-w-2xl flex-col gap-4">
            <li className="flex items-start gap-3 text-[15px] text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Photo and video attach to a review a customer submits, either on your storefront or through a review request.
            </li>
            <li className="flex items-start gap-3 text-[15px] text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Media appears in a moderated gallery on each product, alongside the review it belongs to.
            </li>
            <li className="flex items-start gap-3 text-[15px] text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              A review only publishes with its photo or video once it clears your moderation rules, the same as any other review.
            </li>
            <li className="flex items-start gap-3 text-[15px] text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Switching from another platform? Photo links from your export are validated and referenced directly during import, never invented.
            </li>
          </ul>
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
            <Link href="/features/review-moderation" className="text-[15px] font-medium text-foreground hover:text-accent">
              Review Moderation →
            </Link>
            <Link href="/widgets/product-reviews" className="text-[15px] font-medium text-foreground hover:text-accent">
              Product Reviews Widget →
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
              Turn real customers into visual proof.
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
