# Closures

Closures in JavaScript are functions that "remember" the scope in which they 
were created, even after that scope has finished executing.
In other words, a closure allows a function to access variables from an outer 
function even after the outer function has returned.

## How Closures Work

When a function is created inside another function, it has access to:
- Its own local variables.
- The variables of the outer function.
- Global variables.

Even if the outer function finishes execution, the inner function can still access 
the outer function's variables because they are kept in memory.

```js
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
    };
}
const closureInstance = outerFunction("Hello");
closureInstance("World"); // Output: Outer: Hello, Inner: World
```

```js
function makeFunc() {
    let name = 'Mozilla';
    function displayName() {
        alert(name);
    }
    return displayName;
}
let myFunc = makeFunc();
myFunc();
```

```js
function makeCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}
let counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```
