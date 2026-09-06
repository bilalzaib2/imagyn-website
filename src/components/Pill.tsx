// A static label pill — not a button, not a link. Matches the brand's recurring black
// (or lime) pill-shaped caption used to name what's on screen ("Analytics + AI",
// "On-site widgets") without competing with the real CTAs, which use <Button>.
export function Pill({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "lime";
  className?: string;
}) {
  const TONES = {
    dark: "bg-foreground text-background",
    light: "bg-background text-foreground",
    lime: "bg-lime text-lime-ink",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-[-0.01em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
