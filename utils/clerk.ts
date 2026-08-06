import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId() {
  try {
    const { userId } = await auth();
    return userId ?? null;
  } catch (error) {
    console.warn("Clerk auth is unavailable:", error);
    return null;
  }
}
