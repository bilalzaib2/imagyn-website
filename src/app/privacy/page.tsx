import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Imagyn Reviews collects, uses and protects data for merchants and their customers.",
  path: "/privacy",
});

const LAST_UPDATED = "September 5, 2026";

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-3xl">
        <h1 className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tracking-[-0.035em] text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

        <div className="prose-legal mt-12 flex flex-col gap-10 text-[15px] leading-relaxed text-foreground">
          <LegalSection title="1. Overview">
            <p>
              Imagyn Reviews (&quot;Imagyn Reviews,&quot; &quot;we,&quot; &quot;us&quot;) is a review-management
              application for Shopify stores, built by Imagyn Studios. This policy explains what information we
              collect when a merchant installs the app, and when a merchant&apos;s customer submits a review, and
              how that information is used, shared and protected.
            </p>
          </LegalSection>

          <LegalSection title="2. Information we collect">
            <p>
              <strong className="font-semibold">From merchants.</strong>{" "}When you install Imagyn Reviews, Shopify
              shares your store&apos;s domain, basic store details, and an access token scoped to the permissions
              you approve during installation. We do not request your Shopify account password at any point.
            </p>
            <p>
              <strong className="font-semibold">From your customers, when they leave a review.</strong>{" "}Reviewer
              name, email address (used only to confirm review authenticity and for optional merchant replies),
              star rating, written review text, and any photos voluntarily uploaded. If a review is submitted
              through a review-request link tied to an order, we also record that it is a verified purchase.
            </p>
            <p>
              <strong className="font-semibold">Automatically.</strong>{" "}A random, anonymous identifier stored
              in your browser&apos;s local storage, used only to keep the widget&apos;s helpful-vote feature
              limited to one vote per visitor. This identifier is not linked to your name, email, or any other
              personal information, and we do not use it to track you across other websites.
            </p>
          </LegalSection>

          <LegalSection title="3. How we use information">
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>To operate the app: display reviews, run moderation rules, and send review-request emails.</li>
              <li>To generate AI-powered review summaries, on plans that include this feature.</li>
              <li>To detect and prevent fraudulent or duplicate reviews.</li>
              <li>To provide support when a merchant or their customer contacts us.</li>
              <li>To comply with legal obligations, including Shopify&apos;s mandatory data-protection requirements.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. How information is shared">
            <p>We do not sell personal information. We share data only as follows:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong className="font-semibold">Shopify</strong>{" "}— as the platform Imagyn Reviews runs on,
                for authentication, billing and store data access.
              </li>
              <li>
                <strong className="font-semibold">Infrastructure providers</strong>{" "}— our hosting and database
                providers, who process data on our behalf under standard data-processing terms.
              </li>
              <li>
                <strong className="font-semibold">AI providers</strong>{" "}— review text may be sent to a
                third-party AI provider solely to generate the AI review summary feature, on plans that include
                it. Reviewer contact details are never included in this data.
              </li>
              <li>
                <strong className="font-semibold">Email providers</strong>{" "}— used to deliver review-request
                emails and merchant notifications.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Data retention">
            <p>
              We retain review data for as long as a merchant&apos;s store has Imagyn Reviews installed. If the
              app is uninstalled, store and customer data associated with that store is deleted from our systems
              within 48 hours, consistent with Shopify&apos;s <code className="rounded bg-surface px-1.5 py-0.5 text-[13px]">app/uninstalled</code> webhook requirements.
            </p>
          </LegalSection>

          <LegalSection title="6. Your rights (GDPR and CCPA)">
            <p>
              Imagyn Reviews implements Shopify&apos;s mandatory compliance webhooks, which means any customer
              can request a copy of their data or request deletion by contacting the merchant&apos;s store
              directly, or by reaching us at{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-accent underline-offset-4 hover:underline">
                {siteConfig.supportEmail}
              </a>
              . Depending on your location, you may have the right to access, correct, export or delete your
              personal information, and to object to certain processing.
            </p>
          </LegalSection>

          <LegalSection title="7. Cookies">
            <p>
              The storefront review widget uses a minimal, first-party, anonymous identifier stored in local
              storage — used only to remember a visitor&apos;s own helpful-vote choices on reviews. It does not
              track visitors across other websites.
            </p>
          </LegalSection>

          <LegalSection title="8. Children's privacy">
            <p>
              Imagyn Reviews is not directed at children, and we do not knowingly collect personal information
              from anyone under 16.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to this policy">
            <p>
              We may update this policy as the app evolves. Material changes will be reflected by updating the
              &quot;Last updated&quot; date above.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact">
            <p>
              Questions about this policy or your data can be sent to{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-accent underline-offset-4 hover:underline">
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="flex flex-col gap-3 text-muted-foreground">{children}</div>
    </div>
  );
}
