import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with the Imagyn Reviews team.",
  path: "/contact",
});

export default function ContactPage() {
  const isEmailConfigured = Boolean(process.env.RESEND_API_KEY);

  return (
    <section className="pt-24 pb-28 md:pt-32 md:pb-36">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk."
          description={`Have a question about Imagyn Reviews? Send us a message, or email us directly at ${siteConfig.supportEmail}.`}
          align="left"
        />

        <div className="mt-12">
          <ContactForm isEmailConfigured={isEmailConfigured} />
        </div>
      </Container>
    </section>
  );
}
