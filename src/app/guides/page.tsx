import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guides",
  description:
    "Practical, evergreen guides written from the real Imagyn Reviews product: migrating your reviews, how verification works, and getting your first reviews as a new store.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Guides"
            title="Practical guides, written from the real product."
            description="Not a blog. Evergreen walkthroughs of the parts of Imagyn worth understanding in more depth."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid gap-6 md:grid-cols-3">
          {GUIDES.map((guide, index) => (
            <Reveal key={guide.slug} delayMs={index * 80}>
              <a
                href={`/guides/${guide.slug}`}
                className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent"
              >
                <h2 className="text-lg font-semibold text-foreground">{guide.title}</h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{guide.summary}</p>
                <span className="mt-2 text-[14px] font-medium text-foreground">Read the guide →</span>
              </a>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
