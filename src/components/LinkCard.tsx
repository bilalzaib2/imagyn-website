// The clickable card used for "browse the sub-pages" grids (widgets, AI surfaces, import
// sources, merchant segments). headingLevel defaults to h3 because every current usage sits
// directly under a SectionHeading (which renders h2) — pass "h2" only when a page's card grid
// is the first heading after its own h1, so the outline never skips a level.
export function LinkCard({
  href,
  title,
  description,
  badge,
  ctaLabel = "See details",
  headingLevel = "h3",
}: {
  href: string;
  title: string;
  description: string;
  badge?: string;
  ctaLabel?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <a
      href={href}
      className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Heading className="text-lg font-semibold text-foreground">{title}</Heading>
        {badge ? (
          <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-ink">{badge}</span>
        ) : null}
      </div>
      <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-2 text-[14px] font-medium text-foreground">{ctaLabel} →</span>
    </a>
  );
}
