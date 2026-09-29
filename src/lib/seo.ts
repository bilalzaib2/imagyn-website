import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
}

/**
 * The site-wide social preview image, produced by src/app/opengraph-image.tsx.
 *
 * It has to be named explicitly here. Next only attaches a file-based opengraph-image to
 * the segment that owns it, and any page defining its own `openGraph` block (which every
 * page using this helper does) replaces the inherited one rather than merging with it. The
 * result was that the homepage previewed with an image and all 35 other routes previewed
 * with none — invisible in the page itself, and only ever seen once a link was already
 * shared somewhere.
 */
export const OG_IMAGE = {
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

export function pageMetadata({ title, description, path }: PageSeoOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  // The page title only — the root layout's `title.template` appends " · Imagyn Reviews"
  // exactly once. Appending it here too produced doubled titles like
  // "About · Imagyn Reviews · Imagyn Reviews" on every non-home page. The homepage passes
  // its own already-composed "Imagyn Reviews · <tagline>" string, which the template does
  // not wrap (verified against production output).
  const pageTitle = title;
  const ogTitle = path === "/" ? title : `${title} · ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
      ...(siteConfig.twitter ? { site: siteConfig.twitter } : {}),
    },
  };
}

/**
 * Serializes a page's already-visible FAQ copy into FAQPage JSON-LD. Pass the exact same
 * {q, a} array the page renders — never a separately maintained list — so the schema can't
 * drift from what a visitor actually sees.
 */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/** Serializes a page's real nav hierarchy into BreadcrumbList JSON-LD. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
