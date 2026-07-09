# Docker — Introducción

## ¿Qué es Docker?

Docker es una plataforma que permite empaquetar una aplicación con todas sus dependencias en una unidad estandarizada llamada **contenedor**. El problema clásico que resuelve es el famoso "en mi máquina sí funciona": al contenerizar la aplicación, esta se comporta igual sin importar dónde se ejecute (local, servidor, nube).

A diferencia de una máquina virtual, un contenedor no incluye un sistema operativo completo. Comparte el kernel del host, lo que lo hace mucho más liviano y rápido de iniciar.

## Componentes de Docker

**Docker Engine** — El corazón de Docker. Es un runtime ligero y conjunto de herramientas que construye y administra contenedores.

**Docker CLI** (Command Line Interface) — Herramienta que permite al usuario interactuar con Docker directamente mediante comandos. Es donde se ingresan los comandos para interactuar con el demonio de Docker.

**Docker Desktop** (UI) — Aplicación diseñada para facilitar el flujo de trabajo del desarrollador, proporcionando una interfaz gráfica intuitiva para interactuar con Docker.

## Imagen vs Contenedor

| | Imagen | Contenedor |
|---|---|---|
| **Qué es** | Plantilla o molde | Instancia en ejecución |
| **Analogía** | Receta de cocina | Plato servido |
| **Estado** | Inmutable | Modificable efímero |
| **Persistencia** | Permanente | Temporal (se pierde al eliminar) |

La **imagen** contiene todo lo necesario: sistema base, dependencias, código y configuración. Es estática: una vez creada no cambia.

El **contenedor** es una instancia en ejecución creada a partir de una imagen. Tiene su propia memoria, procesos y sistema de archivos. Puedes crear múltiples contenedores desde una misma imagen.

### Flujo de trabajo

1. Escribes el **Dockerfile** con las instrucciones.
2. Ejecutas `docker build` → obtienes una **imagen**.
3. Ejecutas `docker run` → se crea y ejecuta un **contenedor** a partir de esa imagen.

Si modificas el código fuente, la imagen no se actualiza sola. Debes repetir el ciclo: `docker build` para generar una nueva imagen, y `docker run` para crear un nuevo contenedor.

## Docker Hub

Docker Hub es el registry público por defecto de Docker. Almacena y distribuye imágenes de contenedores.

Si ejecutas `docker run` o `docker pull` con una imagen que no existe localmente, Docker la busca automáticamente en Docker Hub y la descarga.

```bash
docker pull node:22-alpine       # descargar imagen oficial
docker pull nginx:latest         # descargar Nginx
docker tag mi-api usuario/mi-api:v1  # etiquetar para subir
docker push usuario/mi-api:v1    # subir a Docker Hub
```

Las imágenes se versionan con **tags**. `node:22-alpine` significa: imagen `node`, tag `22-alpine` (versión 22 con Alpine). `latest` es el tag por defecto si no se especifica uno.

## Licenciamiento

Docker Desktop solía ser gratuito para todos, pero desde agosto de 2021 cambió su modelo de licencia:

- **Docker Desktop** requiere suscripción paga para uso empresarial (empresas con más de 250 empleados o ingresos superiores a $10M USD).
- **Docker Engine** (el motor de línea de comandos) sigue siendo open source y gratuito bajo la licencia Apache 2.0.
- El uso personal, educativo y en proyectos open source sigue siendo gratuito en Docker Desktop.

### Opciones gratuitas

- Usar solo Docker Engine (CLI) sin Docker Desktop.
- Usar alternativas open source como Podman o Colima.

## Alternativas Open Source

### Podman

Podman es un motor de contenedores open source, diseñado como **drop-in replacement** de Docker. Desarrollado por Red Hat.

- Soporta Dockerfile y puede ejecutar imágenes de Docker sin conversión.
- **No requiere un daemon central**: cada contenedor se ejecuta como un proceso hijo directo, lo que mejora seguridad y simplicidad.
- **No necesita privilegios de root** para ejecutar contenedores.
- CLI casi idéntica a Docker (puedes usar `alias docker=podman`).
- Compatible con Docker Compose mediante `podman-compose`.

```bash
podman build -t mi-api .
podman run -d -p 3000:3000 mi-api
podman ps
```

### Colima

Colima es una alternativa ligera a Docker Desktop para macOS. Ejecuta contenedores usando Lima (máquinas virtuales) bajo el capó.

- No requiere Docker Desktop.
- Open source y gratuito.
- Compatible con la CLI de Docker.
- Soporta arquitectura ARM e Intel.

```bash
colima start      # inicia la VM
colima stop       # detiene la VM
```

### Otras alternativas

- **containerd** — runtime de contenedores usado internamente por Docker, también se puede usar directamente.
- **nerdctl** — CLI compatible con Docker para containerd.
- **Rancher Desktop** — alternativa multiplataforma que usa containerd y Kubernetes.

## Extensiones de VSCode

- **Docker** (Microsoft) — administrar contenedores, imágenes, Dockerfiles y Compose directamente desde el IDE.
- **Dev Containers** (Microsoft) — desarrollar dentro de contenedores usando VSCode remoto.
