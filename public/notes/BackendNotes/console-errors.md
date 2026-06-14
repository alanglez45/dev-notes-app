# Console

Node.js provides a console module which provides tons of very useful ways to interact with the command line.

## Basic Output

The most basic and most used method is console.log(), which prints the string you pass to it to the console.
```
const name = 'Bruce';
const surname = 'Wayne';
console.log(name, surname); // Bruce Wayne
```

## Clear the console
```
console.clear();
```

## Counting elements
```
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
    console.count(fruit);
});
apples.forEach(fruit => {
    console.count(fruit);
});
// The output:
// orange: 1
// orange: 2
// just one apple: 1
```

## Calculate the time spent
```
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
    console.time('doSomething()');
    doSomething();
    console.timeEnd('doSomething()');
};
measureDoingSomething();
// The output:
// test
// doSomething(): 0.065673828125 ms
```

## Using table
```
const authorsAndBooks = [
    ['Tolkien', 'Lord of The Rings'],
    ['Rutger', 'Utopia For Realists'],
    ['Sinek', 'Leaders Eat Last'],
    ['Eyal', 'Habit'],
];
console.table(authorsAndBooks);
```

```
const inventory = { apples: 200, mangoes: 50, avocados: 300, kiwis: 50 };
console.table(inventory);
```

## Print errors and warnings
- console.error writes an error message to the console:
```
console.error('error');
```
- console.warn method writes a warning to the console:
```
console.warn('warn');
```

## Style the output

You can style the browser output of your message by using %c directive to apply a CSS style to console output.
```
console.log("This is %cMy stylish message", "color: lime; font-style: italic; background-color: deeppink;padding: 2px");
```

Sadly, the same thing doesn't work for Node.js, exactly. Since node is running in a terminal, it's not running in a browser that understands CSS. Instead, we can change the colors of the text through some odd-looking characters: \x1b[31m makes the text red.
```
console.log('\x1b[31mAnd now I\'m red!');
```

---

# Errors

An Error in Node.js is any instance of the Error object.

- ReferenceError - when a reference made to a variable/item is broken, which means the variable/item doesn't exist.
- RangeError - when a number is outside an allowable range of values.
- TypeError - when an operation is performed on a wrong data type
- URIError - indicates that one of the global URI handling functions was used in an incompatible way with its definition.
- EvalError - is used to identify errors when using the global eval() function.
- SyntaxError - when we type code that the JS engine can't understand.

## User-defined errors
```
const error = new Error("I am a teapot!");
error.code = 418;
console.log(error.name); // Error
console.log(error.message); // I am a teapot!
console.log(error.stack);
/* Error: I am a teapot!
    at Object.<anonymous> (/Users/anastasia/Desktop/node/app.js:1:15)
    <truncated for brevity>
    at node:internal/main/run_main_module:17:47 */
```

## Why Do You Need Error Handling

Error handling is a way to find bugs and solve them as quickly as humanly possible and helps execution to resume when interrupted. It centralizes all errors and lets you enable alerting and notifications so you know when and how your code breaks.

## Operational Errors

These errors are expected in the Node.js runtime and should be dealt with in a proper way. This does not mean the application itself has bugs. It means they need to be handled properly.
- failed to connect to server
- a database connection is lost
- invalid user input
- system is out of memory

## Programmer errors

Programmer errors are mistakes in the logic or syntax of the program that can only be corrected by changing the source code.
- syntax errors, such as failing to close a curly brace
- bad parameters when calling a function
- reference errors when you misspell a variable, function, or property name
- unresolved promise
- failing to handle an operational error

## How to deliver errors

### Throw exception
In Node.js (and JavaScript in general), when an error is thrown using the throw statement, it creates an exception that propagates up through the function call stack until it is caught by a try/catch block. If it's not caught, it will crash the program.

```
function square(num) {
    if (typeof num !== 'number') {
        throw new TypeError(`Expected number but got: ${typeof num}`);
    }
    return num * num;
}

try {
    square('8');
} catch (err) {
    console.log(err.message); // Expected number but got: string
}
```
