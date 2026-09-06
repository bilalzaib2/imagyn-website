import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Documentation",
  description: "Guides for setting up Imagyn Reviews: installation, widgets, moderation rules, review requests, Brand Studio and billing.",
  path: "/docs",
});

const TOPICS = [
  { id: "getting-started", title: "Getting Started", description: "Install the app and collect your first review." },
  { id: "widgets", title: "Widgets & Theme Editor", description: "Add review widgets to your storefront." },
  { id: "moderation", title: "Moderation Rules", description: "Auto-publish trustworthy reviews automatically." },
  { id: "requests", title: "Review Requests", description: "Ask customers for a review, manually or on autopilot." },
  { id: "brand-studio", title: "Brand Studio", description: "Match every widget to your storefront's look." },
  { id: "ai-summaries", title: "AI Summaries", description: "Understand what customers are saying, at a glance." },
  { id: "billing", title: "Billing & Plans", description: "Understand what's included in each plan." },
];

export default function DocsPage() {
  return (
    <>
      <section className="pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Documentation"
            title="Everything you need to set up Imagyn Reviews."
            description="Short, practical guides — no fluff. If something isn't covered here, reach out on the Support page."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="text-base font-semibold text-foreground">{topic.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <div className="flex flex-col divide-y divide-border border-t border-border">
          <DocSection id="getting-started" title="Getting Started">
            <ol className="flex list-decimal flex-col gap-3 pl-5">
              <li>Install Imagyn Reviews from the Shopify App Store onto your store.</li>
              <li>
                Open the app and visit <strong className="font-semibold text-foreground">Products</strong> to sync your
                catalog — this links your Shopify products to their reviews.
              </li>
              <li>
                Create a review manually from <strong className="font-semibold text-foreground">Reviews → New Review</strong>,
                or send a review request to a real customer to collect your first one.
              </li>
              <li>
                Open <strong className="font-semibold text-foreground">Widgets</strong> and add the Product Reviews Widget
                block to your product page template in the Shopify Theme Editor.
              </li>
            </ol>
          </DocSection>

          <DocSection id="widgets" title="Widgets & Theme Editor">
            <p>
              Imagyn Reviews ships three storefront widgets, each added as a theme app block through the
              Shopify Theme Editor — no code required:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong className="font-semibold text-foreground">Product Reviews Widget</strong> — the full
                experience: summary, rating histogram, review list and a write-a-review form.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Product Rating Badge</strong> — a compact
                star-and-count signal placed near the buy box.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Collection Rating Badge</strong> — star
                ratings on product cards across collection and search grids.
              </li>
            </ul>
            <p>
              From the app&apos;s <strong className="font-semibold text-foreground">Widgets</strong> page, use{" "}
              <strong className="font-semibold text-foreground">Quick Edit</strong> for common settings, or{" "}
              <strong className="font-semibold text-foreground">Customize</strong> for the full live-preview editor.
            </p>
          </DocSection>

          <DocSection id="moderation" title="Moderation Rules">
            <p>
              Configure Moderation Rules from <strong className="font-semibold text-foreground">Settings</strong> to
              reduce manual review work:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Auto-publish reviews at or above a minimum star rating.</li>
              <li>Optionally require the reviewer to be a verified buyer to auto-publish.</li>
              <li>Always hold reviews that contain a link, profanity, or a banned word or phrase you define.</li>
              <li>Get an email notification whenever a review is held for your review.</li>
            </ul>
            <p>
              Everything that doesn&apos;t clear the bar lands in one queue on the{" "}
              <strong className="font-semibold text-foreground">Reviews</strong> page for a quick manual decision.
            </p>
          </DocSection>

          <DocSection id="requests" title="Review Requests">
            <p>
              Send a review request manually from the <strong className="font-semibold text-foreground">Requests</strong>{" "}
              page with a customer&apos;s name, email and order — Imagyn Reviews emails them a link to leave a
              review, tracked through sent, opened and completed states.
            </p>
            <p>
              Automatic review requests — triggered after order fulfillment — are included on the Growth and
              Scale plans. This feature is completing Shopify&apos;s protected customer data review and will
              activate for eligible stores as soon as that approval lands.
            </p>
          </DocSection>

          <DocSection id="brand-studio" title="Brand Studio">
            <p>
              Brand Studio is a no-code design surface for every review widget on your storefront. Start from a
              preset — Minimal, Modern, Editorial, Luxury or Custom — then fine-tune button style, border radius
              and text size with an instant live preview. Changes apply the moment you save. Brand Studio is
              included on the Growth and Scale plans.
            </p>
          </DocSection>

          <DocSection id="ai-summaries" title="AI Summaries">
            <p>
              On the Growth and Scale plans, every product with approved reviews gets an AI-generated summary:
              a plain-language read of what customers consistently praise and flag, refreshed automatically as
              new reviews come in. Summaries appear in your moderation queue and on your Dashboard.
            </p>
          </DocSection>

          <DocSection id="billing" title="Billing & Plans">
            <p>
              Imagyn Reviews has three plans — Starter (free), Growth and Scale — billed through Shopify. See the{" "}
              <a href="/pricing" className="font-medium text-accent underline-offset-4 hover:underline">
                Pricing
              </a>{" "}
              page for a full feature comparison. Upgrades and downgrades take effect immediately from the
              app&apos;s Billing page.
            </p>
          </DocSection>
        </div>
      </Container>
    </>
  );
}

function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
        <div className="flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </section>
  );
}
