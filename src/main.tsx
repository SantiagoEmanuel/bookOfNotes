import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

// Importamos tus vistas (componentes de página)
import HomeIndex from "./pages/homeIndex";
import MathEditor from "./pages/mathEditor";
import SubjectIndex from "./pages/subjectIndex";

// Importamos tus consultas a Drizzle
import RootLayout from "./components/layout/rootLayout";
import { getNoteBySlug, getNotesBySubject } from "./db/queries";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <HomeIndex />,
      },
      {
        // El parámetro dinámico se define con ":"
        path: "/materia/:subject",
        element: <SubjectIndex />,
        // El loader se ejecuta ANTES de renderizar el componente
        loader: async ({ params }) => {
          if (!params.subject) throw new Error("Materia no encontrada");
          // Llamamos a Turso directo desde el enrutador
          const notes = await getNotesBySubject(params.subject);
          return { notes, subject: params.subject };
        },
      },
      {
        path: "/nota/:slug",
        element: <MathEditor />,
        loader: async ({ params }) => {
          if (!params.slug) throw new Error("Slug no proporcionado");
          const note = await getNoteBySlug(params.slug);
          if (!note) throw new Response("Nota no encontrada", { status: 404 });
          return note;
        },
      },
      {
        path: "/nueva",
        element: <MathEditor />,
        // Para una nota nueva no hay loader, le pasaremos datos vacíos desde el componente
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
