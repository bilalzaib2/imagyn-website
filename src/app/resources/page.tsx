import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Everything to learn Imagyn Reviews: setup documentation, practical guides, and direct support, all built from the real product.",
  path: "/resources",
});

const RESOURCE_GROUPS = [
  {
    title: "Documentation",
    description: "Short, practical setup guides for every part of the app: installation, widgets, moderation, requests, Brand Studio and billing.",
    href: "/docs",
    linkLabel: "Read the docs",
  },
  {
    title: "Guides",
    description: "Deeper, evergreen walkthroughs: migrating your reviews, how verification works, and getting your first reviews as a new store.",
    href: "/guides",
    linkLabel: "Browse guides",
  },
  {
    title: "Import & Migration",
    description: "A dedicated page per source: Judge.me, Loox, Stamped, Ali Reviews and plain CSV, each honest about what it supports today.",
    href: "/import",
    linkLabel: "See migration sources",
  },
  {
    title: "Support",
    description: "Email support, a contact form, and answers to the questions we hear most often.",
    href: "/support",
    linkLabel: "Get help",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Resources"
            title="Everything to learn Imagyn, in one place."
            description="No fluff, and nothing that is not real. Every guide here reflects the product exactly as it works today."
          />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {RESOURCE_GROUPS.map((group, index) => (
            <Reveal key={group.title} delayMs={index * 80}>
              <a
                href={group.href}
                className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft motion-reduce:hover:translate-y-0"
              >
                <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{group.description}</p>
                <span className="mt-2 text-[14px] font-medium text-foreground">{group.linkLabel} →</span>
              </a>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
