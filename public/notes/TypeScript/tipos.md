# TypeScript Fundamentals

TypeScript is a programming language developed and maintained by Microsoft. It is a superset of JavaScript that adds static typing and other features.

- Type annotations (string, number, boolean, etc.)
- Interfaces, generics, enums, utility types
- Compile-time type checking
- Modern language features before they are natively available in browsers

It compiles down to JavaScript — TypeScript code is not directly executed by browsers. The TypeScript compiler (tsc) converts it into plain JavaScript.

## TypeScript Commands

| Command | Description |
|---|---|
| `npm install -g typescript` | Install TypeScript globally |
| `npm install typescript --save-dev` | Install TypeScript locally |
| `npx tsc --version` | Check version |
| `tsc example.ts` | Compile a single file |
| `tsc` | Compile all files (with tsconfig.json) |
| `tsc --init` | Generate tsconfig.json |
| `tsc --watch` | Watch mode |
| `control + c` | Exit watch mode |

### tsconfig.json Configurations

```json
"noImplicitAny": true  // Ensures type safety
"sourceMap": true      // Debug TypeScript in browser
"removeComments": true // Remove comments in compiled output
```

**Exclude files/folders:**
```json
"exclude": ["node_modules"]
```

**Include files/folders:**
```json
"include": ["src"]
```

**Output file (AMD):**
```json
"module": "amd",
"outFile": "./main.js"
```

Hoy en día se prefiere usar un empaquetador como Webpack, Vite o Rollup.

### Decorators

Se activan en tsconfig.json:
```json
"experimentalDecorators": true
```

## Data Types

We assign data types by placing a colon after the variable name:

```
const variableName: variableType = value
```

### Simple Types

```ts
const myBool: boolean = false;
let myString: string = 'bacon';
let age: number = 30;
let price: number = 19.99;
let negative: number = -20;
const bigNumber: bigint = 12345678901234567890n;
```

### Symbol

```ts
let symbol1 = Symbol();
console.log(symbol1);

let symbol2 = Symbol("abc");
console.log(symbol2);
```

### Special Types

**Type: any** — Disables type checking.

```ts
let v: any = true;
v = "string"; // no error
Math.round(v); // no error as it can be "any" type
```

> NOTE: When you don't specify a type and TypeScript can't infer it from context, the compiler will typically default to any.

**Type: unknown** — Requires type verification before use.

```ts
let value: unknown;
value = "Hola";
value = 42;
value = true;

// Type verification required:
if (typeof value === "string") {
    console.log(value.toUpperCase());
}

if (typeof value === "number") {
    console.log(value.toFixed(2));
}
```

Without type verification, TypeScript will throw an error:
```ts
let value: unknown;
value = "Hola";
console.log(value.toUpperCase()); // Error
```

**Type: undefined**
```ts
let x: number | undefined;
console.log(x); // undefined
```

**Type: null**
```ts
let y: number | null = null;
console.log(y); // null
```

### Arrays

```ts
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: string[] = ["hello", "world"];

// Multidimensional
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix[0][0]); // 1

// Mixed arrays
let mixedArray: (number | string | boolean)[] = [1, "hello", true, 2];
let anotherMixedArray: Array<number | string | boolean> = [2, "world", false];
```

### Tuples

```ts
let person: [number, string] = [1, "John Doe"];
```

### Enum

Define a set of named values.

**Numeric enums:**
```ts
enum CardinalDirections {
    North,
    East,
    South,
    West
}
console.log(CardinalDirections.North); // 0
console.log(CardinalDirections.West); // 3

enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right   // 3
}
let direction: Direction = Direction.Up;
console.log(direction); // 0
```

**String enums:**
```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
let direction: Direction = Direction.Left;
console.log(direction); // "LEFT"
```

### Objects

```ts
let product: {
    name: string;
    price: number;
};
product = {
    name: "TV",
    price: 300
};

const car: { type: string; model: string; year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
```

### Union Operator (|)

Combine multiple possible types.

```ts
let value: string | number | boolean | null | undefined;
value = "texto";
value = 42;
value = true;
value = null;
value = undefined;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

### Functions

```ts
// Function declaration
function getTime(): number {
    return new Date().getTime();
}

// Function expression
const multiply = function (a: number, b: number): number {
    return a * b;
};

// Arrow function
const divide = (a: number, b: number): number => {
    return a / b;
};

