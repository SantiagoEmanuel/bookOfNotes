# Contribuir

Gracias por querer colaborar en este proyecto. Aquí tienes las normas y pasos recomendados para aportar código, documentación o mejoras.

## Formato obligatorio de ramas

Todas las ramas destinadas a Pull Requests deben respetar este formato:

```
[tipo]/[nombre-de-la-feature]
```

- `tipo`: una de `feat`, `fix`, `bug`, `docs`, `chore`, `refactor`, `test`, `perf`, `ci`.
- `nombre-de-la-feature`: corto, en minúsculas, separado por guiones (`-`).

Ejemplos:

- `feat/math-editor`
- `fix/typo-readme`
- `docs/add-contributing`
- `refactor/editor-state`

No usar espacios, mayúsculas ni caracteres especiales. Esto facilita la lectura automática y la gestión de releases.

## Flujo de trabajo recomendado

1. Haz fork del repositorio.
2. Crea una rama desde `main` usando el formato indicado.
3. Implementa tu cambio en la rama.
4. Ejecuta linters y tests locales antes de subir.
5. Abre un Pull Request desde tu rama hacia `main` con una descripción clara.

## Convenciones de commit

Utiliza mensajes de commit claros y concisos. Recomendado el estilo tipo-convencional: `feat: añadir soporte XYZ`, `fix: corregir validación`.
Si tu cambio está ligado a un issue, referencia el issue en la descripción: `Closes #123`.

## Pull Request (PR)

Tu PR debe incluir:

- Un título descriptivo y conciso.
- Una descripción que explique qué hace el cambio y por qué.
- Pasos para reproducir o probar (si aplica).
- Capturas o ejemplos si hay cambios visuales.
- Lista de verificación (checkboxes):
  - [ ] Código formateado (`pnpm format` o tu herramienta de formateo).
  - [ ] Tests locales ejecutados (si existen).
  - [ ] Linter ejecutado (`pnpm lint`).
  - [ ] Documentación actualizada (si aplica).

Los mantenedores pueden solicitar cambios. Sigue las indicaciones y actualiza la rama según el feedback.

## Tests, linters y ejecución local

Ejecuta estos comandos antes de crear la PR (si no existen scripts análogos, ajusta según `package.json`):

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm dev
```

Añade instrucciones concretas en la descripción del PR si tu cambio requiere pasos adicionales (migraciones, seeds, etc.).

## Cambios en la base de datos

Para modificaciones en esquemas o migraciones:

- Añade la migración o instrucción dentro de `db/`.
- Documenta el procedimiento en la descripción del PR.

## Revisiones y merge

- Requiere al menos una aprobación de un mantenedor antes de merge.
- Preferimos `squash and merge` para mantener el historial limpio (puede variar según el maintainer).

## Crear Issues

Antes de implementar features grandes, abre un issue describiendo la propuesta. Incluye:

- Resumen del problema o necesidad.
- Propuesta de solución.
- Impacto esperado y pasos alternativos.

## Guía de estilo y convenciones

Mantén el estilo TypeScript del proyecto. Respeta las reglas de lint y formateo del repositorio.

## Contacto

Si tienes dudas sobre el proceso de contribución, abre un issue con la etiqueta `help wanted` o contacta a los mantenedores vía PR comments.

Gracias por contribuir — tu aporte mejora el proyecto para todos.
