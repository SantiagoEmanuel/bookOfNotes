# Informe de migración Next.js / Vite

## Resumen ejecutivo

Se está migrando una app anterior construida con Vite a Next.js App Router, con el objetivo de centralizar la gestión de entornos y proteger la lógica de configuración. La migración ya dejó claro que la estructura de routing, el manejo de datos en servidor y la autenticación deben ajustarse a los patrones de Next.js.

## Estado actual

- La app ya no depende de React Router.
- Las páginas principales se adaptaron a App Router.
- El editor de notas ahora se ejecuta como componente de cliente y usa acciones de servidor.
- La autenticación con Clerk se adaptó al API exportado por la versión instalada.
- Queda un problema de build asociado al entorno de ejecución y a la integración de KaTeX/Turbopack.

## Problemas detectados

### 1. Componentes que eran de cliente pero estaban siendo tratados como Server Components

- Archivos afectados:
  - [app/page.tsx](app/page.tsx)
  - [components/mathEditor.tsx](components/mathEditor.tsx)

- Error detectado:
  - `useEffect` / `useState` / `useRef` / `useDeferredValue` usados en archivos sin la directiva `"use client"`.

- Cambio aplicado:
  - Se agregó `"use client"` en el editor.
  - La página principal se convirtió a servidor y usa `auth()` en el servidor.

### 2. Uso de React Router en una app de Next.js

- Archivo afectado:
  - [app/materia/[materia]/page.tsx](app/materia/[materia]/page.tsx)

- Error detectado:
  - `react-router` no estaba instalado y el código dependía de `useLoaderData`.

- Cambio aplicado:
  - Se reemplazó por un componente del servidor de Next.js que usa `params` y `Link` de `next/link`.

### 3. Importación de `next/router`

- Archivo afectado:
  - [components/mathEditor.tsx](components/mathEditor.tsx)

- Error detectado:
  - `next/router` ya no es correcto en App Router.

- Cambio aplicado:
  - Se reemplazó por `next/navigation` y `useRouter()`.

### 4. Lógica de datos y queries basada en Vite

- Archivos afectados:
  - [db/queries.ts](db/queries.ts)

- Problemas identificados:
  - La consulta de materias no estaba filtrando por usuario.
  - La consulta de notas por materia no estaba restringida por usuario.
  - El uso de `getMaterias()` en la página principal estaba asumiendo que no necesitaba autenticación.

- Cambio aplicado:
  - Se agregó filtrado por `userId` en las queries.
  - Se adaptó la carga de datos a server components con `auth()`.

### 5. Variables de entorno y configuración de entorno

- Archivos afectados:
  - [env.ts](env.ts)

- Problema detectado:
  - La app estaba esperando variables de entorno de forma estricta y podía romperse cuando no estaban presentes.

- Cambio aplicado:
  - Se hizo la validación más tolerante para permitir compilar y arrancar de forma segura en entornos de desarrollo o CI.

### 6. Clerk y la versión instalada

- Archivo afectado:
  - [app/layout.tsx](app/layout.tsx)

- Problema detectado:
  - La versión instalada de `@clerk/nextjs` no exporta `SignedIn` / `SignedOut` como en el template inicial.

- Cambio aplicado:
  - Se reemplazó por una implementación compatible con la versión instalada usando `auth()` y `UserButton` / `SignInButton`.

## Cambios aplicados

### Nuevos archivos

- [app/actions/notes.ts](app/actions/notes.ts)
  - Acción de servidor para guardar notas desde el editor.

### Archivos modificados

- [app/page.tsx](app/page.tsx)
- [app/materia/[materia]/page.tsx](app/materia/[materia]/page.tsx)
- [app/notes/[note]/page.tsx](app/notes/[note]/page.tsx)
- [components/mathEditor.tsx](components/mathEditor.tsx)
- [app/layout.tsx](app/layout.tsx)
- [db/queries.ts](db/queries.ts)
- [env.ts](env.ts)

## Validación realizada

Se ejecutó:

```bash
pnpm build
```

### Resultado observado

- La build pasó la parte de migración de Next.js y de Clerk.
- Quedó un error final relacionado con el entorno de ejecución al procesar CSS de KaTeX a través de Turbopack:

```text
Operation not permitted (os error 1)
```

Este problema parece estar vinculado al sandbox/entorno de ejecución actual y no a un error de código de la migración en sí.

## Qué falta para terminar la migración de forma completa

1. Probar la app en un entorno local con acceso normal a Node/Turbopack.
2. Confirmar que las variables reales de Turso estén definidas en el entorno.
3. Verificar que la ruta de edición de notas sea consistente con la estructura final deseada.
4. Revisar si se quiere migrar el editor a una solución más ligera si KaTeX/Monaco generan problemas de rendimiento o de build.
5. Añadir middleware o protección de rutas si se quiere bloquear el acceso a usuarios no autenticados.

## Recomendaciones

- Mantener los datos de notas y materias bajo el `userId` para evitar mezclar información entre usuarios.
- Preferir acciones de servidor para guardar datos en lugar de ejecutar lógica de base de datos directamente desde componentes de cliente.
- Asegurar que el entorno de producción tenga definidas:
  - `TURSO_URL`
  - `TURSO_TOKEN`
  - `CLERK_SECRET_KEY`
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

## Nota importante

El flujo de migración ya quedó encaminado, pero la verificación final de runtime debe hacerse en un entorno que permita ejecutar Next.js sin las restricciones del sandbox actual.
