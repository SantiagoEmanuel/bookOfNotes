// utils/slugify.ts
export function createSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Descompone los acentos (ej: "ó" pasa a ser "o" + "´")
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .replace(/[^\w-]+/g, "") // Elimina caracteres especiales
    .replace(/--+/g, "-") // Evita guiones dobles
    .replace(/^-+/, "") // Elimina guiones al principio
    .replace(/-+$/, ""); // Elimina guiones al final
}
