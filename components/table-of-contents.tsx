import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TableOfContents as TOC } from "@/lib/lessons";

interface TableOfContentsProps {
  toc: TOC;
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  let lessonNumber = 0;

  return (
    <nav className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {toc.sections.map((section, sectionIndex) => (
        <div
          key={section.slug}
          className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-mono text-sm font-medium text-muted-foreground">
              {String(sectionIndex + 1).padStart(2, "0")}
            </span>
            <h3 className="font-semibold text-foreground">{section.title}</h3>
          </div>
          <ul className="space-y-1">
            {section.lessons.map((lesson) => {
              lessonNumber++;
              const currentLessonNumber = lessonNumber;
              return (
                <li key={lesson.slug}>
                  <Link
                    href={`/lessons/${section.slug}/${lesson.slug}`}
                    className="group/link flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-all hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(currentLessonNumber).padStart(2, "0")}
                      </span>
                      <span className="text-muted-foreground transition-colors group-hover/link:text-foreground">
                        {lesson.title}
                      </span>
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-foreground group-hover/link:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
