import { siteConfig } from "./constants";

// The consumer network's data layer. Every type and fetcher here maps 1:1 onto the public
// read API in the Imagyn Reviews app repo (app/routes/api.public.v1.*) — that API is the
// single source of truth for review data. Nothing is cached, copied or re-derived into this
// site: this file only fetches and types.
//
// Everything returned is already-published customer content. The API filters to approved,
// non-deleted reviews and strips merchant-private fields before anything reaches here, so
// there is no field on these types that needs further redaction at render time.

const API_BASE = `${siteConfig.appUrl}/api/public/v1`;

/** Matches the API's own Cache-Control. Next revalidates on the same cadence so a page and
 *  the CDN in front of it never disagree about how stale the data may be. */
const REVALIDATE_SECONDS = 60;

export type MediaType = "image" | "video";

export interface ReviewMedia {
  id: string;
  type: MediaType | string;
  url: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
}

export interface ProductRef {
  slug: string;
  name: string;
  image: string | null;
  category: string | null;
  brand: string | null;
}

export interface StoreRef {
  slug: string;
  name: string;
}

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  reviewerName: string;
  /** IMAGYN's own verified-purchase signal. Never a source platform's imported claim —
   *  see `importedFrom` for that, and never conflate the two in the UI. */
  verified: boolean;
  /** Set when the review was migrated in from another platform. Shown as provenance, never
   *  as verification. */
  importedFrom: string | null;
  helpfulCount: number;
  createdAt: string;
  reply: { body: string; repliedAt: string | null } | null;
  media: ReviewMedia[];
  product: ProductRef;
  store: StoreRef;
}

export interface ReviewPage {
  reviews: Review[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}

export interface ProductSummary {
  slug: string;
  name: string;
  image: string | null;
  category: string | null;
  brand: string | null;
  store: StoreRef;
  reviewCount: number;
  averageRating: number;
  verifiedCount: number;
}

export interface ProductDetail extends ProductSummary {
  description: string | null;
  ratingCounts: Record<"1" | "2" | "3" | "4" | "5", number>;
  aiSummary: { summary: string; recommendation: string | null } | null;
}

export interface StoreSummary {
  slug: string;
  name: string;
  reviewCount: number;
  averageRating: number;
  verifiedCount: number;
  productCount: number;
}

export interface StoreDetail extends StoreSummary {
  ratingCounts: Record<"1" | "2" | "3" | "4" | "5", number>;
  aiSummary: { summary: string; reviewCountUsed: number } | null;
}

export interface NetworkStats {
  reviews: number;
  verifiedReviews: number;
  reviewsWithMedia: number;
  reviewedProducts: number;
  stores: number;
  categories: number;
}

export interface Facet {
  value: string;
  label: string;
  count: number;
}

export interface DiscoverPayload {
  stats: NetworkStats;
  facets: { categories: Facet[]; stores: Facet[] };
  reviews: ReviewPage;
  products: ProductSummary[];
  stores: StoreSummary[];
}

export type ReviewSort = "latest" | "helpful" | "highest" | "lowest";

export const REVIEW_SORTS: Array<{ value: ReviewSort; label: string }> = [
  { value: "latest", label: "Latest" },
  { value: "helpful", label: "Most helpful" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
];

export interface ReviewQuery {
  verified?: boolean;
  withPhotos?: boolean;
  withVideo?: boolean;
  rating?: number;
  category?: string;
  store?: string;
  product?: string;
  sort?: ReviewSort;
  cursor?: string;
  limit?: number;
}

function toSearchParams(query: Record<string, unknown> | object): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query as Record<string, unknown>)) {
    if (value === undefined || value === null || value === "" || value === false) continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// A failed upstream fetch returns null rather than throwing, so one unavailable section
// degrades to its empty state instead of taking down a whole page. Callers all handle null.
async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { ok?: boolean } & T;
    if (body?.ok === false) return null;
    return body;
  } catch {
    return null;
  }
}

export function getDiscover(): Promise<DiscoverPayload | null> {
  return getJson<DiscoverPayload>("/discover");
}

export function getReviews(query: ReviewQuery = {}): Promise<ReviewPage | null> {
  return getJson<ReviewPage>(`/reviews${toSearchParams(query)}`);
}

export function getReview(id: string): Promise<{ review: Review; related: Review[] } | null> {
  return getJson<{ review: Review; related: Review[] }>(`/reviews/${encodeURIComponent(id)}`);
}

export function getProducts(query: { category?: string; store?: string; limit?: number } = {}) {
  return getJson<{ products: ProductSummary[]; total: number }>(`/products${toSearchParams(query)}`);
}

export function getProduct(slug: string) {
  return getJson<{ product: ProductDetail; reviews: ReviewPage; related: ProductSummary[] }>(
    `/products/${encodeURIComponent(slug)}`,
  );
}

export function getStores(limit?: number) {
  return getJson<{ stores: StoreSummary[]; total: number }>(`/stores${toSearchParams({ limit })}`);
}

export function getStore(slug: string) {
  return getJson<{ store: StoreDetail; reviews: ReviewPage; products: ProductSummary[] }>(
    `/stores/${encodeURIComponent(slug)}`,
  );
}

export function search(q: string) {
  return getJson<{ query: string; products: ProductSummary[]; stores: StoreSummary[]; reviews: Review[] }>(
    `/search${toSearchParams({ q })}`,
  );
}

// ---------------------------------------------------------------- Display helpers

/** Numbers stay literal below a thousand — at this network's real size, "77" is more
 *  credible and more useful than a rounded "80+". Compact formatting only kicks in where it
 *  genuinely aids reading, so the same component is correct at 77 and at 7.7 million. */
export function formatCount(value: number): string {
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0)}k`.replace(".0k", "k");
  return `${(value / 1_000_000).toFixed(1)}M`.replace(".0M", "M");
}

export function formatRating(value: number): string {
  return value.toFixed(1);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export function plural(count: number, one: string, many: string): string {
  return count === 1 ? one : many;
}

/** Vendor strings arrive as whatever the merchant typed into Shopify — sometimes a clean
 *  brand name, sometimes a handle like "pure-nutrition-pakistan". Presented as a readable
 *  label without inventing or correcting the underlying value. */
export function formatBrand(brand: string | null): string | null {
  if (!brand) return null;
  if (!brand.includes("-") || /[A-Z\s]/.test(brand)) return brand;
  return brand
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
