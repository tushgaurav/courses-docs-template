import Link from "next/link";
import { siteConfig } from "@/config";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Linkedin, Twitter } from "lucide-react";

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </svg>
  );
}

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
        <div className="flex items-center">
          <nav className="mr-2 flex items-center gap-1 border-r border-border pr-2">
            {siteConfig.social.github && (
              <a
                href={`https://github.com/${siteConfig.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.twitter && (
              <a
                href={`https://twitter.com/${siteConfig.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a
                href={`https://linkedin.com/in/${siteConfig.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.bluesky && (
              <a
                href={`https://bsky.app/profile/${siteConfig.social.bluesky}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Bluesky"
              >
                <BlueskyIcon className="h-4 w-4" />
              </a>
            )}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
