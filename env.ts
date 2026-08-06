import { coerce, infer as inf, object } from "zod";

const Environment = object({
  TURSO_TOKEN: coerce.string(),
  TURSO_URL: coerce.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: coerce.string(),
  CLERK_SECRET_KEY: coerce.string(),
});

export type Env = inf<typeof Environment>;

export const {
  TURSO_TOKEN,
  TURSO_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
} = Environment.parse(process.env);
