import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CardGrid, ProductCard, ReviewCard, StoreCard } from "@/components/discovery/cards";
import { EmptyState, SectionBar } from "@/components/discovery/primitives";
import { SearchInput } from "@/components/discovery/SearchInput";
import { search } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search",
  description: "Search products, stores and customer reviews across the Imagyn Reviews network.",
  // A search results page carries no unique content of its own and must not compete with the
  // real entity pages in the index.
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteConfig.url}/search` },
  openGraph: { images: [OG_IMAGE] },
};

export const revalidate = 60;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// One query across all three entities, because a shopper searching "creatine" may be looking
// for the product, the store that sells it, or what someone said about it.
export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (one(params.q) ?? "").trim();
  const results = query.length >= 2 ? await search(query) : null;

  const totals = results ? results.products.length + results.stores.length + results.reviews.length : 0;

  return (
    <Container as="main" className="py-8 md:py-12">
      <div className="mx-auto max-w-[680px]">
        <h1 className="text-panel font-semibold leading-[1.1] tracking-[-0.035em]">Search</h1>
        <div className="mt-5">
          <SearchInput initialQuery={query} size="lg" autoFocus={!query} />
        </div>
      </div>

      {query.length < 2 ? (
        <div className="mt-10">
          <EmptyState
            title="Search the network"
            body="Find a product, a store, or something a customer actually said. Enter at least two characters."
          />
        </div>
      ) : totals === 0 ? (
        <div className="mt-10">
          <EmptyState
            title={`Nothing matches “${query}”`}
            body="No product, store or published review matches that yet. Browsing the full review feed may be a faster way in."
            action={
              <Link href="/reviews" className="text-[13px] font-medium underline underline-offset-4">
                Browse all reviews
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-12">
          {results!.products.length > 0 ? (
            <section>
              <SectionBar title="Products" count={results!.products.length} href="/products" />
              <CardGrid density="tight">
                {results!.products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </CardGrid>
            </section>
          ) : null}

          {results!.stores.length > 0 ? (
            <section>
              <SectionBar title="Stores" count={results!.stores.length} href="/stores" />
              <CardGrid>
                {results!.stores.map((store) => (
                  <StoreCard key={store.slug} store={store} />
                ))}
              </CardGrid>
            </section>
          ) : null}

          {results!.reviews.length > 0 ? (
            <section>
              <SectionBar title="Reviews" count={results!.reviews.length} href="/reviews" />
              <CardGrid>
                {results!.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </CardGrid>
            </section>
          ) : null}
        </div>
      )}
    </Container>
  );
}
