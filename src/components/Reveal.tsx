"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// The one reveal-on-scroll primitive every section below composes with, a single
// mechanism (fade + rise, Motion-driven, triggered once per element) instead of a different
// bespoke animation per section, which is what keeps the page feeling like one system rather
// than a demo reel of unrelated effects. Reduced motion is handled sitewide by MotionProvider
// (MotionConfig reducedMotion="user"), not per-component.
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delayMs / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
