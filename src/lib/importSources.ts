// Source of truth for every Import & Migration source page (the hub at /import and each
// detail page at /import/[slug]). Deliberately excludes Rivyo: the real imagyn-reviews app
// has no Rivyo adapter (public documentation never confirmed enough real columns to build one
// without guessing), so no marketing page for it exists here either. Keep this in sync with
// app/services/importers/ in the imagyn-reviews repo, a separate codebase.
export type ImportSourceStatus = "verified" | "supported";

export interface ImportSourceDetail {
  slug: string;
  name: string;
  status: ImportSourceStatus;
  summary: string;
  description: string;
  whatImports: string[];
  honestNote: string;
}

export const IMPORT_SOURCES: ImportSourceDetail[] = [
  {
    slug: "judge-me",
    name: "Judge.me",
    status: "verified",
    summary: "Verified against real Judge.me exports, including product matching, replies and media links.",
    description:
      "Imagyn reads a real Judge.me export directly: star rating, review title and body, reviewer name and email, the product it belongs to, any merchant reply, and picture links where the export includes them. Rows are matched to your Shopify catalog by product ID, handle, SKU or title, in that order, so a review lands on the right product even when the export only has a loose title match.",
    whatImports: [
      "Star rating, title, body, reviewer name and email",
      "The product a review belongs to, matched by ID, handle, SKU or title",
      "Merchant replies and their original date",
      "Photo links where the export provides them",
      "Judge.me's own verification note, kept separate from an Imagyn verified badge",
    ],
    honestNote:
      "Tested against real Judge.me export files, not a guessed column format. This is the most thoroughly verified source.",
  },
  {
    slug: "loox",
    name: "Loox",
    status: "supported",
    summary: "Built against Loox's own documented export format.",
    description:
      "Imagyn reads a Loox export using the column structure Loox itself documents for its export feature: rating, review text, reviewer name and email, product handle, and photo links. Product matching and duplicate protection work the same way every other source does.",
    whatImports: [
      "Star rating, review text, reviewer name and email",
      "The product a review belongs to, matched by handle, SKU or title",
      "Photo links where the export provides them",
    ],
    honestNote:
      "Built against Loox's documented export format. Not yet verified against a real Loox account's export, since no real sample has been available to test against, the same standard Judge.me was held to before its own real export verification. If your export does not match, Imagyn will show you exactly which rows did not map, never a silent guess.",
  },
  {
    slug: "stamped",
    name: "Stamped",
    status: "supported",
    summary: "Built against Stamped's own documented export format.",
    description:
      "Imagyn reads a Stamped export using the column structure Stamped documents for its own export feature: rating, review body, reviewer details, product reference, and photo links.",
    whatImports: [
      "Star rating, review body and reviewer details",
      "The product a review belongs to, matched by handle, SKU or title",
      "Photo links where the export provides them",
    ],
    honestNote:
      "Built against Stamped's documented export format. Not yet verified against a real Stamped account's export, for the same reason as Loox above, no real sample has been available to test against.",
  },
  {
    slug: "ali-reviews",
    name: "Ali Reviews",
    status: "supported",
    summary: "Built against Ali Reviews' own documented import template.",
    description:
      "Imagyn reads an Ali Reviews export using the column structure Ali Reviews documents for its own CSV template: product handle, star rating, review text, customer name and country, publish date, and an image link. Ali Reviews' own template is thinner than Judge.me's, no title, email or verified purchase column, so those fields are simply left blank rather than invented.",
    whatImports: [
      "Star rating, review text, customer name and country",
      "The product a review belongs to, matched by handle",
      "Publish date and a single image link where provided",
    ],
    honestNote:
      "Built against Ali Reviews' documented CSV import template. Not yet verified against a real Ali Reviews account's export, for the same reason as Loox and Stamped.",
  },
  {
    slug: "csv",
    name: "Plain CSV",
    status: "verified",
    summary: "The universal fallback, with column mapping you control yourself.",
    description:
      "Any spreadsheet export works: Imagyn detects your column headers automatically and shows you the mapping before anything is imported, so you can correct any column it guessed wrong or map a field it could not detect at all. This is the same, fully tested path every other source ultimately shares.",
    whatImports: [
      "Any columns you have: rating, content, reviewer details, product reference and more",
      "A mapping step where you confirm or correct every column before import",
      "The same product matching, duplicate protection and preview as every other source",
    ],
    honestNote:
      "The most flexible option, and the one every other adapter shares its underlying logic with. If a platform is not listed here, export it to CSV and Imagyn will most likely still read it.",
  },
];

export function getImportSource(slug: string): ImportSourceDetail | undefined {
  return IMPORT_SOURCES.find((source) => source.slug === slug);
}
