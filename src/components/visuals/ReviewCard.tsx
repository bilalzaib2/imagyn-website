// A purpose-built, illustrative review card — not a screenshot of the real app, and not
// styled to impersonate it. This is the one visual unit every feature demo below reuses
// (hero stream, journey, widget showcase, Brand Studio switcher), so the whole page reads
// as one system: the same "review object" moving through different product moments.
export type DemoReview = {
  name: string;
  rating: number;
  title: string;
  body?: string;
  verified?: boolean;
};

export const DEMO_REVIEWS: DemoReview[] = [
  { name: "Priya K.", rating: 5, title: "Exactly as described", body: "Fits perfectly and the color is even better in person.", verified: true },
  { name: "Marcus T.", rating: 5, title: "Fast shipping, great quality", body: "Second order from this store — never disappoints.", verified: true },
  { name: "Aiko S.", rating: 4, title: "Really happy with this", body: "Small sizing issue but customer support sorted it fast.", verified: true },
  { name: "Diego R.", rating: 5, title: "Worth every penny", verified: true },
  { name: "Nora B.", rating: 5, title: "My new favorite", body: "Already ordered two more for gifts.", verified: true },
];

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < rating ? "#0a0a0a" : "#e6e6e6"}>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCardVisual({
  review,
  variant = "minimal",
  className = "",
}: {
  review: DemoReview;
  variant?: "minimal" | "modern" | "editorial" | "luxury" | "custom";
  className?: string;
}) {
  const VARIANT_STYLES: Record<string, string> = {
    minimal: "rounded-2xl border border-border bg-white p-5",
    modern: "rounded-[28px] bg-white p-5 shadow-elevated",
    editorial: "border-b-2 border-foreground bg-transparent py-5",
    luxury: "rounded-lg border border-foreground/15 bg-white p-6 [font-variant:small-caps]",
    custom: "rounded-2xl border-2 border-lime bg-white p-5",
  };

  return (
    <div className={`${VARIANT_STYLES[variant]} ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <Stars rating={review.rating} />
        {review.verified ? (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Verified
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm font-semibold text-foreground">{review.title}</p>
      {review.body ? <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{review.body}</p> : null}
      <p className="mt-3 text-xs text-muted-foreground">{review.name}</p>
    </div>
  );
}

export { Stars };
