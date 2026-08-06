import { defineConfig } from "drizzle-kit";
import { TURSO_TOKEN, TURSO_URL } from "./env";

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  },
  schema: "./db/schema",
});
