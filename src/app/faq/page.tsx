import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { FAQ_ENTRIES } from "@/lib/faq";
import { pageMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers to the most common questions about Imagyn Reviews: what it is, pricing, AI summaries, photo and video reviews, migration, and how it compares to alternatives.",
  path: "/faq",
});

const RELATED = [
  { label: "Pricing questions", href: "/pricing" },
  { label: "Trust & Certification questions", href: "/trust" },
  { label: "Import & Migration questions", href: "/import" },
  { label: "Support", href: "/support" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <JsonLd data={faqJsonLd(FAQ_ENTRIES)} />

      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <SectionHeading
            level="h1"
            eyebrow="FAQ"
            title="Frequently asked questions."
            description="The questions merchants ask most before installing Imagyn Reviews. For plan-specific, trust, or migration questions, see the links below."
          />
        </Container>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <Container className="flex flex-col gap-12 max-w-3xl">
          {FAQ_ENTRIES.map((item) => (
            <div key={item.q} className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-foreground">{item.q}</h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">More questions, by topic</p>
          <div className="flex flex-wrap gap-6">
            {RELATED.map((link) => (
              <Link key={link.href} href={link.href} className="text-[15px] font-medium text-foreground hover:text-accent">
                {link.label} →
              </Link>
            ))}
            <Link href="/compare" className="text-[15px] font-medium text-foreground hover:text-accent">
              Compare Imagyn Reviews →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