// Void
function printHello(): void {
    console.log('Hello!');
}
```

**Optional Parameters:**
```ts
function greet(firstName: string, lastName?: string): string {
    if (lastName) {
        return `Hello, ${firstName} ${lastName}`;
    }
    return `Hello, ${firstName}`;
}
console.log(greet("Alice"));           // "Hello, Alice"
console.log(greet("Alice", "Johnson")); // "Hello, Alice Johnson"
```

**Default Parameters:**
```ts
function subtract(a: number, b: number = 5): number {
    return a - b;
}
console.log(subtract(10));    // 5
console.log(subtract(10, 3)); // 7
```

**Rest Parameters:**
```ts
function concatenate(separator: string, ...strings: string[]): string {
    return strings.join(separator);
}
console.log(concatenate(", ", "Alice", "Bob", "Charlie")); // "Alice, Bob, Charlie"
```

**Parameters Omission:**
```ts
const myFunction = (_, secondParam) => {
    console.log(secondParam);
};
myFunction("No lo uso", "Este sí se imprime"); // Output: "Este sí se imprime"

const numbers = [10, 20, 30];
const indexedNumbers = numbers.map((_, index) => index);
console.log(indexedNumbers); // Output: [0, 1, 2]
```

**Type function:**
```ts
const addNumbers = (a: number, b: number) => a + b;
const sayHello = (name: string) => `Hola ${name}`;

let myFunction: Function;
myFunction = addNumbers;
console.log(myFunction(1, 2));
myFunction = sayHello;
console.log(myFunction('Alan'));

let myFunction2: (y: number, z: number) => number;
myFunction2 = addNumbers;
console.log(myFunction2(1, 2));

let myFunction3: (y: string) => string;
myFunction3 = sayHello;
console.log(myFunction3("Eduardo"));
```

**Objects with methods:**
```ts
let flash: { name: string; age?: number; powers: string[]; getName?: () => string } = {
    name: 'Barry Allen',
    age: 24,
    powers: ['Súper velocidad', 'Viajar en el tiempo']
};

flash = {
    name: 'Clark Kent',
    powers: ['Súper fuerza'],
    getName() {
        return this.name;
    }
};

if (flash.getName) {
    console.log(flash.getName());
}
```

**Multiple types:**
```ts
type Person = {
    name: string;
    age?: number;
    getName?: () => string;
};

let myCustomVariable: string | number | Person = "Alan";
console.log(typeof myCustomVariable);
myCustomVariable = 20;
console.log(typeof myCustomVariable);
myCustomVariable = {
    name: "John",
    age: 22,
};
console.log(typeof myCustomVariable);
```

## Type Aliases

```ts
type CarYear = number;
type CarType = string;
type CarModel = string;
type Car = {
    year: CarYear;
    type: CarType;
    model: CarModel;
};
const carYear: CarYear = 2001;
const carType: CarType = "Toyota";
const carModel: CarModel = "Corolla";
const car: Car = {
    year: carYear,
    type: carType,
    model: carModel,
};
```

### Extender un type alias

```ts
type User = {
    name: string;
    age: number;
};

type ExtendedUser = User & {
    email: string;
};

const user: ExtendedUser = {
    name: "Alan",
    age: 30,
    email: "alan@example.com",
};
```

### Quitar propiedades (Omit)

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

type UserWithoutEmail = Omit<User, "email" | "age">;
const user: UserWithoutEmail = {
    name: "Alan",
};
```

### Pick

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

type UserPreview = Pick<User, "name" | "email">;
const user: UserPreview = {
    name: "Alan",
    email: "alan@example.com",
};
```

### Lookup Types

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

type UserName = User["name"]; // string
const userName: UserName = "Alan";
```

### Partial (hacer propiedades opcionales)

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

type UpdateUser = Partial<User>;
const userUpdate: UpdateUser = {
    name: "Jane Doe",
};
```

### Partial + Omit

```ts
type UpdateUser = Partial<Omit<User, "email">>;
// or
type UpdateUser = Omit<User, "email"> & Partial<User>;

const userUpdate: UpdateUser = {
    name: "John Doe",
    age: 30,
};
```

### Partial + Omit + nuevas propiedades

```ts
type UpdateUser = Partial<Omit<User, 'email'>> & {
    isActive?: boolean;
};

