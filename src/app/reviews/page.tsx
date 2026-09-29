import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CardGrid, ReviewCard } from "@/components/discovery/cards";
import { DiscoveryControls } from "@/components/discovery/DiscoveryControls";
import { EmptyState } from "@/components/discovery/primitives";
import { getDiscover, getReviews, formatCount, plural, type ReviewSort } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Browse customer reviews",
  description:
    "Real, published customer reviews from stores using Imagyn Reviews — filter by verified purchases, photos, rating, category and store.",
  alternates: { canonical: `${siteConfig.url}/reviews` },
  openGraph: { images: [OG_IMAGE] },
};

export const revalidate = 60;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function one(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// The network's primary discovery surface. Reviews are the unit here because they are what
// this network actually has depth in today — and because a customer's own words are the thing
// a shopper came to read. Product and store are always one click away from every card.
export default async function ReviewsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const [discover, page] = await Promise.all([
    getDiscover(),
    getReviews({
      verified: one(params.verified) === "true",
      withPhotos: one(params.withPhotos) === "true",
      withVideo: one(params.withVideo) === "true",
      rating: one(params.rating) ? Number(one(params.rating)) : undefined,
      category: one(params.category),
      store: one(params.store),
      sort: (one(params.sort) as ReviewSort) || undefined,
      cursor: one(params.cursor),
    }),
  ]);

  const reviews = page?.reviews ?? [];
  const hasFilters = ["verified", "withPhotos", "withVideo", "rating", "category", "store"].some((k) => one(params[k]));

  return (
    <Container as="main" className="py-8 md:py-12">
      <header className="mb-6 max-w-[62ch]">
        <h1 className="text-hero font-semibold leading-[1.05] tracking-[-0.04em]">Browse real customer reviews</h1>
        {discover ? (
          // A live, literal description of the network. True at 77 reviews and true at 77
          // million — never a rounded-up or aspirational figure.
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {formatCount(discover.stats.reviews)} published {plural(discover.stats.reviews, "review", "reviews")} —{" "}
            {formatCount(discover.stats.verifiedReviews)} verified against a real order — across{" "}
            {formatCount(discover.stats.reviewedProducts)} {plural(discover.stats.reviewedProducts, "product", "products")} from{" "}
            {formatCount(discover.stats.stores)} {plural(discover.stats.stores, "store", "stores")}.
          </p>
        ) : null}
      </header>

      <DiscoveryControls mode="reviews" facets={discover?.facets} total={page?.total} />

      <div className="mt-6">
        {reviews.length > 0 ? (
          <>
            <h2 className="sr-only">Review results</h2>
            <CardGrid>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </CardGrid>

            {page?.hasMore && page.nextCursor ? (
              <div className="mt-8 flex justify-center">
                <Link
                  href={{ pathname: "/reviews", query: { ...params, cursor: page.nextCursor } }}
                  className="rounded-full border border-border bg-surface px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-foreground/25"
                >
                  Load more reviews
                </Link>
              </div>
            ) : null}
          </>
        ) : hasFilters ? (
          <EmptyState
            title="No reviews match those filters"
            body="Nothing published fits this combination yet. Clearing a filter or two will widen the results."
            action={
              <Link href="/reviews" className="text-[13px] font-medium underline underline-offset-4">
                Clear filters
              </Link>
            }
          />
        ) : (
          <EmptyState
            title="No published reviews yet"
            body="As stores using Imagyn Reviews publish customer reviews, they appear here. Nothing on this page is ever placeholder content."
          />
        )}
      </div>
    </Container>
  );
}
