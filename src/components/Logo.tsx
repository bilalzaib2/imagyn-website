import Image from "next/image";
import Link from "next/link";

// Real, supplied brand assets (the logo family is finalized and never redrawn or
// approximated — see design_decisions_locked memory): logo.svg is the green dot emblem
// with black wordmark text for light backgrounds, logo-light.svg is the same lockup with
// the wordmark in off white for dark backgrounds (the footer, and the dark hero). Both
// share the exact same 584.05 x 93.31 viewBox, so the width/height below must scale
// together with it — changing one without the other would visibly distort the logo.
const ASPECT_RATIO = 584.05 / 93.31;
const HEIGHT = 26;
const WIDTH = Math.round(HEIGHT * ASPECT_RATIO);

export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${variant === "light" ? "focus-visible:outline-lime" : ""} ${className}`}
      aria-label="Imagyn Reviews home"
    >
      <Image
        src={variant === "light" ? "/logo-light.svg" : "/logo.svg"}
        alt="Imagyn Reviews"
        width={WIDTH}
        height={HEIGHT}
        priority
        className="h-[26px] w-auto"
      />
    </Link>
  );
}
