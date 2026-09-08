import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

const PATHS = [
  "/",
  "/features",
  "/widgets",
  "/brand-studio",
  "/ai",
  "/rewards",
  "/integrations",
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
