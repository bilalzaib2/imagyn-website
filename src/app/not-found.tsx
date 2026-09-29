import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Section";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-[var(--section-y)]">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Eyebrow align="center">404</Eyebrow>
        <h1 className="text-section font-semibold tracking-[-0.035em] text-foreground">
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
