import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN,
  },
  schema: "./db/schema",
});
