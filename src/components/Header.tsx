"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { PRODUCT_LINKS, RESOURCES_LINKS, COMPANY_LINKS, siteConfig } from "@/lib/constants";

// A single top-level link (Pricing, and each Resources/Company item) — same underline-on-
// hover treatment the old flat nav used, kept for the items that don't need a dropdown.
function TopLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-lime transition-all duration-200 group-hover:w-full" />
    </a>
  );
}

// The "Product" mega-menu — a quiet, single dropdown panel (not tabs, not icons-everywhere)
// listing every real product destination with a one-line description, closer to an
// editorial index than a busy SaaS mega-menu. Opens on hover (desktop) with a short close
// delay so moving the cursor from trigger to panel doesn't close it, and on click for
// keyboard/touch users. Closes on outside click and Escape.
function ProductMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex items-center gap-1.5 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Product
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-4 transition-all duration-200 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-background p-3 shadow-elevated">
          {PRODUCT_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-surface"
            >
              <span className="text-[14px] font-semibold text-foreground">{item.label}</span>
              <span className="text-[13px] leading-snug text-muted-foreground">{item.description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          <ProductMenu />
          <TopLink href="/pricing" label="Pricing" />
          {RESOURCES_LINKS.map((link) => (
            <TopLink key={link.href} href={link.href} label={link.label} />
          ))}
          {COMPANY_LINKS.map((link) => (
            <TopLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href={siteConfig.appUrl} variant="ghost" size="md">
            Log in
          </Button>
          <Button href="/pricing" variant="primary" size="md">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-full bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[1.5px] w-full bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-[1.5px] w-full bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <button
              type="button"
              onClick={() => setMobileProductOpen((v) => !v)}
              aria-expanded={mobileProductOpen}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface"
            >
              Product
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className={`transition-transform duration-200 ${mobileProductOpen ? "-rotate-180" : ""}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileProductOpen ? (
              <div className="mb-1 flex flex-col gap-1 pl-3">
                {PRODUCT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-[14px] text-muted-foreground hover:bg-surface hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}

            <a
              href="/pricing"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface"
            >
              Pricing
            </a>
            {[...RESOURCES_LINKS, ...COMPANY_LINKS].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-2 flex flex-col gap-2 px-3">
              <Button href={siteConfig.appUrl} variant="secondary" size="md">
                Log in
              </Button>
              <Button href="/pricing" variant="primary" size="md">
                Get Started
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
