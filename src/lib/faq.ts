// Source of truth for /faq. Deliberately does not repeat the FAQ content already on
// /support, /trust, /pricing and /import (each answers questions specific to that page's
// own topic) — this page answers the higher-level questions a merchant researching the
// product has before they ever reach those pages. Every answer here mirrors facts already
// stated elsewhere on the site (constants.ts, pricing/page.tsx, docs/page.tsx,
// aiSurfaces.ts, integrations/page.tsx) — nothing new is claimed here.
export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: "What is Imagyn Reviews?",
    a: "Imagyn Reviews is a Shopify review app: it collects authentic customer reviews, moderates them, and displays them through on-brand storefront widgets. It's built by Imagyn Studios directly on Shopify's own Admin API and Theme App Extensions, not as a separate, bolted-on tool.",
  },
  {
    q: "Who is Imagyn Reviews for?",
    a: "Shopify merchants, from a brand new store collecting its first reviews to an established store switching from another review platform. See Solutions for how the priorities differ by stage.",
  },
  {
    q: "Is Imagyn Reviews free?",
    a: "Yes. The Free plan includes unlimited reviews and review requests, photo and video reviews, review widgets, moderation, unlimited CSV imports, and a Verified Buyer badge, with no time limit and no credit card required. Pro is $9.99/month with a 14-day free trial and adds AI review summaries, automatic reminder emails, and Brand Studio.",
  },
  {
    q: "Does Imagyn Reviews support photo and video reviews?",
    a: "Yes, both are included on the Free plan. Photos and video appear in a moderated media gallery alongside the review they were submitted with.",
  },
  {
    q: "Does Imagyn Reviews use AI to write reviews?",
    a: "No. AI is only used to summarize a product or store's own real, approved reviews into a plain-language read of what customers consistently praise or flag. It never writes, generates, or invents a review.",
  },
  {
    q: "Can I bring my existing reviews from another platform?",
    a: "Yes. Import & Migration reads exports from Judge.me, Loox, Stamped, Ali Reviews, or a plain CSV, with a full preview of what will happen before anything is committed. See the comparison pages for how Imagyn differs from each of these platforms.",
  },
  {
    q: "How is Imagyn Reviews different from Judge.me, Loox or Stamped?",
    a: "The short version: built natively on Shopify's own APIs rather than an iframe embed, honest verification (an imported review never becomes a Verified Buyer review by itself), and simple two-plan pricing. See the full, factual, feature-by-feature comparison for specifics on each platform.",
  },
  {
    q: "Does Imagyn Reviews work with my Shopify theme?",
    a: "Yes. Widgets are added as Theme App Extension blocks directly in the Shopify Theme Editor, no custom code required, and Brand Studio lets you match colors, type and spacing to your theme without touching a template file.",
  },
  {
    q: "How do I install Imagyn Reviews?",
    a: "Install it from the Shopify App Store, then sync your product catalog from the app's Products page and add the Product Reviews Widget to your product page template in the Shopify Theme Editor. See the full setup guide in Documentation.",
  },
  {
    q: "Does Imagyn Reviews help with my store's SEO?",
    a: "Yes. Approved reviews are synced as schema.org structured data (Product, AggregateRating and Review JSON-LD) on every product page automatically, the kind of markup search engines use to show star ratings directly in results. It's kept in sync as reviews are approved, edited or removed, and rendered server-side with no extra storefront requests.",
  },
];
