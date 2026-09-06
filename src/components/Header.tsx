"use client";

import { useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { NAV_LINKS, siteConfig } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-lime transition-all duration-200 group-hover:w-full" />
            </a>
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
            {NAV_LINKS.map((link) => (
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
