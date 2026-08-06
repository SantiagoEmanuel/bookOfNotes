import { getNoteBySlug } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({}, { status: 401 });

  const { slug } = await params;

  const note = await getNoteBySlug(slug, userId);

  return NextResponse.json(note);
}
