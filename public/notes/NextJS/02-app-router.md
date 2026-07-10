# App Router

El **App Router** es el sistema de enrutamiento moderno de Next.js 14, basado en la carpeta `app/`. Soporta Server Components, layouts anidados y nuevas formas de obtener datos.

## Archivos Reservados

| Archivo | Descripción |
|---|---|
| `page.tsx` | Define el contenido de la página para una ruta específica |
| `layout.tsx` | Layout que envuelve las páginas, persiste entre navegaciones |
| `loading.tsx` | UI de carga mientras se obtienen datos |
| `error.tsx` | UI de error (con botón reset) |
| `not-found.tsx` | UI para rutas no encontradas (404) |

## Estructura de Carpetas

Cada carpeta representa un segmento de la URL:

```
app/
  page.tsx              → /
  layout.tsx            → Layout raíz (envuelve todo)
  products/
    page.tsx            → /products
    [id]/
      page.tsx          → /products/:id
```

La URL `/products/new` corresponde a la carpeta `products/new/` con un archivo `page.tsx` dentro.

## Layouts

Un **layout** es un componente que envuelve páginas y persiste entre navegaciones (no se re-renderiza al cambiar de página).

```tsx
// app/layout.tsx — Layout raíz
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <header>Header global</header>
                {children}
                <footer>Footer global</footer>
            </body>
        </html>
    );
}
```

### Layouts anidados

```
app/
  layout.tsx           → Layout raíz (global)
  shop/
    layout.tsx         → Layout solo para /shop/*
    page.tsx           → /shop
```

```tsx
// app/shop/layout.tsx
export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="shop-layout">
            <aside>Sidebar de la tienda</aside>
            <main>{children}</main>
        </div>
    );
}
```

## Rutas Dinámicas

Crea una carpeta con `[param]` para rutas dinámicas. El parámetro se accede via `params`:

```
app/
  users/
    page.tsx            → /users
    [userId]/
      page.tsx          → /users/:userId
```

```tsx
// app/users/[userId]/page.tsx
export default async function UserPage({ params }: { params: { userId: string } }) {
    const user = await getUser(params.userId);
    return <div>Usuario: {user.name}</div>;
}
```

## Estructura de proyecto

El App Router necesita una carpeta `app`, pero puede estar dentro de `src/`.

### Sin `src/` (estructura plana)

```
mi-proyecto/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── contacto/
│   │   └── page.tsx
│   ├── precios/
│   │   └── page.tsx
│   └── api/
│       └── contacto/
│           └── route.ts
│
├── components/
├── hooks/
├── lib/
├── services/
├── utils/
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── .env
```

### Con `src/` (recomendado)

```
mi-proyecto/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   ├── precios/
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── contacto/
│   │           └── route.ts
│   │
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── styles/
│
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── .env
```

### Global styles

Los estilos globales se definen en `globals.css` y se importan únicamente en el layout raíz (`app/layout.tsx`). No se pueden importar en otros componentes o layouts.
