import Image from "next/image";
import Link from "next/link";

// The source logo.svg is drawn in near-black fills, deliberately, per the locked brand
// asset (the logo family itself is finalized and never redrawn — see design_decisions_locked
// memory). `variant="light"` renders it on a dark section (the footer's forest background)
// by inverting the same file with a CSS filter, not by introducing a second logo asset.
export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${variant === "light" ? "focus-visible:outline-lime" : ""} ${className}`}
      aria-label="Imagyn Reviews home"
    >
      <Image
        src="/logo.svg"
        alt="Imagyn Reviews"
        width={79}
        height={18}
        priority
        className={`h-[18px] w-auto ${variant === "light" ? "invert" : ""}`}
      />
    </Link>
  );
}
