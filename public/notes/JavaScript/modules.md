# JavaScript Modules

Los módulos permiten organizar y dividir el código en partes reutilizables y mantenibles. Un módulo es un archivo que puede contener funciones, variables, objetos o clases, y se puede importar y exportar en otros archivos.

## ES Modules

Nativos de JavaScript, funcionan en navegadores modernos y Node.js.

```js
<script src="./js/17-modules.js" type="module"></script>
```

### exports.js

```js
export const heroes = [
    {
        id: 1,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Superman',
        owner: 'DC'
    },
    {
        id: 4,
        name: 'Flash',
        owner: 'DC'
    },
    {
        id: 5,
        name: 'Wolverine',
        owner: 'Marvel'
    },
];

export function sumar(a, b) {
    console.log(a + b);
}

export default function Multiplicar(a, b) {
    console.log(a * b);
}

/*
export {
    sumar,
    heroes
}
*/
```

### app.js

```js
import Multiplicar, { heroes, sumar } from "../js/17-exports.js";

console.log(heroes); // (5) [{…}, {…}, {…}, {…}, {…}]
console.log(heroes[0].name); // Batman
sumar(2, 2); // 4
Multiplicar(6, 6); // 36
```

## CommonJS

Sistema de módulos utilizado principalmente en Node.js.

### exports.js

```js
const heroes = [
    { id: 1, name: 'Batman', owner: 'DC' },
    { id: 2, name: 'Spiderman', owner: 'Marvel' },
    { id: 3, name: 'Superman', owner: 'DC' },
    { id: 4, name: 'Flash', owner: 'DC' },
    { id: 5, name: 'Wolverine', owner: 'Marvel' },
];

function sumar(a, b) {
    console.log(a + b);
}

function Multiplicar(a, b) {
    console.log(a * b);
}

module.exports = {
    heroes,
    sumar,
    Multiplicar,
};
```

### app.js

```js
const { heroes, sumar, Multiplicar } = require('./exports');

console.log(heroes);
console.log(heroes[0].name); // Batman
sumar(2, 2); // 4
Multiplicar(6, 6); // 36
```

## Diferencia clave

| ES Modules | CommonJS |
|---|---|
| `export` / `import` | `module.exports` / `require()` |
| Estático (las importaciones se analizan en tiempo de compilación) | Dinámico (se evalúa en tiempo de ejecución) |
| `import` es asíncrono | `require()` es síncrono |
| Usado en navegadores y Node.js moderno | Usado principalmente en Node.js |
