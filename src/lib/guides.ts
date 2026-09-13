// Real, evergreen guides written from the actual product, not a blog. Deliberately has no
// publish dates or author bylines, since there is no actively maintained editorial operation
// behind it, unlike a real blog. Each guide expands on a marketing page with the kind of
// walkthrough detail a merchant researching before switching or setting up would want.
export interface Guide {
  slug: string;
  title: string;
  summary: string;
  relatedHref: string;
  relatedLabel: string;
  sections: { heading: string; body: string[] }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "migrating-your-reviews",
    title: "Migrating your reviews to Imagyn",
    summary: "A full walkthrough of the import wizard: upload, preview, and what happens to verification along the way.",
    relatedHref: "/import",
    relatedLabel: "Import & Migration",
    sections: [
      {
        heading: "Before you start",
        body: [
          "Export your reviews from your current platform. Judge.me, Loox, Stamped and Ali Reviews each have their own export feature in their own app, usually under a Settings or Export menu. A plain CSV works too, as long as it has a rating and a review body column at minimum.",
          "Nothing about your current platform needs to change before you export. Your existing reviews stay exactly where they are until you choose to import them elsewhere.",
        ],
      },
      {
        heading: "Upload and analyze",
        body: [
          "Upload your file in Imagyn's Import & Migration settings. Imagyn reads the column headers and shows you what it detected for each field: rating, content, reviewer name, product reference, and more.",
          "If a column was detected incorrectly, or a field was not detected at all, you correct the mapping right there before anything else happens. Nothing is imported based on a guessed mapping you have not confirmed.",
        ],
      },
      {
        heading: "Preview before anything commits",
        body: [
          "Once the mapping looks right, Imagyn runs a full preview: every row is checked against your real product catalog and your existing reviews, exactly as a real import would, but nothing is written yet.",
          "The preview shows how many rows matched a product, how many need your review because they were unmatched or matched more than one product ambiguously, and how many look like duplicates of reviews you already have.",
        ],
      },
      {
        heading: "What happens to verification",
        body: [
          "An imported review never becomes an Imagyn Verified Buyer review by itself, regardless of what your old platform claimed. If your old platform marked a review as verified, that claim is kept as a private note for your own reference, never shown to shoppers as an Imagyn verified badge.",
          "This is deliberate: Imagyn can only verify a purchase it can actually check, and it never saw the original order for a review imported from another platform.",
        ],
      },
      {
        heading: "After the import",
        body: [
          "Every import is recorded as its own entry in your import history, with its own counts. If something looks wrong, that specific import can be undone on its own, without touching any review that came from anywhere else.",
          "Running the same file through the import a second time will not create duplicates. Rows Imagyn already has are reported as duplicates, not imported again.",
        ],
      },
    ],
  },
  {
    slug: "how-verification-works",
    title: "How review verification actually works",
    summary: "The difference between a Verified Buyer badge, Trust and Certification, and what an imported review can and cannot claim.",
    relatedHref: "/trust",
    relatedLabel: "Trust & Certification",
    sections: [
      {
        heading: "Verified Buyer, specifically",
        body: [
          "A review earns a Verified Buyer badge only when Imagyn can check it against an actual Shopify order. A review submitted without a matching order, or carried over from another platform's export, never gets this badge on its own.",
        ],
      },
      {
        heading: "Trust and Certification, separately",
        body: [
          "Trust and Certification is a different, store level signal: four independent checks (transparent review practices, secure payment methods, a transparent shipping and refund policy, and verified store history), calculated from your store's own real data on their own schedule.",
          "A store's certification status has no effect on whether an individual review shows a Verified Buyer badge, and the reverse is also true. The two systems are deliberately separate.",
        ],
      },
      {
        heading: "What an imported review can honestly claim",
        body: [
          "If a source platform marked a review as verified, Imagyn keeps that claim on record for your own reference, but never presents it to a shopper as an Imagyn verified badge. The distinction is shown plainly in the review's own detail view inside the app: what the source claimed, and what Imagyn could actually check.",
        ],
      },
    ],
  },
  {
    slug: "getting-your-first-reviews",
    title: "Getting your first reviews as a new store",
    summary: "A practical starting sequence for a store with no reviews yet, using only the Free plan.",
    relatedHref: "/review-requests",
    relatedLabel: "Review Requests",
    sections: [
      {
        heading: "Start with real orders you already have",
        body: [
          "If you have shipped even a handful of orders, send a manual review request to each of those customers first. This does not require automation or a paid plan, and it is the fastest real path to your first reviews.",
        ],
      },
      {
        heading: "Add a widget before you have reviews to show",
        body: [
          "Add the Product Reviews Widget to your product page template now, even at zero reviews. It renders an honest empty state rather than nothing at all, and it is already in place the moment your first review arrives.",
        ],
      },
      {
        heading: "Turn on Verified Buyer badges",
        body: [
          "Verified Buyer badges are available on every plan, including Free. Once your first customer reviews a product they actually bought, the badge appears automatically. No setup beyond having the app installed.",
        ],
      },
      {
        heading: "Automate once the volume is worth it",
        body: [
          "Automatic review requests and reminder emails are a Pro feature, worth turning on once manual requests start to feel like real, repeated work rather than an occasional task.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
