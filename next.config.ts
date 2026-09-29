import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // An unrelated, orphaned package-lock.json in the parent home directory made Next.js
  // infer the wrong workspace root — pin it explicitly to this project.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Review and product imagery is served from the merchant's own Shopify CDN — this site
    // never re-hosts customer photos, it points at the same asset the storefront serves.
    // Restricted to Shopify's CDN hosts rather than left open, so a compromised or mistyped
    // image URL in the API can't turn this site's optimizer into an open image proxy.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "*.myshopify.com" },
      // Review photos migrated in from Judge.me stay on that platform's own S3 bucket rather
      // than being re-hosted — the imported ReviewMedia rows point straight at it. Scoped to
      // that exact bucket path, not all of s3.amazonaws.com, so this can't become a general
      // image proxy for anything on S3.
      { protocol: "https", hostname: "s3.amazonaws.com", pathname: "/me.judge.review-images/**" },
    ],
  },
};

export default nextConfig;
