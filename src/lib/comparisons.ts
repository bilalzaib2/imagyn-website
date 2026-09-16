// Source of truth for /compare and /compare/[competitor]. Every Imagyn fact here mirrors
// constants.ts, pricing/page.tsx and features/page.tsx exactly. Every competitor fact is
// either sourced from that competitor's own public pricing page (see `pricingSourceNote`
// when fetched directly) or from independent third-party review sites when the vendor's own
// site blocked automated fetching (Judge.me and Stamped both return Cloudflare 403s to
// scripted requests) — never guessed, never copied verbatim, and always dated so a stale
// figure is obvious rather than presented as current fact. Pricing and feature sets on any
// SaaS product change; this file states what was publicly verifiable at the time it was
// written, not a live feed.
export type ComparisonRow = { label: string; imagyn: string; competitor: string };

export interface Comparison {
  slug: string;
  name: string;
  whatItIs: string;
  pricingSourceNote: string;
  researchedOn: string;
  rows: ComparisonRow[];
  migrationHref: string;
  importHref: string;
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "judge-me",
    name: "Judge.me",
    whatItIs:
      "Judge.me is one of the longest-running Shopify review apps, best known for a genuinely usable free tier and a single flat-rate paid plan that doesn't scale with order volume.",
    pricingSourceNote:
      "Judge.me's own pricing page blocks automated fetching (Cloudflare), so the figures below are drawn from multiple independent, dated review-site sources rather than fetched directly — treat them as directionally reliable, not as a live quote, and confirm on judge.me before deciding.",
    researchedOn: "2026-09-16",
    rows: [
      {
        label: "Pricing",
        imagyn: "Free (unlimited reviews) or Pro at $9.99/mo with a 14-day trial",
        competitor: "Free plan, plus a single flat-rate Awesome plan publicly reported around $15/mo regardless of order volume",
      },
      {
        label: "Review collection",
        imagyn: "Manual and automated review requests, timed after fulfillment, on every plan",
        competitor: "Automated review request emails, widely reported as available on its free plan",
      },
      {
        label: "Photo & video reviews",
        imagyn: "Included on the Free plan",
        competitor: "Photo and video reviews reported as included on its free plan",
      },
      {
        label: "Moderation",
        imagyn: "Rule-based auto-publish/auto-hold with a single review queue, on every plan",
        competitor: "Moderation tools available; specific automation rules not independently verified for this comparison",
      },
      {
        label: "AI features",
        imagyn: "AI-generated product and store review summaries (Pro), built only from a store's own approved reviews",
        competitor: "AI-assisted reply suggestions and translation reported on its paid plan",
      },
      {
        label: "Customization",
        imagyn: "Brand Studio: five starting styles plus full control over color, type, spacing and radius (Pro)",
        competitor: "Widget customization available; extent of no-code control not independently verified",
      },
      {
        label: "Migration",
        imagyn: "A verified import adapter tested against real Judge.me export files, not just its documented format",
        competitor: "Its own export tools are what Imagyn's importer reads from",
      },
    ],
    migrationHref: "/migrate/judge-me",
    importHref: "/import/judge-me",
  },
  {
    slug: "loox",
    name: "Loox",
    whatItIs:
      "Loox is a Shopify review app built around visual, photo-and-video-led social proof, with a large installed base and a tiered, usage-based pricing structure.",
    pricingSourceNote:
      "Figures below were fetched directly from Loox's own published pricing page.",
    researchedOn: "2026-09-16",
    rows: [
      {
        label: "Pricing",
        imagyn: "Free (unlimited reviews) or Pro at $9.99/mo with a 14-day trial",
        competitor: "No free plan; three tiers publicly listed at $14.99/mo, $49.99/mo and $299.99/mo",
      },
      {
        label: "Review collection",
        imagyn: "Unlimited reviews and review requests on every plan, including Free",
        competitor: "Review request emails included from its entry tier",
      },
      {
        label: "Photo & video reviews",
        imagyn: "Both included on the Free plan",
        competitor: "Photo reviews from its entry tier; video reviews reported as a mid-tier feature",
      },
      {
        label: "Moderation",
        imagyn: "Rule-based auto-publish/auto-hold with a single review queue, on every plan",
        competitor: "Public reply functionality reported; detailed rule-based automation not independently verified",
      },
      {
        label: "AI features",
        imagyn: "AI-generated product and store review summaries (Pro), built only from a store's own approved reviews",
        competitor: "AI-generated review story summaries and AI reply suggestions reported on its mid and top tiers",
      },
      {
        label: "Customization",
        imagyn: "Brand Studio: five starting styles plus full control over color, type, spacing and radius (Pro)",
        competitor: "Multiple widget formats (carousels, popups, badges) reported; removing its own branding reported as a mid-tier feature",
      },
      {
        label: "Migration",
        imagyn: "An import adapter built against Loox's documented export format",
        competitor: "Its own export tools are what Imagyn's importer reads from",
      },
    ],
    migrationHref: "/migrate/loox",
    importHref: "/import/loox",
  },
  {
    slug: "stamped",
    name: "Stamped",
    whatItIs:
      "Stamped is a multi-product commerce platform spanning reviews, loyalty and lifecycle marketing, with its Reviews module also sold as a standalone, order-volume-tiered product.",
    pricingSourceNote:
      "Stamped's own pricing page also blocks automated fetching; figures below are drawn from independent, dated review-site sources rather than fetched directly, and Stamped has publicly changed its plan structure in the recent past — confirm current pricing on stamped.io before deciding.",
    researchedOn: "2026-09-16",
    rows: [
      {
        label: "Pricing",
        imagyn: "Free (unlimited reviews) or Pro at $9.99/mo with a 14-day trial",
        competitor: "No free plan reported currently; entry Reviews tier publicly reported around $23/mo for stores up to 200 orders/month, scaling with volume",
      },
      {
        label: "Review collection",
        imagyn: "Unlimited reviews and review requests on every plan, including Free",
        competitor: "Review request automation available; exact free-tier availability not applicable since no free tier is currently reported",
      },
      {
        label: "Photo & video reviews",
        imagyn: "Both included on the Free plan",
        competitor: "Photo and video review support reported as part of its Reviews module",
      },
      {
        label: "Moderation",
        imagyn: "Rule-based auto-publish/auto-hold with a single review queue, on every plan",
        competitor: "Moderation tools available as part of its Reviews module; specific automation rules not independently verified",
      },
      {
        label: "AI features",
        imagyn: "AI-generated product and store review summaries (Pro), built only from a store's own approved reviews",
        competitor: "AI-related features not independently verified for this comparison",
      },
      {
        label: "Customization",
        imagyn: "Brand Studio: five starting styles plus full control over color, type, spacing and radius (Pro)",
        competitor: "Widget customization available as part of its Reviews module; extent not independently verified",
      },
      {
        label: "Migration",
        imagyn: "An import adapter built against Stamped's documented export format",
        competitor: "Its own export tools are what Imagyn's importer reads from",
      },
    ],
    migrationHref: "/migrate/stamped",
    importHref: "/import/stamped",
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
