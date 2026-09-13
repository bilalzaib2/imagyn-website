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
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-sage">{siteConfig.description}</p>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Solutions" links={FOOTER_LINKS.solutions} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-forest-border pt-8 text-sm text-sage md:flex-row md:items-center">
          <p>
            © {year} {siteConfig.name}. Built for modern Shopify brands.
          </p>
          <p>Made by Imagyn Studios</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[15px] font-medium text-sage transition-colors hover:text-white focus-visible:outline-lime"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
