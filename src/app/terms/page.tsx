import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of Imagyn Reviews on your Shopify store.",
  path: "/terms",
});

const LAST_UPDATED = "July 28, 2026";

export default function TermsPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <h1 className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tracking-[-0.03em] text-foreground">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

        <div className="mt-12 flex flex-col gap-10 text-[15px] leading-relaxed text-muted-foreground">
          <LegalSection title="1. Agreement">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of Imagyn Reviews (the
              &quot;App&quot;), provided by Imagyn Studios (&quot;we,&quot; &quot;us&quot;). By installing the
              App on your Shopify store, you agree to these Terms. If you don&apos;t agree, don&apos;t install
              or continue using the App.
            </p>
          </LegalSection>

          <LegalSection title="2. The service">
            <p>
              Imagyn Reviews lets you collect, moderate and display customer reviews on your Shopify storefront,
              along with related features such as AI-generated review summaries, review request emails and
              customizable widgets, as described on our{" "}
              <a href="/features" className="font-medium text-accent underline-offset-4 hover:underline">
                Features
              </a>{" "}
              page and made available according to your selected plan.
            </p>
          </LegalSection>

          <LegalSection title="3. Accounts and eligibility">
            <p>
              You must have an active Shopify store and the authority to install apps on it. You&apos;re
              responsible for the accuracy of information you provide and for actions taken under your store&apos;s
              installation of the App.
            </p>
          </LegalSection>

          <LegalSection title="4. Subscription plans and billing">
            <p>
              The App offers a free Starter plan and paid Growth and Pro plans, billed monthly through
              Shopify&apos;s billing system as described on our{" "}
              <a href="/pricing" className="font-medium text-accent underline-offset-4 hover:underline">
                Pricing
              </a>{" "}
              page. Paid plans may include a free trial period; you can cancel or change plans at any time from
              the App&apos;s Billing page, effective immediately. Fees are non-refundable except where required
              by law.
            </p>
          </LegalSection>

          <LegalSection title="5. Acceptable use">
            <p>You agree not to use the App to:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Submit, request or publish reviews you know to be fake, incentivized without disclosure, or written for a product never purchased or used.</li>
              <li>Upload content that is unlawful, infringing, defamatory or that violates a third party&apos;s rights.</li>
              <li>Attempt to circumvent moderation, rate limits, or security controls.</li>
              <li>Reverse-engineer or resell the App or its underlying code.</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Merchant responsibilities">
            <p>
              As the merchant, you&apos;re responsible for moderating reviews on your store, for how you use
              customer data collected through the App, and for complying with applicable consumer-protection and
              review-authenticity laws in your jurisdiction (for example, disclosure requirements around
              incentivized reviews).
            </p>
          </LegalSection>

          <LegalSection title="7. Intellectual property">
            <p>
              We own the App and all associated software, design and trademarks. You retain ownership of your
              store&apos;s content and the reviews your customers submit; you grant us a limited license to
              process and display that content solely to provide the App&apos;s functionality to you.
            </p>
          </LegalSection>

          <LegalSection title="8. Service availability">
            <p>
              We aim for high availability but don&apos;t guarantee the App will be uninterrupted or error-free.
              We may modify, suspend or discontinue features with reasonable notice where practical.
            </p>
          </LegalSection>

          <LegalSection title="9. Disclaimer and limitation of liability">
            <p>
              The App is provided &quot;as is&quot; without warranties of any kind, express or implied. To the
              maximum extent permitted by law, Imagyn Studios will not be liable for indirect, incidental or
              consequential damages arising from your use of the App, and our total liability for any claim is
              limited to the amount you paid us in the twelve months preceding the claim.
            </p>
          </LegalSection>

          <LegalSection title="10. Termination">
            <p>
              You may uninstall the App at any time from your Shopify admin. We may suspend or terminate access
              if you materially breach these Terms. Upon uninstallation, your store data is deleted according to
              our{" "}
              <a href="/privacy" className="font-medium text-accent underline-offset-4 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="11. Changes to these terms">
            <p>
              We may update these Terms from time to time. Continued use of the App after an update constitutes
              acceptance of the revised Terms.
            </p>
          </LegalSection>

          <LegalSection title="12. Contact">
            <p>
              Questions about these Terms can be sent to{" "}
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
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
