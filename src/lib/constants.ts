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

// Every entry here resolves to a real, built page — no "coming soon" placeholders. The
// mega-menu (Header.tsx) renders `product` as a dropdown of real destinations; `resources`
// and `company` render as simple links. Pricing stays a standalone top-level item, matching
// how every serious SaaS marketing site treats it — never buried in a dropdown.
export const PRODUCT_LINKS = [
  {
    label: "Reviews & Collection",
    href: "/features",
    description: "Star ratings, photos and review requests — collected the way customers actually give them.",
  },
  {
    label: "Widgets",
    href: "/widgets",
    description: "Product review lists, rating badges and collection-grid stars, styled to match your brand.",
  },
  {
    label: "Brand Studio",
    href: "/brand-studio",
    description: "Design your review experience without touching a theme file.",
  },
  {
    label: "AI Insights",
    href: "/ai",
    description: "A plain-language summary of what customers consistently praise and flag, per product.",
  },
  {
    label: "Rewards & Referrals",
    href: "/rewards",
    description: "Real Shopify discount codes for reviews, referrals and standalone promotions.",
  },
  {
    label: "Integrations",
    href: "/integrations",
    description: "Native Shopify data, Google Shopping feeds, and a public review site.",
  },
];

export const RESOURCES_LINKS = [
  { label: "Documentation", href: "/docs" },
  { label: "Support", href: "/support" },
];

export const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Flat fallback used by the mobile drawer and anywhere a single list (not three grouped
// menus) is simpler — kept in sync with the grouped lists above rather than duplicated by
// hand.
export const NAV_LINKS = [
  ...PRODUCT_LINKS.map(({ label, href }) => ({ label, href })),
  { label: "Pricing", href: "/pricing" },
  ...RESOURCES_LINKS,
  ...COMPANY_LINKS,
];

export const FOOTER_LINKS = {
  product: PRODUCT_LINKS.map(({ label, href }) => ({ label, href })),
  resources: [...RESOURCES_LINKS, { label: "Pricing", href: "/pricing" }],
  company: COMPANY_LINKS,
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
