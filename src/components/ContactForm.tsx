"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { siteConfig } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ isEmailConfigured }: { isEmailConfigured: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground">Message sent.</h3>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Thanks for reaching out — we&apos;ll reply by email within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {!isEmailConfigured ? (
        <div className="rounded-2xl border border-border bg-surface p-5 text-[15px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Need help?</span> Contact us at{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {siteConfig.supportEmail}
          </a>
          . We typically respond within one business day.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <fieldset disabled={!isEmailConfigured} className="flex flex-col gap-5 disabled:opacity-50">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" type="text" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
          </div>
          <Field label="Subject" name="subject" type="text" required />
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-foreground transition-colors hover:border-foreground/30 focus:border-accent disabled:cursor-not-allowed"
            />
          </div>
        </fieldset>

        {status === "error" ? (
          <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            {errorMessage}
          </p>
        ) : null}

        {isEmailConfigured ? (
          <Button type="submit" size="lg" className="w-fit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </Button>
        ) : (
          <Button href={`mailto:${siteConfig.supportEmail}`} size="lg" className="w-fit">
            Email Support
          </Button>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-foreground transition-colors hover:border-foreground/30 focus:border-accent disabled:cursor-not-allowed"
      />
    </div>
  );
}
