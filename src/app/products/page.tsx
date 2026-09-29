import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CardGrid, CategoryChip, ProductCard } from "@/components/discovery/cards";
import { DiscoveryControls } from "@/components/discovery/DiscoveryControls";
import { EmptyState } from "@/components/discovery/primitives";
import { formatCount, getDiscover, getProducts, plural } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products with customer reviews",
  description:
    "Products that carry real, published customer reviews — ranked by how much customers have actually said about them.",
  alternates: { canonical: `${siteConfig.url}/products` },
  openGraph: { images: [OG_IMAGE] },
};

export const revalidate = 60;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// Product discovery is first-class in the architecture, but honest about its own depth: only
// products that genuinely carry approved reviews are listed. The merchant's full catalogue is
// far larger; a product nobody has reviewed has nothing for a shopper to read here, and
// padding this grid with them would be presenting unreviewed products as reviewed.
export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [discover, data] = await Promise.all([
    getDiscover(),
    getProducts({ category: one(params.category), store: one(params.store), limit: 48 }),
  ]);

  const products = data?.products ?? [];
  const categories = discover?.facets.categories ?? [];

  return (
    <Container as="main" className="py-8 md:py-12">
      <header className="mb-6 max-w-[62ch]">
        <h1 className="text-hero font-semibold leading-[1.05] tracking-[-0.04em]">Products people have reviewed</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {products.length > 0
            ? `${formatCount(products.length)} ${plural(products.length, "product", "products")} with published customer reviews. Every rating here is calculated from reviews you can read.`
            : "Products appear here once customers have published reviews of them."}
        </p>
      </header>

      {categories.length > 1 ? (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {categories.map((facet) => (
            <CategoryChip
              key={facet.value}
              label={facet.label}
              count={facet.count}
              href={`/products?category=${encodeURIComponent(facet.value)}`}
            />
          ))}
        </div>
      ) : null}

      <DiscoveryControls mode="products" facets={discover?.facets} total={products.length} showSort={false} />

      <div className="mt-6">
        {products.length > 0 ? (
          <>
            <h2 className="sr-only">Product results</h2>
            <CardGrid density="tight">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </CardGrid>
          </>
        ) : (
          <EmptyState
            title="No reviewed products match this view"
            body="Only products with published customer reviews are listed here, so this stays empty until a review lands."
          />
        )}
      </div>
    </Container>
  );
}
