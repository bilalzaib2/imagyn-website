import Link from "next/link";
import type { ReactNode } from "react";
import { formatCount, formatRating, plural } from "@/lib/discovery";

// The small, repeated pieces every discovery surface is assembled from. Deliberately compact:
// this library's job is density, so each of these is sized to sit inside a card without
// dominating it, and none of them introduces colour beyond the one green the brand already
// reserves for trust moments.

const STAR_PATH =
  "M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8z";

/** Star row. `value` may be fractional — the partial star is clipped rather than rounded, so
 *  a 4.4 average never reads as a flat 4. */
export function Stars({
  value,
  size = 13,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const id = `stars-${Math.round(clamped * 100)}-${size}`;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-[2px] ${className}`}
      role="img"
      aria-label={`${formatRating(clamped)} out of 5`}
    >
      <svg width={size * 5 + 8} height={size} viewBox={`0 0 ${20 * 5 + 8} 20`} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${(clamped / 5) * 100}%`} stopColor="var(--lime)" />
            <stop offset={`${(clamped / 5) * 100}%`} stopColor="#d8d8d8" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={STAR_PATH} transform={`translate(${i * 22}, 0)`} fill={`url(#${id})`} />
        ))}
      </svg>
    </span>
  );
}

function CheckIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M6 10.4 8.7 13 14 7.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The single most important trust signal on the site, and the only place green is used as a
 *  text colour. Rendered ONLY for a review IMAGYN itself verified as a real purchase — never
 *  for one imported from another platform, which carries its own separate provenance label. */
export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold tracking-[-0.01em] text-lime"
      title="Imagyn verified this review against a real order"
    >
      <CheckIcon />
      {compact ? "Verified" : "Verified purchase"}
    </span>
  );
}

/** Provenance for a migrated review. Deliberately neutral grey, deliberately not the word
 *  "verified": the source platform's own claim is not evidence IMAGYN can stand behind. */
export function ImportedBadge({ source }: { source: string }) {
  const label = source.charAt(0).toUpperCase() + source.slice(1);
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full border border-border px-2 py-[1px] text-[10px] font-medium text-muted-foreground"
      title={`Migrated from ${label}. Imagyn has not independently verified this purchase.`}
    >
      via {label}
    </span>
  );
}

/** Quiet metadata chip used for category, brand and counts. */
export function MetaPill({ children, href }: { children: ReactNode; href?: string }) {
  const className =
    "inline-flex shrink-0 items-center rounded-full border border-border bg-background px-2.5 py-[3px] text-[11px] font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground";
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className.replace(" transition-colors hover:border-foreground/25 hover:text-foreground", "")}>
      {children}
    </span>
  );
}

/** Rating distribution. Bars are proportional to the busiest row rather than to the total, so
 *  a small sample still shows readable shape instead of five near-empty slivers. */
export function RatingBars({
  counts,
  total,
  className = "",
}: {
  counts: Record<"1" | "2" | "3" | "4" | "5", number>;
  total: number;
  className?: string;
}) {
  const max = Math.max(...(["5", "4", "3", "2", "1"] as const).map((k) => counts[k]), 1);

  return (
    <div className={`grid gap-1.5 ${className}`}>
      {(["5", "4", "3", "2", "1"] as const).map((star) => {
        const count = counts[star];
        return (
          <div key={star} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <span className="w-3 text-right text-[11px] tabular-nums text-muted-foreground">{star}</span>
            <span className="h-[5px] overflow-hidden rounded-full bg-border">
              <span
                className="block h-full rounded-full bg-lime transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: total > 0 ? `${Math.round((count / max) * 100)}%` : "0%" }}
              />
            </span>
            <span className="w-8 text-right text-[11px] tabular-nums text-muted-foreground">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

/** A rating + count pair, the unit that appears on every card and header. */
export function RatingSummary({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count: number;
  size?: "sm" | "lg";
}) {
  if (count === 0) {
    return <span className="text-[12px] text-muted-foreground">No reviews yet</span>;
  }

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span
        className={
          size === "lg"
            ? "text-[28px] font-semibold leading-none tracking-[-0.03em]"
            : "text-[14px] font-semibold leading-none tracking-[-0.02em]"
        }
      >
        {formatRating(rating)}
      </span>
      <Stars value={rating} size={size === "lg" ? 15 : 12} />
      <span className="text-[12px] text-muted-foreground">
        {formatCount(count)} {plural(count, "review", "reviews")}
      </span>
    </span>
  );
}

/** Used wherever a surface legitimately has nothing to show. Written to read as a real state
 *  of a young network rather than an error — the network is small today and the copy says so
 *  plainly instead of implying something broke. */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid justify-items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <p className="text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
      <p className="max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground">{body}</p>
      {action}
    </div>
  );
}

/** Section header used across the discovery surfaces: a title, an honest count, and an
 *  optional link onward. */
export function SectionBar({
  title,
  count,
  href,
  hrefLabel = "View all",
}: {
  title: string;
  count?: number;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
      <h2 className="text-[17px] font-semibold tracking-[-0.02em]">
        {title}
        {typeof count === "number" ? (
          <span className="ml-2 text-[13px] font-normal tabular-nums text-muted-foreground">{formatCount(count)}</span>
        ) : null}
      </h2>
      {href ? (
        <Link
          href={href}
          className="text-[13px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {hrefLabel}
        </Link>
      ) : null}
    </div>
  );
}
