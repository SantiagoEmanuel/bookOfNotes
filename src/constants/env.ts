import { config } from "dotenv";

config({
  path: [".env"],
});

export const { TURSO_TOKEN, TURSO_URL } = process.env;

console.log({ TURSO_TOKEN, TURSO_URL });
