# Control Flow

## Conditional Structures

Conditional structures allow executing different code blocks based on certain conditions.

### if

Executes a block of code if a condition is true.
```js
const age = 18;
if (age >= 18) {
  console.log("You are of legal age.");
}
```

### if...else

Executes one block if the condition is true, and another block if the condition is false.
```js
const age = 16;
if (age >= 18) {
  console.log("You are of legal age.");
} else {
  console.log("You are underage.");
}
```

### if...else if...else

Allows checking multiple conditions in sequence.
```js
const score = 85;
if (score >= 90) {
  console.log("Excellent");
} else if (score >= 80) {
  console.log("Very good");
} else {
  console.log("Needs improvement");
}
```

### switch

Allows selecting one among multiple code blocks to execute based on the value of an expression.
```js
const day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Other day");
}
```

## Loop Structures

Loop structures allow repeating a block of code multiple times.

### for

Repeats a block of code a specific number of times.
```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

### while

Repeats a block of code while a condition is true.
```js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

### do...while

Similar to while, but guarantees the code block executes at least once, since the condition is checked after execution.
```js
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 5);
```

## Iterators

### for...in

The for...in loop iterates over the enumerable properties of an object, including inherited properties through the prototype chain.
```js
const person = {
    name: 'Juan',
    age: 30,
    city: 'Madrid'
};
for (const key in person) {
    console.log(key, person[key]);
}
```

Notes:
- for...in iterates over object properties.
- for...in on arrays returns the indices.
```js
const tasks = ['Task', 'Eat', 'Project', 'Study JavaScript'];
for (let task in tasks) {
    console.log(task);
}
```

### for...of

The for...of loop iterates over the elements of iterable objects, such as arrays, strings, maps, sets, etc. Unlike for...in, for...of does not iterate over object properties, but over the values of an iterable collection.
```js
const tasks = ['Task', 'Eat', 'Project', 'Study JavaScript'];
for (let task of tasks) {
    console.log(task);
}
```

Notes:
for...of iterates over arrays (returns values).
```js
const person = {
    name: 'Juan',
    age: 30,
    city: 'Madrid'
};
// Object.entries(person) returns an array
for (const [key, value] of Object.entries(person)) {
    console.log(key, value);
}
```

### map()

The map() method is an array function that creates a new array with the results of calling a provided function on every element in the original array.
```js
const numbers = [1, 2, 3, 4];
const doubles = numbers.map(num => num * 2);
console.log(doubles); // [2, 4, 6, 8]
```

Notes:
map() does not modify the original array; it returns a new array with the transformed elements.

### forEach()

The forEach() method executes a provided function once for each array element.
```js
const fruits = ['apple', 'banana', 'orange'];
fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});
```

Notes:
- forEach() does not return a new array; it simply executes the provided function for each element.
