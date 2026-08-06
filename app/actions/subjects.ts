"use server";

import { createMateria } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createSubjectAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const rawSubject = formData.get("subject");
  const normalizedSubject =
    typeof rawSubject === "string"
      ? rawSubject.trim().replace(/\s+/g, "_")
      : "";

  if (!normalizedSubject) {
    return;
  }

  await createMateria({
    slug: "",
    title: "",
    content: "",
    subject: normalizedSubject,
    userId,
  });

  redirect(`/materia/${encodeURIComponent(normalizedSubject)}`);
}
