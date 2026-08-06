import { getUserData } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({}, { status: 401 });

  const slug = new URL(req.url).searchParams.get("slug");

  if (!slug)
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  return NextResponse.json(await getUserData(slug, userId));
}
