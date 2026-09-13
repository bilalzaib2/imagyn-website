import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { IMPORT_SOURCES } from "@/lib/importSources";

const PATHS = [
  "/",
  "/features",
  "/review-requests",
  "/widgets",
  "/brand-studio",
  "/ai",
  "/analytics",
  "/rewards",
  "/trust",
  "/import",
  ...IMPORT_SOURCES.map((source) => `/import/${source.slug}`),
  "/public-review-site",
  "/integrations",
  "/why-imagyn",
  "/pricing",
  "/docs",
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
