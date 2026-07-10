# Routing

Next.js tiene **dos sistemas de enrutamiento**: Pages Router (legado) y App Router (nuevo, recomendado).

## Pages Router (legado)

Sistema basado en archivos dentro de la carpeta `pages/`:

```
pages/
  index.js       → /
  about.js       → /about
  products/
    index.js     → /products
    [id].js      → /products/:id
```

## App Router (recomendado)

Sistema basado en la carpeta `app/` con Server Components y layouts:

```
app/
  page.tsx         → /
  layout.tsx       → Layout raíz
  products/
    page.tsx       → /products
    [id]/
      page.tsx     → /products/:id
```

## Link Component

El componente `<Link>` reemplaza a la etiqueta `<a>` para navegación del lado del cliente sin recargar la página:

```tsx
import Link from 'next/link';

export default function Navigation() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/products">Productos</Link>
            <Link href="/about">Sobre nosotros</Link>
        </nav>
    );
}
```

## usePathname Hook

Devuelve la ruta actual de la URL. Solo funciona en Client Components:

```tsx
'use client';

import { usePathname } from 'next/navigation';

export default function ActiveLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? 'active' : ''}>
            {children}
        </Link>
    );
}
```

## useRouter Hook

Para navegación programática:

```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LoginButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.push('/dashboard')}>
            Ir al dashboard
        </button>
    );
}
```

## useParams Hook

Para acceder a los parámetros de ruta en Client Components:

```tsx
'use client';

import { useParams } from 'next/navigation';

export default function ProductDetail() {
    const params = useParams<{ id: string }>();
    return <div>Producto ID: {params.id}</div>;
}
```

