import Link from "next/link";
import { siteConfig } from "@/config";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background transition-transform group-hover:scale-105">
            {siteConfig.title.charAt(0)}
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
