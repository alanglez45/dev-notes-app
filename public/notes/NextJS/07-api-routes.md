# API Routes (Route Handlers)

En Next.js 14 puedes crear **rutas de API** dentro de tu proyecto usando el App Router. Se definen con un archivo `route.ts` dentro de una carpeta.

## Estructura

```
app/
  api/
    products/
      route.ts        → GET /api/products
    products/
      [id]/
        route.ts      → GET /api/products/:id
```

## Métodos HTTP

```tsx
// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const products = await db.product.findMany();
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    const body = await request.json();
    const product = await db.product.create({ data: body });
    return NextResponse.json(product, { status: 201 });
}
```

## Rutas dinámicas en API

```tsx
// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const product = await db.product.findUnique({
        where: { id: params.id }
    });
    if (!product) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(product);
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const product = await db.product.update({
        where: { id: params.id },
        data: body
    });
    return NextResponse.json(product);
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    await db.product.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Producto eliminado' });
}
```

## Request y Response

Next.js usa las APIs estándar de Web (`Request` y `Response`) junto con `NextRequest` y `NextResponse` que agregan utilidades como cookies, headers y redirects.

```tsx
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    const token = request.cookies.get('token');

    return NextResponse.json({ query, authenticated: !!token });
}
```

## Revalidación desde API Routes

```tsx
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
    const body = await request.json();
    const product = await createProduct(body);
    revalidateTag('products'); // Invalida cache de fetch con ese tag
    return NextResponse.json(product, { status: 201 });
}
```
