import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { LinkCard } from "@/components/LinkCard";
import { ClosingCTA } from "@/components/ClosingCTA";
import { JsonLd } from "@/components/JsonLd";
import { MERCHANT_SEGMENTS, getMerchantSegment } from "@/lib/merchantSegments";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  return MERCHANT_SEGMENTS.map((segment) => ({ segment: segment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }): Promise<Metadata> {
  const { segment: slug } = await params;
  const segment = getMerchantSegment(slug);
  if (!segment) {
    return pageMetadata({ title: "Solutions", description: "", path: `/solutions/${slug}` });
  }
  return pageMetadata({
    title: `For ${segment.name.toLowerCase()}`,
    description: segment.summary,
    path: `/solutions/${segment.slug}`,
  });
}

export default async function MerchantSegmentPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment: slug } = await params;
  const segment = getMerchantSegment(slug);
  if (!segment) {
    notFound();
  }

  const otherSegments = MERCHANT_SEGMENTS.filter((s) => s.slug !== segment.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: segment.name, path: `/solutions/${segment.slug}` },
        ])}
      />
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">For {segment.name.toLowerCase()}</span>
          <h1 className="mt-4 max-w-3xl text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            {segment.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{segment.summary}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href={siteConfig.appStoreUrl} size="lg">
              Get Started
            </Button>
            <Button href="/solutions" variant="secondary" size="lg">
              See every solution
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="What matters most" title="Three real priorities, not a generic feature list." align="left" />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {segment.priorities.map((priority, index) => (
              <Reveal key={priority.title} delayMs={index * 100}>
                <LinkCard href={priority.href} title={priority.title} description={priority.description} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Other solutions</p>
          <div className="flex flex-wrap gap-6">
            {otherSegments.map((other) => (
              <Link
                key={other.slug}
                href={`/solutions/${other.slug}`}
                className="text-[15px] font-medium text-foreground hover:text-accent"
              >
                {other.name} →
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA title="See it running on your own store." />
    </>
  );
}
