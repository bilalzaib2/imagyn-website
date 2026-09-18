import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

// rounded-[10px], not rounded-full: a compact, intentional corner rather than a pill,
// paired with a press-down (not scale) tactile response — the shape and motion language
// of a considered product control, not a generic SaaS "pill button." Every interactive
// control on the site (Button, and nothing else) uses this exact radius; Pill stays fully
// round because it is a static label, not a control, and the two are meant to read as
// different things at a glance.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-out active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-colors motion-reduce:active:translate-y-0";

// Compact, deliberate proportions rather than an oversized pill: enough height for a
// confident tap target, tight enough padding that the label sets the width, not the box.
const SIZES = {
  md: "h-10 px-5 text-[14.5px]",
  lg: "h-12 px-7 text-[15.5px]",
};

// Each variant sets its own focus-visible outline color, the shared near-black
// --color-accent ring (fine for the light-background variants) would be invisible against
// the black-section variants below, which is exactly the kind of thing that only shows up
// once you actually tab through the page instead of just looking at it.
const VARIANTS = {
  primary: "bg-button-primary text-white hover:bg-button-primary-hover focus-visible:outline-accent",
  secondary:
    "bg-transparent text-button-primary border border-button-primary/70 hover:border-button-primary hover:bg-accent-soft focus-visible:outline-accent",
  ghost: "text-foreground hover:text-accent focus-visible:outline-accent",
  // The dark-section primary: solid white, not green. Green is the brand's rare, singular
  // accent (see globals.css) — a button is pressed on every page, so making it the default
  // CTA color would turn the one accent into wallpaper. Reserve `lime` (below) for the one
  // or two places on the whole site where a green CTA is a deliberate, earned moment.
  light: "bg-white text-foreground hover:bg-white/90 focus-visible:outline-white",
  lime: "bg-lime text-lime-ink hover:brightness-95 focus-visible:outline-foreground",
  "outline-light":
    "bg-transparent text-white border border-white/35 hover:border-white/70 hover:bg-white/10 focus-visible:outline-white",
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
