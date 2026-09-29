"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

// A real form, not a fake search box: it navigates to /search?q=, which is a server-rendered,
// linkable, indexable page. Typing is local state; the URL is the source of truth once
// submitted, so a search result can be shared and the back button behaves.
export function SearchInput({
  initialQuery = "",
  size = "md",
  autoFocus = false,
  placeholder = "Search products, stores and reviews",
}: {
  initialQuery?: string;
  size?: "md" | "lg";
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const q = value.trim();
    if (q.length < 2) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`flex w-full items-center gap-2 rounded-full border border-border bg-surface transition-colors focus-within:border-foreground/30 ${
        size === "lg" ? "px-5 py-3.5" : "px-4 py-2.5"
      }`}
    >
      <svg
        width={size === "lg" ? 18 : 16}
        height={size === "lg" ? 18 : 16}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="shrink-0 text-muted-foreground"
        aria-hidden="true"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search the review network"
        autoFocus={autoFocus}
        className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground ${
          size === "lg" ? "text-[16px]" : "text-[14px]"
        }`}
      />
      {value.trim().length >= 2 ? (
        <button
          type="submit"
          className={`shrink-0 rounded-full bg-foreground font-medium text-background transition-colors hover:bg-button-primary-hover ${
            size === "lg" ? "px-4 py-2 text-[14px]" : "px-3 py-1.5 text-[13px]"
          }`}
        >
          Search
        </button>
      ) : null}
    </form>
  );
}
