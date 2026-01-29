import Link from "next/link";
import { siteConfig } from "@/config";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="font-semibold text-foreground">
              {siteConfig.title}
            </Link>
            <p className="text-center text-sm text-muted-foreground sm:text-left">
              Created by{" "}
              <a
                href={`https://github.com/${siteConfig.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                {siteConfig.author.name}
              </a>
              {siteConfig.author.company && (
                <span className="text-muted-foreground">
                  {" "}
                  at {siteConfig.author.company}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-1">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
