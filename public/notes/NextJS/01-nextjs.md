# Next.js

Next.js es un **framework de React** que agrega:
- **SSR** (Server Side Rendering)
- **SSG** (Static Site Generation)
- **Routing automático** basado en archivos
- **API backend** dentro del mismo proyecto
- **Optimización automática** de imágenes, fuentes y bundles

## Next.js 14 — Lo más importante

- App Router
- Server Components
- Client Components
- Routing dinámico
- Layouts
- Fetch en server
- API routes
- Middleware
- Optimización de imágenes

## Instalación

```
cd carpeta-del-proyecto
npx create-next-app@latest
# o para una versión específica:
npx create-next-app@14

cd project-name
npm run dev
```

### Setup prompts

```
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
```

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm start` | Iniciar servidor de producción |
| `npm run lint` | Ejecutar ESLint |

## Turbopack

Turbopack es el bundler incremental de Next.js, sucesor de Webpack. Está escrito en Rust y es significativamente más rápido. Se usa automáticamente con `npm run dev`.

## Tailwind CSS

Next.js incluye soporte integrado para Tailwind CSS al crearlo con la opción correspondiente. Tailwind es un framework CSS de tipo utility-first que permite escribir estilos directamente en el HTML/JSX usando clases predefinidas.

```tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Click me
</button>
```

## Navegación rápida

| Archivo | Contenido |
|---|---|
| [App Router](02-app-router.md) | Archivos reservados, estructura de carpetas, layouts, rutas dinámicas |
| [Routing](03-routing.md) | Pages Router, App Router, Link, usePathname, useRouter, rutas dinámicas |
| [Server Components](04-server-components.md) | Componentes de servidor, ventajas, limitaciones |
| [Client Components](05-client-components.md) | Directiva 'use client', interactividad, hooks |
| [Data Fetching](06-data-fetching.md) | Fetch en server, async/await, caching, loading/error states |
| [API Routes](07-api-routes.md) | Route handlers, GET/POST, rutas dinámicas en API |
| [Image Component](08-image-component.md) | Optimización, lazy loading, remotePatterns |
| [Metadata](09-metadata.md) | Metadata API, generateMetadata, Open Graph |
| [Middleware](10-middleware.md) | Middleware, matcher, autenticación, redirecciones |
| [Public Folder](11-public-folder.md) | Archivos estáticos, favicon, assets |
