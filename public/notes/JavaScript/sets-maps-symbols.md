# Sets, Maps & Symbols

## Sets

Los Set en JavaScript son una colección de valores únicos, lo que significa 
que un valor puede aparecer solo una vez en un Set.

### Características

1. **Valores Únicos**: Un Set solo almacena valores únicos.
2. **Iteración**: Los valores se almacenan en el orden de inserción.
3. **No Indexado**: No puedes acceder a ellos usando un índice numérico.

### Creación de un Set

```js
const miSet = new Set([1, 2, 3, 4, 5]);
console.log(miSet); // Set(5) { 1, 2, 3, 4, 5 }
```

### Métodos Comunes

#### add(value)
```js
miSet.add(6);
miSet.add(2); // No se añade, ya que 2 ya existe en el Set
console.log(miSet); // Set(6) { 1, 2, 3, 4, 5, 6 }
```

#### delete(value)
```js
miSet.delete(3);
console.log(miSet); // Set(5) { 1, 2, 4, 5, 6 }
```

#### has(value)
```js
console.log(miSet.has(4)); // true
console.log(miSet.has(10)); // false
```

#### size
```js
const otroSet = new Set([1, 2, 3]);
console.log(otroSet.size); // 3
```

### Iterando sobre un Set

#### for...of
```js
const numeros = new Set([10, 20, 30]);
for (const num of numeros) {
  console.log(num);
}
// 10
// 20
// 30
```

#### forEach()
```js
numeros.forEach((valor) => {
  console.log(valor);
});
// 10
// 20
// 30
```

### How to Retrieve Data from a Set

Convert the whole Set to an array:
```js
const mySet = new Set([1, 2, 3]);
const myArray = Array.from(mySet); // or [...mySet]
console.log(myArray); // [1, 2, 3]
```

Extract specific values during iteration:
```js
let result;
for (const value of mySet) {
    if (value > 1) {
        result = value;
        break;
    }
}
console.log(result); // 2
```

## Maps

Los Map en JavaScript son una colección de pares clave-valor donde tanto 
las claves como los valores pueden ser de cualquier tipo.

### Tipos de Claves

**String como Clave:**
```js
const miMapa = new Map();
miMapa.set('nombre', 'Juan');
console.log(miMapa.get('nombre')); // 'Juan'
```

**Número como Clave:**
```js
miMapa.set(1, 'uno');
console.log(miMapa.get(1)); // 'uno'
```

**Boolean como Clave:**
```js
miMapa.set(true, 'verdadero');
miMapa.set(false, 'falso');
console.log(miMapa.get(true)); // 'verdadero'
console.log(miMapa.get(false)); // 'falso'
```

**undefined y null como Claves:**
```js
miMapa.set(undefined, 'indefinido');
miMapa.set(null, 'nulo');
console.log(miMapa.get(undefined)); // 'indefinido'
console.log(miMapa.get(null)); // 'nulo'
```

**Objeto como Clave:**
```js
const objClave = { id: 1 };
miMapa.set(objClave, 'objeto como clave');
console.log(miMapa.get(objClave)); // 'objeto como clave'
```

**Función como Clave:**
```js
const funcionClave = function () { return 'Hola'; };
miMapa.set(funcionClave, 'función como clave');
console.log(miMapa.get(funcionClave)); // 'función como clave'
```

**Array como Clave:**
```js
const arrayClave = [1, 2, 3];
miMapa.set(arrayClave, 'array como clave');
console.log(miMapa.get(arrayClave)); // 'array como clave'
```

### Características Principales

1. **Claves de Cualquier Tipo**: objetos, funciones, arrays, etc.
2. **Orden de Inserción**: Los pares se almacenan en el orden insertado.
3. **Tamaño Dinámico**: Propiedad `size`.

### Creación de un Map

```js
const miMapa = new Map([
    ['nombre', 'Juan'],
    ['edad', 30],
    [true, 'sí'],
]);
console.log(miMapa); // Map(3) { 'nombre' => 'Juan', 'edad' => 30, true => 'sí' }
```

### Métodos Comunes

#### set(clave, valor)
```js
miMapa.set('ciudad', 'Madrid');
miMapa.set('edad', 31); // Actualiza el valor de la clave 'edad'
console.log(miMapa); // Map(4) { 'nombre' => 'Juan', 'edad' => 31, true => 'sí', 'ciudad' => 'Madrid' }
```

#### get(clave)
```js
console.log(miMapa.get('nombre')); // Juan
console.log(miMapa.get('país'));   // undefined
```

#### has(clave)
```js
console.log(miMapa.has('edad'));  // true
console.log(miMapa.has('país'));  // false
```

#### delete(clave)
```js
miMapa.delete('ciudad');
console.log(miMapa); // Map(3) { 'nombre' => 'Juan', 'edad' => 31, true => 'sí' }
```

#### clear()
```js
miMapa.clear();
console.log(miMapa); // Map(0) {}
```

#### size
```js
const nuevoMapa = new Map([['a', 1], ['b', 2]]);
console.log(nuevoMapa.size); // 2
```

### Iterando sobre un Map

#### for...of
```js
for (const [clave, valor] of nuevoMapa) {
    console.log(clave, valor);
}
// a 1
// b 2
```

#### forEach()
```js
nuevoMapa.forEach((valor, clave) => {
    console.log(clave, valor);
});
// a 1
// b 2
```

### keys(), values(), entries()

```js
const mapaEjemplo = new Map([
    ['nombre', 'Ana'],
    ['edad', 28]
]);

for (const clave of mapaEjemplo.keys()) {
    console.log(clave); // 'nombre', 'edad'
}
for (const valor of mapaEjemplo.values()) {
    console.log(valor); // 'Ana', 28
}
for (const [clave, valor] of mapaEjemplo.entries()) {
    console.log(clave, valor); // 'nombre' 'Ana', 'edad' 28
}
```

## Symbols

Los Symbol en JavaScript son un tipo de dato primitivo que representan valores únicos e inmutables.

### Características

1. **Unicidad**: Cada Symbol es único, incluso con la misma descripción.
2. **Inmutabilidad**: Una vez creado, no puede cambiar su valor.

### Crear un Symbol

```js
const simbolo1 = Symbol();
const simbolo2 = Symbol('descripcion');
console.log(simbolo1); // Symbol()
console.log(simbolo2); // Symbol(descripcion)
```

### Unicidad de los Symbol

```js
const simboloA = Symbol('id');
const simboloB = Symbol('id');
console.log(simboloA === simboloB); // false
```

### Uso de Symbol como Claves de Propiedades

```js
const mySymbol = Symbol('property of object');
const myObject = {
  [mySymbol]: 'This is the value'
};
console.log(myObject[mySymbol]);
```

### Colisión de Nombres con Strings

Cuando se usan strings como claves, si dos partes del código usan la misma clave, la segunda sobrescribe el valor.
```js
const objeto = {};
objeto['clave'] = 'valorA';
objeto['clave'] = 'valorB';
console.log(objeto['clave']); // 'valorB'
```

### Cómo los Symbol Previenen Colisiones

Los Symbol son únicos y no colisionan, incluso con la misma descripción.
```js
const simboloA = Symbol('claveUnica');
const simboloB = Symbol('claveUnica');

const objeto = {};
objeto[simboloA] = 'valorA';
objeto[simboloB] = 'valorB';

console.log(objeto[simboloA]); // 'valorA'
console.log(objeto[simboloB]); // 'valorB'
```
