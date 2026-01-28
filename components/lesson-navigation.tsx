import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LessonNavigationProps {
  prev: { section: string; lesson: string; title: string } | null;
  next: { section: string; lesson: string; title: string } | null;
}

export function LessonNavigation({ prev, next }: LessonNavigationProps) {
  return (
    <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/lessons/${prev.section}/${prev.lesson}`}
          className="group flex flex-col gap-2 rounded-xl border border-border p-4 transition-all hover:border-foreground/20 hover:bg-muted/50"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-medium text-foreground">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/lessons/${next.section}/${next.lesson}`}
          className="group flex flex-col gap-2 rounded-xl border border-border p-4 text-right transition-all hover:border-foreground/20 hover:bg-muted/50 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Next
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-medium text-foreground">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
