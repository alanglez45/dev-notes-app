# Middleware

El **Middleware** en Next.js te permite ejecutar código antes de que se complete una petición. Es ideal para autenticación, redirecciones, headers, etc.

## Archivo

Se coloca en la raíz del proyecto como `middleware.ts`:

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Ejemplo: redirigir a login si no hay token
    const token = request.cookies.get('token');
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'],
};
```

## Cuándo usarlo

- **Autenticación** — proteger rutas, redirigir a login
- **Redirecciones** — por idioma, país, dispositivo
- **Headers** — modificar request/response headers
- **Geolocalización** — detectar país del usuario (Vercel)
- **A/B testing** — redirigir a variantes
- **Rate limiting** — controlar frecuencia de peticiones

## Matcher

El `matcher` define qué rutas ejecutan el middleware. Usa patrones de ruta:

```ts
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/((?!api|_next/static|favicon.ico).*)', // excluir archivos estáticos
    ],
};
```

El Middleware se ejecuta **antes** de que la petición llegue a la ruta, por lo que es muy eficiente y no afecta el rendimiento del renderizado.
