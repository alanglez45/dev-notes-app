# Package.json

El archivo package.json es esencial en cualquier proyecto Node.js o que utilice el gestor de paquetes npm. Este archivo define la configuración del proyecto, sus dependencias y scripts, y permite que otras personas (o servidores) puedan trabajar con el proyecto de manera consistente.

## Metadatos básicos del proyecto

name: Nombre del proyecto (único si se publica en npm).
version: Versión del proyecto según el estándar SemVer.
description: Breve descripción del proyecto.
author: Información del autor o equipo (opcional).
license: Licencia del proyecto (por ejemplo, MIT o ISC).

```
{
    "name": "mi-proyecto",
    "version": "1.0.0",
    "description": "Un ejemplo básico de package.json",
    "author": "Alan",
    "license": "MIT"
}
```

Al crear un nuevo proyecto con npm init, se lanzará un asistente que tras algunas preguntas, crea un archivo llamado package.json en la carpeta raíz del proyecto, donde coloca toda la información que se conoce sobre el mismo.

```
npm init -y
```

Este comando omitirá el asistente y creará el archivo package.json.

```
{
    "name": "frontend-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
```

## Dependencias del proyecto

### Dependencias normales (dependencies)

Estas son las librerías o módulos que tu aplicación necesita para ejecutarse en producción.
Se especifican en el archivo package.json dentro de la sección "dependencies".

```
npm install express
```

Resultado en package.json:
```
"dependencies": {
  "express": "^4.18.2"
}
```

### Dependencias de desarrollo (devDependencies)

Estas son librerías que solo se necesitan durante la etapa de desarrollo, no para que el programa funcione en producción.
Se especifican en el archivo package.json dentro de "devDependencies".
Ejemplo: Herramientas como eslint, jest o webpack son útiles para desarrollar, probar y compilar, pero no para ejecutar la aplicación final.

```
npm install eslint --save-dev
```

Resultado en package.json:
```
"devDependencies": {
  "eslint": "^8.45.0"
}
```

### Dependencias globales

En Node.js, las dependencias globales son paquetes instalados con el comando npm install -g. Estas dependencias se instalan en el sistema de manera global, lo que significa que están disponibles desde cualquier lugar en tu máquina, sin necesidad de estar vinculadas a un proyecto específico.
