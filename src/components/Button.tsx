import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

// Apple's own current button proportions: a fixed 52px pill for prominent CTAs (hero,
// pricing, footer), scaled down for compact contexts (nav bar, card actions) while
// keeping the exact same shape language, weight and color system.
const SIZES = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-[52px] px-[34px] text-[16px]",
};

// Each variant sets its own focus-visible outline color — the shared near-black
// --color-accent ring (fine for the light-background variants) would be invisible against
// the black-section variants below, which is exactly the kind of thing that only shows up
// once you actually tab through the page instead of just looking at it.
const VARIANTS = {
  primary: "bg-button-primary text-white hover:bg-button-primary-hover focus-visible:outline-accent",
  secondary:
    "bg-transparent text-button-primary border-2 border-button-primary hover:bg-button-primary hover:text-white focus-visible:outline-accent",
  ghost: "text-foreground hover:text-accent focus-visible:outline-accent",
  // For black/dark-section contexts, where `primary`'s black-on-black would disappear.
  lime: "bg-lime text-lime-ink hover:brightness-95 focus-visible:outline-foreground",
  "outline-light":
    "bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (props.href) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
