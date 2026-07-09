# Docker — Ejecutar contenedores

## docker run

`docker run` crea un contenedor a partir de una imagen y lo ejecuta.

```bash
docker run mi-api
```

Lo que Docker hace internamente:
1. Busca la imagen `mi-api` localmente. Si no existe, la descarga de Docker Hub.
2. Crea un contenedor nuevo a partir de esa imagen.
3. Ejecuta el comando definido en `CMD` (ej. `npm start`).
4. La aplicación empieza a correr dentro del contenedor.

## Principales flags

### `-d` (detached)

```bash
docker run -d mi-api
```

Ejecuta el contenedor en **segundo plano**. Sin `-d`, los logs se muestran en la terminal y esta queda ocupada. Con `-d`, recuperas el control inmediatamente.

### `-p` (port mapping)

```bash
docker run -p 3000:3000 mi-api
```

Formato: `-p <puerto_host>:<puerto_contenedor>`

Conecta un puerto de tu computadora al puerto del contenedor. El contenedor tiene su propia red interna y no es accesible directamente desde el host. El mapeo crea un puente:

- `-p 3000:3000` → accedes desde `http://localhost:3000`
- `-p 8080:3000` → el contenedor sigue usando el 3000, pero accedes desde `http://localhost:8080`

### `--name`

```bash
docker run --name api mi-api
```

Asigna un nombre personalizado al contenedor. Si no se asigna, Docker genera uno aleatorio como `happy_einstein`. El nombre facilita administrarlo (logs, stop, rm).

### `--rm`

```bash
docker run --rm -p 5002:3000 02-node-web
```

Elimina el contenedor automáticamente cuando se detiene. Ideal para pruebas rápidas donde no necesitas conservar el contenedor después de usarlo.

### `-e` (environment variables)

```bash
docker run -d -p 5005:3000 -e SALUDO="Hola" --name web-env 02-node-web
```

Inyecta **variables de entorno** al contenedor. Útil para pasar configuraciones como API keys, URLs de base de datos o entornos (`NODE_ENV`).

### `--restart`

```bash
docker run -d --restart always --name api mi-api
```

Define la política de reinicio. Opciones comunes:
- `no` — no reiniciar (default).
- `always` — reiniciar siempre que se detenga.
- `on-failure` — reiniciar solo si termina con error.
- `unless-stopped` — reiniciar a menos que lo detengas explícitamente.

## Comando completo típico

```bash
docker run -d -p 3000:3000 --name api mi-api
```

Significa: "Crea un contenedor llamado `api`, usando la imagen `mi-api`, ejecútalo en segundo plano y conecta el puerto 3000 del contenedor con el puerto 3000 de mi computadora."
