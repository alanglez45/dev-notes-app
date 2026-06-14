# Type Operators

## `typeof` (type context)

Captura el tipo de una variable o expresión en tiempo de compilación.

```ts
const name = "Alan";
type NameType = typeof name; // string

const user = { name: "Alan", age: 30 };
type UserType = typeof user;
// { name: string; age: number; }

function greet(name: string): string {
    return `Hello, ${name}`;
}
type GreetType = typeof greet;
// (name: string) => string
```

## `keyof`

Obtiene una unión de las claves de un tipo.

```ts
type Person = { name: string; age: number; email: string };
type PersonKeys = keyof Person; // "name" | "age" | "email"

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person: Person = { name: "Alan", age: 30, email: "alan@example.com" };
getValue(person, "name"); // string
getValue(person, "age");  // number
// getValue(person, "invalid"); // Error
```

## Indexed Access Types (`T[K]`)

Accede al tipo de una propiedad específica.

```ts
type Person = { name: string; age: number; email: string };

type NameType = Person["name"]; // string
type AgeType = Person["age"];   // number
type NameOrAge = Person["name" | "age"]; // string | number

type AllValues = Person[keyof Person]; // string | number

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
];
type UserFromArray = (typeof users)[number];
// { name: string; age: number; }
```

## Conditional Types (`T extends U ? X : Y`)

Tipos que dependen de una condición evaluada en tiempo de compilación.

```ts
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// Distributive conditional types
type ToArray<T> = T extends unknown ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]

// Con constraint
type ExtractStrings<T> = T extends string ? T : never;
type StringsOnly = ExtractStrings<string | number | boolean>; // string
```

### Built-in Conditional Types

```ts
type T1 = Exclude<string | number | boolean, boolean>; // string | number
type T2 = Extract<string | number | boolean, boolean>; // boolean
type T3 = NonNullable<string | number | null | undefined>; // string | number
type T4 = ReturnType<() => string>; // string
type T5 = InstanceType<typeof Date>; // Date
```

## Mapped Types (`{ [K in T]: ... }`)

Transforman las propiedades de un tipo existente.

```ts
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

type Partial<T> = {
    [K in keyof T]?: T[K];
};

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

type Person = { name: string; age: number };
type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number; }

// Renombrar propiedades con as
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type PersonGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number; }
```

### Built-in Mapped Types

```ts
type P1 = Partial<{ name: string; age: number }>;
type P2 = Required<{ name?: string; age?: number }>;
type P3 = Readonly<{ name: string; age: number }>;
type P4 = Pick<{ name: string; age: number; email: string }, "name" | "email">;
type P5 = Record<"a" | "b", number>; // { a: number; b: number; }
```

## Template Literal Types

Combinan string literals con union types para crear nuevos strings en el sistema de tipos.

```ts
type EventName = "click" | "focus" | "blur";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";
type Position = `${Vertical}-${Horizontal}`;
// "top-left" | "top-right" | "bottom-left" | "bottom-right"

type Size = "sm" | "md" | "lg";
type Color = "red" | "blue";
type ClassName = `${Size}-${Color}`;
// "sm-red" | "sm-blue" | "md-red" | "md-blue" | "lg-red" | "lg-blue"
```

### Intrinsic String Types

```ts
type A = Uppercase<"hello">;   // "HELLO"
type B = Lowercase<"HELLO">;   // "hello"
type C = Capitalize<"hello">;  // "Hello"
type D = Uncapitalize<"Hello">; // "hello"
```

## `infer`

Extrae tipos dentro de conditional types.

```ts
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

type Fn = (a: number, b: string) => boolean;
type FnReturn = ReturnType<Fn>; // boolean

type ElementType<T> = T extends (infer U)[] ? U : never;
type ArrElement = ElementType<string[]>; // string

type PromiseValue<T> = T extends Promise<infer V> ? V : never;
type Value = PromiseValue<Promise<number>>; // number
```
