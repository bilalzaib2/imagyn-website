import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ClosingCTA } from "@/components/ClosingCTA";
import { JsonLd } from "@/components/JsonLd";
import { COMPARISONS, getComparison } from "@/lib/comparisons";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
  const { competitor: slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) {
    return pageMetadata({ title: "Compare", description: "", path: `/compare/${slug}` });
  }
  return pageMetadata({
    title: `vs ${comparison.name}`,
    description: `A factual comparison of Imagyn Reviews and ${comparison.name}: pricing, review collection, photo and video reviews, moderation, AI features and customization.`,
    path: `/compare/${comparison.slug}`,
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor: slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) {
    notFound();
  }

  const otherComparisons = COMPARISONS.filter((c) => c.slug !== comparison.slug);

  const faqs = [
    {
      q: `Is this comparison biased toward Imagyn Reviews?`,
      a: `We built it, so read it with that in mind. Every Imagyn fact here matches the Features and Pricing pages exactly, and every ${comparison.name} fact is sourced and dated rather than guessed — see the note below the table.`,
    },
    {
      q: `How current is the ${comparison.name} pricing shown here?`,
      a: `${comparison.pricingSourceNote} This page was last checked on ${comparison.researchedOn}.`,
    },
    {
      q: `Can I bring my ${comparison.name} reviews to Imagyn?`,
      a: `Yes. See the Import & Migration guide for ${comparison.name} for exactly what transfers, what doesn't, and how verification is handled.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: `vs ${comparison.name}`, path: `/compare/${comparison.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">Compare</span>
          <h1 className="mt-4 text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            Imagyn Reviews vs {comparison.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {comparison.whatItIs}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href={siteConfig.appStoreUrl} size="lg">
              Get Started Free
            </Button>
            <Button href={comparison.migrationHref} variant="secondary" size="lg">
              How migration works
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Side by side" title="Feature by feature." align="left" />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="py-4 pl-6 pr-4 text-sm font-semibold text-muted-foreground">Category</th>
                    <th className="border-l-2 border-accent py-4 pr-4 pl-4 text-sm font-semibold text-foreground">
                      <span className="inline-flex items-center gap-2">
                        Imagyn Reviews
                        <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[11px] font-semibold text-lime-ink">
                          This app
                        </span>
                      </span>
                    </th>
                    <th className="py-4 pr-6 text-sm font-semibold text-foreground">{comparison.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr key={row.label} className="border-b border-border align-top last:border-b-0">
                      <td className="py-4 pl-6 pr-4 text-[15px] font-semibold text-foreground">{row.label}</td>
                      <td className="border-l-2 border-accent/30 py-4 pr-4 pl-4 text-[15px] font-medium leading-relaxed text-foreground">
                        {row.imagyn}
                      </td>
                      <td className="py-4 pr-6 text-[15px] leading-relaxed text-muted-foreground">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {comparison.pricingSourceNote} Last checked {comparison.researchedOn}. Pricing and
            features on any SaaS product change — confirm current details directly with{" "}
            {comparison.name} before deciding.
          </p>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="text-subsection font-semibold leading-[1.15] tracking-[-0.035em] text-foreground">
              Switching from {comparison.name}?
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Import & Migration brings your existing reviews over with a full preview before
              anything is committed, nothing fabricated along the way, and every import can be
              undone on its own.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={comparison.migrationHref} className="text-[15px] font-medium text-foreground hover:text-accent">
                Migration guide for {comparison.name} →
              </Link>
              <Link href={comparison.importHref} className="text-[15px] font-medium text-foreground hover:text-accent">
                Import details →
              </Link>
            </div>
          </div>
          <Reveal>
            <div className="rounded-[28px] border border-border bg-surface p-8">
              <p className="text-sm font-semibold text-foreground">What never changes when you switch</p>
              <ul className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-muted-foreground">
                <li>An imported review never becomes an Imagyn Verified Buyer review by itself.</li>
                <li>A row that can&apos;t be matched to a product is reported, never guessed.</li>
                <li>Nothing imports until you&apos;ve seen the full preview and approved it.</li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-28 md:py-36">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="left" />
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {faqs.map((item) => (
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
          <p className="text-sm text-muted-foreground">Other comparisons</p>
          <div className="flex flex-wrap gap-6">
            {otherComparisons.map((other) => (
              <Link
                key={other.slug}
                href={`/compare/${other.slug}`}
                className="text-[15px] font-medium text-foreground hover:text-accent"
              >
                vs {other.name} →
              </Link>
            ))}
            <Link href="/features" className="text-[15px] font-medium text-foreground hover:text-accent">
              All features →
            </Link>
          </div>
        </Container>
      </section>

      <ClosingCTA
        variant="dark"
        title="See the difference on your own store."
        description="Free to install. Switch from your current app whenever you're ready."
        primaryLabel="Get Started Free"
      />
    </>
  );
}
