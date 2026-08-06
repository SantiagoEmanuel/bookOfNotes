"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NotFond() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Error de navegación
        </p>

        <h1 className="mt-6 font-mono text-6xl leading-none font-medium tracking-tight text-foreground sm:text-7xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl leading-snug font-semibold text-balance text-foreground">
          No encontramos la página que estabas buscando
        </h2>

        <p className="mt-3 text-base leading-relaxed text-pretty text-text-secondary">
          La ruta puede haber cambiado de nombre, haber sido eliminada, o el
          enlace que seguiste está incompleto. Tus datos no se han visto
          afectados.
        </p>

        {/* Signature element: diagnostic panel */}
        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-secondary px-4 py-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Diagnóstico
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-destructive">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-destructive"
              />
              404 NOT_FOUND
            </span>
          </div>

          <dl className="divide-y divide-border font-mono text-xs">
            <div className="flex gap-4 px-4 py-3">
              <dt className="w-24 shrink-0 text-muted-foreground">Ruta</dt>
              <dd className="min-w-0 break-all text-foreground">{pathname}</dd>
            </div>
            <div className="flex gap-4 px-4 py-3">
              <dt className="w-24 shrink-0 text-muted-foreground">Método</dt>
              <dd className="text-foreground">GET</dd>
            </div>
            <div className="flex gap-4 px-4 py-3">
              <dt className="w-24 shrink-0 text-muted-foreground">
                Sugerencia
              </dt>
              <dd className="min-w-0 text-text-secondary">
                Verifica la URL o continúa desde el dashboard
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <LayoutDashboard aria-hidden="true" data-icon="inline-start" />
            Ir al dashboard
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              // Si no hay historial previo (entrada directa), evitamos un clic sin efecto.
              if (window.history.length > 1) router.back();
              else router.push("/dashboard");
            }}
            className="w-full sm:w-auto"
          >
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Volver atrás
          </Button>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          <LifeBuoy
            aria-hidden="true"
            className="mr-2 inline size-4 align-[-3px]"
          />
          Si crees que esto es un error,{" "}
          <Link
            href="/dashboard"
            className="text-primary underline-offset-4 hover:underline"
          >
            reporta el enlace roto
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
