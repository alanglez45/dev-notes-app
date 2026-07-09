# Data Fetching en Server Components

En Next.js 14, al usar Server Components, **ya no necesitas `useEffect` para consumir APIs**. Puedes crear funciones `async` fuera del componente y usarlas directamente dentro.

## Patrón recomendado

```tsx
// La función fetch se define fuera del componente
async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error('Error al obtener posts');
    return res.json();
}

// El componente es async y espera los datos
export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

## Data Fetching en Layouts

```tsx
async function getCategories() {
    const res = await fetch('/api/categories');
    return res.json();
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
    const categories = await getCategories();

    return (
        <div>
            <nav>
                {categories.map(cat => (
                    <Link key={cat.id} href={`/shop/${cat.slug}`}>{cat.name}</Link>
                ))}
            </nav>
            {children}
        </div>
    );
}
```

## Caching y Revalidación

Por defecto, `fetch` en Server Components cachea los resultados automáticamente.

```tsx
// Sin cache — siempre datos frescos
fetch(url, { cache: 'no-store' });

// Revalidación por tiempo (segundos)
fetch(url, { next: { revalidate: 60 } });

// Tag para revalidación manual
fetch(url, { next: { tags: ['products'] } });
```

## Loading y Error States

Crea archivos en la misma carpeta de la ruta para manejar estados automáticamente:

```
products/
  page.tsx         → Contenido de la página
  loading.tsx      → UI mientras carga (Suspense automático)
  error.tsx        → UI cuando hay error
```

```tsx
// loading.tsx
export default function Loading() {
    return <div>Cargando productos...</div>;
}

// error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div>
            <h2>Error al cargar</h2>
            <button onClick={reset}>Reintentar</button>
        </div>
    );
}
```

## Fetch paralelo

```tsx
export default async function Page() {
    // Las promesas se ejecutan en paralelo
    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ]);

    return <div>...</div>;
}
```
