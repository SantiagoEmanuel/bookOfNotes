import { getNotesBySubject } from "@/db/queries";
import { getCurrentUserId } from "@/utils/clerk";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SubjectIndex({
  params,
}: {
  params: Promise<{ materia: string }>;
}) {
  const { materia } = await params;
  const userId = await getCurrentUserId();

  if (!userId) {
    return <div className="p-8">Inicia sesión para ver tus notas.</div>;
  }

  const subject = decodeURIComponent(materia);
  const notes = await getNotesBySubject(subject, userId);

  return (
    <div className="p-8 bg-background min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 capitalize text-text-primary">
        Apuntes de {subject.replaceAll("_", " ")}
      </h1>

      <div className="grid gap-4">
        {notes.map((note) => (
          <article
            key={note.id}

            className="p-4 rounded-lg border border-border bg-surface hover:bg-surface-secondary transition text-text-primary"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="text-sm text-text-secondary">
              Última edición: {note.updatedAt}
            </p>
            <div className="flex gap-4">
              <Link href={`/notes/${note.slug}`}>Editar</Link>
              <Link href={`/notes/${note.slug}`}>Leer</Link>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/notes/new-note"
        className="mt-8 inline-block bg-primary-600 px-4 py-2 text-surface rounded font-bold hover:bg-primary-700 transition-colors"
      >
        + Crear Nueva Nota
      </Link>
    </div>
  );
}
