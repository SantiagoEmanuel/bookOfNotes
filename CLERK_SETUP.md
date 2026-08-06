# Configuración de Clerk

## Variables de entorno

Este proyecto usa las siguientes variables de Clerk:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: clave pública usada por el cliente.
- CLERK_SECRET_KEY: clave privada usada en el servidor para autenticar la sesión.

## Dónde se utilizan

1. Layout principal
   - Archivo: app/layout.tsx
   - Uso: inicializa ClerkProvider y renderiza los botones de autenticación.

2. Página de inicio
   - Archivo: app/page.tsx
   - Uso: obtiene el userId con auth() para mostrar datos solo si el usuario está autenticado.

3. Página de materia
   - Archivo: app/materia/[materia]/page.tsx
   - Uso: usa auth() para filtrar notas por usuario autenticado.

4. Página de editor de notas
   - Archivo: app/notes/[note]/page.tsx
   - Uso: usa auth() para cargar y proteger los datos de la nota.

5. Acciones de servidor para guardar notas
   - Archivo: app/actions/notes.ts
   - Uso: valida la sesión con auth() antes de guardar en la base de datos.

## Nota

Si alguna de estas variables no está definida, la autenticación no funcionará correctamente en el entorno correspondiente.
