# Docker — Dockerfile

## ¿Qué es un Dockerfile?

Un Dockerfile es un archivo de texto que contiene las instrucciones para construir una **imagen** de Docker. Esa imagen es una plantilla reutilizable que incluye todo lo necesario para ejecutar una aplicación: sistema operativo base, dependencias, librerías, archivos de código y comandos de inicio.

A continuación se explica cada instrucción de un Dockerfile típico para una aplicación Node.js.

### FROM — Imagen base

```dockerfile
FROM node:22-alpine
```

Toda imagen parte de una **imagen base**. En este caso usamos `node:22-alpine`, una imagen oficial de Node.js versión 22. El sufijo `alpine` indica que utiliza Alpine Linux, una distribución extremadamente liviana que mantiene la imagen pequeña y eficiente. Esto se traduce en builds más rápidos y menos espacio en disco.

### WORKDIR — Directorio de trabajo

```dockerfile
WORKDIR /app
```

Define el **directorio de trabajo** dentro del contenedor. Si la carpeta no existe, Docker la crea automáticamente. Todas las instrucciones posteriores (`COPY`, `RUN`, `CMD`) se ejecutarán dentro de esta carpeta. No es necesario que tu proyecto local tenga una carpeta llamada `app`; esto es interno del contenedor.

### COPY — Copiar archivos al contenedor

```dockerfile
COPY package*.json .
```

Copia `package.json` y `package-lock.json` del host al directorio de trabajo del contenedor. El `.` al final significa "aquí, en el WORKDIR actual". Es buena práctica copiar primero solo los archivos de dependencias para aprovechar el **sistema de capas** de Docker: si no cambian, esta capa se reutiliza de la caché en builds posteriores.

### RUN — Ejecutar comandos durante el build

```dockerfile
RUN npm install
```

Ejecuta un comando dentro del contenedor durante la construcción de la imagen. En este caso instala todas las dependencias definidas en `package.json`. El `node_modules` resultante queda dentro del contenedor, aislado del sistema host.

### COPY — Copiar el resto del proyecto

```dockerfile
COPY . .
```

Copia el resto de los archivos del proyecto (código fuente, rutas, controladores, etc.) al contenedor. Se hace después de instalar dependencias para que los cambios en el código no invaliden la caché de `npm install`.

### EXPOSE — Exponer puertos

```dockerfile
EXPOSE 3000
```

**Documenta** que la aplicación usará el puerto 3000. Es una declaración informativa: no publica el puerto por sí sola. Sirve como documentación para quien use la imagen y como referencia para el mapeo de puertos en tiempo de ejecución.

La publicación real del puerto se hace al ejecutar el contenedor con `-p`.

### CMD — Comando de inicio

```dockerfile
CMD ["npm", "start"]
```

Define el comando que se ejecutará cuando el contenedor se inicie. Cada palabra del comando va como un elemento separado del arreglo (formato exec). También se podría escribir como `CMD npm start` (formato shell), pero el formato exec es más predecible y seguro.

### Dockerfile completo

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## Construir la imagen

### docker build

`docker build` procesa el Dockerfile y genera una imagen. Lee las instrucciones línea por línea y crea una **capa** por cada instrucción, lo que permite cachear y reutilizar capas inmutables en builds futuros.

```bash
docker build -t mi-api .
```

Desglose del comando:

- `docker build` — construye la imagen a partir de un Dockerfile.
- `-t mi-api` — asigna un nombre (tag) a la imagen. Sin tag, la imagen se identifica solo por un ID.
- `.` — el **contexto de construcción**. Docker empaqueta todo el contenido del directorio actual y lo envía al demonio para construir la imagen. Por eso es importante tener un `.dockerignore` para excluir archivos innecesarios.

### Caché de capas

Cada instrucción del Dockerfile genera una capa. Docker cachea cada capa y si una instrucción no ha cambiado entre builds, reutiliza la capa cacheada. Por eso se copia `package*.json` antes que el resto del código: si solo cambias el código fuente, `npm install` no se vuelve a ejecutar.

### Ver las imágenes disponibles

```bash
docker images
```

```
REPOSITORY   TAG      IMAGE ID       CREATED         SIZE
mi-api       latest   a1b2c3d4e5f6   2 minutes ago   180MB
```

`docker images` lista todas las imágenes almacenadas localmente, incluyendo las que construiste y las que descargaste de registries como Docker Hub.

## .dockerignore

Funciona como `.gitignore`: excluye archivos del **contexto de build** para que no se envíen al demonio de Docker. Esto acelera el build y reduce el tamaño de la imagen final.

```dockerignore
node_modules
.git
.env
.env.local
*.log
dist
.vscode
.DS_Store
```

Cada línea es un patrón de archivo o carpeta que Docker ignorará al construir.
