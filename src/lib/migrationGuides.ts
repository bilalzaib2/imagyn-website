// Real, search-intent-driven migration guides — one per source Imagyn can actually import
// from (plus Rivyo, honestly marked as not yet directly supported). These are acquisition
// pages: a merchant searching "how to migrate from X" should land here, understand exactly
// what happens to their data, and reach the install CTA. Every claim here must match the
// real behavior in reviewImportExport.server.ts and importers/ (a separate codebase) — see
// docs/IMPORT_VERIFICATION_POLICY.md there for the canonical source of truth this mirrors.
// Kept as its own data file (distinct from the general guides.ts) because the shape here is
// richer and specific to migration: what transfers, what does not, and the same five
// operational questions every migration raises (duplicates, product matching, customer
// matching, media, publication status).
export type MigrationStatus = "verified" | "supported" | "unsupported";

export interface MigrationGuide {
  slug: string;
  sourceName: string;
  status: MigrationStatus;
  title: string;
  metaDescription: string;
  intro: string;
  whoFor: string;
  whatMigrates: string[];
  whatDoesNotMigrate: string[];
  steps: { title: string; description: string }[];
  verification: string;
  duplicateHandling: string;
  productMatching: string;
  customerMatching: string;
  mediaHandling: string;
  publicationStatus: string;
  troubleshooting: { q: string; a: string }[];
  importHref: string;
}

