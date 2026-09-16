import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { IMPORT_SOURCES } from "@/lib/importSources";
import { WIDGET_SURFACES } from "@/lib/widgetSurfaces";
import { AI_SURFACES } from "@/lib/aiSurfaces";
import { MERCHANT_SEGMENTS } from "@/lib/merchantSegments";
import { GUIDES } from "@/lib/guides";
import { MIGRATION_GUIDES } from "@/lib/migrationGuides";
import { COMPARISONS } from "@/lib/comparisons";

const PATHS = [
  "/",
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
  "/support",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
