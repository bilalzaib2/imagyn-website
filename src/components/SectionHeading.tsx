export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  // Every page needs exactly one real <h1>. Sections re-used further down a page (or pages
  // whose hero already renders its own hand-written <h1>) should keep the default "h2" —
  // only a page's own top-of-page hero heading should ever pass level="h1".
  level?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  const Heading = level;

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold tracking-[0.02em] text-accent">{eyebrow}</span>
      ) : null}
      <Heading className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
        {title}
      </Heading>
      {description ? (
        <p className="text-lg leading-[1.6] text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