export const MIGRATION_GUIDES: MigrationGuide[] = [
  {
    slug: "judge-me",
    sourceName: "Judge.me",
    status: "verified",
    title: "How to migrate from Judge.me to Imagyn Reviews",
    metaDescription:
      "A complete, accurate guide to migrating your reviews from Judge.me to Imagyn Reviews: what transfers, what does not, verification handling, and every step of the real import wizard.",
    intro:
      "Judge.me is Imagyn's most thoroughly tested import source: the adapter has been verified against real Judge.me export files, not just Judge.me's documented column format. This guide walks through exactly what happens to your reviews when you bring them over.",
    whoFor:
      "For a Shopify merchant currently using Judge.me who wants to switch review platforms without losing existing customer feedback.",
    whatMigrates: [
      "Star rating, review title and body",
      "Reviewer name and email",
      "The product a review belongs to, matched by Shopify product ID, handle, SKU or title",
      "Merchant replies, with their original date",
      "Photo links, where the export includes them",
      "Judge.me's own verification claim, kept as a private note",
    ],
    whatDoesNotMigrate: [
      "A Judge.me verified badge does not become an Imagyn Verified Buyer badge automatically",
      "Judge.me specific settings, widget styling or moderation rules (Imagyn's own settings apply instead)",
      "Any review Judge.me itself never exported, for example a review still pending moderation there",
    ],
    steps: [
      {
        title: "Export from Judge.me",
        description: "In your Judge.me admin, use its export feature to download your reviews as a file.",
      },
      {
        title: "Upload to Imagyn",
        description: "In Imagyn's Import and Migration settings, choose Judge.me as the source and upload the file.",
      },
      {
        title: "Check the detected columns",
        description: "Imagyn reads the file's headers and shows you what it detected for each field. Correct anything mapped wrong before continuing.",
      },
      {
        title: "Review the full preview",
        description: "See exactly how many rows matched a product, which need your review, and which look like duplicates, before anything is committed.",
      },
      {
        title: "Import and verify",
        description: "Confirm the import. Every row is recorded in your import history, and the whole batch can be undone later if needed.",
      },
    ],
    verification:
      "Judge.me's own verification signal (including its email sourced review inference) is preserved as a private note on the imported review, never as an Imagyn Verified Buyer badge. Imagyn only marks a review verified when it can check the purchase itself, which it cannot do for a review it never saw the original order for.",
    duplicateHandling:
      "Judge.me exports include a stable per review identifier, so Imagyn can detect an exact duplicate even if you run the same import twice, or if the review's text was edited between two exports.",
    productMatching:
      "Rows are matched to your Shopify catalog in order of confidence: Shopify product ID, then variant ID, then handle, then SKU, then exact or normalized title, then a careful fuzzy title match as a last resort. A row that cannot be matched, or that matches more than one product ambiguously, is reported for your review rather than guessed.",
    customerMatching:
      "Reviewer name and email are stored exactly as Judge.me exported them. Imagyn never invents a Shopify customer record or looks one up during import.",
    mediaHandling:
      "Photo links are validated (a real, reachable image URL over https) and referenced directly. Imagyn does not rehost or download the image file itself.",
    publicationStatus:
      "You choose how imported reviews are published: keep each row's own status from Judge.me, import everything as approved, or hold everything for your own moderation.",
    troubleshooting: [
      {
        q: "Some rows show as unmatched. What happened?",
        a: "The product referenced in that row could not be confidently matched to anything in your current Shopify catalog, most often because the product was renamed, removed, or the export used a title Imagyn could not resolve. Unmatched rows are never guessed onto the wrong product.",
      },
      {
        q: "Will running the import twice duplicate my reviews?",
        a: "No. Judge.me's export includes a stable review identifier, so a second import of the same file reports duplicates rather than creating new reviews.",
      },
      {
        q: "Can I undo the import if something looks wrong?",
        a: "Yes. Every import is recorded as its own batch in your import history and can be undone on its own, without affecting any other review in your store.",
      },
    ],
    importHref: "/import/judge-me",
  },
  {
    slug: "loox",
    sourceName: "Loox",
    status: "supported",
    title: "How to migrate from Loox to Imagyn Reviews",
    metaDescription:
      "A complete guide to migrating your reviews from Loox to Imagyn Reviews: what transfers, what does not, verification handling, and every step of the import process.",
    intro:
      "Imagyn's Loox adapter is built against Loox's own documented export column format. It has not yet been verified against a live Loox account export, since no real sample has been available to test against, so this guide is direct about that honest limitation.",
    whoFor: "For a Shopify merchant currently using Loox who wants to switch review platforms without losing existing customer feedback.",
    whatMigrates: [
      "Star rating and review text",
      "Reviewer name and email",
      "The product a review belongs to, matched by handle, SKU or title",
      "Photo links, where the export includes them",
    ],
    whatDoesNotMigrate: [
      "A Loox verified badge does not become an Imagyn Verified Buyer badge automatically",
      "Loox specific widget styling, incentive settings or referral data",
      "Video content, if your Loox export does not include a usable link to it",
    ],
    steps: [
      {
        title: "Export from Loox",
        description: "In your Loox admin, use its export feature to download your reviews as a file.",
      },
      {
        title: "Upload to Imagyn",
        description: "In Imagyn's Import and Migration settings, choose Loox as the source and upload the file.",
      },
      {
        title: "Check the detected columns",
        description: "Confirm or correct how Imagyn mapped each column before continuing. If a Loox export does not match the expected format exactly, this is where you would see it.",
      },
      {
        title: "Review the full preview",
        description: "See matched, unmatched and duplicate counts before anything is committed.",
      },
      {
        title: "Import and verify",
        description: "Confirm the import. The batch is recorded in your import history and can be undone later.",
      },
    ],
    verification:
      "Any verification claim in a Loox export is preserved as a private note, never as an Imagyn Verified Buyer badge. Imagyn only verifies a review it can check against an actual order itself.",
    duplicateHandling:
      "Loox's documented export format does not include a stable per review identifier, so duplicate protection falls back to matching the product, reviewer and review content together. Running the same file twice reports duplicates rather than creating new reviews.",
    productMatching:
      "Rows are matched by handle, SKU, or exact and normalized title, in that order. An unmatched or ambiguous row is reported for your review rather than guessed.",
    customerMatching:
      "Reviewer name and email are stored exactly as exported, never used to look up or attach a Shopify customer record.",
    mediaHandling:
      "Photo links are validated (a real, reachable image URL over https) and referenced directly, never rehosted.",
    publicationStatus:
      "Choose to preserve each row's own status, import everything as approved, or hold everything for moderation.",
    troubleshooting: [
      {
        q: "My Loox export was not detected correctly. What now?",
        a: "Since this adapter has not been verified against a real Loox export, a genuinely different real column layout is the most likely cause. Correct the column mapping manually in the preview step, or export as a plain CSV and map the columns yourself.",
      },
      {
        q: "Does an unverified adapter mean it will not work?",
        a: "No. It means Imagyn has not yet confirmed the adapter against a live Loox account's own export. The underlying import, matching, and safety logic is the same, fully tested pipeline every source uses.",
      },
    ],
    importHref: "/import/loox",
  },
  {
    slug: "stamped",
    sourceName: "Stamped",
    status: "supported",
    title: "How to migrate from Stamped to Imagyn Reviews",
    metaDescription:
      "A complete guide to migrating your reviews from Stamped to Imagyn Reviews: what transfers, what does not, verification handling, and every step of the import process.",
    intro:
      "Imagyn's Stamped adapter is built against Stamped's own documented export column format. It has not yet been verified against a live Stamped account export, for the same reason as Loox: no real sample has been available to test against.",
    whoFor: "For a Shopify merchant currently using Stamped who wants to switch review platforms without losing existing customer feedback.",
    whatMigrates: [
      "Star rating and review body",
      "Reviewer details",
      "The product a review belongs to, matched by handle, SKU or title",
      "Photo links, where the export includes them",
    ],
    whatDoesNotMigrate: [
      "A Stamped verified badge does not become an Imagyn Verified Buyer badge automatically",
      "Stamped specific loyalty, Q&A or net promoter score data",
    ],
    steps: [
      {
        title: "Export from Stamped",
        description: "In your Stamped admin, use its export feature to download your reviews as a file.",
      },
      {
        title: "Upload to Imagyn",
        description: "In Imagyn's Import and Migration settings, choose Stamped as the source and upload the file.",
      },
      {
        title: "Check the detected columns",
        description: "Confirm or correct the column mapping before continuing.",
      },
      {
        title: "Review the full preview",
        description: "See matched, unmatched and duplicate counts before anything is committed.",
      },
      {
        title: "Import and verify",
        description: "Confirm the import. The batch is recorded in your import history and can be undone later.",
      },
    ],
    verification:
      "Any verification claim in a Stamped export is preserved as a private note, never as an Imagyn Verified Buyer badge.",
    duplicateHandling:
      "Duplicate protection matches the product, reviewer and review content together, since Stamped's documented export format has no stable per review identifier.",
    productMatching:
      "Rows are matched by handle, SKU, or exact and normalized title, in that order.",
    customerMatching:
      "Reviewer details are stored exactly as exported, never used to look up or attach a Shopify customer record.",
    mediaHandling: "Photo links are validated and referenced directly, never rehosted.",
    publicationStatus:
      "Choose to preserve each row's own status, import everything as approved, or hold everything for moderation.",
    troubleshooting: [
      {
        q: "My Stamped export was not detected correctly. What now?",
        a: "Correct the column mapping manually in the preview step, since this adapter has not yet been verified against a real Stamped export and a real format difference is possible.",
      },
    ],
    importHref: "/import/stamped",
  },
  {
    slug: "ali-reviews",
    sourceName: "Ali Reviews",
    status: "supported",
    title: "How to migrate from Ali Reviews to Imagyn Reviews",
    metaDescription:
      "A complete guide to migrating your reviews from Ali Reviews to Imagyn Reviews: what transfers, what does not, and every step of the import process.",
    intro:
      "Imagyn's Ali Reviews adapter is built against Ali Reviews' own documented CSV import template. It has not yet been verified against a live Ali Reviews account export.",
    whoFor: "For a Shopify merchant currently using Ali Reviews who wants to switch review platforms without losing existing customer feedback.",
    whatMigrates: [
      "Star rating and review text",
      "Customer name and country",
      "The product a review belongs to, matched by handle",
      "Publish date, where provided",
      "A single image link, where provided",
    ],
    whatDoesNotMigrate: [
      "A review title, since Ali Reviews' own template does not include one",
      "Reviewer email or a verified purchase claim, since Ali Reviews' own template does not include either",
      "Multiple photos per review, since the documented template carries only one image link",
    ],
    steps: [
      {
        title: "Export from Ali Reviews",
        description: "In your Ali Reviews admin, use its export feature to download your reviews as a CSV file.",
      },
      {
        title: "Upload to Imagyn",
        description: "In Imagyn's Import and Migration settings, choose Ali Reviews as the source and upload the file.",
      },
      {
        title: "Check the detected columns",
        description: "Confirm or correct the column mapping before continuing.",
      },
      {
        title: "Review the full preview",
        description: "See matched, unmatched and duplicate counts before anything is committed.",
      },
      {
        title: "Import and verify",
        description: "Confirm the import. The batch is recorded in your import history and can be undone later.",
      },
    ],
    verification:
      "Ali Reviews' own template has no verification column at all, so an imported review carries no verification claim of any kind unless you add one yourself in the file before importing. It never becomes an Imagyn Verified Buyer review automatically.",
    duplicateHandling:
      "Duplicate protection matches the product, reviewer and review content together, since Ali Reviews' template has no stable per review identifier.",
    productMatching: "Rows are matched by product handle, the only structured product reference the template provides.",
    customerMatching: "Customer name and country are stored exactly as exported.",
    mediaHandling: "The single image link is validated and referenced directly, never rehosted.",
    publicationStatus: "Choose to preserve each row's own status, import everything as approved, or hold everything for moderation.",
    troubleshooting: [
      {
        q: "Why is my review missing a title after import?",
        a: "Ali Reviews' own export format does not include a review title field, so this is not something Imagyn can recover. The review content itself still imports in full.",
      },
    ],
    importHref: "/import/ali-reviews",
  },
  {
    slug: "rivyo",
    sourceName: "Rivyo",
    status: "unsupported",
    title: "How to migrate from Rivyo to Imagyn Reviews",
    metaDescription:
      "An honest guide to migrating from Rivyo to Imagyn Reviews: Rivyo is not yet a directly supported import source, and this guide explains the real alternative path.",
    intro:
      "Unlike Judge.me, Loox, Stamped and Ali Reviews, Imagyn does not yet have a dedicated Rivyo import adapter. Rivyo's publicly documented export only confirms a partial column set, without enough confirmed reviewer name, content or email columns to build a reliable adapter without guessing, and guessing a mapping is exactly what Imagyn's import pipeline is built to avoid.",
    whoFor: "For a Shopify merchant currently using Rivyo who wants to switch review platforms.",
    whatMigrates: [],
    whatDoesNotMigrate: ["Direct, automatic import from a Rivyo specific export format (not built yet)"],
    steps: [
      {
        title: "Export from Rivyo as a plain CSV, if available",
        description: "Check whether Rivyo can export your reviews as a generic CSV file. If it can, you already have what you need.",
      },
      {
        title: "Upload to Imagyn as a plain CSV",
        description: "In Imagyn's Import and Migration settings, choose Plain CSV as the source and upload the file.",
      },
      {
        title: "Map the columns yourself",
        description: "Since there is no dedicated Rivyo adapter, you confirm the mapping for rating, content, reviewer details and product reference directly.",
      },
      {
        title: "Review the full preview and import",
        description: "The same preview, duplicate protection and product matching every other source uses still applies once the columns are mapped.",
      },
    ],
    verification:
      "A plain CSV import carries no verification claim unless your file includes one, and even then it is kept only as a private note, never as an automatic Imagyn Verified Buyer badge.",
    duplicateHandling: "Duplicate protection matches the product, reviewer and review content together.",
    productMatching: "Rows are matched by whatever product reference column you map: handle, SKU, or product title.",
    customerMatching: "Reviewer details are stored exactly as your file provides them.",
    mediaHandling: "Any image URL column you map is validated and referenced directly, never rehosted.",
    publicationStatus: "Choose to preserve a status column if your file has one, import everything as approved, or hold everything for moderation.",
    troubleshooting: [
      {
        q: "Will Imagyn ever build a dedicated Rivyo adapter?",
        a: "It remains possible if a real, complete Rivyo export sample becomes available to build and verify an adapter against. Today, the honest answer is that one does not exist yet.",
      },
      {
        q: "Is the plain CSV path a real substitute?",
        a: "Yes. Every adapter, including the verified Judge.me one, shares the same underlying matching, duplicate protection and verification safety logic as the plain CSV path. The only difference is that a dedicated adapter detects columns automatically; a CSV import asks you to confirm them.",
      },
    ],
    importHref: "/import/csv",
  },
];

export function getMigrationGuide(slug: string): MigrationGuide | undefined {
  return MIGRATION_GUIDES.find((guide) => guide.slug === slug);
}
