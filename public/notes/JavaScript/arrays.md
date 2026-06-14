# Arrays

An array is a data structure that stores an ordered collection of values, called 
elements. These elements can be of any data type, such as numbers, strings, 
objects, or even other arrays.
```js
const mixedArray = ["Hello", 10, true, null, { name: 'Juan', 
job: 'Programmer' }, [1, 2, 3]];
```

## Creating Arrays

a) Using Bracket Notation
```js
let fruits = ["apple", "banana", "orange"];
```
b) Using the Array Constructor
```js
let fruits = new Array("apple", "banana", "orange");
```

## Accessing Elements

You can access array elements using numeric indexes. In JavaScript, in
dexes start at 0, meaning the first element has index 0, the second has index 
1, and so on.
```js
let fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "orange"
```

## Modifying Elements

You can modify array elements by accessing them through their index and 
assigning a new value.
```js
fruits[1] = "pear";
console.log(fruits); // ["apple", "pear", "orange"]
```

## Instance Methods

- length
```js
let numbers = [1, 2, 3, 4];
console.log(numbers.length); // 4
```

- push()
```js
let numbers = [1, 2, 3, 4];
numbers.push(5);
console.log(numbers); // [1, 2, 3, 4, 5]
```

- pop()
```js
let numbers = [1, 2, 3, 4, 5];
let last = numbers.pop();
console.log(last); // 5
console.log(numbers); // [1, 2, 3, 4]
```

- shift()
```js
let numbers = [1, 2, 3, 4];
let first = numbers.shift();
console.log(first); // 1
console.log(numbers); // [2, 3, 4]
```

- unshift()
```js
let numbers = [2, 3, 4];
numbers.unshift(0);
console.log(numbers); // [0, 2, 3, 4]
```

- indexOf()
```js
let numbers = [0, 2, 3, 4];
console.log(numbers.indexOf(3)); // 2
console.log(numbers.indexOf(10)); // -1
```

- slice()
```js
let numbers = [0, 2, 3, 4];
let subArray = numbers.slice(1, 3);
console.log(subArray); // [2, 3]
```

- splice()
The splice() method is used to add, remove, or replace elements in an array.
```js
array.splice(start, deleteCount, item1, item2, ..., itemN)
```
- `start` (required) – The index where the operation starts:
  - A positive value counts from the beginning (0 is the first element).
  - A negative value counts from the end (-1 is the last element).
- `deleteCount` (optional) – The number of elements to remove:
  - If 0, no elements are removed.
  - If omitted, all elements from start to the end are removed.
- `item1, item2, ..., itemN` (optional) – New elements to insert at start:
  - If omitted, splice() only removes elements (if deleteCount > 0).

Return Value:
- Returns a new array containing the removed elements.
- If no elements are removed, an empty array ([]) is returned.

Removing Elements from an Array
```js
let fruits = ['apple', 'banana', 'cherry', 'date'];
let removed = fruits.splice(1, 2); // Removes 2 elements starting from index 1
console.log(fruits); // ['apple', 'date']
console.log(removed); // ['banana', 'cherry']
```

Adding Elements to an Array
```js
let colors = ['red', 'blue', 'green'];
colors.splice(1, 0, 'yellow', 'orange'); // Inserts without removing
console.log(colors); // ['red', 'yellow', 'orange', 'blue', 'green']
```

Replacing Elements in an Array
```js
let numbers = [1, 2, 3, 4];
let replaced = numbers.splice(1, 2, 9, 8); // Replaces 2 elements at index 1
console.log(numbers); // [1, 9, 8, 4]
console.log(replaced); // [2, 3]
```

Removing Elements from a Specific Index to the End
```js
let animals = ['cat', 'dog', 'elephant', 'giraffe'];
let removed = animals.splice(2); // Removes all elements from index 2 onward
console.log(animals); // ['cat', 'dog']
console.log(removed); // ['elephant', 'giraffe']
```

Using Negative Indexes
```js
let cities = ['London', 'Paris', 'Berlin', 'Tokyo'];
cities.splice(-2, 1); // Removes 1 element at index -2 (Berlin)
console.log(cities); // ['London', 'Paris', 'Tokyo']
```

- concat()
```js
let numbers = [0, 2, 3, 4];
let otherNumbers = [5, 6];
let combined = numbers.concat(otherNumbers);
console.log(combined); // [0, 2, 3, 4, 5, 6]
```

- join()
```js
let numbers = [0, 2, 3, 4];
let str = numbers.join("-");
console.log(str); // "0-2-3-4"
```

- reverse()
```js
let numbers = [0, 2, 3, 4];
numbers.reverse();
console.log(numbers); // [4, 3, 2, 0]
```

- sort()
```js
let letters = ["d", "a", "c", "b"];
letters.sort();
console.log(letters); // ["a", "b", "c", "d"]

let nums = [10, 5, 100, 1];
nums.sort((a, b) => a - b);
console.log(nums); // [1, 5, 10, 100]
```

> **Caution when sorting numbers!** Since numbers are converted to strings, sorting `[10, 5, 100, 1]` without a comparator function results in:
```js
let nums = [10, 5, 100, 1];
nums.sort();
console.log(nums); // [1, 10, 100, 5] – wrong order
```

## Functional Methods

- map() – Transform Elements
```js
let numbers = [4, 3, 2, 0];
let doubles = numbers.map(num => num * 2);
console.log(doubles); // [8, 6, 4, 0]
```

- filter() – Select Elements
```js
let numbers = [4, 3, 2, 0];
let greaterThanTwo = numbers.filter(num => num > 2);
console.log(greaterThanTwo); // [4, 3]
```

- reduce() – Accumulate a Value
```js
let numbers = [4, 3, 2, 0];
let sum = numbers.reduce((accumulator, num) => accumulator + num, 0);
console.log(sum); // 9
```

- find() – Find the First Match
```js
let firstGreaterThanTwo = numbers.find(num => num > 2);
console.log(firstGreaterThanTwo); // 4
```

- some() – Check for At Least One Match
```js
let hasNegatives = numbers.some(num => num < 0);
console.log(hasNegatives); // false
```

- every() – Check If All Elements Match
```js
let allPositive = numbers.every(num => num > 0);
console.log(allPositive); // false
```

## Multidimensional Arrays

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix[0][1]); // 2 (row 0, column 1)
console.log(matrix[2][2]); // 9 (row 2, column 2)
```

## Iterating Over Arrays

- for loop:
```js
let numbers = [1, 2, 3, 4];
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

- for...of loop:
```js
for (let number of numbers) {
    console.log(number);
}
```

- forEach():
```js
numbers.forEach(function (number) {
    console.log(number);
});
numbers.forEach(number => console.log(number));
```

## Iterating Over Multidimensional Arrays

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
for (let row of matrix) {
    for (let element of row) {
        console.log(element);
    }
}
/* 1 2 3
   4 5 6
   7 8 9  */
```
