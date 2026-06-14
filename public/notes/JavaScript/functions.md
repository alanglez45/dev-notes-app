# Functions

Functions in JavaScript are reusable blocks of code that perform a specific 
task.

**Return Value:** The value that a function returns is specified using the return keyword. If a 
function does not have a return statement, it will return undefined by default.

**Invocation:** To use a function, you must invoke (or call) it by using its name followed by 
parentheses, which may contain arguments if the function requires them.

## Function Declaration

Hoisting: Function declarations in JavaScript are hoisted, meaning they are 
moved to the top of their scope during compilation. This allows you to call a 
function before it is defined in the code.
```js
function add(a, b) {
    return a + b;
}
add(5, 10); // 15
greet(); // Hello!
function greet() {
    console.log("Hello!");
}
```

## Function Expression

In addition to functions declared with function, you can define functions using 
function expressions. This is useful when you want to assign a function to a 
variable.
```js
let add = function (a, b) {
    return a + b;
};
console.log(add(2, 3)); // 5
```

No Hoisting: Function expressions are not hoisted. This means the function is not available before the line where it is defined.
```js
greet(); // Error: greet is not defined
const greet = function () {
    console.log("Hello!");
};
```

## Arrow Functions

Arrow functions offer a more compact syntax and handle the this context dif
ferently compared to traditional functions.

- If the function has only one parameter, you can omit the parentheses:
```js
let print = text => {
    console.log(text);
};
```

- If the function body contains only a single expression, you can omit the 
curly braces {} and the return keyword:
```js
let add = (num1, num2) => num1 + num2;
```

Hoisting: Arrow functions are created as part of a function expression, so they 
follow the same hoisting rules as function expressions. This means the func
tion must be defined before calling it.
```js
greet(); // Error: greet is not defined
const greet = () => {
    console.log("Hello!");
};
```

Traditional Function:
```js
function sum(a, b) {
    return a + b;
}
```

Equivalent Arrow Function:
```js
const sum = (a, b) => a + b;
```

Arrow Function with No Parameters:
```js
const sayHello = () => console.log("Hello!");
```

Arrow Function with a Single Parameter (No Parentheses Needed):
```js
const double = x => x * 2;
```

## Immediately Invoked Function Expressions (IIFE)

An IIFE (Immediately Invoked Function Expression) is a function that runs 
immediately after being defined.
```js
(function () {
    console.log("This is an IIFE");
})(); // Output: "This is an IIFE"
```

## Arrow Functions vs Functions

1. The most important difference is how they handle the value of this.
2. Use of arguments.

### What is this?

In JavaScript, the this keyword refers to an object.
The this keyword refers to different objects depending on how it is used:

- In an object method, this refers to the object.
- Alone, this refers to the global object.
- In a function, this refers to the global object.
- In a function, in strict mode, this is undefined.
- In an event, this refers to the element that received the event.
- Methods like call(), apply(), and bind() can refer this to any object.

### What is Lexical Context?

Lexical context refers to the physical location in the code where a function is 
defined. It determines which variables and values are available to the function 
based on its position in the code. This also affects the value of this in arrow 
functions.

A traditional function has its own this, which is determined at runtime based 
on how the function is called.

### Arrow Functions: They Do Not Create Their Own this

Arrow functions do not define their own this. Instead, they inherit the this value 
from the context in which they were declared.
```js
const obj = {
    name: "John",
    regularFunction: function () {
        console.log(this.name); // `this` points to the `obj` object
    },
    arrowFunction: () => {
        console.log(this.name); // `this` does not point to `obj`, it inherits from the global context
    },
};
obj.regularFunction(); // Output: John
obj.arrowFunction();   // Output: undefined
```

Arrow functions: window or global object.
```js
const myFunc = () => {
    console.log(this);
}
myFunc();
```

The arrow function returns the window object (or global in Node.js) because:
- Arrow functions inherit the this value from the lexical context where they were defined.
- In the global context, in browsers, the this value is the window object.

```js
function Timer() {
    this.seconds = 0;
    setInterval(() => {
        this.seconds++; // `this` points to the object created by `new Timer()`
        console.log(this.seconds);
    }, 1000);
}
const timer = new Timer();
```

Timer is a constructor function. When you use new Timer(), a new object is created.
Inside the Timer function, the this value points to the newly created object.
The arrow function inside setInterval does not have its own this. Instead, it 
inherits the this value from the lexical context in which it was defined, which is 
the Timer function.
Therefore, this inside the arrow function refers to the object created by new Timer().

### Function Declaration: Strict Mode
```js
"use strict";
function example() {
    console.log(this); // undefined
}
example();
```

### Global Function Declaration: Global Context
```js
function example() {
    console.log(this); // In browsers: window
}
example();
```

### Function Declaration: Invoked as a Method
```js
const obj = {
    name: "JavaScript",
    greet: function () {
        console.log(this.name);
    },
};
obj.greet(); // "JavaScript"
```

### Function Declaration: Constructor Functions
```js
function Person(name) {
    this.name = name;
}
const person = new Person("Alice");
console.log(person.name); // "Alice"
```

### Function Declaration: DOM Events
```js
const button = document.querySelector(".button");
button.addEventListener("click", function () {
    console.log(this); // The button that was clicked
});
```

## call, apply, and bind

### call() Method

The call method in JavaScript is a function available for all functions because 
it is part of the Function.prototype. It is used to invoke a function while explic
itly specifying the value of this and the arguments to be passed to the function.

**Syntax:**
```js
func.call(thisArg, arg1, arg2, ...)
```

