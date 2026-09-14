import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { MERCHANT_SEGMENTS, getMerchantSegment } from "@/lib/merchantSegments";
import { pageMetadata } from "@/lib/seo";

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
    title: `Imagyn Reviews for ${segment.name.toLowerCase()}`,
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
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">For {segment.name.toLowerCase()}</span>
          <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            {segment.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{segment.summary}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/pricing" size="lg">
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
                <a
                  href={priority.href}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft motion-reduce:hover:translate-y-0"
                >
                  <h3 className="text-lg font-semibold text-foreground">{priority.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{priority.description}</p>
                </a>
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

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              See it running on your own store.
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
