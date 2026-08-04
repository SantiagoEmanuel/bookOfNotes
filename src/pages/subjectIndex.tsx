import { Link, useLoaderData } from "react-router";

export default function SubjectIndex() {
  // TypeScript no sabe mágicamente qué devuelve el loader, así que lo tipamos o confiamos en el casteo
  const { notes, subject } = useLoaderData() as any;

  return (
    <div className="p-8 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Apuntes de {subject.replace("-", " ")}
      </h1>

      <div className="grid gap-4">
        {notes.map((note: any) => (
          <Link
            key={note.id}
            to={`/nota/${note.slug}`}
            className="p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition"
          >
            <h2 className="text-xl font-semibold text-cyan-400">
              {note.title}
            </h2>
            <p className="text-sm text-neutral-400">
              Última edición: {note.updatedAt}
            </p>
          </Link>
        ))}
      </div>

      <Link
        to="/nueva"
        className="mt-8 inline-block bg-cyan-600 px-4 py-2 rounded font-bold"
      >
        + Crear Nueva Nota
      </Link>
    </div>
  );
}
