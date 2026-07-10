# Metadata

Next.js tiene una API integrada para manejar **metadatos** (title, description, Open Graph, etc.) sin necesidad de librerías externas. Solo funciona en Server Components.

## Metadata estática

```tsx
export const metadata = {
    title: 'Mi Página',
    description: 'Descripción de mi página',
};
```

## Metadata dinámica

```tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);
    return {
        title: product.name,
        description: product.description,
    };
}
```

## Open Graph y más

```tsx
export const metadata = {
    title: 'Mi Página',
    description: 'Descripción',
    openGraph: {
        title: 'Mi Página en redes',
        description: 'Descripción para redes sociales',
        images: ['/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
    },
};
```

## Metadata por ruta

Cada `page.tsx` puede tener su propia metadata. Los valores definidos en el layout padre sirven como **fallback** para las páginas hijas. Si la página define un campo, sobrescribe al del layout.

```tsx
// app/layout.tsx — valores por defecto
export const metadata = {
    title: 'Mi Sitio',
    description: 'Descripción global',
};

// app/products/page.tsx — sobrescribe title, hereda description
export const metadata = {
    title: 'Productos',
};
```

Para títulos con formato, usa `title.template` en el layout:

```tsx
// app/layout.tsx
export const metadata = {
    title: { default: 'Mi Sitio', template: '%s | Mi Sitio' },
};

// app/products/page.tsx → renderiza "Productos | Mi Sitio"
export const metadata = {
    title: 'Productos',
};
```
