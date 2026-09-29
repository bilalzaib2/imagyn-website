import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

// The one section wrapper every marketing page composes from. It exists so the site's vertical
// rhythm lives in a single place rather than as a per-page "py-24 md:py-32" judgement call —
// that drift is what made ~34 pages feel like they belonged to different products.
//
// Padding is block-only. Container owns the horizontal gutter, and a `padding` shorthand here
// would silently override it.
export function Section({
  children,
  as: Component = "section",
  tone = "default",
  rhythm = "default",
  bordered = false,
  className = "",
  containerClassName = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** `surface` is the quiet raised band used to separate one idea from the next; `dark` is
   *  reserved for genuine decision points so it keeps its weight instead of becoming
   *  wallpaper. */
  tone?: "default" | "surface" | "dark";
  rhythm?: "default" | "tight" | "none";
  bordered?: boolean;
  className?: string;
  containerClassName?: string;
}) {
  const TONES = {
    default: "",
    surface: "bg-surface",
    dark: "bg-foreground text-white",
  };

  const RHYTHM = {
    default: "py-[var(--section-y)]",
    tight: "py-[var(--section-y-tight)]",
    none: "",
  };

  return (
    <Component
      className={`${TONES[tone]} ${RHYTHM[rhythm]} ${bordered ? "border-t border-border" : ""} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}

/** A section label. Uppercase, tracked, muted, with a hairline rule — reads as editorial
 *  structure rather than as a coloured marketing pill.
 *
 *  The rule is drawn on one side when the label is left-aligned and on both when it is
 *  centered. A single leading rule under a centered heading reads as a mistake rather than
 *  as a flourish, and SectionHeading centers by default, so that was most of the site. */
export function Eyebrow({
  children,
  tone = "default",
  align = "left",
}: {
  children: ReactNode;
  tone?: "default" | "light";
  align?: "left" | "center";
}) {
  const rule = <span className={`h-px w-6 ${tone === "light" ? "bg-white/30" : "bg-border"}`} aria-hidden="true" />;

  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[var(--tracking-eyebrow)] ${
        tone === "light" ? "text-white/55" : "text-muted-foreground"
      }`}
    >
      {rule}
      {children}
      {align === "center" ? rule : null}
    </span>
  );
}
