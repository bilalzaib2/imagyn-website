import { Container } from "./Container";
import { Logo } from "./Logo";
import { FOOTER_LINKS, siteConfig } from "@/lib/constants";

// Dark (forest), large and multi column, matching the visual weight a mature review
// platform's footer carries — every column here is a real, built destination (see
// constants.ts's own comment on FOOTER_LINKS). No "Consumers" or "Changelog" column: neither
// exists yet, and a footer link to a page that does not exist is exactly the kind of dead
// link this whole redesign has been careful to avoid.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest">
      <Container className="py-16 md:py-20">
        {/* Company + Legal merged into one column (was five link columns, now four): both
            are short, both are "about the business" rather than "about the product," and
            the merge is what actually reads as designed instead of a sitemap dumped into
            the page. Every link below is unchanged, still crawlable, nothing removed. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 pr-6">
            <Logo variant="light" />
            <p className="max-w-[26ch] text-[14.5px] leading-relaxed text-sage">{siteConfig.description}</p>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Solutions" links={FOOTER_LINKS.solutions} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company}>
            <div className="mt-5 flex flex-col gap-2.5 border-t border-forest-border pt-5">
              {FOOTER_LINKS.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-sage/70 transition-colors hover:text-sage focus-visible:outline-lime"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-forest-border pt-8 text-[13px] text-sage/70 md:flex-row md:items-center">
          <p>© {year} {siteConfig.name}. Built for modern Shopify brands.</p>
          <p>Made by Imagyn Studios</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  children,
}: {
  title: string;
  links: { label: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold tracking-[0.01em] text-white">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[14px] text-sage transition-colors hover:text-white focus-visible:outline-lime"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
