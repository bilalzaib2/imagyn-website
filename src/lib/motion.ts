"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// One IntersectionObserver-based hook covers every "reveal on scroll" and "start
// animating once visible" need on this site — no animation library required for that.
// Fires once and disconnects; a marketing page doesn't need re-triggering on scroll-back.
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

// Respected everywhere motion is JS-driven (counters, staged reveals). CSS-driven motion
// additionally has its own `@media (prefers-reduced-motion: reduce)` rules in globals.css.
// useSyncExternalStore (rather than an effect + setState) reads the live browser value on
// the client while giving React a safe, mismatch-free `false` for the server-rendered pass.
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

// Normalized 0-to-1 scroll progress through a single element's own bounds: 0 when the
// element's top has just reached the bottom of the viewport, 1 when its bottom has just
// left the top of the viewport. Used to drive lightweight parallax-style transforms (the
// hero's floating cards) directly from real scroll position, not a one-time entrance.
// rAF-throttled and passive so it never blocks the scroll thread; returns 0 (and never
// attaches the listener) when the user prefers reduced motion, so callers can skip the
// scroll-linked transform entirely and fall back to a static resting position.
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    let frame: number | null = null;

    const measure = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const total = window.innerHeight + rect.height;
      const traveled = window.innerHeight - rect.top;
      setProgress(Math.min(1, Math.max(0, traveled / total)));
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return { ref, progress: reducedMotion ? 0 : progress };
}

// Counts a number up from 0 once the element holding it scrolls into view. Used only for
// clearly-labeled illustrative demo values (never real merchant data) — see each call
// site's own "demo" labeling.
export function useCountUp(target: number, active: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // The reduced-motion "jump straight to target" case is handled as derived state below
    // instead of a setState call here, so this effect only ever runs the real animation.
    if (!active || reducedMotion) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // Ease-out cubic — a count-up that decelerates reads as more deliberate than linear.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased * 10) / 10);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs, reducedMotion]);

  if (reducedMotion) return active ? target : 0;
  return value;
}
