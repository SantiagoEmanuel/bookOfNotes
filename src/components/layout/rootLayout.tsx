import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { getMaterias } from "../../db/queries";
import "../../index.css";

export default function RootLayout() {
  const [materias, setMaterias] = useState<{ id: number; subject: string }[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getMaterias()
      .then((data) => {
        setMaterias(data);
      })
      .catch(() => {
        setMaterias([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen w-full bg-neutral-900 text-neutral-100 font-sans">
      {/* SIDEBAR PERSISTENTE */}
      <aside
        className={` border-r border-neutral-700 bg-neutral-850 flex flex-col ${!menu ? "w-64" : "w-14"} transition-all duration-400 relative`}
      >
        <button
          className={`absolute ${!menu ? "rotate-90 top-2 right-4 " : "-rotate-90 top-1/2 right-4 "} transition-all duration-500 bg-white size-7 rounded-full`}
          onClick={() => setMenu(!menu)}
        >
          <img src="/flecha.png" alt="" className="p-1" />
        </button>

        <div className={`${menu ? "hidden" : "flex"}  flex-col w-full`}>
          <div className="p-6 border-b border-neutral-800">
            <Link
              to="/"
              className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition"
            >
              Mis Apuntes
            </Link>
          </div>

          <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2 mt-4">
              Materias
            </span>
            {loading ? (
              <div className="animate-spin size-4 rounded-full border bg-transparent border-b-transparent mx-auto"></div>
            ) : (
              materias.map(({ id, subject }) => (
                <Link
                  key={id}
                  to={`/materia/${subject}`}
                  className="capitalize"
                >
                  {subject.replaceAll("_", " ")}
                </Link>
              ))
            )}

            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2 mt-4">
              Acciones
            </span>
            <Link
              to="/nueva"
              className="bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600 hover:text-white px-3 py-2 rounded transition-colors text-center font-bold"
            >
              + Nueva Nota
            </Link>
          </nav>
        </div>
      </aside>

      {/* ÁREA DINÁMICA: Aquí React Router inyecta la página activa */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
