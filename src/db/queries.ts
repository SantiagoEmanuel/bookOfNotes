import { eq } from "drizzle-orm";
import { db } from "./db";
import { pages } from "./schema/schema";
("../pages");

// Obtener todas las notas de una materia específica sin cargar todo el contenido
export async function getNotesBySubject(subjectName: string) {
  return await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      updatedAt: pages.updatedAt,
    })
    .from(pages)
    .where(eq(pages.subject, subjectName))
    .all();
}

// Buscar una nota por su slug
export async function getNoteBySlug(noteSlug: string) {
  return await db.query.pages.findFirst({
    where: eq(pages.slug, noteSlug),
  });
}

// Si usas el atajo Cmd+S, llamarás a esta función
export async function upsertNote(noteData: {
  slug: string;
  title: string;
  content: string;
  subject: string;
}) {
  // UPSERT: Inserta la nota, pero si el slug ya existe, actualiza el contenido.
  return await db
    .insert(pages)
    .values(noteData)
    .onConflictDoUpdate({
      target: pages.slug,
      set: {
        content: noteData.content,
        title: noteData.title,
      },
    })
    .run();
}

export async function getMaterias() {
  return await db
    .select({
      id: pages.id,
      subject: pages.subject,
    })
    .from(pages)
    .all();
}
