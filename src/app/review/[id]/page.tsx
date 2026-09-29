import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { CardGrid, ReviewCard } from "@/components/discovery/cards";
import { ImportedBadge, SectionBar, Stars, VerifiedBadge } from "@/components/discovery/primitives";
import { formatBrand, formatCount, formatDate, getReview } from "@/lib/discovery";
import { siteConfig } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";

export const revalidate = 60;

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const data = await getReview(id);
  if (!data) return { title: "Review not found" };

  const { review } = data;
  const title = review.title || `${review.rating}-star review of ${review.product.name}`;
  return {
    title,
    description: review.content.slice(0, 155),
    alternates: { canonical: `${siteConfig.url}/review/${review.id}` },
    openGraph: { images: [OG_IMAGE] },
  };
}

// The leaf of the network, and deliberately not a dead end: the product, the store, and more
// reviews of the same product are all one click away.
export default async function ReviewPage({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getReview(id);
  if (!data) notFound();

  const { review, related } = data;
  const photos = review.media.filter((m) => String(m.type).toLowerCase() === "image");
  const brand = formatBrand(review.product.brand);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: review.reviewerName },
    datePublished: review.createdAt,
    ...(review.title ? { name: review.title } : {}),
    reviewBody: review.content,
    reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5, worstRating: 1 },
    itemReviewed: { "@type": "Product", name: review.product.name, ...(review.product.image ? { image: review.product.image } : {}) },
  };

  return (
    <Container as="main" className="py-8 md:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground">
        <Link href="/reviews" className="transition-colors hover:text-foreground">Reviews</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/product/${review.product.slug}`} className="transition-colors hover:text-foreground">{review.product.name}</Link>
      </nav>

      <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-12">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Stars value={review.rating} size={17} />
            {review.verified ? <VerifiedBadge /> : null}
            {review.importedFrom ? <ImportedBadge source={review.importedFrom} /> : null}
          </div>

          {review.title ? (
            <h1 className="mt-4 text-panel font-semibold leading-[1.15] tracking-[-0.035em]">{review.title}</h1>
          ) : null}

          <p className="mt-4 whitespace-pre-wrap text-[16px] leading-relaxed">{review.content}</p>

          <p className="mt-5 text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">{review.reviewerName}</span>
            {" · "}
            <time dateTime={review.createdAt}>{formatDate(review.createdAt)}</time>
            {review.helpfulCount > 0 ? ` · ${formatCount(review.helpfulCount)} found this helpful` : ""}
          </p>

          {photos.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((photo) => (
                <div key={photo.id} className="relative aspect-square overflow-hidden rounded-xl border border-border bg-accent-soft">
                  <Image src={photo.url} alt="" fill sizes="(max-width: 640px) 50vw, 240px" className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}

          {review.reply ? (
            <aside className="mt-8 rounded-2xl border border-border bg-surface p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Reply from {review.store.name}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed">{review.reply.body}</p>
              {review.reply.repliedAt ? (
                <time dateTime={review.reply.repliedAt} className="mt-2 block text-[12px] text-muted-foreground">
                  {formatDate(review.reply.repliedAt)}
                </time>
              ) : null}
            </aside>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Reviewed product</p>
            <Link href={`/product/${review.product.slug}`} className="mt-3 block">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-accent-soft">
                {review.product.image ? (
                  <Image src={review.product.image} alt={review.product.name} fill sizes="300px" className="object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[40px] font-semibold text-muted-foreground/50" aria-hidden="true">
                    {review.product.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[14px] font-semibold leading-snug tracking-[-0.01em]">{review.product.name}</p>
            </Link>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {brand ? `${brand} · ` : ""}
              <Link href={`/store/${review.store.slug}`} className="underline-offset-4 hover:text-foreground hover:underline">
                {review.store.name}
              </Link>
            </p>
            <Link
              href={`/product/${review.product.slug}`}
              className="mt-4 block rounded-full bg-foreground px-4 py-2.5 text-center text-[13px] font-medium text-background transition-colors hover:bg-button-primary-hover"
            >
              See all reviews
            </Link>
          </div>
        </aside>
      </article>

      {related.length > 0 ? (
        <section className="mt-16">
          <SectionBar
            title={`More reviews of ${review.product.name}`}
            href={`/product/${review.product.slug}`}
            hrefLabel="View product"
          />
          <CardGrid>
            {related.map((item) => (
              <ReviewCard key={item.id} review={item} showProduct={false} />
            ))}
          </CardGrid>
        </section>
      ) : null}
    </Container>
  );
}
