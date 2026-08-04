import { SignInButton, SignUpButton, useAuth } from "@clerk/react";
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
  const { isSignedIn } = useAuth();

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

  if (!isSignedIn) {
    return (
      <div>
        <div className="flex min-h-svh items-center justify-center p-6">
          <div className="grid h-125 w-200 max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2">
            {/* Image panel */}
            <div className="relative hidden md:block">
              <img
                src="/authView.jpg"
                alt="Colinas verdes bajo la luz de la mañana"
                sizes="400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif text-xl leading-snug text-primary-foreground text-balance drop-shadow-sm">
                  Vuelve a lo esencial.
                </p>
              </div>
            </div>

            {/* Form panel */}
            <div className="flex flex-col justify-center px-8 py-10 sm:px-12">
              <section className="flex flex-col gap-5">
                <div className="flex flex-col items-center justify-center gap-5 font-serif text-3xl text-foreground">
                  <div className="border rounded-xl px-4 py-2 hover:bg-sky-300/40">
                    <SignInButton> Iniciar Sesión</SignInButton>
                  </div>
                  <div className="border rounded-xl px-4 py-2 hover:bg-sky-600/40">
                    <SignUpButton> Crear Cuenta</SignUpButton>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
