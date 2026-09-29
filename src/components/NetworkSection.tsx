import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { ReviewCard } from "./discovery/cards";
import { getDiscover, getReviews, formatCount, plural } from "@/lib/discovery";

// The one thing Imagyn does that a storefront-only review app cannot: a published review
// also becomes part of a public, browsable network at /discover. This section is the
// marketing site's proof of that, and it proves it the only honest way — by rendering real,
// live reviews straight from the public API rather than describing the idea in copy.
//
// Deliberate restraint on numbers. The network is genuinely young, so there is no big stat
// block here: inflating it would be a lie, and a giant "19 reviews" would be a worse
// argument than the reviews themselves. The count appears once, small and factual, and the
// case is carried by real customer content a visitor can click through and verify.
//
// If the API is unavailable the section renders nothing at all rather than a skeleton or a
// placeholder grid — a marketing page that fabricates review cards when its own data layer
// is down would undermine the exact claim it is making.
/** Minimum characters for a review to carry a showcase card. A 15-character review is a
 *  real review and belongs on /discover, but it gives a large card nothing to say. */
const MIN_SHOWCASE_LENGTH = 60;

export async function NetworkSection() {
  // Two neutral, presentational criteria: the review has a customer photo, and enough text
  // to fill a card. Both are about whether a card reads well, and neither looks at rating or
  // sentiment — the showcase is not filtered to flattering reviews, and the network's real
  // distribution stays visible in full on /discover.
  const [data, showcase] = await Promise.all([
    getDiscover(),
    getReviews({ withPhotos: true, sort: "helpful", limit: 12 }),
  ]);

  const reviews = (showcase?.reviews ?? [])
    .filter((review) => review.content.trim().length >= MIN_SHOWCASE_LENGTH)
    .slice(0, 3);

  if (!data || reviews.length === 0) return null;

  const { reviews: reviewCount, stores: storeCount } = data.stats;

  return (
    <section className="border-t border-border py-[var(--section-y)]">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <Eyebrow>The network</Eyebrow>
          <h2 className="max-w-[34ch] text-section font-semibold leading-[1.1] tracking-[-0.035em] text-foreground">
            A review on your store becomes a review people can find.
          </h2>
          <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Every other Shopify review app stops at your product page. Imagyn publishes each
            approved review twice, once on your storefront and once on a public discovery
            network, so the trust your customers write for you keeps working where new
            customers are still looking.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href="/discover" variant="primary">
              Browse the network
            </Button>
            <Link
              href="/public-review-site"
              className="text-[14.5px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              How publishing works
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Stated plainly and small. These are live figures from the public API, not a
            growth claim, and they update on their own as the network grows. */}
        <p className="text-[13px] text-muted-foreground">
          Live now: {formatCount(reviewCount)} published {plural(reviewCount, "review", "reviews")} across{" "}
          {formatCount(storeCount)} {plural(storeCount, "store", "stores")}.{" "}
          <Link href="/discover" className="underline underline-offset-4 transition-colors hover:text-foreground">
            See everything
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
