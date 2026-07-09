# Server Components

En Next.js 14, **todos los componentes son Server Components por defecto**. Se ejecutan en el servidor, no en el navegador.

## Ventajas

- **Menos JavaScript** enviado al cliente
- **Carga de datos más rápida** — acceso directo a bases de datos, APIs y sistema de archivos
- **Mayor seguridad** — código sensible (tokens, queries) nunca llega al navegador

## Ejemplo

```tsx
// Este componente se ejecuta en el servidor
export default async function ProductList() {
    const products = await db.product.findMany();

    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    );
}
```

Los Server Components pueden ser `async` y hacer fetch directamente sin necesidad de `useEffect`.

## Limitaciones

- No pueden usar hooks (useState, useEffect, useRouter, etc.)
- No pueden manejar eventos del lado del cliente (onClick, onSubmit)
- No pueden acceder a APIs del navegador (localStorage, window, document)
- No pueden usar context que dependa de estado del cliente
