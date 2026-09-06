import { Container } from "./Container";
import { Logo } from "./Logo";
import { FOOTER_LINKS, siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
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
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-[15px] text-muted-foreground hover:text-foreground">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
