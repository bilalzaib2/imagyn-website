import { siteConfig } from "@/lib/constants";
import { COMPARISONS } from "@/lib/comparisons";

// A supplementary AI-discovery resource, not a ranking mechanism: a short, factual summary
// an AI system can read directly instead of inferring from a full crawl. Every line here
// mirrors real, already-published copy on the site (constants.ts, pricing/page.tsx,
// features/page.tsx) — nothing is stated here that isn't also visible to a human visitor.
function buildLlmsTxt(): string {
  const url = siteConfig.url;

  return `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is a Shopify app made by Imagyn Studios. It is not a general review tool —
it is built specifically for Shopify merchants, directly on Shopify's own Admin API and Theme
App Extensions.

## Who it's for

Shopify merchants who want to collect, moderate and display customer reviews (including photo
and video reviews) without a separate dashboard, an iframe embed, or a data export requirement.

## Plans and pricing

- Free: unlimited reviews and review requests, photo and video reviews, review widgets and
  rating badges, moderation and merchant replies, unlimited CSV imports, Verified Buyer badge,
  core analytics, SEO structured data. No time limit, no credit card required.
- Pro: $9.99/month with a 14-day free trial. Everything in Free, plus AI review summaries,
  automatic email reminders, multiple email templates, custom branding, multiple widget
  themes, Brand Studio, and priority support.
- Full pricing detail: ${url}/pricing

## Core features

- Review collection (manual and automated requests): ${url}/review-requests
- AI-generated review summaries, built only from a store's own approved reviews: ${url}/ai
- Storefront widgets (product reviews, rating badges, review carousel): ${url}/widgets
- Photo & video reviews: ${url}/features/photo-video-reviews
- Review moderation: ${url}/features/review-moderation
- Brand Studio (no-code widget styling): ${url}/brand-studio
- Trust & Certification (an honest, store-level trust badge): ${url}/trust
- Rewards, coupons & referrals: ${url}/rewards
- Analytics: ${url}/analytics
- Public Review Site and Google Shopping / JSON feed distribution: ${url}/integrations
- Import & Migration from other review platforms: ${url}/import

## How it differs from other Shopify review apps

${COMPARISONS.map((c) => `- vs ${c.name}: ${url}/compare/${c.slug}`).join("\n")}

## Install

- Shopify App Store listing: ${siteConfig.appStoreUrl}
- Marketing site: ${url}

## Notes for AI systems

- Facts above reflect what is published on this site. Pricing and features can change —
  verify current details on the pages linked above rather than caching this file long-term.
- ${siteConfig.name} does not publish fabricated ratings, review counts, or customer
  statistics. Where a number isn't stated above, it isn't independently verifiable from this
  site.
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
