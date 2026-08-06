import { getCurrentUserId } from "@/utils/clerk";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const userId = await getCurrentUserId();

  if (userId) {
    redirect("/", RedirectType.replace);
  }

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
              content="lazy"
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
