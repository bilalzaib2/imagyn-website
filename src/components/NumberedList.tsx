import { Reveal } from "@/components/Reveal";

// The "how it works" step sequence used across several feature pages — a real ordered
// process, which is why a numeral marker is the right device here (unlike a generic feature
// grid, order genuinely carries meaning: step 01 happens before step 02).
export function NumberedList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.title} delayMs={index * 100}>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
