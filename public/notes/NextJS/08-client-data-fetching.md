# Data Fetching en el Cliente

Cuando necesitas obtener datos del lado del cliente (en un Client Component), tienes dos opciones principales.

## useState + useEffect

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando...</div>;

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

## React Query (TanStack Query)

Alternativa más robusta que el manejo manual con hooks. Ofrece caché, revalidación, refetch automático, y menos boilerplate.

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export default function PostsList() {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetch('/api/posts').then(res => res.json()),
    });

    if (isLoading) return <div>Cargando...</div>;

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

## Desventajas del fetching en cliente

| Problema | Descripción |
|---|---|
| **Bundles grandes** | El código de fetching y las librerías (React Query, etc.) se envían al navegador |
| **Resource intensive** | El cliente hace peticiones HTTP, consume batería y datos móviles |
| **No SEO** | Los datos no están disponibles en el HTML inicial (renderizado en blanco hasta que JS carga y fetch termina) |
| **API keys expuestas** | Cualquier secreto en el cliente es visible en las DevTools |

## Recomendación

Siempre que sea posible, usa **Server Components** para fetching. El fetching en cliente solo cuando no hay alternativa (eventos del usuario, polling en tiempo real, datos que cambian sin recargar página).
