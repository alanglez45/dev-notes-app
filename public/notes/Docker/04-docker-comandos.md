# Docker — Comandos esenciales

## docker ps

```bash
docker ps
```

Lista los contenedores **en ejecución**. Muestra ID, nombre, imagen, estado, puertos mapeados y tiempo activo.

```bash
docker ps -a
```

Lista **todos** los contenedores, incluyendo los detenidos. Útil para encontrar contenedores que ya terminaron pero siguen ocupando espacio.

```bash
docker ps -q
```

Muestra solo los IDs numéricos. Útil para usar en combinación con otros comandos (ej. `docker stop $(docker ps -q)`).

## docker stop / start

```bash
docker stop <id_o_nombre>
```

Detiene un contenedor de forma controlada (envía SIGTERM y espera unos segundos antes de forzar el cierre).

```bash
docker start <id_o_nombre>
```

Inicia un contenedor que estaba detenido. Los datos dentro del contenedor se conservan.

## docker rm

```bash
docker rm <id_o_nombre>
```

Elimina un contenedor. Debe estar detenido primero.

```bash
docker rm -f <id_o_nombre>
```

Fuerza la eliminación incluso si el contenedor está en ejecución.

```bash
docker container prune
```

Elimina todos los contenedores detenidos de una sola vez.

## docker logs

```bash
docker logs <id_o_nombre>
```

Muestra los logs (salida estándar y de error) de un contenedor.

```bash
docker logs -f <id_o_nombre>
```

Muestra los logs en **tiempo real** (follow), similar a `tail -f`. Útil para debug mientras la app está corriendo.

```bash
docker logs --tail 50 <id_o_nombre>
```

Muestra solo las últimas 50 líneas.

## docker exec

```bash
docker exec -it <id_o_nombre> sh
```

Ejecuta un comando **dentro de un contenedor que ya está corriendo**. Es como abrir una terminal dentro del contenedor.

- `-i` — interactivo (mantiene STDIN abierto).
- `-t` — asigna un pseudo-TTY (terminal).
- `sh` — abre una shell. También funciona `bash` si la imagen lo tiene.

Útil para inspeccionar archivos, variables de entorno o procesos dentro del contenedor.

```bash
docker exec <id> cat /app/.env
docker exec <id> ls -la
```

## docker images

```bash
docker images
```

Lista las imágenes disponibles localmente (las que construiste y las descargadas).

```bash
docker rmi <imagen_id>
```

Elimina una imagen. Si hay contenedores que la usan, debes eliminarlos primero.

## docker pull / push

```bash
docker pull node:22-alpine
```

Descarga una imagen de Docker Hub (o cualquier registry configurado) sin ejecutarla.

```bash
docker push usuario/mi-api
```

Sube una imagen a un registry (Docker Hub, AWS ECR, etc.). La imagen debe estar etiquetada con el nombre del registry.

## docker inspect

```bash
docker inspect <id_o_nombre>
```

Muestra información detallada de un contenedor o imagen en formato JSON: configuración, red, variables de entorno, montajes, etc.

## docker system

```bash
docker system df
```

Muestra el uso de espacio en disco de Docker: imágenes, contenedores, volúmenes y build cache. Útil para diagnosticar por qué Docker ocupa tanto espacio.

```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         2         2.1GB     1.3GB (62%)
Containers      8         1         50MB      45MB (90%)
Local Volumes   3         1         500MB     200MB (40%)
Build Cache     -         -         300MB     300MB
```

```bash
docker system prune
```

Elimina contenedores detenidos, redes no usadas, imágenes colgantes y build cache.

```bash
docker system prune -a
```

Más agresivo: también elimina imágenes **no usadas** (no solo las colgantes). Libera la mayor cantidad de espacio posible.
