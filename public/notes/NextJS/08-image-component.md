# Image Component

Next.js provee el componente `<Image>` que **optimiza imágenes automáticamente**: compresión, lazy loading, formatos modernos (WebP/AVIF) y soporte responsive.

## Uso básico

```tsx
import Image from 'next/image';

export default function Page() {
    return (
        <Image
            src="/hero.jpg"
            alt="Hero image"
            width={1200}
            height={600}
        />
    );
}
```

## Características

- **Lazy loading** por defecto — solo carga cuando la imagen entra en el viewport
- **Compresión automática** y conversión a WebP/AVIF
- **Aspect ratio correcto** — se define con `width` y `height`
- **Carga extremadamente rápida** gracias a la optimización en build time

## Atributos importantes

| Atributo | Descripción |
|---|---|
| `src` | Ruta de la imagen (local en `/public` o URL externa) |
| `alt` | Texto alternativo (obligatorio) |
| `width` / `height` | Dimensiones para aspect ratio correcto |
| `sizes` | Define tamaños para diferentes viewports |
| `priority` | Prioriza carga (above the fold, desactiva lazy loading) |
| `placeholder="blur"` | Muestra un placeholder borroso mientras carga |
| `className` | Clases CSS para estilizar |

```tsx
<Image
    src="/hero.jpg"
    alt="Hero"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority
    placeholder="blur"
/>
```

## Imágenes externas

Para usar imágenes de dominios externos, debes configurarlos en `next.config.ts`:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'upload.wikipedia.org' },
            { hostname: 'images.unsplash.com' },
        ],
    },
};

export default nextConfig;
```

Sin esta configuración, Next.js bloqueará las imágenes de orígenes externos por seguridad.

## Imágenes locales (import)

Para imágenes locales, Next.js detecta automáticamente las dimensiones:

```tsx
import logo from './logo.png';

export default function Header() {
    return <Image src={logo} alt="Logo" placeholder="blur" />;
}
```
