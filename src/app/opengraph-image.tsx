import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagyn Reviews emblem mark (dot-grid), same asset used across the app and this site's
// favicon/logo. Embedded as a data URI since next/og's edge runtime can't reliably read
// from the filesystem or make a same-origin fetch for its own static assets.
const EMBLEM_DATA_URI =
  "data:image/png;base64,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";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <img src={EMBLEM_DATA_URI} width={40} height={40} alt="" />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Imagyn Reviews
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            fontWeight: 700,
            color: "#0a0a0a",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Build trust with every customer review.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#6b6b6b",
            maxWidth: 820,
            display: "flex",
          }}
        >
          A premium Shopify review app: collection, moderation, AI insights and widgets.
        </div>
      </div>
    ),
    { ...size },
  );
}
