import { createMateria, getMaterias } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(await getMaterias(userId));
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  await createMateria({
    ...body,
    userId,
  });

  return NextResponse.json({ success: true });
}
