import Link from "next/link";
import { SafeImage } from "./SafeImage";
import type { ProductSummary, Review, StoreSummary } from "@/lib/discovery";
import { formatBrand, formatCount, formatDate, formatRating, plural } from "@/lib/discovery";
import { ImportedBadge, MetaPill, RatingSummary, Stars, VerifiedBadge } from "./primitives";

// The three entity cards the whole network is browsed through. They share one shell — white
// surface, hairline border, same radius and hover lift — so a mixed grid reads as one system,
// while each keeps the shape its own content actually needs.
//
// Every field rendered here comes from the API and is shown only when genuinely present. No
// card invents a rating, a count, a title or a photo, and none of them renders a placeholder
// image: a product with no image gets a typographic tile instead of a grey box pretending to
// be a photo.

const CARD_SHELL =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Stands in for a missing product photo. A quiet monogram on the brand's own surface — it
 *  reads as "no image" rather than as a broken or loading one. */
function ImageFallback({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center bg-accent-soft text-[22px] font-semibold tracking-[-0.03em] text-muted-foreground/60 ${className}`}
      aria-hidden="true"
    >
      {name.trim().charAt(0).toUpperCase() || "·"}
    </span>
  );
}

// ---------------------------------------------------------------- Review

/** The primary unit of discovery. Leads with the customer's own words; the product it is
 *  about is a real link, so a reader can always move Review → Product → Store. */
export function ReviewCard({ review, showProduct = true }: { review: Review; showProduct?: boolean }) {
  const photos = review.media.filter((m) => String(m.type).toLowerCase() === "image");
  const brand = formatBrand(review.product.brand);

  return (
    <article className={CARD_SHELL}>
      {photos.length > 0 ? (
        <Link
          href={`/review/${review.id}`}
          className="relative block aspect-[4/3] overflow-hidden bg-accent-soft"
          aria-label={`Photos from ${review.reviewerName}'s review`}
        >
          <SafeImage
            src={photos[0].thumbnailUrl || photos[0].url}
            alt=""
            fill
            fallbackLabel={review.product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {photos.length > 1 ? (
            <span className="absolute bottom-2 right-2 rounded-full bg-foreground/80 px-2 py-[2px] text-[10px] font-medium text-background backdrop-blur-sm">
              +{photos.length - 1}
            </span>
          ) : null}
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Stars value={review.rating} size={12} />
          {review.verified ? <VerifiedBadge compact /> : null}
          {review.importedFrom ? <ImportedBadge source={review.importedFrom} /> : null}
        </div>

        {review.title ? (
          <h3 className="text-[14px] font-semibold leading-snug tracking-[-0.01em]">
            <Link href={`/review/${review.id}`} className="after:absolute after:inset-0">
              {review.title}
            </Link>
          </h3>
        ) : null}

        <p className={`text-[13px] leading-relaxed text-muted-foreground ${review.title ? "line-clamp-3" : "line-clamp-4"}`}>
          {review.title ? review.content : <Link href={`/review/${review.id}`} className="after:absolute after:inset-0">{review.content}</Link>}
        </p>

        {review.reply ? (
          <p className="border-l-2 border-border pl-2.5 text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
            <span className="font-semibold text-foreground">Store replied</span> {review.reply.body}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">{review.reviewerName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={review.createdAt}>{formatDate(review.createdAt)}</time>
          {review.helpfulCount > 0 ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {formatCount(review.helpfulCount)} found helpful
              </span>
            </>
          ) : null}
        </div>

        {showProduct ? (
          // Relative + z-10 so this stays clickable above the card's own full-bleed link.
          <div className="relative z-10 flex items-center gap-2.5 border-t border-border pt-3">
            {review.product.image ? (
              <span className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                <SafeImage
                  src={review.product.image}
                  alt=""
                  width={32}
                  height={32}
                  fallbackLabel={review.product.name}
                  className="h-8 w-8 object-cover"
                />
              </span>
            ) : (
              <ImageFallback name={review.product.name} className="h-8 w-8 shrink-0 rounded-md text-[13px]" />
            )}
            <span className="min-w-0 flex-1">
              <Link
                href={`/product/${review.product.slug}`}
                className="block truncate text-[12px] font-medium transition-colors hover:text-lime"
              >
                {review.product.name}
              </Link>
              <Link
                href={`/store/${review.store.slug}`}
                className="block truncate text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {brand && brand !== review.store.name ? `${brand} · ` : ""}
                {review.store.name}
              </Link>
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------- Product

export function ProductCard({ product }: { product: ProductSummary }) {
  const brand = formatBrand(product.brand);

  return (
    <article className={CARD_SHELL}>
      <div className="relative aspect-square overflow-hidden bg-accent-soft">
        {product.image ? (
          <SafeImage
            src={product.image}
            alt=""
            fill
            fallbackLabel={product.name}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <ImageFallback name={product.name} className="h-full w-full text-[34px]" />
        )}
        {product.verifiedCount > 0 ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-[3px] text-[10px] font-semibold text-lime backdrop-blur-sm">
            {formatCount(product.verifiedCount)} verified
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-[14px] font-semibold leading-snug tracking-[-0.01em] line-clamp-2">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Stars value={product.averageRating} size={12} />
          <span className="text-[12px] font-semibold tabular-nums">{formatRating(product.averageRating)}</span>
          <span className="text-[12px] text-muted-foreground">
            {formatCount(product.reviewCount)} {plural(product.reviewCount, "review", "reviews")}
          </span>
        </div>

        <p className="mt-auto truncate pt-1 text-[11px] text-muted-foreground">
          {brand ? `${brand} · ` : ""}
          {product.store.name}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------- Store

export function StoreCard({ store }: { store: StoreSummary }) {
  return (
    <article className={`${CARD_SHELL} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em]">
            <Link href={`/store/${store.slug}`} className="after:absolute after:inset-0">
              {store.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {formatCount(store.productCount)} reviewed {plural(store.productCount, "product", "products")}
          </p>
        </div>
        <ImageFallback name={store.name} className="h-10 w-10 shrink-0 rounded-xl text-[16px]" />
      </div>

      <div className="mt-4">
        <RatingSummary rating={store.averageRating} count={store.reviewCount} />
      </div>

      {store.verifiedCount > 0 ? (
        <p className="mt-2.5 text-[11px] font-medium text-lime">
          {formatCount(store.verifiedCount)} verified {plural(store.verifiedCount, "purchase", "purchases")}
        </p>
      ) : null}
    </article>
  );
}

// ---------------------------------------------------------------- Grids

/** One grid rhythm for the whole network, so a review grid and a product grid never look like
 *  two different products. Columns step with the viewport rather than being fixed. */
export function CardGrid({
  children,
  density = "standard",
}: {
  children: React.ReactNode;
  density?: "standard" | "tight";
}) {
  return (
    <div
      className={
        density === "tight"
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {children}
    </div>
  );
}

export function CategoryChip({ label, count, href }: { label: string; count: number; href: string }) {
  return (
    <MetaPill href={href}>
      {label}
      <span className="ml-1.5 tabular-nums opacity-60">{formatCount(count)}</span>
    </MetaPill>
  );
}
