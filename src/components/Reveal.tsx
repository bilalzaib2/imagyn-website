"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/motion";

// The one reveal-on-scroll primitive every section below composes with — a single
// mechanism (fade + rise, CSS transition, IntersectionObserver-triggered) instead of a
// different bespoke animation per section, which is what keeps the page feeling like one
// system rather than a demo reel of unrelated effects.
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
