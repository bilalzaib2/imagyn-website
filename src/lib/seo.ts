import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({ title, description, path }: PageSeoOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} · ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.twitter,
    },
  };
}
