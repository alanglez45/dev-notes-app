# Public Folder

La carpeta `public/` contiene **archivos estáticos** que se sirven directamente en la raíz del sitio.

## Favicon

Si colocas un archivo `favicon.ico` en `public/`, Next.js lo detecta automáticamente y lo sirve sin configuración adicional.

## Uso

Los archivos en `public/` se referencian desde la raíz (`/`):

```
public/
  images/
    logo.png
  favicon.ico
  robots.txt
  sitemap.xml
  data/
    products.json
```

```tsx
// Sin importar, solo la ruta desde /
<img src="/images/logo.png" alt="Logo" />

// O con Image component
import Image from 'next/image';
<Image src="/images/logo.png" alt="Logo" width={200} height={100} />
```

## Archivos comunes

- `favicon.ico` / `favicon.svg` — icono del sitio (auto-detectado)
- `robots.txt` — configuración para crawlers de buscadores
- `sitemap.xml` — mapa del sitio para SEO
- `og-image.png` — imagen para Open Graph en redes sociales
- `fonts/` — fuentes auto-hospedadas
- `data/` — datos JSON estáticos (ej. generados en build)
