import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
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
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex bg-background text-text-primary gap-2 p-4">
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            cssLayerName: "clerk",
          }}
        >
          <Header className="flex justify-end items-center p-4 gap-4 rounded-3xl"></Header>
          <main className="bg-background flex-1">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
