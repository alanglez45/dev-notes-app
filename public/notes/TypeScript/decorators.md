# Decorators

Los decorators en TypeScript son funciones que permiten modificar o añadir comportamiento a clases, métodos, propiedades o parámetros, sin modificar directamente su código.

Tipos:
- Class Decorators
- Method Decorators
- Accessor Decorators (getters/setters)
- Property Decorators
- Parameter Decorators

## Configuración

Se activan en `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

## Sintaxis

Se utilizan precediendo el elemento a decorar con `@decoratorName`:

```ts
@classDecorator
class Person {
    @propertyDecorator
    public name: string;

    @accessorDecorator
    get fullName() {
        // ...
    }

    @methodDecorator
    printName(@parameterDecorator prefix: string) {
        // ...
    }
}
```

### Múltiples decorators

```ts
@decoratorA
@decoratorB
class Person { }
```

## Decorador de Clase

Recibe el constructor de la clase como argumento. Puede modificar el constructor o agregar nuevas propiedades o métodos.

**Parámetros:**
- `target: Function` — El constructor de la clase decorada.

```ts
function Logger(target: Function) {
    console.log(`Clase registrada: ${target.name}`);
}

@Logger
class Person {
    name = "Alan";
}
```

```ts
function Logger(constructor: Function) {
    console.log("Clase inicializada:", constructor.name);
}

@Logger
class Persona {
    constructor(public nombre: string) {}
}

const persona = new Persona("Juan");
// Imprime: "Clase inicializada: Persona"
```

### Modificar el comportamiento

```ts
function replaceConstructor(constructor: Function) {
    return class {
        newProperty = "Soy una nueva propiedad";
        hello = "Hola desde el decorador";

        constructor() {
            console.log("Constructor modificado");
        }
    };
}

@replaceConstructor
class MyClass {
    constructor() {
        console.log("Constructor original de MyClass");
    }
}

const instance = new MyClass() as any;
console.log(instance.hello);        // Hola desde el decorador
console.log(instance.newProperty);  // Soy una nueva propiedad
```

## Decorador de Propiedad

Recibe dos parámetros:
- `target: any` — El prototipo de la clase (instancia) o el constructor (estática).
- `key: string` — El nombre de la propiedad decorada.

```ts
function ReadOnly(target: any, key: string) {
    Object.defineProperty(target, key, {
        writable: false,
        configurable: false,
    });
}

class User {
    @ReadOnly
    role = "Admin";
}

const user = new User();
(user as any).role = "User";
console.log(user.role); // "Admin"
```

```ts
function logAccess(target: any, key: string) {
    let value = target[key];

    const getter = () => {
        console.log(`Accediendo a la propiedad "${key}"`);
        return value;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: (newValue) => { value = newValue; },
        enumerable: true,
        configurable: true,
    });
}

class MyClass2 {
    @logAccess
    myProperty: string = "Hola";
}

const instance2 = new MyClass2();
console.log(instance2.myProperty);
// Accediendo a la propiedad "myProperty"
```

## Decorador de Método

Recibe tres parámetros:
- `target: any` — Prototipo de la clase (instancia) o constructor (estática).
- `key: string` — Nombre del método decorado.
- `descriptor: PropertyDescriptor` — Permite modificar el comportamiento del método.

```ts
function modifyReturnValue(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        return `Modificado: ${result}`;
    };
}

class MyClass {
    @modifyReturnValue
    greet(name: string) {
        return `Hola, ${name}`;
    }
}

const instance = new MyClass();
console.log(instance.greet("Juan")); // Modificado: Hola, Juan
```

```ts
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Llamando ${key} con argumentos:`, args);
        return originalMethod.apply(this, args);
    };
}

class Calculator {
    @LogMethod
    add(a: number, b: number) {
        return a + b;
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // Llamando add con argumentos: [5,3]
```

## Decorador de Parámetros

Permiten modificar o acceder a información sobre los parámetros de los métodos. No pueden cambiar directamente el valor, pero son útiles para validación, seguimiento o transformación.

**Parámetros:**
- `target: any` — Prototipo de la clase.
- `key: string | symbol` — Nombre del método.
- `parameterIndex: number` — Índice del parámetro en la función.

```ts
function LogParam(target: any, key: string, parameterIndex: number) {
    console.log(`Parámetro decorado en ${key}, índice: ${parameterIndex}`);
}

class Person {
    greet(@LogParam message: string) {
        console.log(message);
    }
}

const p = new Person();
p.greet("Hola!"); // Parámetro decorado en greet, índice: 0
```

```ts
function positiveNumber(target: any, propertyKey: string, parameterIndex: number) {
    const originalMethod = target[propertyKey];

    target[propertyKey] = function (...args: any[]) {
        if (args[parameterIndex] <= 0) {
            throw new Error(`El parámetro en la posición ${parameterIndex} debe ser un número positivo`);
        }
        return originalMethod.apply(this, args);
    };
}

class MyClass {
    greet(message: string, @positiveNumber count: number) {
        return `${message} se ha repetido ${count} veces`;
    }
}

const instance = new MyClass();
console.log(instance.greet("Hola", 3));  // Hola se ha repetido 3 veces
console.log(instance.greet("Hola", -1)); // Error
```

## Decorador de Accesorio (Getter / Setter)

**Parámetros:**
- `target: any` — Prototipo de la clase.
- `key: string | symbol` — Nombre del accesorio.
- `descriptor: PropertyDescriptor` — Modifica el comportamiento del accesorio.

```ts
function Capitalize(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    descriptor.get = function () {
        const result = originalGetter?.apply(this);
        return result.toUpperCase();
    };
}

class Person {
    private _name = "alan";

    @Capitalize
    get name() {
        return this._name;
    }
}

const p = new Person();
console.log(p.name); // ALAN
```
