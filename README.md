# Book of notes

Book of notes es una aplicación ligera para tomar y organizar apuntes de clase, centrada en la escritura rápida, la simplicidad y la edición de contenido matemático.

**Descripción del proyecto**

- **Objetivo:** Permitir a estudiantes y docentes capturar ideas, fórmulas y fragmentos matemáticos durante las clases sin distracciones.
- **Enfoque:** editor Markdown enriquecido con utilidades para ecuaciones, snippets matemáticos y organización por asignaturas.

**Utilidades incluidas**

- **Editor Markdown:** escritura rápida con atajos y vista previa.
- **Snippets matemáticos:** fragmentos reutilizables para fórmulas y estructuras comunes (ver `src/utils/mathSnippets.ts`).
- **Generador de slugs:** para URLs y rutas limpias (ver `src/utils/createSlug.ts`).
- **Base de datos ligera:** integración con Drizzle para almacenar apuntes y consultas en `db/`.
- **Componentes reutilizables:** área de texto enriquecida y layout base en `src/components/`.

**Cómo usarlo**

1. Instalar dependencias:

```bash
pnpm install
```

2. Ejecutar en desarrollo:

```bash
pnpm dev
```

3. Abrir la app en el navegador (por defecto `http://localhost:5173`) y crear/editar apuntes desde la interfaz.

4. Estructura principal de interés:

- `src/pages/` — vistas de la app.
- `src/components/` — componentes UI reutilizables.
- `db/` — configuración y consultas de la base de datos.

**Cómo colaborar**

- Haz fork del repositorio y crea una rama por feature o bug: `feature/tu-mejora`.
- Abre Pull Requests claros describiendo el propósito y cambios.
- Añade tests o pasos para reproducir cambios cuando apliquen.
- Mantén el estilo de TypeScript y formato del proyecto; ejecuta linters/formatters antes de PR.
- Para cambios en la base de datos, incluye migraciones o instrucciones en `db/`.

**Qué tipo de soluciones brinda**

- Facilita la toma rápida de apuntes matemáticos con soporte para fórmulas y snippets.
- Organiza contenidos por asignatura y permite búsquedas y reutilización de snippets.
- Sirve como base para extensiones: exportación a PDF/LaTeX, sincronización en la nube o integración con plataformas educativas.

Si quieres que añada una sección de instalación avanzada, ejemplos de uso o plantillas de PR, dímelo y lo incorporo.

## Contribuir

Consulta las normas de contribución y el formato de ramas en [CONTRIBUTING.md](CONTRIBUTING.md).
