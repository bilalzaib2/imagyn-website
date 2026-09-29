"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// Review media is a remote URL owned by someone else — for migrated reviews it points at the
// source platform's own S3 bucket, and some of those files are already gone. A dead URL must
// degrade to the same quiet monogram a review with no photo shows, never to the browser's
// broken-image glyph: on a trust platform, a broken image reads as broken data.
//
// Client component purely because next/image's onError needs a handler; everything around it
// stays server-rendered.
export function SafeImage({
  fallbackLabel,
  alt,
  ...props
}: ImageProps & { fallbackLabel: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="flex h-full w-full items-center justify-center bg-accent-soft text-[22px] font-semibold tracking-[-0.03em] text-muted-foreground/60"
        aria-hidden="true"
      >
        {fallbackLabel.trim().charAt(0).toUpperCase() || "·"}
      </span>
    );
  }

  return <Image {...props} alt={alt} onError={() => setFailed(true)} />;
}
