import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { IMPORT_SOURCES } from "@/lib/importSources";
import { WIDGET_SURFACES } from "@/lib/widgetSurfaces";
import { AI_SURFACES } from "@/lib/aiSurfaces";
import { MERCHANT_SEGMENTS } from "@/lib/merchantSegments";
import { GUIDES } from "@/lib/guides";
import { MIGRATION_GUIDES } from "@/lib/migrationGuides";
import { COMPARISONS } from "@/lib/comparisons";
import { getProducts, getReviews, getStores } from "@/lib/discovery";

const PATHS = [
  "/",
  // Consumer discovery hubs. Individual product/store/review URLs are appended from live
  // API data in discoveryPaths() below.
  "/discover",
  "/reviews",
  "/products",
  "/stores",
  "/features",
  "/features/photo-video-reviews",
  "/features/review-moderation",
  "/compare",
  ...COMPARISONS.map((c) => `/compare/${c.slug}`),
  "/review-requests",
  "/widgets",
  ...WIDGET_SURFACES.map((widget) => `/widgets/${widget.slug}`),
  "/brand-studio",
  "/ai",
  ...AI_SURFACES.map((surface) => `/ai/${surface.slug}`),
  "/analytics",
  "/rewards",
  "/trust",
  "/import",
  ...IMPORT_SOURCES.map((source) => `/import/${source.slug}`),
  "/migrate",
  ...MIGRATION_GUIDES.map((guide) => `/migrate/${guide.slug}`),
  "/public-review-site",
  "/integrations",
  "/why-imagyn",
  "/solutions",
  ...MERCHANT_SEGMENTS.map((segment) => `/solutions/${segment.slug}`),
  "/pricing",
  "/resources",
  "/docs",
  "/guides",
  ...GUIDES.map((guide) => `/guides/${guide.slug}`),
  "/faq",
  "/support",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

/** Revalidate on the same cadence as the discovery data the entity URLs come from. */
export const revalidate = 60;

// Every published product, store and review page, fetched live from the public API. These
// are the pages the discovery network actually exists to get indexed — without them the
// sitemap listed only the four hub pages and left all of the real content undiscoverable
// to crawlers that do not follow deep pagination.
//
// The API already excludes development stores, so nothing from a test store can reach the
// sitemap. Fetch failures degrade to the static paths rather than emitting a truncated
// sitemap that looks like pages were deliberately removed.
async function discoveryPaths(): Promise<string[]> {
  try {
    const [products, stores, reviews] = await Promise.all([
      getProducts({ limit: 500 }),
      getStores(500),
      getReviews({ limit: 500 }),
    ]);
    return [
      ...(products?.products ?? []).map((p) => `/product/${p.slug}`),
      ...(stores?.stores ?? []).map((s) => `/store/${s.slug}`),
      ...(reviews?.reviews ?? []).map((r) => `/review/${r.id}`),
    ];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const entityPaths = await discoveryPaths();

  return [...PATHS, ...entityPaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
