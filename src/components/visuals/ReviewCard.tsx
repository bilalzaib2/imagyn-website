// A purpose-built, illustrative review card, not a screenshot of the real app, and not
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
  { name: "Marcus T.", rating: 5, title: "Fast shipping, great quality", body: "Second order from this store, never disappoints.", verified: true },
  { name: "Aiko S.", rating: 4, title: "Really happy with this", body: "Small sizing issue but customer support sorted it fast.", verified: true },
  { name: "Diego R.", rating: 5, title: "Worth every penny", verified: true },
  { name: "Nora B.", rating: 5, title: "My new favorite", body: "Already ordered two more for gifts.", verified: true },
];

// `color`/`emptyColor` default to the original hardcoded values, so every existing call
// site (all on light surfaces) renders identically. Only a dark-surface caller (the
// homepage's SignalShowcase) needs to override them, rather than every site duplicating
// this star path as a second hand-rolled icon.
function Stars({
  rating,
  size = 12,
  color = "#0a0a0a",
  emptyColor = "#e6e6e6",
}: {
  rating: number;
  size?: number;
  color?: string;
  emptyColor?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < rating ? color : emptyColor}>
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
  // Five distinct storefront looks, not five names for the same white card: this is what
  // lets the widget showcase actually demonstrate "matches any brand" instead of just
  // claiming it. Only `custom` uses the Imagyn green — every other style is intentionally
  // brand-neutral (black/white, warm cream, ecommerce gray, fashion black), proof that the
  // product's default identity isn't tied to Imagyn's own color.
  const VARIANT_STYLES: Record<string, string> = {
    minimal: "rounded-2xl border border-border bg-white p-5",
    modern: "rounded-xl border border-[#e4e4e4] bg-[#f7f7f5] p-5",
    editorial: "rounded-sm border border-[#e8ddc8] bg-[#faf6ec] p-5",
    // Light, not inverted: Stars and the text below are hardcoded dark-on-light (see this
    // file's own Stars component and the markup below), so a dark card background here
    // would make its own content unreadable. Premium/fashion comes from the sharp corner,
    // hairline border and small-caps instead of an inversion.
    luxury: "rounded-none border border-foreground bg-white p-6 [font-variant:small-caps]",
    custom: "rounded-2xl border-2 border-lime bg-white p-5",
  };

  return (
    <div className={`${VARIANT_STYLES[variant]} ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <Stars rating={review.rating} />
        {review.verified ? (
          <span className="text-[10px] font-semibold tracking-wide text-muted-foreground">
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
