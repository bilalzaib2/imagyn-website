"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// The one entrance choreography on the page: the hero's eyebrow, headline, subtext and
// CTAs arrive in a short stagger instead of appearing all at once, since this is the first
// thing a visitor sees and the only moment on the page where a "reveal" isn't gated behind
// scroll. Everything below the fold uses the plain scroll-triggered Reveal instead.
export function HeroIntro({ children }: { children: ReactNode[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? "show" : "hidden"}
      animate="show"
      variants={container}
      className="flex flex-col gap-6"
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
