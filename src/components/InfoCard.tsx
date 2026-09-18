// Static, non-clickable capability card. The optional index marker reuses the same
// accent-numeral device as NumberedList so enumerated capabilities and enumerated steps
// read as one visual family instead of two unrelated patterns. No translate-on-hover here —
// unlike LinkCard, these cards aren't links, so a lift would promise a click that never lands.
export function InfoCard({
  title,
  description,
  index,
  badge,
}: {
  title: string;
  description: string;
  index?: number;
  badge?: string;
}) {
  const hasMarker = typeof index === "number" || Boolean(badge);

  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-7 transition-colors duration-200 hover:border-accent/40">
      {hasMarker ? (
        <div className="flex items-center justify-between gap-2">
          {typeof index === "number" ? (
            <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
          ) : (
            <span />
          )}
          {badge ? (
            <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-ink">{badge}</span>
          ) : null}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
