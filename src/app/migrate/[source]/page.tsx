import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MIGRATION_GUIDES, getMigrationGuide } from "@/lib/migrationGuides";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return MIGRATION_GUIDES.map((guide) => ({ source: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ source: string }> }): Promise<Metadata> {
  const { source: slug } = await params;
  const guide = getMigrationGuide(slug);
  if (!guide) {
    return pageMetadata({ title: "Migration guide", description: "", path: `/migrate/${slug}` });
  }
  return pageMetadata({ title: guide.title, description: guide.metaDescription, path: `/migrate/${guide.slug}` });
}

const FACT_ROWS = (guide: NonNullable<ReturnType<typeof getMigrationGuide>>) => [
  { label: "Verification", value: guide.verification },
  { label: "Duplicate handling", value: guide.duplicateHandling },
  { label: "Product matching", value: guide.productMatching },
  { label: "Customer matching", value: guide.customerMatching },
  { label: "Media handling", value: guide.mediaHandling },
  { label: "Publication status", value: guide.publicationStatus },
];

export default async function MigrationGuidePage({ params }: { params: Promise<{ source: string }> }) {
  const { source: slug } = await params;
  const guide = getMigrationGuide(slug);
  if (!guide) {
    notFound();
  }

  const otherGuides = MIGRATION_GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">Migration guide</span>
          <h1 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>
          <p className="mt-3 text-[15px] text-muted-foreground">
            <span className="font-semibold text-foreground">Who this is for: </span>
            {guide.whoFor}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/pricing" size="lg">
              Get Started
            </Button>
            <Button href={guide.importHref} variant="secondary" size="lg">
              See the {guide.sourceName} import page
            </Button>
          </div>
        </Container>
      </section>

      {guide.whatMigrates.length > 0 ? (
        <section className="border-t border-border py-16 md:py-20">
          <Container className="max-w-3xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-foreground">What migrates</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {guide.whatMigrates.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">What does not migrate</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {guide.whatDoesNotMigrate.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="border-t border-border py-16 md:py-20">
          <Container className="max-w-3xl">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <p className="text-sm font-semibold text-foreground">No direct import yet</p>
              <ul className="mt-4 flex flex-col gap-3">
                {guide.whatDoesNotMigrate.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border py-16 md:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold text-foreground">Step by step</p>
          <div className="mt-8 flex flex-col gap-8">
            {guide.steps.map((step, index) => (
              <div key={step.title} className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold text-foreground">The details that matter</p>
          <div className="mt-6 flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
            {FACT_ROWS(guide).map((row) => (
              <div key={row.label} className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-[180px_1fr] sm:gap-6">
                <p className="text-sm font-semibold text-foreground">{row.label}</p>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{row.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold text-foreground">Troubleshooting</p>
          <div className="mt-6 flex flex-col gap-6">
            {guide.troubleshooting.map((item) => (
              <div key={item.q}>
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Other migration guides</p>
          <div className="flex flex-wrap gap-6">
            {otherGuides.map((other) => (
              <Link
                key={other.slug}
                href={`/migrate/${other.slug}`}
                className="text-[15px] font-medium text-foreground hover:text-accent"
              >
                {other.sourceName} →
              </Link>
            ))}
            <Link href="/import" className="text-[15px] font-medium text-foreground hover:text-accent">
              Import & Migration →
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16">
            <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
              Bring your {guide.sourceName} reviews to Imagyn.
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
