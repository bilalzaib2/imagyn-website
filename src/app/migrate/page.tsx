import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { MIGRATION_GUIDES } from "@/lib/migrationGuides";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Migration Guides",
  description:
    "Step by step guides for migrating your reviews to Imagyn from Judge.me, Loox, Stamped, Ali Reviews or Rivyo, written from the real import capabilities, never fabricated.",
  path: "/migrate",
});

export default function MigrateIndexPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Migration guides"
            title="Bring your reviews with you, in detail."
            description="A dedicated, accurate guide for every platform Imagyn can import from today, and an honest one for the platform it cannot yet."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {MIGRATION_GUIDES.map((guide, index) => (
            <Reveal key={guide.slug} delayMs={index * 70}>
              <a
                href={`/migrate/${guide.slug}`}
                className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{guide.sourceName}</h2>
                  {guide.status === "verified" ? (
                    <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-ink">Verified</span>
                  ) : guide.status === "unsupported" ? (
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Not yet direct
                    </span>
                  ) : null}
                </div>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{guide.intro}</p>
                <span className="mt-2 text-[14px] font-medium text-foreground">Read the guide →</span>
              </a>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
