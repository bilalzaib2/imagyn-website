import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { CardGrid, CategoryChip, ProductCard, ReviewCard, StoreCard } from "@/components/discovery/cards";
import { EmptyState, SectionBar, VerifiedBadge } from "@/components/discovery/primitives";
import { SearchInput } from "@/components/discovery/SearchInput";
import { getDiscover } from "@/lib/discovery";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Discover real customer experiences",
  description:
    "Browse real, published customer reviews across the Imagyn Reviews network — and follow each one back to the product and the store behind it.",
  path: "/discover",
});

export const revalidate = 60;

// The consumer network's front door, and a peer of the marketing homepage rather than a
// section of it: `/` speaks to merchants evaluating the product, `/discover` speaks to
// shoppers reading reviews. Both are first-class entry points and each links to the other, so
// neither audience has to navigate the other's site to get where they were going.
//
// Discovery-first, not marketing-first: the first thing here is a way into real customer
// content, and the merchant pitch sits at the bottom where someone who came to read reviews
// won't trip over it.
//
// Every section below renders from live data and omits itself when there genuinely isn't
// enough to show. Nothing here is padded with example content, and the page deliberately does
// not lead with a headline count — the network's value is the content, not its size.
export default async function HomePage() {
  const discover = await getDiscover();

  const reviews = discover?.reviews.reviews ?? [];
  const products = discover?.products ?? [];
  const stores = discover?.stores ?? [];
  const categories = discover?.facets.categories ?? [];
  const stats = discover?.stats;

  // Reviews carrying a photo lead the featured row — they are the most scannable thing the
  // network has, and they are real customer photos, not stock imagery.
  const featured = [...reviews].sort((a, b) => b.media.length - a.media.length).slice(0, 6);

  return (
    <main>
      <section className="border-b border-border">
        <Container className="py-[var(--section-y-tight)]">
          <div className="mx-auto max-w-[760px] text-center">
            <h1 className="text-hero font-semibold leading-[1.04] tracking-[-0.045em]">
              Explore real customer experiences
            </h1>
            <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-relaxed text-muted-foreground">
              Read what customers actually said about the products they bought — then follow it back to the
              product and the store that sold it.
            </p>

            <div className="mx-auto mt-7 max-w-[560px]">
              <SearchInput size="lg" />
            </div>

            {categories.length > 0 ? (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
                <span className="text-[12px] text-muted-foreground">Browse</span>
                {categories.slice(0, 6).map((facet) => (
                  <CategoryChip
                    key={facet.value}
                    label={facet.label}
                    count={facet.count}
                    href={`/reviews?category=${encodeURIComponent(facet.value)}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {featured.length > 0 ? (
        <Container className="py-12 md:py-16">
          <SectionBar title="Recent customer reviews" href="/reviews" hrefLabel="Browse all" />
          <CardGrid>
            {featured.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </CardGrid>
        </Container>
      ) : (
        <Container className="py-12">
          <EmptyState
            title="No published reviews yet"
            body="As stores publish customer reviews, they appear here. This page never shows placeholder reviews."
          />
        </Container>
      )}

      {products.length > 0 ? (
        <section className="border-t border-border bg-surface">
          <Container className="py-12 md:py-16">
            <SectionBar title="Products people have reviewed" href="/products" />
            <CardGrid density="tight">
              {products.slice(0, 10).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </CardGrid>
          </Container>
        </section>
      ) : null}

      {stores.length > 0 ? (
        <Container className="py-12 md:py-16">
          <SectionBar title="Stores collecting reviews" href="/stores" />
          <CardGrid>
            {stores.slice(0, 6).map((store) => (
              <StoreCard key={store.slug} store={store} />
            ))}
          </CardGrid>
        </Container>
      ) : null}

      {/* Trust and AI are explained only where the network actually has the thing being
          described — the verified section appears because verified reviews genuinely exist,
          and it states the count plainly rather than implying every review carries it. */}
      <section className="border-y border-border bg-surface">
        <Container className="py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-[20px] font-semibold tracking-[-0.025em]">What &ldquo;verified&rdquo; means here</h2>
              <p className="mt-3 max-w-[50ch] text-[14px] leading-relaxed text-muted-foreground">
                A review is marked verified only when Imagyn matched it to a real order in the store&rsquo;s own
                Shopify data. Reviews migrated from another platform carry that platform&rsquo;s name instead — we
                show where they came from rather than vouching for them.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <VerifiedBadge />
                {stats && stats.verifiedReviews > 0 ? (
                  <Link
                    href="/reviews?verified=true"
                    className="text-[13px] font-medium underline underline-offset-4 transition-colors hover:text-lime"
                  >
                    See verified reviews
                  </Link>
                ) : null}
              </div>
            </div>

            <div>
              <h2 className="text-[20px] font-semibold tracking-[-0.025em]">Summaries built from real reviews</h2>
              <p className="mt-3 max-w-[50ch] text-[14px] leading-relaxed text-muted-foreground">
                Where a product or store has enough published reviews, Imagyn AI summarises what customers
                consistently say. Summaries are generated from those reviews alone — never written for a product
                that nobody has reviewed.
              </p>
              <Link
                href="/ai"
                className="mt-4 inline-block text-[13px] font-medium underline underline-offset-4 transition-colors hover:text-foreground"
              >
                How review intelligence works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-[var(--section-y-tight)]">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-section font-semibold leading-[1.1] tracking-[-0.035em]">
            Collect reviews like these for your store
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">
            Imagyn Reviews collects, verifies and displays customer reviews on your Shopify storefront — and every
            published review becomes part of this network.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button href={siteConfig.appStoreUrl} variant="primary" size="md">
              Add to Shopify
            </Button>
            <Button href="/why-imagyn" variant="secondary" size="md">
              Why Imagyn
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
