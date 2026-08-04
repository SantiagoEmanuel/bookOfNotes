import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { TURSO_TOKEN, TURSO_URL } from "./src/constants/env";

config();

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url: TURSO_URL!,
    authToken: TURSO_TOKEN!,
  },
  schema: "./src/db/schema/schema.ts",
  out: "./src/db/generate/",
});
