import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { CardGrid, ProductCard, ReviewCard } from "@/components/discovery/cards";
import { EmptyState, RatingBars, RatingSummary, SectionBar } from "@/components/discovery/primitives";
import { formatCount, formatRating, getStore, plural } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getStore(slug);
  if (!data) return { title: "Store not found" };

  const { store } = data;
  return {
    title: `${store.name} reviews`,
    description: `${formatRating(store.averageRating)} out of 5 from ${formatCount(store.reviewCount)} published customer ${plural(store.reviewCount, "review", "reviews")} of ${store.name}.`,
    alternates: { canonical: `${siteConfig.url}/store/${store.slug}` },
    openGraph: { images: [OG_IMAGE] },
  };
}

export default async function StorePage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getStore(slug);
  if (!data) notFound();

  const { store, reviews, products } = data;

  // Organization rather than LocalBusiness: this describes a merchant on the network, and
  // nothing here asserts a physical location. The aggregate rating is the same one displayed.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: store.name,
    url: `${siteConfig.url}/store/${store.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: store.averageRating,
      reviewCount: store.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <Container as="main" className="py-8 md:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <Link href="/stores" className="transition-colors hover:text-foreground">Stores</Link>
      </nav>

      <header className="grid gap-6 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)] md:p-8">
        <div>
          <h1 className="text-section font-semibold leading-[1.05] tracking-[-0.04em]">{store.name}</h1>
          <div className="mt-4">
            <RatingSummary rating={store.averageRating} count={store.reviewCount} size="lg" />
          </div>
          <p className="mt-3 max-w-[54ch] text-[13px] leading-relaxed text-muted-foreground">
            Calculated from every published review of this store — {formatCount(store.verifiedCount)} of them verified against a
            real order — across {formatCount(store.productCount)} reviewed {plural(store.productCount, "product", "products")}.
          </p>
        </div>

        {store.reviewCount > 0 ? (
          <div className="md:border-l md:border-border md:pl-8">
            <RatingBars counts={store.ratingCounts} total={store.reviewCount} />
          </div>
        ) : null}
      </header>

      {store.aiSummary ? (
        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What customers say</h2>
          <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed">{store.aiSummary.summary}</p>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Summarised by Imagyn AI from {formatCount(store.aiSummary.reviewCountUsed)} published{" "}
            {plural(store.aiSummary.reviewCountUsed, "review", "reviews")}.
          </p>
        </section>
      ) : null}

      {products.length > 0 ? (
        <section className="mt-12">
          <SectionBar title="Reviewed products" count={products.length} />
          <CardGrid density="tight">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </CardGrid>
        </section>
      ) : null}

      <section className="mt-12">
        <SectionBar title="Recent reviews" count={reviews.total} href={`/reviews?store=${encodeURIComponent(store.slug)}`} />
        {reviews.reviews.length > 0 ? (
          <CardGrid>
            {reviews.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </CardGrid>
        ) : (
          <EmptyState title="No published reviews" body="This store has no approved reviews yet." />
        )}
      </section>
    </Container>
  );
}
