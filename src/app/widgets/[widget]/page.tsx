import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ClosingCTA } from "@/components/ClosingCTA";
import { JsonLd } from "@/components/JsonLd";
import { WIDGET_SURFACES, getWidgetSurface } from "@/lib/widgetSurfaces";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  return WIDGET_SURFACES.map((widget) => ({ widget: widget.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ widget: string }> }): Promise<Metadata> {
  const { widget: slug } = await params;
  const widget = getWidgetSurface(slug);
  if (!widget) {
    return pageMetadata({ title: "Widget", description: "", path: `/widgets/${slug}` });
  }
  return pageMetadata({
    title: widget.name,
    description: `${widget.summary} A real Shopify theme app block, styled through Brand Studio.`,
    path: `/widgets/${widget.slug}`,
  });
}

export default async function WidgetSurfacePage({ params }: { params: Promise<{ widget: string }> }) {
  const { widget: slug } = await params;
  const widget = getWidgetSurface(slug);
  if (!widget) {
    notFound();
  }

  const otherWidgets = WIDGET_SURFACES.filter((w) => w.slug !== widget.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Widgets", path: "/widgets" },
          { name: widget.name, path: `/widgets/${widget.slug}` },
        ])}
      />
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <span className="text-xs font-semibold tracking-[0.02em] text-accent">Widgets</span>
          <h1 className="mt-4 text-hero font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            {widget.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{widget.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href={siteConfig.appStoreUrl} size="lg">
              Get Started
            </Button>
            <Button href="/widgets" variant="secondary" size="lg">
              See every widget
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="Where it appears" title={widget.placement} align="left" />
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="What it does" title="Built to be real, not a placeholder." align="left" />
          <ul className="mt-10 flex max-w-2xl flex-col gap-4">
            {widget.capabilities.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Other widgets</p>
          <div className="flex flex-wrap gap-6">
            {otherWidgets.map((other) => (
              <Link
                key={other.slug}
                href={`/widgets/${other.slug}`}
                className="text-[15px] font-medium text-foreground hover:text-accent"
              >
                {other.name} →
              </Link>
            ))}
            <Link href="/brand-studio" className="text-[15px] font-medium text-foreground hover:text-accent">
              Brand Studio →
            </Link>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Add it to your store in minutes." />
    </>
  );
}
