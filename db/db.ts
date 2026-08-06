import * as schema from "@/db/schema/schema";
import { TURSO_TOKEN, TURSO_URL } from "@/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

export const db = drizzle(client, { schema });
