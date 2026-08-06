import { getNotesBySubject, upsertNote } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  console.log({ headers: Object.entries(await headers()) });

  console.log({ cookies: await cookies() });
  console.log({ userId });

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subject = new URL(req.url).searchParams.get("subject");

  if (!subject) {
    return NextResponse.json({ error: "Missing subject" }, { status: 400 });
  }

  const notes = await getNotesBySubject(subject, userId);

  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  await upsertNote({
    ...body,
    userId,
  });

  return NextResponse.json({ success: true });
}
