# Next.js

Next.js is a React framework for building full-stack web applications. It extends React with features like server-side rendering, routing, and more.

## Installation

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

## Commands

| Command | Description |
|---|---|
| `npx create-next-app@latest` | Crear un nuevo proyecto |
| `next dev` (o `npm run dev`) | Iniciar servidor de desarrollo |
| `next build` (o `npm run build`) | Compilar para producción |
| `next start` (o `npm start`) | Iniciar servidor de producción |
| `next lint` (o `npm run lint`) | Ejecutar ESLint |

## Routing

Desde la versión 13 de Next.js existen dos sistemas de rutas:

### Pages Router (sistema anterior)

Sistema de enrutamiento basado en archivos dentro de la carpeta `pages/`. Next.js genera automáticamente las rutas según la estructura de archivos.

```
pages/
  index.js       → /
  about.js       → /about
  products/
    index.js     → /products
    [id].js      → /products/:id
```

### App Router (nuevo, recomendado)

Nuevo sistema de enrutamiento basado en la carpeta `app/`. Soporta Server Components, layouts anidados, y nuevas formas de obtener datos. Es más flexible que Pages Router. Las nuevas características de Next.js se añaden al App Router, no al Pages Router. Para nuevos proyectos se recomienda usar App Router.

## Archivos Reservados en Next.js 14

| Archivo | Descripción |
|---|---|
| `page.tsx` | Define el contenido de la página para una ruta específica |
| `layout.tsx` | Define un layout que envuelve las páginas, persiste entre navegaciones |

## Estructura de Carpetas

Cada carpeta representa un segmento de la URL.

```
app/
  page.tsx              → /
  layout.tsx            → Layout raíz (envuelve todo)
  products/
    page.tsx            → /products
    new/
      page.tsx          → /products/new
```

Ejemplo: la URL `/products/new` corresponde a la carpeta `products/new/` con un archivo `page.tsx` dentro.

## React Server Components

Por defecto, todos los componentes en Next.js son **Server Components**. Se ejecutan en el servidor, no en el navegador. Esto significa que pueden acceder directamente a bases de datos, archivos, y APIs sin exponer lógica sensible al cliente.

Ventajas:
- Menos JavaScript enviado al cliente
- Carga de datos más rápida (directo desde el servidor)
- Mayor seguridad (código sensible nunca llega al navegador)

## Client Components

Cuando un componente necesita interactividad (useState, useEffect, onClick, etc.), debe marcarse como **Client Component** agregando `'use client'` al inicio del archivo.

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Turbopack

Turbopack es el bundler incremental de Next.js, sucesor de Webpack. Está escrito en Rust y es significativamente más rápido. Se usa automáticamente con `npm run dev` en proyectos creados con create-next-app.

## Metadata y Metatags

Next.js tiene una API integrada para manejar metadatos (title, description, Open Graph, etc.) sin necesidad de librerías externas.

```tsx
// En un Server Component
export const metadata = {
    title: 'Mi Página',
    description: 'Descripción de mi página',
};

// O dinámicamente
export async function generateMetadata({ params }) {
    const product = await getProduct(params.id);
    return {
        title: product.name,
        description: product.description,
    };
}
```

## Layouts y Layouts Anidados

Un **layout** es un componente que envuelve páginas y persiste entre navegaciones (no se re-renderiza al cambiar de página).

```tsx
// app/layout.tsx — Layout raíz
export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <header>Mi Header</header>
                {children}
                <footer>Mi Footer</footer>
            </body>
        </html>
    );
}
```

Los layouts se pueden anidar. Por ejemplo, un layout para la sección de productos:

```
app/
  layout.tsx           → Layout raíz
  products/
    layout.tsx         → Layout solo para rutas /products/*
    page.tsx           → /products
```

## Tailwind CSS

Next.js incluye soporte integrado para Tailwind CSS al crearlo con la opción correspondiente. Tailwind es un framework CSS de tipo utility-first que permite escribir estilos directamente en el HTML/JSX usando clases predefinidas.

```tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Click me
</button>
```

## Next Link

El componente `<Link>` permite navegación entre páginas del lado del cliente sin recargar el navegador (similar a React Router).

```tsx
import Link from 'next/link';

export default function Navigation() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
        </nav>
    );
}
```

## usePathname Hook

Hook que devuelve la ruta actual de la URL. Útil para estilos activos en navegación, breadcrumbs, etc. Solo funciona en Client Components.

```tsx
'use client';

import { usePathname } from 'next/navigation';

export default function ActiveLink({ href, children }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? 'active' : ''}>
            {children}
        </Link>
    );
}
```
