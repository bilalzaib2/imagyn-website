// Source of truth for the AI hub at /ai and each detail page at /ai/[slug]. Both entries
// map to a real, distinct Prisma model in the imagyn-reviews app (ProductAiSummary and
// StoreAiSummary, a separate codebase) and a real, distinct Shopify theme app block
// (ai_review_summary.liquid and store_ai_summary.liquid).
export interface AiSurface {
  slug: string;
  name: string;
  summary: string;
  description: string;
  placement: string;
  capabilities: string[];
}

export const AI_SURFACES: AiSurface[] = [
  {
    slug: "product-summary",
    name: "Product AI Summary",
    summary: "A plain language summary of what reviewers consistently praise and flag, per product.",
    description:
      "Every product with enough approved reviews gets its own generated summary: what customers consistently praise, what they flag, and a clear recommendation. Generated only from that product's own real, approved reviews, refreshed automatically as new reviews come in.",
    placement: "The product page, the moderation queue, and the dashboard's AI Spotlight.",
    capabilities: [
      "Built only from a single product's own approved reviews",
      "Refreshes automatically as review volume grows",
      "Shown on the storefront product page, and inside the app's moderation queue",
    ],
  },
  {
    slug: "store-summary",
    name: "Store AI Summary",
    summary: "One store wide summary, synthesized across every approved review in your store.",
    description:
      "A single, store wide read on your reviews: what customers consistently praise and flag across your entire catalog, not one product. Useful on a homepage or an about page, anywhere a shopper has not picked a specific product yet.",
    placement: "Anywhere on your storefront, most often the homepage or an about page.",
    capabilities: [
      "Synthesized across every approved review in your store, not one product",
      "A dedicated theme app block, place it on any page, no product needed",
      "Renders nothing until you have generated a Store AI Summary in the app",
    ],
  },
];

export function getAiSurface(slug: string): AiSurface | undefined {
  return AI_SURFACES.find((surface) => surface.slug === slug);
}
