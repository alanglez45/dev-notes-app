# Client Components

Cuando un componente necesita **interactividad** (hooks, eventos, APIs del navegador), debe marcarse como **Client Component** agregando `'use client'` al inicio del archivo.

## Directiva 'use client'

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## ¿Cuándo usar Client Components?

- Manejo de estado (useState, useReducer)
- Efectos secundarios (useEffect)
- Eventos del usuario (onClick, onChange, onSubmit)
- Hooks de navegación (usePathname, useRouter, useParams)
- APIs del navegador (localStorage, IntersectionObserver, window)
- Contextos que usan estado del lado del cliente

## Buenas prácticas

Mantén los Client Components en las **hojas del árbol** de componentes. Un Server Component puede renderizar un Client Component, pero no al revés.

```
app/
  page.tsx              → Server Component (contiene datos)
    ProductCard.tsx     → Client Component (tiene interactividad)
```

## Server Components dentro de Client Components

Puedes pasar Server Components como `children` a un Client Component:

```tsx
// ClientComponent.tsx
'use client';
export default function ClientComponent({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return <div onClick={() => setIsOpen(!isOpen)}>{children}</div>;
}

// page.tsx (Server Component)
import ClientComponent from './ClientComponent';
import ServerProductList from './ServerProductList';

export default function Page() {
    return (
        <ClientComponent>
            <ServerProductList /> {/* Esto sigue siendo Server Component */}
        </ClientComponent>
    );
}
```
