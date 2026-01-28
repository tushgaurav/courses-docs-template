import fs from "fs";
import path from "path";
import meta from "@/lessons/meta.json";

export interface Lesson {
  slug: string;
  title: string;
}

export interface Section {
  slug: string;
  title: string;
  lessons: Lesson[];
}

export interface TableOfContents {
  sections: Section[];
}

export function getTableOfContents(): TableOfContents {
  return meta;
}

export function getLessonContent(
  sectionSlug: string,
  lessonSlug: string
): string | null {
  const lessonsDir = path.join(process.cwd(), "lessons");
  const filePath = path.join(lessonsDir, sectionSlug, `${lessonSlug}.md`);

  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function getLessonBySlug(
  sectionSlug: string,
  lessonSlug: string
): { section: Section; lesson: Lesson; content: string } | null {
  const section = meta.sections.find((s) => s.slug === sectionSlug);
  if (!section) return null;

  const lesson = section.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;

  const content = getLessonContent(sectionSlug, lessonSlug);
  if (!content) return null;

  return { section, lesson, content };
}

export function getAdjacentLessons(
  sectionSlug: string,
  lessonSlug: string
): {
  prev: { section: string; lesson: string; title: string } | null;
  next: { section: string; lesson: string; title: string } | null;
} {
  const allLessons: { section: string; lesson: string; title: string }[] = [];

  for (const section of meta.sections) {
    for (const lesson of section.lessons) {
      allLessons.push({
        section: section.slug,
        lesson: lesson.slug,
        title: lesson.title,
      });
    }
  }

  const currentIndex = allLessons.findIndex(
    (l) => l.section === sectionSlug && l.lesson === lessonSlug
  );

  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next:
      currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  };
}
