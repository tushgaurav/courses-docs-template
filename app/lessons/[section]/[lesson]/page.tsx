import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLessonBySlug,
  getAdjacentLessons,
  getTableOfContents,
} from "@/lib/lessons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Markdown } from "@/components/markdown";
import { LessonNavigation } from "@/components/lesson-navigation";
import { ChevronRight, Home } from "lucide-react";

interface LessonPageProps {
  params: Promise<{
    section: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const toc = getTableOfContents();
  const params: { section: string; lesson: string }[] = [];

  for (const section of toc.sections) {
    for (const lesson of section.lessons) {
      params.push({
        section: section.slug,
        lesson: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { section, lesson } = await params;
  const data = getLessonBySlug(section, lesson);

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: `${data.lesson.title} | ${data.section.title}`,
    description: `Learn about ${data.lesson.title} in the ${data.section.title} section.`,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { section, lesson } = await params;
  const data = getLessonBySlug(section, lesson);

  if (!data) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(section, lesson);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">
              {data.section.title}
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{data.lesson.title}</span>
          </nav>

          {/* Content */}
          <div className="prose-wrapper">
            <Markdown content={data.content} />
          </div>

          <LessonNavigation prev={prev} next={next} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
