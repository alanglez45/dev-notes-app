# Static y Dynamic Rendering

Next.js ofrece diferentes estrategias de renderizado según cómo y cuándo se genera el HTML.

## Static Rendering (SSG)

El HTML se genera **en build time**. Es la opción por defecto cuando haces fetch sin opciones especiales.

```tsx
// Static — se genera al hacer build
async function getPosts() {
    const res = await fetch('https://api.example.com/posts');
    return res.json();
}
```

### Características

- HTML generado una sola vez en tiempo de build
- Resultado cacheado y reutilizado en todas las peticiones
- Ideal para contenido que no cambia (blog, docs, landing pages)
- Máximo rendimiento y SEO

### Revalidación con ISR

Puedes mantener Static Rendering pero re-generar la página cada cierto tiempo:

```tsx
// ISR — Static pero se revalida cada 60 segundos
fetch(url, { next: { revalidate: 60 } });
```

## Dynamic Rendering (SSR)

El HTML se genera **en cada request**. Se activa automáticamente cuando usas:

- `fetch(url, { cache: 'no-store' })`
- `headers()` o `cookies()` en un Server Component
- `dynamic = 'force-dynamic'` en el layout/page

```tsx
// Dynamic — se genera en cada petición
async function getPosts() {
    const res = await fetch('https://api.example.com/posts', {
        cache: 'no-store',
    });
    return res.json();
}
```

### Características

- HTML generado por cada request
- Datos siempre frescos
- Mayor latencia que Static
- Ideal para contenido personalizado o que cambia frecuentemente

## Resumen

| Estrategia | Método | Cuándo usarlo |
|---|---|---|
| **Static (SSG)** | `fetch(url)` (por defecto) | Contenido que no cambia |
| **ISR** | `fetch(url, { next: { revalidate: N } })` | Contenido que cambia ocasionalmente |
| **Dynamic (SSR)** | `fetch(url, { cache: 'no-store' })` | Contenido que cambia en cada request |
