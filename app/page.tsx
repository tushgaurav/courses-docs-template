import { siteConfig } from "@/config";
import { getTableOfContents } from "@/lib/lessons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TableOfContents } from "@/components/table-of-contents";
import { FileText } from "lucide-react";

export default function HomePage() {
  const toc = getTableOfContents();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />
          <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                <FileText className="h-3 w-3" />
                Notes
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {siteConfig.title}
              </h1>
              <p className="text-xl text-muted-foreground sm:text-2xl">
                {siteConfig.subtitle}
              </p>
              <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {siteConfig.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>{toc.sections.length} sections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>
                    {toc.sections.reduce(
                      (acc, s) => acc + s.lessons.length,
                      0
                    )}{" "}
                    topics
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <img
                    src={`https://github.com/${siteConfig.social.github}.png`}
                    alt={siteConfig.author.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`https://github.com/${siteConfig.social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                  >
                    {siteConfig.author.name}
                  </a>
                  {siteConfig.author.company && (
                    <span className="text-xs text-muted-foreground">
                      {siteConfig.author.company}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents Section */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Table of Contents
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Reference material for the session
              </p>
            </div>
          </div>
          <TableOfContents toc={toc} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
