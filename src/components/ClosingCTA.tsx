import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/constants";

// The one closing-CTA section every feature/solution page ends with. `variant="dark"` is
// reserved for the handful of pages that sit at a real decision point in the merchant's
// evaluation (switching platforms, verifying trust) — everywhere else stays the quieter
// surface treatment so the dark moment keeps its weight instead of becoming wallpaper.
export function ClosingCTA({
  title,
  description,
  variant = "surface",
  primaryLabel = "Get Started",
  primaryHref = siteConfig.appStoreUrl,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  description?: string;
  variant?: "surface" | "dark";
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const isDark = variant === "dark";

  return (
    <section
      className={
        isDark
          ? "relative overflow-hidden bg-foreground py-28 md:py-36"
          : "border-t border-border py-28 md:py-36"
      }
    >
      <Container>
        <Reveal
          className={
            isDark
              ? "flex flex-col items-center gap-6 text-center"
              : "flex flex-col items-center gap-6 rounded-[32px] bg-surface px-8 py-16 text-center shadow-soft md:px-16"
          }
        >
          <h2
            className={`max-w-2xl text-section font-semibold leading-[1.1] tracking-[-0.035em] ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p className={`max-w-xl text-lg leading-relaxed ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
              {description}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryHref} size="lg" variant={isDark ? "light" : "primary"}>
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} size="lg" variant={isDark ? "outline-light" : "secondary"}>
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
