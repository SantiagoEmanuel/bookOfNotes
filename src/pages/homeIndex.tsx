import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getMaterias } from "../db/queries";

export default function HomeIndex() {
  const [SUBJECTS, setSubject] = useState<{ id: number; subject: string }[]>(
    [],
  );

  useEffect(() => {
    getMaterias()
      .then((data) => setSubject(data))
      .catch((error) => console.log("error:", error));
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Panel de Estudio</h1>
        <p className="text-neutral-400">
          Selecciona una materia para repasar tus apuntes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((subject) => (
          <Link
            key={subject.id}
            to={`/materia/${subject.subject}`}
            className={`p-6 border rounded-xl flex flex-col gap-4 hover:scale-[1.02] transition-transform cursor-pointer border-sky-400 group`}
          >
            <h2 className="text-2xl font-bold uppercase">
              {subject.subject.replaceAll("_", " ")}
            </h2>
            <span className="text-sm opacity-30 uppercase tracking-wider font-semibold  group-hover:text-sky-400 group-hover:opacity-100 transition-colors duration-500">
              Ver notas &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
