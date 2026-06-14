# Importaciones y exportaciones

## ESM (ECMAScript) modules

```
//package.json
{
    "name": "index",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1"
    }
}
```

Si añades "type": "module" al archivo packge.json, node.js cambia el comportamiento y comienza a tratar los archivos .js como módulos ECMAScript (ESM).
Podrás usar la sintaxis moderna de import y export.

```
import fs from 'fs';
export function greet() {
    console.log('Hola Mundo');
}
```

## CommonJS

Sin "type": "module": Los archivos .js se tratan como módulos CommonJS.
Usas require para importar módulos y module.exports para exportar.

```
const fs = require('fs');
module.exports = function greet() {
  console.log('Hola Mundo');
};
```

