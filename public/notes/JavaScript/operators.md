# Operators

## Arithmetic Operators

These operators are used to perform mathematical operations on numbers.
```js
let a = 10 + 5; // 15
let b = 10 - 5; // 5
let c = 10 * 5; // 50
let d = 10 / 2; // 5
let e = 10 % 3; // 1 (remainder / modulo)
let f = 2 ** 3; // 8 (2 raised to the power of 3)
let g = 5;
g++; // g is now 6
let h = 5;
h--; // h is now 4
```

## Assignment Operators

```js
let x = 10; // Assigns the value 10 to x
x += 5; // Equivalent to x = x + 5; x is now 15
x -= 3; // Equivalent to x = x - 3; x is now 12
x *= 2; // Equivalent to x = x * 2; x is now 24
x /= 4; // Equivalent to x = x / 4; x is now 6
x %= 5; // Equivalent to x = x % 5; x is now 1
```

## Comparison Operators

== Equality | Abstract Equality (compares only the value)
```js
let isEqual = (5 == "5"); // true (compares the value without considering the type)
```
=== Strict Equality (compares both value and type)
```js
let isStrictEqual = (5 === "5"); // false (compares both the value and the type)
```
!= Inequality (compares only the value)
```js
let isDifferent = (5 != "5"); // false (compares the value without considering the type)
```
!== Strict Inequality (compares both value and type)
```js
let isStrictDifferent = (5 !== "5"); // true (compares both the value and the type)
```

```js
let greaterThan = (10 > 5); // true
let lessThan = (10 < 5); // false
let greaterOrEqual = (10 >= 10); // true
let lessOrEqual = (10 <= 5); // false
```

## Logical Operators

&& Logical AND
```js
let result = (true && false); // false (both operands must be true)
```
|| Logical OR
```js
let result = (true || false); // true (at least one of the operands must be true)
```
! Logical NOT
```js
let result = !true; // false (negates the boolean value)
```

## Type Operators

typeof: Devuelve el tipo de una variable o expresión.
```js
let type = typeof 42; // "number"
let typeStr = typeof "Hello"; // "string"
```

instanceof: Verifica si un objeto es una instancia de un constructor específico.
```js
let date = new Date();
let isInstance = date instanceof Date; // true
```

## Conditional (Ternary) Operator

```js
condition ? valueIfTrue : valueIfFalse
let age = 18;
let isAdult = (age >= 18) ? "Yes" : "No"; // "Yes"
```

## Optional Chaining (?.)
Permite acceder de manera segura a propiedades de objetos anidados o 
llamar a funciones que podrían no existir, sin tener que verificar manualmente 
si cada propiedad intermedia está definida.
```js
const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah',
    },
};
const dogName = adventurer.dog?.name;
console.log(dogName);
// Expected output: undefined
console.log(adventurer.someNonExistentMethod?.());
// Expected output: undefined
```

## Nullish Coalescing Operator (??)
Es un operador lógico que devuelve el valor de su operando derecho cuando 
su operando izquierdo es null o undefined.
Si el operando izquierdo no es null ni undefined, entonces devuelve el valor 
de ese operando izquierdo.
```js
let userPreference = null;
let defaultPreference = 'dark mode';
let currentPreference = userPreference ?? defaultPreference;
console.log(currentPreference); // 'dark mode'
let client = "John";
console.log(client ?? "Anonymous"); // John (user no es null ni undefined)
```

## Short-circuit (&&) Evaluation
Evalúa los operandos de izquierda a derecha y devuelve el primer operando 
que sea falsy (es decir, un valor que se evalúa como false en un contexto 
booleano). Si ambos operandos son truthy, devuelve el valor del último 
operando.
```js
let result = 0 && 'Hello';
console.log(result); // 0
let result2 = 'Hi' && 'Hello'; // hi y hello son truthy, devuelve hello
console.log(result2); // 'Hello'
```

## Truthy & Falsy

```js
// Falsy
Boolean(false);      // false
Boolean(undefined);  // false
Boolean(null);       // false
Boolean("");         // false
Boolean('');         // false
Boolean(``);         // false
Boolean(NaN);        // false
Boolean(0);          // false
Boolean(-0);         // false
Boolean(0n);         // false

// Truthy
Boolean("false");    // true
Boolean(true);       // true
Boolean([]);         // true
Boolean({});         // true
Boolean(new Date());// true
Boolean(" ");        // true (espacio)
Boolean(43);         // true
Boolean(-3.14);      // true
Boolean(3.14);       // true
Boolean(Infinity);   // true
Boolean(-Infinity);  // true
```
