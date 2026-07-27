import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidPayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.subject === "string" &&
    d.subject.trim().length > 0 &&
    typeof d.message === "string" &&
    d.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, a valid email, a subject and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fail honestly rather than pretending the message was sent — set RESEND_API_KEY in
    // Vercel's project environment variables to enable real delivery.
    console.error("RESEND_API_KEY is not configured — contact form submission was not sent.");
    return NextResponse.json(
      { ok: false, error: "Contact form is not fully configured yet. Please email us directly instead." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, subject, message } = body;

  try {
    await resend.emails.send({
      from: `Imagyn Reviews Contact Form <contact@${new URL(siteConfig.url).hostname}>`,
      to: siteConfig.supportEmail,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again or email us directly." },
      { status: 502 },
    );
  }
}
