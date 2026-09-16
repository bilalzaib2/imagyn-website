import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { IMPORT_SOURCES, getImportSource } from "@/lib/importSources";
import { getMigrationGuide } from "@/lib/migrationGuides";
import { getComparison } from "@/lib/comparisons";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return IMPORT_SOURCES.map((source) => ({ source: source.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ source: string }> }): Promise<Metadata> {
  const { source: slug } = await params;
  const source = getImportSource(slug);
  if (!source) {
    return pageMetadata({ title: "Import source", description: "", path: `/import/${slug}` });
  }
  return pageMetadata({
    title: `Import from ${source.name}`,
    description: `${source.summary} Bring your ${source.name} reviews to Imagyn with a full preview before anything is committed.`,
    path: `/import/${source.slug}`,
  });
}

export default async function ImportSourcePage({ params }: { params: Promise<{ source: string }> }) {
  const { source: slug } = await params;
  const source = getImportSource(slug);
  if (!source) {
    notFound();
  }

  const otherSources = IMPORT_SOURCES.filter((s) => s.slug !== source.slug);
  const migrationGuide = getMigrationGuide(source.slug);
  const comparison = getComparison(source.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Import & Migration", path: "/import" },
          { name: source.name, path: `/import/${source.slug}` },
        ])}
      />
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">Import & Migration</span>
          <h1 className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            Import from {source.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{source.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/pricing" size="lg">
              Get Started
            </Button>
            <Button href="/import" variant="secondary" size="lg">
              See every source
            </Button>
          </div>
          {migrationGuide ? (
            <p className="mt-6 text-[15px] text-muted-foreground">
              Migrating from {source.name}?{" "}
              <a href={`/migrate/${migrationGuide.slug}`} className="font-medium text-foreground hover:text-accent">
                Read the full step by step migration guide →
              </a>
            </p>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="What imports" title="What a real import brings over." align="left" />
          <ul className="mt-10 flex max-w-2xl flex-col gap-4">
            {source.whatImports.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <Reveal className="rounded-[28px] border border-border bg-surface p-8 md:p-10">
            <p className="text-sm font-semibold text-foreground">
              {source.status === "verified" ? "Verified status" : "Honest status"}
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{source.honestNote}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Other sources</p>
          <div className="flex flex-wrap gap-6">
            {otherSources.map((other) => (
              <a
                key={other.slug}
                href={`/import/${other.slug}`}
                className="text-[15px] font-medium text-foreground hover:text-accent"
              >
                {other.name} →
              </a>
            ))}
            <a href="/trust" className="text-[15px] font-medium text-foreground hover:text-accent">
              Trust & Certification →
            </a>
            {comparison ? (
              <a href={`/compare/${comparison.slug}`} className="text-[15px] font-medium text-foreground hover:text-accent">
                Imagyn Reviews vs {comparison.name} →
              </a>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Bring your {source.name} reviews with you.
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
