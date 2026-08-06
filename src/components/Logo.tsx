import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="Imagyn Reviews home">
      <Image src="/logo.svg" alt="Imagyn Reviews" width={79} height={18} priority className="h-[18px] w-auto" />
    </Link>
  );
}
