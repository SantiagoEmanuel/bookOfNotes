import { Header } from "@/components/header";
import { getMaterias } from "@/db/queries";
import { getCurrentUserId } from "@/utils/clerk";
import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matemática",
  description: "Editor de apuntes y material de estudio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getCurrentUserId();
  const subjects = userId ? await getMaterias(userId) : [];

  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex bg-background text-text-primary gap-2 p-4">
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            cssLayerName: "clerk",
          }}
        >
          <Header
            subjects={subjects}
            className="flex justify-end items-center p-4 gap-4 rounded-3xl"
          >
            {userId ? <UserButton /> : <SignInButton />}
          </Header>
          <main className="bg-background flex-1">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
