export const siteConfig = {
  name: "Imagyn Reviews",
  tagline: "Build trust with every customer review.",
  description:
    "Imagyn Reviews is a premium Shopify review app: collect authentic customer reviews, moderate with confidence, and showcase them with beautifully crafted, on-brand widgets.",
  // Update once the marketing domain is finalized — every canonical/OG URL below derives
  // from this single constant.
  url: "https://imagyn.co",
  appUrl: "https://app.imagyn.co",
  supportEmail: "support@imagyn.co",
  twitter: "@imagynreviews",
};

// Every entry here resolves to a real, built page — no "coming soon" placeholders. Grouped
// into three jobs a merchant actually has (collect and manage, display and grow, trust and
// distribution), rendered as one panel with quiet sub headers in Header.tsx's mega menu —
// closer to how a mature review platform organizes ten real destinations than one flat list.
// `resources` and `company` render as simple links. Pricing stays a standalone top-level
// item, matching how every serious SaaS marketing site treats it — never buried in a dropdown.
export const PRODUCT_GROUPS = [
  {
    label: "Collect & manage",
    items: [
      {
        label: "Reviews & Collection",
        href: "/features",
        description: "Star ratings, photos and review requests, collected the way customers actually give them.",
      },
      {
        label: "Review Requests",
        href: "/review-requests",
        description: "Manual or automatic requests after fulfillment, with configurable reminders.",
      },
      {
        label: "AI Insights",
        href: "/ai",
        description: "A plain language summary of what customers consistently praise and flag, per product.",
      },
    ],
  },
  {
    label: "Display & grow",
    items: [
      {
        label: "Widgets",
        href: "/widgets",
        description: "Product review lists, rating badges and collection grid stars, styled to match your brand.",
      },
      {
        label: "Brand Studio",
        href: "/brand-studio",
        description: "Design your review experience without touching a theme file.",
      },
      {
        label: "Rewards, Coupons & Referrals",
        href: "/rewards",
        description: "Real Shopify discount codes for reviews, referrals and standalone promotions.",
      },
      {
        label: "Analytics",
        href: "/analytics",
        description: "Rating distribution, review volume and request performance, from your real data.",
      },
    ],
  },
  {
    label: "Trust & distribution",
    items: [
      {
        label: "Trust & Certification",
        href: "/trust",
        description: "An honest trust badge, built from checks that actually run, never a purchased seal.",
      },
      {
        label: "Import & Migration",
        href: "/import",
        description: "Bring your reviews from Judge.me, Loox, Stamped, Ali Reviews or a plain CSV.",
      },
      {
        label: "Public Review Site",
        href: "/public-review-site",
        description: "A shareable, public review page for every product, built from your real approved reviews.",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Native Shopify data, Google Shopping feeds, and a public review site.",
      },
    ],
  },
];

// Its own top level nav item, matching how judge.me treats "Why Judge.me" as a category
// alongside Products and Pricing rather than burying it in a dropdown.
export const WHY_LINK = { label: "Why Imagyn", href: "/why-imagyn" };

// Same pattern for judge.me's "Judge.me for: [merchant segment]" concept — real, qualitative
// differentiation only (see merchantSegments.ts's own comment on why no invented statistics
// back these pages), reached through one top level link rather than its own dropdown, since
// there are only three real segments today.
export const SOLUTIONS_LINK = { label: "Solutions", href: "/solutions" };

// Flat form of PRODUCT_GROUPS, kept for the mobile drawer, the footer, and NAV_LINKS below —
// generated from the grouped source so the two views can never drift out of sync.
export const PRODUCT_LINKS = PRODUCT_GROUPS.flatMap((group) => group.items);

// The single top nav entry point into the real Resources hub (documentation, guides, import
// guides, support) — see app/resources/page.tsx. The footer's own Resources column below
// lists the same real destinations individually, since a footer can hold more without
// crowding the header the way the top nav would.
export const RESOURCES_LINKS = [{ label: "Resources", href: "/resources" }];

export const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Flat fallback used by the mobile drawer and anywhere a single list (not three grouped
// menus) is simpler — kept in sync with the grouped lists above rather than duplicated by
// hand.
export const NAV_LINKS = [
  ...PRODUCT_LINKS.map(({ label, href }) => ({ label, href })),
  WHY_LINK,
  SOLUTIONS_LINK,
  { label: "Pricing", href: "/pricing" },
  ...RESOURCES_LINKS,
  ...COMPANY_LINKS,
];

export const FOOTER_LINKS = {
  product: PRODUCT_LINKS.map(({ label, href }) => ({ label, href })),
  // Real segment pages only (see merchantSegments.ts) — no fabricated "for agencies" or
  // "for enterprise" columns invented just to fill space.
  solutions: [
    SOLUTIONS_LINK,
    { label: "New stores", href: "/solutions/new-stores" },
    { label: "Growing stores", href: "/solutions/growing-stores" },
    { label: "Switching platforms", href: "/solutions/switching-platforms" },
  ],
  resources: [
    { label: "Resources", href: "/resources" },
    { label: "Documentation", href: "/docs" },
    { label: "Guides", href: "/guides" },
    { label: "Support", href: "/support" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [WHY_LINK, ...COMPANY_LINKS],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
