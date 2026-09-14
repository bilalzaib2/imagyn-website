"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// Single sitewide reduced-motion policy: when the visitor's OS has reduced motion enabled,
// Motion strips transform/layout animation from every nested motion component and falls back
// to instant or opacity-only transitions, so individual components don't each need their own
// reduced-motion branch for Motion-driven animation.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
