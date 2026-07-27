import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</span>
        <h1 className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tracking-[-0.03em] text-foreground">
          This page doesn&apos;t exist.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          The page you&apos;re looking for may have moved. Let&apos;s get you back on track.
        </p>
        <Button href="/" size="lg">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
