import { getMaterias } from "@/db/queries";
import { getCurrentUserId } from "@/utils/clerk";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomeIndex() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return redirect("/auth", RedirectType.replace)
  }

  const subjects = await getMaterias(userId);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2 text-text-primary">
          Panel de Estudio
        </h1>
        <p className="text-text-secondary">
          Selecciona una materia para repasar tus apuntes.
        </p>
        {subjects.length === 0 ? (
          <div>
            <p>¡Crea tu primera materia!</p>
            <button></button>
          </div>
        ) : (
          <p>¿Faltan materias?, ¡créalas!</p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Link
            key={`${subject.subject}-${index}`}
            href={`/materia/${encodeURIComponent(subject.subject)}`}
            className="p-6 border rounded-xl flex flex-col gap-4 hover:scale-[1.02] transition-transform cursor-pointer border-primary-300 bg-surface group"
          >
            <h2 className="text-2xl font-bold uppercase text-text-primary">
              {subject.subject.replaceAll("_", " ")}
            </h2>
            <span className="text-sm uppercase tracking-wider font-semibold text-text-secondary transition-colors duration-500 group-hover:text-primary-600">
              Ver notas &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
