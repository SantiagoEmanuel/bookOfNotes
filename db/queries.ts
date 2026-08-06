import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import { pages, subjects } from "./schema/schema";

export async function getNotesBySubject(subjectName: string, userId: string) {
  return await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      updatedAt: pages.updatedAt,
    })
    .from(pages)
    .where(and(eq(pages.subject, subjectName), eq(pages.userId, userId)))
    .all();
}

export async function getNoteBySlug(noteSlug: string, userId: string) {
  const data = await db.query.pages.findFirst({
    where: and(eq(pages.slug, noteSlug), eq(pages.userId, userId)),
  });

  if (!data) {
    return { content: "", subject: "", slug: "", title: "" };
  }

  return {
    content: data.content,
    subject: data.subject,
    slug: data.slug,
    title: data.title,
  };
}

export async function upsertNote(noteData: {
  slug: string;
  title: string;
  content: string;
  subject: string;
  userId: string;
}) {
  return await db
    .insert(pages)
    .values(noteData)
    .onConflictDoUpdate({
      target: [pages.userId, pages.slug],
      set: {
        content: noteData.content,
        title: noteData.title,
        subject: noteData.subject,
      },
    })
    .run();
}

export async function createMateria(subject: {
  slug?: string;
  title?: string;
  content?: string;
  subject: string;
  userId: string;
}) {
  return db
    .insert(subjects)
    .values({
      slug: subject.slug ?? subject.subject.toLowerCase().replace(/\s+/g, "-"),
      name: subject.subject,
      userId: subject.userId,
    })
    .onConflictDoUpdate({
      target: [subjects.userId, subjects.name],
      set: {
        slug:
          subject.slug ?? subject.subject.toLowerCase().replace(/\s+/g, "-"),
      },
    })
    .run();
}

export async function getMaterias(userId: string) {
  return await db
    .select({ subject: subjects.name })
    .from(subjects)
    .where(eq(subjects.userId, userId))
    .orderBy(subjects.name)
    .all();
}

export async function getUserData(slug: string, userId: string) {
  const materias = await getMaterias(userId);
  const note = await getNoteBySlug(slug, userId);
  return { subject: materias, note };
}
