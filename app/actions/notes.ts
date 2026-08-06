"use server";

import { upsertNote } from "@/db/queries";
import { createSlug } from "@/utils/createSlug";
import { auth } from "@clerk/nextjs/server";

export async function saveNoteAction(input: {
  title: string;
  subject: string;
  content: string;
  slug?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const slugToSave = input.slug || createSlug(input.title);

  await upsertNote({
    slug: slugToSave,
    title: input.title,
    content: input.content,
    subject: input.subject,
    userId,
  });

  return { slug: slugToSave };
}
