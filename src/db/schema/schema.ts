import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("pages", {
  // Usamos integer con autoIncrement para el ID, es lo más rápido en SQLite
  id: integer("id").primaryKey({ autoIncrement: true }),

  // El slug será tu URL amigable, ej: "teorema-de-gauss". Debe ser único.
  slug: text("slug").notNull().unique(),

  title: text("title").notNull(),
  content: text("content").notNull(),

  // El subject te permitirá filtrar en tu Index: "fisica_1", "algebra_2", etc.
  subject: text("subject").notNull(),

  // SQLite no tiene un tipo "Date" nativo real, maneja strings (ISO) o integers (Unix).
  // Usamos el default de la base de datos para no calcularlo en el frontend.
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    // Este hook de Drizzle actualiza el campo automáticamente al modificar la fila
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
