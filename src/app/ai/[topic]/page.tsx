import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ClosingCTA } from "@/components/ClosingCTA";
import { JsonLd } from "@/components/JsonLd";
import { AI_SURFACES, getAiSurface } from "@/lib/aiSurfaces";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  return AI_SURFACES.map((surface) => ({ topic: surface.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params;
  const surface = getAiSurface(slug);
  if (!surface) {
    return pageMetadata({ title: "AI", description: "", path: `/ai/${slug}` });
  }
  return pageMetadata({
    title: surface.name,
    description: `${surface.summary} Generated only from real, approved reviews, never invented.`,
    path: `/ai/${surface.slug}`,
  });
}

export default async function AiSurfacePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const surface = getAiSurface(slug);
  if (!surface) {
    notFound();
  }

  const other = AI_SURFACES.find((s) => s.slug !== surface.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI Insights", path: "/ai" },
          { name: surface.name, path: `/ai/${surface.slug}` },
        ])}
      />
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">AI Insights</span>
          <h1 className="mt-4 text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            {surface.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{surface.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href={siteConfig.appStoreUrl} size="lg">
              Get Started
            </Button>
            <Button href="/ai" variant="secondary" size="lg">
              See AI Insights
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Where it appears" title={surface.placement} align="left" />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="What it does" title="Generated from real reviews, never invented." align="left" />
          <ul className="mt-10 flex max-w-2xl flex-col gap-4">
            {surface.capabilities.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Related</p>
          <div className="flex flex-wrap gap-6">
            {other ? (
              <Link href={`/ai/${other.slug}`} className="text-[15px] font-medium text-foreground hover:text-accent">
                {other.name} →
              </Link>
            ) : null}
            <Link href="/analytics" className="text-[15px] font-medium text-foreground hover:text-accent">
              Analytics →
            </Link>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Let your reviews tell you what's working." />
    </>
  );
}
