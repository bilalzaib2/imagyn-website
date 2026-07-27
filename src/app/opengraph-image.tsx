import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            fontSize: 28,
            fontWeight: 700,
            color: "#4c73c9",
            letterSpacing: "-0.01em",
            display: "flex",
          }}
        >
          Imagyn Reviews
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
