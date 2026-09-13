import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { GUIDES, getGuide } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ guide: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }): Promise<Metadata> {
  const { guide: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return pageMetadata({ title: "Guide", description: "", path: `/guides/${slug}` });
  }
  return pageMetadata({ title: guide.title, description: guide.summary, path: `/guides/${guide.slug}` });
}

export default async function GuideDetailPage({ params }: { params: Promise<{ guide: string }> }) {
  const { guide: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    notFound();
  }

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">Guide</span>
          <h1 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.summary}</p>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex max-w-3xl flex-col divide-y divide-border">
          {guide.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3 py-10">
              <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-foreground">See the real feature this guide describes.</p>
            <Link href={guide.relatedHref} className="text-[15px] font-medium text-foreground hover:text-accent">
              {guide.relatedLabel} →
            </Link>
          </div>
        </Container>
      </section>

      {otherGuides.length > 0 ? (
        <section className="border-t border-border py-16">
          <Container className="flex max-w-3xl flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">More guides</p>
            <div className="flex flex-wrap gap-6">
              {otherGuides.map((other) => (
                <Link
                  key={other.slug}
                  href={`/guides/${other.slug}`}
                  className="text-[15px] font-medium text-foreground hover:text-accent"
                >
                  {other.title} →
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

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
