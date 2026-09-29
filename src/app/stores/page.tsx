import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CardGrid, StoreCard } from "@/components/discovery/cards";
import { DiscoveryControls } from "@/components/discovery/DiscoveryControls";
import { EmptyState } from "@/components/discovery/primitives";
import { formatCount, getStores, plural } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stores on Imagyn Reviews",
  description: "Stores collecting verified customer reviews with Imagyn Reviews, and what their customers actually say.",
  alternates: { canonical: `${siteConfig.url}/stores` },
  openGraph: { images: [OG_IMAGE] },
};

export const revalidate = 60;

// A store joins this list by having published reviews — which is also what keeps empty and
// test installs out of it without anyone maintaining a blocklist.
export default async function StoresPage() {
  const data = await getStores(48);
  const stores = data?.stores ?? [];

  return (
    <Container as="main" className="py-8 md:py-12">
      <header className="mb-6 max-w-[62ch]">
        <h1 className="text-hero font-semibold leading-[1.05] tracking-[-0.04em]">Stores and their reputations</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {stores.length > 0
            ? `${formatCount(stores.length)} ${plural(stores.length, "store", "stores")} with published customer reviews. Ratings are calculated from every approved review, not a selected few.`
            : "Stores appear here once their customers have published reviews."}
        </p>
      </header>

      <DiscoveryControls mode="stores" total={stores.length} showSort={false} />

      <div className="mt-6">
        {stores.length > 0 ? (
          <>
            <h2 className="sr-only">Store results</h2>
            <CardGrid>
              {stores.map((store) => (
                <StoreCard key={store.slug} store={store} />
              ))}
            </CardGrid>
          </>
        ) : (
          <EmptyState title="No stores yet" body="A store appears here as soon as it publishes its first customer review." />
        )}
      </div>
    </Container>
  );
}
