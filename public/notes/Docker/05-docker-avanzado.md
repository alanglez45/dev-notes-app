# Docker — Avanzado

## Volúmenes

Los contenedores son efímeros: cuando se eliminan, los datos que contienen se pierden. Los **volúmenes** permiten persistir datos fuera del ciclo de vida del contenedor.

### Tipos de montajes

**Named volumes** — administrados por Docker:
```bash
docker run -v mi-volumen:/app/data mi-api
```
Docker crea y gestiona el volumen. Los datos persisten incluso si eliminas el contenedor.

**Bind mounts** — carpeta del host montada directamente:
```bash
docker run -v $(pwd):/app mi-api
```
Monta el directorio actual del host en `/app` del contenedor. Útil para desarrollo porque los cambios locales se reflejan al instante.

**tmpfs mounts** — en memoria (solo Linux):
```bash
docker run --tmpfs /app/temp mi-api
```
Datos temporales que se pierden al detener el contenedor.

### docker volume

```bash
docker volume ls
docker volume create mi-volumen
docker volume rm mi-volumen
docker volume prune
```

## Redes

Cada contenedor tiene su propia interfaz de red. Docker ofrece varios **drivers de red** para controlar cómo se comunican los contenedores entre sí y con el exterior.

### Drivers

**bridge** (default)
Crea una red privada interna. Los contenedores en la misma red bridge pueden comunicarse entre sí por nombre. Aislados de contenedores en otras bridges.

```bash
docker network create mi-red
docker run -d --net mi-red --name api mi-api
docker run -d --net mi-red --name db postgres
# api puede conectarse a db usando el nombre "db"
```

**host**
El contenedor usa la red del host directamente. No hay aislamiento de red. Útil cuando necesitas máximo rendimiento de red.

**none**
Sin red. Contenedor completamente aislado.

### Comandos de red

```bash
docker network ls                    # listar redes
docker network create mi-red        # crear red personalizada
docker network connect mi-red api   # conectar contenedor a una red
docker network inspect mi-red       # ver detalles
docker network prune                # eliminar redes no usadas
```

## Docker Compose

Cuando una aplicación tiene múltiples servicios (API, base de datos, caché, cola de mensajes), manejarlos individualmente con `docker run` se vuelve tedioso. **Docker Compose** permite definir y ejecutar aplicaciones multi-contenedor con un solo archivo YAML.

### docker-compose.yml

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mi-app
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Comandos de Compose

```bash
docker compose up -d            # levantar todos los servicios
docker compose down             # detener y eliminar contenedores/redes
docker compose down -v          # lo mismo + elimina volúmenes
docker compose logs -f          # logs de todos los servicios
docker compose logs -f api      # logs de un servicio específico
docker compose ps               # estado de los servicios
docker compose exec api sh      # ejecutar comando en un servicio
docker compose build            # reconstruir imágenes
docker compose up -d --build    # reconstruir y levantar
```
