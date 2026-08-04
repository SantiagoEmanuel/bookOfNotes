import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema/schema"; // Importamos el esquema para tener tipado completo

// En Vite, las variables de entorno cliente empiezan con VITE_
// Si esto corre en un servidor (Node), usarías process.env.TURSO_DATABASE_URL
const client = createClient({
  url: import.meta.env.VITE_TURSO_URL,
  authToken: import.meta.env.VITE_TURSO_TOKEN,
});

// Pasamos el esquema a Drizzle para activar las consultas relacionales tipadas
export const db = drizzle(client, { schema });
