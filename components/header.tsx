"use client";

import { api } from "@/utils/api";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";

interface Subject {
  subject: string;
}

interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;
    api.subjects.all().then((data) => setSubjects(data));
  }, [userId]);

  if (!userId) return;

  const handleCreateSubject = (formData: FormData) => {
    const rawSubject = formData.get("subject");
    const normalizeSubject =
      typeof rawSubject === "string"
        ? rawSubject.trim().replace(/\s+/g, "_")
        : "";
    api.subjects
      .create(normalizeSubject)
      .then(() => redirect(`${normalizeSubject}`, RedirectType.replace));
  };

  return (
    <aside
      className={`
        relative
        flex
        h-dvh
        shrink-0
        flex-col
        border
        border-border
        bg-background
        transition-[width]
        duration-300
        ease-in-out
        ${isOpen ? "w-64" : "w-18"}
        ${className}
      `}
    >
      {/* Cabecera */}
      <div
        className={`
          flex
          h-16
          shrink-0
          items-center
          w-full
          border-b
          border-border
          px-3
          ${isOpen ? "justify-between" : "justify-center"}
        `}
      >
        {/* Contenido proporcionado por el padre */}
        <div
          className={`
            min-w-0
            overflow-hidden
            transition-all
            duration-200
            ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}
          `}
        >
          {userId ? <UserButton /> : <SignInButton />}
        </div>

        {/* Botón */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Contraer navegación" : "Expandir navegación"}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-text-secondary
            transition-colors
            hover:bg-surface-secondary
            hover:text-text-primary
            focus:outline-none
            focus:ring-2
            focus:ring-slate-400
            focus:ring-offset-2
          "
        >
          <svg
            className={`
              h-5
              w-5
              transition-transform
              duration-300
              ease-out
              ${isOpen ? "" : "rotate-180"}
            `}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Navegación */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <nav className="p-3">
          {/* Título de sección */}
          <div
            className={`
              mb-2
              overflow-hidden
              px-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-text-muted
              transition-all
              duration-200
              ${isOpen ? "max-h-6 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            Materias
          </div>

          <div className="flex flex-col gap-2">
            {subjects.map(({ subject }) => {
              const label = subject.replaceAll("_", " ");

              return (
                <Link
                  key={subject}
                  href={`/materia/${encodeURIComponent(subject)}`}
                  title={!isOpen ? label : undefined}
                  className={`
                      group
                      flex
                      items-center
                      rounded-lg
                      py-2
                      text-sm
                      font-medium
                      text-text-secondary
                      transition-colors
                      hover:bg-surface-secondary
                      hover:text-text-primary
                      ${isOpen ? "gap-3 px-3" : "justify-center"}
                    `}
                >
                  {/* Indicador */}
                  <span
                    className="
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        bg-primary-300
                        transition-colors
                        group-hover:bg-primary-600
                      "
                    aria-hidden="true"
                  />

                  {/* Nombre */}
                  <span
                    className={`
                        truncate
                        capitalize
                        transition-all
                        duration-200
                        ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}
                      `}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer del sidebar */}
      <div
        className="
          shrink-0
          border-t
          border-border
          p-3
        "
      >
        <form action={handleCreateSubject} className="space-y-2">
          <input
            type="text"
            name="subject"
            placeholder="Nueva materia"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <button
            type="submit"
            className={`flex w-full items-center rounded-lg py-2 text-sm text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary ${isOpen ? "gap-3 px-3" : "justify-center px-2"}`}
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>

            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}
            >
              Crear materia
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}
