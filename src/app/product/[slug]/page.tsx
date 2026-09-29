import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { CardGrid, ProductCard, ReviewCard } from "@/components/discovery/cards";
import { EmptyState, MetaPill, RatingBars, RatingSummary, SectionBar } from "@/components/discovery/primitives";
import { formatBrand, formatCount, formatRating, getProduct, plural } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) return { title: "Product not found" };

  const { product } = data;
  return {
    title: `${product.name} reviews`,
    description: `${formatRating(product.averageRating)} out of 5 from ${formatCount(product.reviewCount)} published customer ${plural(product.reviewCount, "review", "reviews")} of ${product.name} at ${product.store.name}.`,
    alternates: { canonical: `${siteConfig.url}/product/${product.slug}` },
    openGraph: {
      title: `${product.name} reviews`,
      type: "website",
      url: `${siteConfig.url}/product/${product.slug}`,
      images: product.image ? [product.image] : [OG_IMAGE],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) notFound();

  const { product, reviews, related } = data;
  const brand = formatBrand(product.brand);

  // AggregateRating is emitted only because this page displays the same real, countable
  // reviews it describes — Google requires the marked-up rating to be visible on the page,
  // and every number below comes from approved reviews the reader can actually scroll to.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.image ? { image: product.image } : {}),
    ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
    ...(product.description ? { description: product.description } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.reviews.slice(0, 10).map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.reviewerName },
      datePublished: review.createdAt,
      ...(review.title ? { name: review.title } : {}),
      reviewBody: review.content,
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5, worstRating: 1 },
    })),
  };

  return (
    <Container as="main" className="py-8 md:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground">
        <Link href="/products" className="transition-colors hover:text-foreground">Products</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/store/${product.store.slug}`} className="transition-colors hover:text-foreground">{product.store.name}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-accent-soft">
            {product.image ? (
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 320px" className="object-cover" priority />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[48px] font-semibold text-muted-foreground/50" aria-hidden="true">
                {product.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.category ? <MetaPill href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</MetaPill> : null}
            {brand ? <MetaPill>{brand}</MetaPill> : null}
          </div>
        </div>

        <div className="min-w-0">
          <h1 className="text-panel font-semibold leading-[1.1] tracking-[-0.035em]">{product.name}</h1>

          <div className="mt-4">
            <RatingSummary rating={product.averageRating} count={product.reviewCount} size="lg" />
          </div>

          <p className="mt-2 text-[13px] text-muted-foreground">
            Sold by{" "}
            <Link href={`/store/${product.store.slug}`} className="font-medium text-foreground underline-offset-4 hover:underline">
              {product.store.name}
            </Link>
            {product.verifiedCount > 0 ? (
              <> · <span className="font-medium text-lime">{formatCount(product.verifiedCount)} verified {plural(product.verifiedCount, "purchase", "purchases")}</span></>
            ) : null}
          </p>

          {product.aiSummary ? (
            <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What customers say</h2>
              <p className="mt-2 text-[14px] leading-relaxed">{product.aiSummary.summary}</p>
              {product.aiSummary.recommendation ? (
                <p className="mt-2 text-[13px] text-muted-foreground">{product.aiSummary.recommendation}</p>
              ) : null}
              <p className="mt-3 text-[11px] text-muted-foreground">
                Summarised by Imagyn AI from this product&rsquo;s published reviews.
              </p>
            </section>
          ) : null}

          {product.reviewCount > 0 ? (
            <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Rating breakdown</h2>
              <RatingBars counts={product.ratingCounts} total={product.reviewCount} />
            </section>
          ) : null}

          <section className="mt-10">
            <SectionBar title="Reviews" count={reviews.total} />
            {reviews.reviews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showProduct={false} />
                ))}
              </div>
            ) : (
              <EmptyState title="No reviews yet" body="This product has no published reviews." />
            )}
          </section>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <SectionBar title="More reviewed products" href="/products" />
          <CardGrid density="tight">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </CardGrid>
        </section>
      ) : null}
    </Container>
  );
}
