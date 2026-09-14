import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ImportMigrationVisual } from "@/components/visuals/ImportMigrationVisual";
import { IMPORT_SOURCES } from "@/lib/importSources";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Import & Migration",
  description:
    "Bring your existing reviews to Imagyn from Judge.me, Loox, Stamped, Ali Reviews or a plain CSV file, with a full preview before anything is imported and nothing ever fabricated.",
  path: "/import",
});

const STEPS = [
  {
    title: "Upload your file",
    description: "Drop in your export from your old platform or a plain CSV. Imagyn reads the columns and shows you what it found.",
  },
  {
    title: "Check the preview",
    description: "See exactly what will happen before it happens: which rows matched a product, which need your review, and which look like duplicates.",
  },
  {
    title: "Import with confidence",
    description: "Nothing is imported until you say so. Once you confirm, every row is recorded with its own history, and you can undo the whole import later.",
  },
];

const FAQS = [
  {
    q: "Will imported reviews show up as verified?",
    a: "Only if Imagyn can genuinely verify them, which it cannot do for a review it never saw the original order for. If your old platform marked a review as verified, that note is kept for your own reference, but it never becomes an Imagyn verified badge on its own.",
  },
  {
    q: "What happens to reviews that cannot be matched to a product?",
    a: "They are never guessed onto the wrong product. Imagyn shows you exactly which rows could not be matched, or matched more than one product ambiguously, so you can fix the file or decide what to do with them.",
  },
  {
    q: "Can I import the same file twice by accident?",
    a: "No. Imagyn checks for duplicates using the review's own source identifier where the file provides one, and otherwise by matching the product, reviewer and content together. A second import of the same file reports duplicates, not new reviews.",
  },
  {
    q: "Can I undo an import?",
    a: "Yes. Every import is recorded as its own batch in your import history, and can be undone on its own, without touching any other review in your store.",
  },
  {
    q: "Will this replace reviews I already have?",
    a: "No. Import only adds new reviews. It never edits, hides or removes a review that is already in your store.",
  },
];

export default function ImportPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.02em] text-accent">Import & Migration</span>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
              Bring every review with you.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Switching platforms should not mean starting over. Import your existing reviews
              from Judge.me, Loox, Stamped, Ali Reviews or a plain CSV, with a full preview
              before anything is committed and nothing ever fabricated along the way.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href="/pricing" size="lg">
                Get Started
              </Button>
              <Button href="/trust" variant="secondary" size="lg">
                See how verification works
              </Button>
            </div>
          </div>
          <Reveal>
            <ImportMigrationVisual />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Supported sources" title="Coming from somewhere else? We probably read that file." align="left" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {IMPORT_SOURCES.map((source, index) => (
              <Reveal key={source.slug} delayMs={index * 70}>
                <a
                  href={`/import/${source.slug}`}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft motion-reduce:hover:translate-y-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{source.name}</h3>
                    {source.status === "verified" ? (
                      <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-ink">
                        Verified
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{source.summary}</p>
                  <span className="mt-2 text-[14px] font-medium text-foreground">See details →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="See it before it happens. Undo it if you need to." align="left" />
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 100}>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-[28px] border border-border bg-surface p-8">
              <p className="text-sm font-semibold text-foreground">Never fabricated, on purpose</p>
              <ul className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-muted-foreground">
                <li>An imported review never becomes an Imagyn verified review by itself.</li>
                <li>A row that cannot be matched is reported, never guessed onto a product.</li>
                <li>Photos are only linked from your original source, never invented.</li>
                <li>Nothing is imported until you have seen the full preview and approved it.</li>
              </ul>
            </div>
          </Reveal>
          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
              Honesty is the whole point of switching.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A migration tool that quietly marks everything verified just to look impressive is
              not actually helping you. Imagyn keeps your old platform&apos;s claim on record for
              your own reference, but only ever shows a Verified Buyer badge Imagyn can stand
              behind. See the Trust & Certification page for the full explanation.
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
            <a href="/trust" className="text-[15px] font-medium text-foreground hover:text-accent">
              Trust & Certification →
            </a>
            <a href="/features" className="text-[15px] font-medium text-foreground hover:text-accent">
              All features →
            </a>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-foreground py-28 md:py-36">
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
            Your reviews took time to earn. Keep them.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            Free to install, free to import. Upgrade only when you want AI summaries and Brand
            Studio.
          </p>
          <Button href="/pricing" variant="lime" size="lg">
            Get Started
          </Button>
        </Container>
      </section>
    </>
  );
}
