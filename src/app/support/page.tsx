import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description: "Get help with Imagyn Reviews — email support, common questions, and where to find setup guides.",
  path: "/support",
});

const FAQS = [
  {
    q: "How long does it take to hear back?",
    a: "We reply to every support email within one business day, usually much sooner.",
  },
  {
    q: "A review isn't showing up on my storefront — why?",
    a: "Check its status on the Reviews page first. Only Approved reviews display publicly; new reviews may be held by your Moderation Rules until you review them.",
  },
  {
    q: "Can you help me set up widgets in my theme?",
    a: "Yes — send us your store URL and which page you're trying to add a widget to, and we'll walk you through it.",
  },
  {
    q: "I found a bug. What should I include in my report?",
    a: "Your store's .myshopify.com domain, the page you were on, and what you expected to happen versus what actually happened. Screenshots help a lot.",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <Container>
          <SectionHeading
            eyebrow="Support"
            title="We're here to help."
            description="Reach out any time — a real person reads every message."
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <SupportCard
              title="Email support"
              description="The fastest way to reach us for setup help, billing questions or bug reports."
              action={{ label: siteConfig.supportEmail, href: `mailto:${siteConfig.supportEmail}` }}
            />
            <SupportCard
              title="Documentation"
              description="Step-by-step guides for installation, widgets, moderation rules and more."
              action={{ label: "Browse docs", href: "/docs" }}
            />
            <SupportCard
              title="Contact form"
              description="Prefer a form? Send us a message and we'll get back to you by email."
              action={{ label: "Contact us", href: "/contact" }}
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Common questions" title="Frequently asked questions" align="left" />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {FAQS.map((item) => (
              <div key={item.q} className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function SupportCard({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border p-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Button href={action.href} variant="secondary" size="md" className="mt-auto w-fit">
        {action.label}
      </Button>
    </div>
  );
}
