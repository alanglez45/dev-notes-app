# JavaScript Fundamentals

## Primitive types

- String
Represents a text string. single quotes ('), double quotes ("), o backticks 
(`).
```js
let name = "John";
let name2 = 'John';
let greeting = `Hello, ${name}!`;
```

- Number
Represents numbers, either integers or decimals.
```js
let age = 25;
let price = 19.99;
```

- Bigint
Allows working with integers larger than those that the Number type can rep
resent. A n is added at the end of an integer to convert it into a BigInt.
```js
let bigNumber = 123456789012345678901234567890n;
```

- Boolean
Represents a truth value that can be true or false.
```js
let isAdult = true;
let isMinor = false;
```

- Undefined
Represents the absence of an assigned value. A declared but uninitialized 
variable will have the value undefined.
```js
let x;
console.log(x); // undefined
```

- Symbol
Represents a unique value and is used as a unique identifier for object prop
erties. Symbols are unique, even if two Symbols have the same description.
```js
let id = Symbol("id");
let anotherId = Symbol("id");
console.log(id === anotherId); // false
```

- null
Represents the intentional absence of a value. Unlike undefined, null is ex
plicitly assigned to a variable to indicate that it has no value.
```js
let person = null;
```

## Objects

In JavaScript, objects can be seen as a collection of properties.
Property values can be values of any type.  It is composed of key-value pairs.
```js
const person = {
    name: 'John Doe',
    age: 30,
    address: '123 Main Street'
};
```

## Arrays

The Array object, as with arrays in other programming languages, enables 
storing a collection of multiple items under a single variable name, and has 
members for performing common array operations.
```js
const arr = [30, 40, 10, true, "Hello"];
```

## Variables

### var

var is the oldest way to declare variables in JavaScript. It has function scope 
or global scope, depending on where it is declared.
Hoisting: Variables declared with var are hoisted to the top of their context 
(function or global), meaning they can be accessed before their declaration, 
although their value will be undefined.
Scope (alcance): var has function scope, meaning if declared inside a func
tion, it won't be accessible outside that function. If declared outside a function, 
it becomes accessible throughout the global context.
```js
function exampleVar() {
    console.log(x); // undefined (hoisting)
    var x = 10;
    console.log(x); // 10
  }
exampleVar();
```

### let

let allows you to declare variables with block scope, meaning the variable is 
only accessible within the {} block where it was declared.
No hoisting: Although let declarations are hoisted, they are not initialized. If 
you try to access a variable declared with let before its initialization, you'll get 
a ReferenceError.
```js
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 20;
console.log(y); // 20
```

### var vs let

var has global scope if declared outside a function.
let has block scope, meaning it's only accessible within the {} block where it 
was declared.

```js
// Using var - Global scope
const arr = [1, 2, 3];
function sum(arr) {
    for (var i = 0; i < arr.length; i++) {
        // some code
    }
    // variable i is available here.
    console.log("value of i with var:", i); // 3
}
sum(arr);
// Using let - Block scope
function sum2(arr) {
    for (let i = 0; i < arr.length; i++) {
        // some code
    }
    // variable i is not available here.
    console.log("value of i with let:", i); // undefined
}
sum2(arr);
```

### const

const is immutable (regarding the reference): The reference of the variable cannot be 
changed, meaning it cannot be reassigned to another value or object. How
ever, if the variable is an object or array, its internal properties or elements can 
be modified.
Scope: const has block scope.
```js
function exampleConst() {
    const z = 30;
    console.log(z); // 30

    // z = 40; // Error: Assignment to constant variable

    const obj = { name: "Juan" };
    obj.name = "Pedro"; // This is allowed
    console.log(obj.name); // Pedro
  }
exampleConst();
```

## Hoisting

Hoisting is a JavaScript behavior where variable and function declarations are 
moved (or "hoisted") to the top of their containing scope during compilation, 
before the code is executed. This means you can use a function or variable 
before declaring it in the code.
Functions and variables are assigned in memory at the moment of compila
tion. Basically, this allows us to use functions before they were declared.
```js
greet(); // Works even though it's called before declaration
function greet() {
    console.log("Hello!");
}
console.log(a); // undefined (declaration is hoisted, but not initialization)
var a = 10;
console.log(a); // 10
```

## Temporal Dead Zone

The temporal dead zone (TDZ) is a specific period in the execution of 
JavaScript code where variables declared with let and const exist but cannot 
be accessed or assigned any value. During this phase, accessing or using the 
variable will result in a ReferenceError.
- The TDZ starts from the beginning of the block until the variable is de
clared.
- Variables declared with let and const are hoisted but not initialized.
- Accessing the variable in the TDZ results in a ReferenceError.
- var declarations do not have a TDZ and are initialized as undefined.
```js
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

## Scope

Scope determines the accessibility (visibility) of variables.
JavaScript variables have 3 types of scope:
- Block scope
- Function scope
- Global scope

### Block Scope

Variables declared inside a { } block cannot be accessed from outside the 
block.
```js
{
    let x = 2;
}
// x can NOT be used here
```

### Local Scope

Variables declared within a JavaScript function, are LOCAL to the function:
```js
// code here can NOT use carName
function myFunction() {
    let carName = "Volvo";
    // code here CAN use carName
}
// code here can NOT use carName
```

### Global JavaScript Variables

A variable declared outside a function, becomes GLOBAL.
```js
let carName = "Volvo";
// code here can use carName
function myFunction() {
// code here can also use carName
}
```