const userUpdate: UpdateUser = {
    name: "John Doe",
    age: 30,
    isActive: true,
};
```

### Wildcards / Mapped Types

```ts
export type User = {
    id: number;
    name: Capitalize<string>;
    login: Lowercase<string>;
};
```

## Interfaces

Interfaces are similar to type aliases, except they only apply to object types.

### Simple

```ts
interface Rectangle {
    height: number;
    width: number;
}

const rectangle: Rectangle = {
    height: 20,
    width: 10,
};
```

### Compleja

```ts
interface Client {
    name: string;
    age?: number;
    address: Address;
}

interface Address {
    id: number;
    zip: number;
    city: string;
}

const cliente: Client = {
    name: "Alan",
    age: 20,
    address: {
        id: 1,
        zip: 12345,
        city: "GDL",
    },
};
```

### Con clases

```ts
interface Animal {
    nombre: string;
    hacerSonido(): void;
}

class Perro implements Animal {
    nombre: string;
    constructor(nombre: string) {
        this.nombre = nombre;
    }
    hacerSonido() {
        console.log("Guau guau");
    }
}

const miPerro = new Perro("Rex");
miPerro.hacerSonido();
```

### Implementando varias interfaces

```ts
interface GestorArchivos {
    abrirArchivo(ruta: string): void;
    guardarArchivo(ruta: string, contenido: string): void;
}

interface RegistroCambios {
    registrarCambio(cambio: string): void;
    mostrarRegistro(): void;
}

class Documento implements GestorArchivos, RegistroCambios {
    private registro: string[] = [];

    abrirArchivo(ruta: string): void {
        console.log(`Archivo abierto desde: ${ruta}`);
    }

    guardarArchivo(ruta: string, contenido: string): void {
        console.log(`Archivo guardado en: ${ruta}`);
        this.registrarCambio(`Guardado en ${ruta}`);
    }

    registrarCambio(cambio: string): void {
        this.registro.push(cambio);
    }

    mostrarRegistro(): void {
        console.log("Registro de cambios:");
        this.registro.forEach((cambio, index) => {
            console.log(`${index + 1}: ${cambio}`);
        });
    }
}

const doc = new Documento();
doc.abrirArchivo("/path/to/file.txt");
doc.guardarArchivo("/path/to/file.txt", "Nuevo contenido");
doc.mostrarRegistro();
```

### Interfaces en las funciones

```ts
interface OperacionMatematica {
    (a: number, b: number): number;
}

let addNumbersFunction: OperacionMatematica;
addNumbersFunction = (a: number, b: number) => {
    return a + b;
};
```

### Herencia en las interfaces

```ts
interface Persona {
    nombre: string;
    edad: number;
}

interface Direccion {
    calle: string;
    ciudad: string;
}

interface Contacto extends Persona, Direccion {
    telefono: string;
}

const contacto: Contacto = {
    nombre: "Juan",
    edad: 30,
    calle: "Calle Falsa 123",
    ciudad: "Springfield",
    telefono: "555-1234",
};
console.log(contacto);
```

### Declaration Merging

```ts
interface User {
    name: string;
    age: number;
}

// Declaration merging — adds new properties to existing interface
interface User {
    email: string;
}

const user: User = {
    name: "Alan",
    age: 30,
    email: "alan@example.com",
};
```

### ReadOnly

```ts
class Employee {
    readonly empCode: number;
    empName: string;
    constructor(code: number, name: string) {
        this.empCode = code;
        this.empName = name;
    }
}

let emp = new Employee(10, "John");
// emp.empCode = 20; // Compiler Error

interface IEmployee {
    readonly empCode: number;
    empName: string;
}

let empObj: IEmployee = {
    empCode: 1,
    empName: "Steve",
};
// empObj.empCode = 100; // Compiler Error
```

### Quitar atributos de una interfaz (Omit)

```ts
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PublicUser = Omit<User, "password">;

const user: PublicUser = {
    id: 1,
    name: "Alan",
    email: "alan@example.com",
};
```

## Namespaces

A namespace is a way to organize code into logical groups and avoid naming collisions.

```ts
namespace Validations {
    export const validateText = (text: string): boolean => {
        return text.length > 3;
    };

    export const validateDate = (myDate: Date): boolean => {
        return !isNaN(myDate.valueOf());
    };
}

console.log(Validations.validateText('hola'));
const fechaValida = new Date("2024-09-13");
console.log(Validations.validateDate(fechaValida));
```

## Not Null Assertion Operator (!)

```ts
document.getElementById('root')!
```
