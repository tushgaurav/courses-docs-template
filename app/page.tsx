import { siteConfig } from "@/config";
import { getTableOfContents } from "@/lib/lessons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TableOfContents } from "@/components/table-of-contents";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const toc = getTableOfContents();
  const firstLesson = toc.sections[0]?.lessons[0];
  const firstSection = toc.sections[0];

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
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live Course Notes
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {firstLesson && firstSection && (
                  <Link
                    href={`/lessons/${firstSection.slug}/${firstLesson.slug}`}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
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
                      lessons
                    </span>
                  </div>
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
                Course Content
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need to follow along
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
