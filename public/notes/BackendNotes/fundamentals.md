# Node.js Fundamentals

Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser.

Since JavaScript is single-threaded, Node.js operates in a single process.

## Non-blocking I/O model

Non-blocking I/O means that I/O operations (like reading files, querying a database, or making network requests) don't stop the execution of your program.
- When an I/O operation is initiated, Node.js doesn't wait for it to complete.
- Instead, it registers a callback (or uses Promises/async-await), and moves on to the next task.
- Once the I/O operation finishes, the callback is put in the event queue, and the event loop picks it up when it's time.

Node.js is single-threaded by default, but Worker Threads allow you to run CPU-intensive JavaScript operations in parallel without blocking the main event loop.

## Why Use Worker Threads?

Node.js runs JavaScript in a single main thread (the Event Loop).
Problem: Heavy computations (e.g., data processing, encryption, AI) block the main thread, making the app unresponsive.
Solution: Worker Threads let you run CPU-heavy tasks in parallel without freezing the app.

## The V8 JavaScript Engine

V8 is a high-performance JavaScript and WebAssembly engine developed by Google, written in C++.
It's the core technology behind Node.js, Chrome, and Edge, primarily used to execute JavaScript code.

## NVM (Node.js Version Manager)

Using nvm makes it easier to install and manage multiple versions of Node.js on a single local environment.

## Project manifest (package.json)

A package.json file is a manifest of your project that contains metadata about the project, project's name, description, author, dependencies, scripts, and other settings required to manage and run the application.

Create this file:
```
npm init
```
Command above will ask you to answer some questions to specify base metadata of you project to generate package.json file.
```
npm init -y
```
You can add -y flag in the end of the command to skip this questions and use default metadata for you project.

## Scripts

The "scripts" section lets you define command-line shortcuts for tasks you frequently run — like starting your app, running tests, building assets, or restarting servers.
```
npm start
npm test
```
```
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest",
  "build": "webpack --mode production",
  "lint": "eslint ."
}
```

## Dependencies

Dependencies are the external packages your project needs to run properly in production.

To install all the dependencies from the package.json file you need to run the following command:
```
npm install
```

## Managing dependencies

- Regular dependency (runtime):
```
npm install express
```
- Development-only dependency:
```
npm install --save-dev nodemon
```
- Removing Dependencies
```
npm uninstall nodemon
```

## Dependencias útiles

Herramientas que facilitan el desarrollo en Node.js.

### nodemon
Reinicia automáticamente la aplicación cuando detecta cambios en los archivos del proyecto.
```
npm install -g nodemon
```

### alternativa a nodemon (commando) sin instalar nodemon
Node.js tiene un flag nativo `--watch` que reinicia el proceso al detectar cambios.
```
node --watch index.js
```

## ESM (ECMAScript) modules

Si añades "type": "module" al archivo packge.json, node.js cambia el comportamiento y comienza a tratar los archivos .js como módulos ECMAScript (ESM).
Podrás usar la sintaxis moderna de import y export.

## NPM COMMANDS

| Comando | Descripción |
|---------|-------------|
| `npm init` | inicializar proyecto con configuración |
| `npm init -y` | saltar configuración |
| `command + k` | limpiar la terminal |
| `npm list -g` | listar paquetes globales |
| `npm outdated` | listar paquetes desactualizados |
| `npm install express` | instalar dependencia |
| `npm install express@1.0.0` | instalar version especifica de dependencia |
| `npm install package1 package2` | instalar multiples paquetes de dependencias |
| `npm install express mongoose cors` | instalar multiples paquetes |
| `npm update slugify` | actualizar paquete |
| `npm uninstall express` | desinstalar dependencias |
| `npm install -g package1 package2` | instalar dependencia global |
| `npm install eslint prettier -D` | instalar dependencia de desarrollo |
| `npm install eslint --save-dev` | instalar dependencia de desarrollo |
| `npm install axios lodash -S eslint jest -D` | combinar dependencias |
| `-S` (or no flag) installs as dependencies. | |
| `-D` installs as devDependencies. | |

## NPX (Node Package Execute)

With npx you can execute your package without installation.
```
npx <module>
```

Kill ports
```
npx kill-port 4000
```

## Variables de entorno

Las variables de entorno se acceden a través de `process.env` y se usan para almacenar configuración sensible o específica del entorno (como claves de API, credenciales de BD, etc.).

Imprimir variables de entorno
```
console.log(process.env);
```
