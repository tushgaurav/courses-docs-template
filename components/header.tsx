import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-8 w-32">
            <Image
              src="/logo/tushar-light.png"
              alt={siteConfig.title}
              fill
              className="object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo/tushar-dark.png"
              alt={siteConfig.title}
              fill
              className="hidden object-contain dark:block"
              priority
            />
          </div>
          <span className="hidden font-medium text-foreground sm:inline-block">
            {siteConfig.title}
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
