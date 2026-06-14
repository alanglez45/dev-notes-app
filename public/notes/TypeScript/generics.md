# Generics

Los genéricos son una característica que permite crear componentes o funciones reutilizables que pueden trabajar con diferentes tipos de datos, sin perder el control sobre los tipos.

## ¿Por qué usar Genéricos?

Sin genéricos, usando `any` se pierde la verificación de tipos:

```ts
function identity(arg: any): any {
    return arg;
}
```

Con genéricos, el tipo se conserva:

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

## Genéricos en Clases

```ts
class Caja<T> {
    contenido: T;

    constructor(contenido: T) {
        this.contenido = contenido;
    }

    obtenerContenido(): T {
        return this.contenido;
    }
}

const cajaDeNumero = new Caja<number>(123);
console.log(cajaDeNumero.obtenerContenido()); // 123

const cajaDeString = new Caja<string>("Hola");
console.log(cajaDeString.obtenerContenido()); // Hola
```

## Genéricos con Funciones

```ts
function mostrarElementos<T>(items: T[]): void {
    items.forEach(item => console.log(item));
}

mostrarElementos<number>([1, 2, 3]);
mostrarElementos<string>(["uno", "dos", "tres"]);
```

### Ejemplo con interfaces

```ts
interface ProductoElectronico {
    id: number;
    nombre: string;
    potencia: number;
}

interface ProductoRopa {
    id: number;
    nombre: string;
    talla: string;
}

class Inventario<T> {
    private items: T[] = [];

    agregar(item: T): void {
        this.items.push(item);
    }

    obtenerTodos(): T[] {
        return this.items;
    }
}

const inventarioElectronico = new Inventario<ProductoElectronico>();
inventarioElectronico.agregar({ id: 1, nombre: 'Televisor', potencia: 150 });
console.log(inventarioElectronico.obtenerTodos());
// [{ id: 1, nombre: 'Televisor', potencia: 150 }]

const inventarioRopa = new Inventario<ProductoRopa>();
inventarioRopa.agregar({ id: 2, nombre: 'Camiseta', talla: 'M' });
console.log(inventarioRopa.obtenerTodos());
// [{ id: 2, nombre: 'Camiseta', talla: 'M' }]
```

### Constraints (T extends)

```ts
class Animal {
    nombre: string;
    constructor(nombre: string) {
        this.nombre = nombre;
    }
    hacerRuido(): void {
        console.log(`${this.nombre} está haciendo ruido.`);
    }
}

class Perro extends Animal {
    ladrar(): void {
        console.log(`${this.nombre} está ladrando.`);
    }
}

class Gato extends Animal {
    maullar(): void {
        console.log(`${this.nombre} está maullando.`);
    }
}

function entrenarAnimal<T extends Animal>(animal: T): void {
    animal.hacerRuido();
}

const miPerro = new Perro("Firulais");
entrenarAnimal(miPerro); // Firulais está haciendo ruido.

const miGato = new Gato("Michi");
entrenarAnimal(miGato); // Michi está haciendo ruido.
```

`T extends Animal` — la función solo acepta instancias de Animal o cualquier clase que extienda Animal.

### Record

```ts
function getProperty(obj: Record<string | number, any>, property: string | number) {
    return obj[property];
}

getProperty({ test: 'testValue' }, 'test'); // 'testValue'
getProperty({ 2: [1, 2, 3] }, 2); // [1, 2, 3]
getProperty([{ a: 0 }, { a: 1 }, { a: 2 }], 2); // { a: 2 }
```

### Interfaz Genérica + Clase

```ts
interface QueueInterface<T> {
    push(value: T): void;
    pop(): T | undefined;
    getValue(): T[];
}

class Queue<T> implements QueueInterface<T> {
    queue: T[];

    constructor() {
        this.queue = [];
    }

    push(value: T): void {
        this.queue.push(value);
    }

    pop(): T | undefined {
        const element = this.queue.shift();
        console.log(element);
        return element;
    }

    getValue(): T[] {
        console.log(this.queue);
        return this.queue;
    }
}

const numberQueue = new Queue<number>();
numberQueue.push(1);
numberQueue.push(2);
numberQueue.push(3);
numberQueue.pop(); // 1
numberQueue.getValue(); // [2, 3]

const objectQueue = new Queue<{}>();
objectQueue.push({ first: 1 });
objectQueue.push({ second: 2 });
objectQueue.pop(); // { first: 1 }
objectQueue.getValue(); // [{ second: 2 }]
```
