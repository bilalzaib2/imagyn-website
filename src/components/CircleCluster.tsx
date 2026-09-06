// The signature shape motif — an extension of the logomark's own 3x3 grid of
// variable-sized circles, used as a decorative accent rather than scattered randomly.
// Two fixed, hand-placed layouts (not random — random would also hydration-mismatch in
// Next.js SSR) so every render is identical and intentional.
const LAYOUTS = {
  // Loose corner cluster — for the hero and closing CTA, framing real product UI rather
  // than competing with it.
  corner: [
    { cx: 20, cy: 18, r: 30 },
    { cx: 78, cy: 10, r: 16 },
    { cx: 92, cy: 42, r: 22 },
    { cx: 55, cy: 55, r: 10 },
    { cx: 10, cy: 68, r: 12 },
  ],
  // A tighter row, echoing the logomark's own grid more literally — for use as a quiet
  // section divider.
  row: [
    { cx: 8, cy: 20, r: 8 },
    { cx: 28, cy: 20, r: 14 },
    { cx: 52, cy: 20, r: 8 },
    { cx: 72, cy: 20, r: 18 },
    { cx: 94, cy: 20, r: 6 },
  ],
} as const;

export function CircleCluster({
  layout = "corner",
  color = "var(--lime)",
  className = "",
}: {
  layout?: keyof typeof LAYOUTS;
  color?: string;
  className?: string;
}) {
  const circles = LAYOUTS[layout];

  return (
    <svg
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={color} />
      ))}
    </svg>
  );
}