- thisArg: The value you want to assign as this inside the function. It can be any 
value (an object, an array, null, undefined, etc.). If you pass null or undefined, 
this is assigned to the global object (window in browsers, global in Node.js).
- arg1, arg2, ...: The arguments you want to pass to the function.
- It can be used to invoke (call) a method with an owner object as an argument (parameter).
- The call method invokes a function immediately and allows you to explicitly specify the this value.

```js
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}
const person = { name: "Alice" };
greet.call(person, "Hello", "!"); // "Hello, Alice!"

const person = {
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
const person1 = {
    firstName: "John", lastName: "Doe"
}
const person2 = {
    firstName: "Mary", lastName: "Doe"
}
console.log(person.fullName.call(person1)); // John Doe
console.log(person.fullName.call(person2)); // Mary Doe
```

call invokes person.fullName: The fullName function is executed as if it be
longed to the object passed as the first argument (in this case, person1 or person2).

### apply() Method

Unlike call, which requires arguments to be passed individually, apply takes 
the arguments as an array or an array-like object.

**Syntax:**
```js
func.apply(thisArg, [argsArray])
```

- thisArg: The value you want to assign to this inside the function. If you pass 
null or undefined, the global object will be used (window in browsers, global in Node.js).
- argsArray: An array or an array-like object containing the arguments for the function.

```js
function greet(greeting, age) {
    console.log(`${greeting}, my name is ${this.name} and I'm ${age} years old.`);
}
const person = { name: "Alan" };
greet.apply(person, ["Hello", 26]);
// output: Hello, my name is Alan and I'm 26 years old.
```

**Usage with Math:**
```js
const numbers = [4, 7, 1, 9, 3];
console.log(Math.max.apply(null, numbers)); // 9
console.log(Math.min.apply(null, numbers)); // 1
```

null is used as this because Math.max does not require a context.
```js
function sum(a, b, c) {
    return a + b + c;
}
console.log(sum.call(null, 1, 2, 3));     // 6 (with call)
console.log(sum.apply(null, [1, 2, 3]));  // 6 (with apply)
```

**Inheritance Simulation:**
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Employee(name, age, position) {
    Person.apply(this, [name, age]);
    this.position = position;
}
const employee = new Employee("John", 30, "Developer");
console.log(employee); // Employee { name: 'John', age: 30, position: 'Developer' }
```

apply allows Employee to reuse the constructor of Person.

### bind() Method

The bind() method creates a new function with a specific this value, and op
tionally, pre-set arguments.

**Syntax:**
```js
const boundFunction = func.bind(thisArg[, arg1[, arg2[, ...]]]);
```

- func: The original function you want to bind (bind does not modify the original).
- thisArg: The value you want to assign to this in the new function.
- arg1, arg2, ...: Optional. Predefined arguments that will be passed when the new function is invoked.

```js
const person = {
    firstName: "John",
    lastName: "Doe",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
const member = {
    firstName: "Hege",
    lastName: "Nilsen",
}
let fullName = person.fullName.bind(member);
console.log(fullName()); // Hege Nilsen
```

**Lost Methods:** When you extract a method from an object, the value of this can be lost. Using bind ensures that the method works correctly.
```js
const counter = {
    value: 0,
    increment() {
        this.value++;
        console.log(this.value);
    }
};
const increment = counter.increment.bind(counter);
increment(); // 1
increment(); // 2
```

```js
function introduce(name, age, city) {
    return `${this.title} ${name} is ${age} years old and lives in ${city}.`;
}
const person = { title: "Mr." };

const introduceWithTitle = introduce.bind(person, "Alan", 25);
console.log(introduceWithTitle("Mexico City"));
// Output: "Mr. Alan is 25 years old and lives in Mexico City."
```

```js
function sum(a, b, c) {
    return a + b + c;
}
const sumWith5 = sum.bind(null, 5);
console.log(sumWith5(3, 7)); // Output: 15
```

## Use of arguments

- arguments is an array-like object that is automatically available inside 
any traditional function (but not in arrow functions).
- It contains all the arguments passed to the function, regardless of how 
many are explicitly defined in the function declaration.
- Although arguments is not a true array (it's an object), you can convert 
it into an array if needed.

```js
function sum() {
    console.log(arguments);
    // [Arguments] { '0': 1, '1': 2, '2': 3 }
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(sum(1, 2, 3)); // 6
```

### Limitations of arguments

Not a real array: arguments is an object, not an array. It doesn't have array 
methods like .map(), .filter(), etc. However, you can convert it into an array.
```js
function sum() {
    const args = Array.from(arguments); // Convert to array
    return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
```

### arguments in Arrow Functions

arguments is not available in arrow functions.
If you try to use it, you will get an error because arrow functions do not have 
their own arguments object.
```js
const sum = () => {
    console.log(arguments); // Error: arguments is not defined
};
sum(1, 2, 3);
```

### Modern Alternative: Rest Parameters

Instead of using arguments, you can use rest parameters (...) in modern 
functions. These allow you to collect all arguments into a real array.
```js
const sum = (...args) => {
    return args.reduce((total, num) => total + num, 0);
};
console.log(sum(1, 2, 3)); // 6
```

```js
function sum(...args) {
    return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
```

## Parameters Omission

You can use `_` as a placeholder name for unused parameters. This is a convention that signals the parameter is intentionally not used.

```js
const myFunction = (_, secondParam) => {
    console.log(secondParam);
};

myFunction("No lo uso", "Este sí se imprime"); // Output: "Este sí se imprime"

const numbers = [10, 20, 30];
const indexedNumbers = numbers.map((_, index) => index);

console.log(indexedNumbers); // Output: [0, 1, 2]
```
