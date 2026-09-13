// Source of truth for /solutions and /solutions/[slug]. Judge.me's own segment pages back
// their differentiation with real, cited third party statistics; Imagyn has no equivalent
// verified research to cite, so these pages deliberately use only qualitative
// differentiation, real Imagyn features mapped to a real, different priority per merchant
// stage, never an invented statistic or case study.
export interface MerchantSegment {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  priorities: { title: string; description: string; href: string }[];
}

export const MERCHANT_SEGMENTS: MerchantSegment[] = [
  {
    slug: "new-stores",
    name: "New stores",
    headline: "Start collecting proof from your very first sale.",
    summary:
      "A new store has no reviews yet and no budget to risk. Imagyn's Free plan covers unlimited reviews and review requests with no time limit and no credit card, so proof can start building from day one.",
    priorities: [
      {
        title: "Free, with no limits on the core",
        description: "Unlimited reviews and review requests on the Free plan, not a trial that runs out.",
        href: "/pricing",
      },
      {
        title: "A verified badge from the start",
        description: "A real Verified Buyer badge on any review tied to an actual order, available on every plan.",
        href: "/trust",
      },
      {
        title: "Set up in minutes, not days",
        description: "Theme app blocks, not custom code. A widget goes live in the Shopify Theme Editor in a few clicks.",
        href: "/widgets",
      },
    ],
  },
  {
    slug: "growing-stores",
    name: "Growing stores",
    headline: "Automate the parts that do not scale by hand.",
    summary:
      "A growing store cannot keep sending review requests and reading every review by hand. Automatic requests, reminders, and AI summaries return that time without losing the personal, on brand feel.",
    priorities: [
      {
        title: "Automatic requests and reminders",
        description: "A request goes out after fulfillment, with a reminder schedule you control, and stops the moment a review comes in.",
        href: "/review-requests",
      },
      {
        title: "AI that reads reviews for you",
        description: "A plain language summary of what customers consistently praise and flag, per product and store wide.",
        href: "/ai",
      },
      {
        title: "A brand that looks intentional",
        description: "Brand Studio applies your colors, type and spacing to every widget at once, no theme file required.",
        href: "/brand-studio",
      },
    ],
  },
  {
    slug: "switching-platforms",
    name: "Switching platforms",
    headline: "Bring years of review history with you.",
    summary:
      "An established store often has the most to lose from switching review platforms: years of customer feedback already earned. Import & Migration exists specifically so that history does not start over.",
    priorities: [
      {
        title: "Import your existing reviews",
        description: "From Judge.me, Loox, Stamped, Ali Reviews or a plain CSV, with a full preview before anything commits.",
        href: "/import",
      },
      {
        title: "Verification that stays honest",
        description: "An imported review never becomes an Imagyn verified review by itself, so switching never inflates your numbers.",
        href: "/trust",
      },
      {
        title: "Undo an import if you need to",
        description: "Every import is recorded as its own batch, and can be undone on its own without touching any other review.",
        href: "/import",
      },
    ],
  },
];

export function getMerchantSegment(slug: string): MerchantSegment | undefined {
  return MERCHANT_SEGMENTS.find((segment) => segment.slug === slug);
}
