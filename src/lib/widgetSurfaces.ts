// Source of truth for the widget ecosystem hub at /widgets and each detail page at
// /widgets/[slug]. Every entry here is a real Shopify theme app block that ships in the
// imagyn-review-widgets extension (a separate codebase), kept in sync by hand. Deliberately
// excludes Medals Showcase: it is a real block, but it displays earned achievements, not
// review content, so it is covered on the Rewards page instead of here.
export interface WidgetSurface {
  slug: string;
  name: string;
  summary: string;
  description: string;
  placement: string;
  capabilities: string[];
}

export const WIDGET_SURFACES: WidgetSurface[] = [
  {
    slug: "product-reviews",
    name: "Product Reviews Widget",
    summary: "The full review experience on a product page: summary, histogram, review list and a write a review form.",
    description:
      "The complete review experience for a single product: an average rating summary, a star by star histogram, the full list of approved reviews with photos and videos, and a write a review form for the next customer. This is the block most stores add first, and the one every other widget's data ultimately comes from.",
    placement: "A product page, usually just below the buy box or in its own tab.",
    capabilities: [
      "Rating summary and star by star histogram",
      "Full review list with photos, video and merchant replies",
      "A write a review form, right on the page",
      "Every color, radius and type choice comes from Brand Studio",
    ],
  },
  {
    slug: "rating-badge",
    name: "Product Rating Badge",
    summary: "A compact star and count signal placed near the buy box, for shoppers who never scroll to the review list.",
    description:
      "A small, compact signal, star rating and review count, placed wherever a shopper decides whether to keep looking: right near the price and buy button. It links straight down to the full Product Reviews Widget for anyone who wants to read more.",
    placement: "A product page, directly above or below the price and buy button.",
    capabilities: [
      "Star rating and review count in one compact line",
      "Links straight to the full review list on the same page",
      "Renders nothing on a product with zero reviews, never a fabricated placeholder",
    ],
  },
  {
    slug: "collection-rating-badges",
    name: "Collection Rating Badge",
    summary: "Star ratings on every product card across your collection and search grids.",
    description:
      "The same rating signal as the Product Rating Badge, placed on every product card in a collection grid, featured section or search results page, so a shopper sees social proof before they even click into a product.",
    placement: "Collection pages, featured collection sections, and search result grids.",
    capabilities: [
      "Star rating and count on every product card in a grid",
      "Works across collection, featured collection and search result templates",
      "Skips a product card entirely if it has no reviews yet",
    ],
  },
  {
    slug: "review-carousel",
    name: "Review Carousel",
    summary: "A store wide, scrollable showcase of your best real reviews, typically placed on the homepage.",
    description:
      "A scrollable, store wide showcase of your best approved reviews, pulled from across your whole catalog rather than one product. Most stores place it on the homepage as a trust moment before a shopper has picked a product yet.",
    placement: "Typically the homepage, or any page section that accepts an app block.",
    capabilities: [
      "Pulls approved reviews from across your entire catalog",
      "Scrollable card layout, styled through Brand Studio",
      "Choose which fields show: rating, photo, reviewer name and more",
    ],
  },
  {
    slug: "store-reviews",
    name: "Store Reviews",
    summary: "A store wide rollup of your real product review ratings, not a separate review type.",
    description:
      "A store wide summary: your overall rating and histogram, rolled up from every real, approved product review in your store. Imagyn has no separate store level review submission, every review is still tied to a specific product, so this block is an honest rollup of that real data, never a fabricated store rating. It links a shopper to your full product catalog to write a review for the product they actually bought.",
    placement: "Typically the homepage or an about page, as a store wide trust summary.",
    capabilities: [
      "Overall rating and histogram, rolled up from real product reviews",
      "Currently earned achievement medals shown alongside the rollup",
      "Links to your product catalog. There is no separate store level review form",
    ],
  },
];

export function getWidgetSurface(slug: string): WidgetSurface | undefined {
  return WIDGET_SURFACES.find((widget) => widget.slug === slug);
}
