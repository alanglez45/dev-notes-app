# Objects & Copying

## Object Literals

An object is a collection of data and functionalities represented as key-value pairs.
```js
let person = {
    name: "Juan",
    age: 30,
    isStudent: true,
    greet: function () {
        console.log("Hello, my name is " + this.name);
    }
};
```

### Accessing Properties

**Dot Notation:**
```js
console.log(person.name); // "Juan"
person.age = 31;
console.log(person.age); // 31
```

**Bracket Notation:**
Useful when the property name is dynamic or doesn't follow variable naming conventions.
```js
console.log(person["name"]); // "Juan"
person["age"] = 32;
console.log(person["age"]); // 32
```

### Object Methods
```js
person.greet(); // "Hello, my name is Juan"
```

### Updating a Value
```js
person["age"] = 32;
person.age = 32;
```

### Adding New Properties
If the property does not exist, it will be added to the object.
```js
person.lastName = "Corona";
```

### Deleting a Property
```js
delete person.lastName;
```

### Freezing an Object
```js
Object.freeze(person); // After freezing, you cannot add, remove, or modify properties.
```

### Sealing an Object
It prevents adding or deleting properties, but allows modifying existing ones.
```js
Object.seal(person);
```

## Merging Two or More Objects

### Using Spread Operator
```js
const product = {
    name: 'Tablet',
    price: 50
};
const customer = {
    name: 'John',
    premium: true
};
const newObject = {
    product: { ...product },
    customer: { ...customer }
};
console.log(newObject);
// Output:
// {
//     product: { name: 'Tablet', price: 50 },
//     customer: { name: 'John', premium: true }
// }
```

```js
const newObject = {
    ...product,
    ...customer
}
console.log(newObject);
// output: { name: 'John', price: 50, premium: true }
```

### Using Object.assign()
```js
const product = {
    name: "20-inch Monitor",
    price: 300,
    available: true,
};
const dimensions = {
    weight: '1kg',
    size: '1m',
};
const result = Object.assign(product, dimensions);
console.log(result);
// output:
// {
//     name: '20-inch Monitor',
//     price: 300,
//     available: true,
//     weight: '1kg',
//     size: '1m'
// }
```

## Copying by Reference vs Shallow Copy vs Deep Copy

### Copying by Reference
When you assign an object or array to a new variable, you're copying the reference, not the actual data.
```js
const originalArray = [1, 2, 3];
const copiedArray = originalArray; // Copying the reference
copiedArray.push(4);
console.log(originalArray); // [1, 2, 3, 4] - The original is modified
console.log(copiedArray); // [1, 2, 3, 4] - Both point to the same underlying array
```

### Shallow Copy

A shallow copy occurs when you copy the reference of an object to a new variable. In this process, only the top-level properties are copied, while nested objects or arrays still reference the original memory location. This means that if you change the nested properties in one object, those changes will reflect in the other because they share the same memory reference.

#### Spread Operator (...)
```js
const person = {
    "name": 'John',
    "age": 20,
};
const personcopy = { ...person };
console.log("person", person);
console.log("personcopy", personcopy);
personcopy.name = "Alan";
console.log("person", person);
console.log("personcopy", personcopy);
// person { name: 'John', age: 20 }
// personcopy { name: 'John', age: 20 }
// person { name: 'John', age: 20 }
// personcopy { name: 'Alan', age: 20 }
```
Disadvantage: Just like Object.assign(), this doesn't copy nested objects deeply.

#### Object.assign()
```js
const obj = {
    name: 'Version 1',
    additionalInfo: {
        version: 1
    }
};
const shallowCopy1 = { ...obj };
const shallowCopy2 = Object.assign({}, obj);
shallowCopy1.name = 'Version 2';
shallowCopy1.additionalInfo.version = 2;
shallowCopy2.name = 'Version 3';
shallowCopy2.additionalInfo.version = 3;
console.log(obj); // { name: 'Version 1', additionalInfo: { version: 3 } }
console.log(shallowCopy1); // { name: 'Version 2', additionalInfo: { version: 3 } }
console.log(shallowCopy2); // { name: 'Version 3', additionalInfo: { version: 3 } }
```
Disadvantage: It doesn't copy deep nested objects; it only copies references to the internal objects.

### Deep Copy

A deep copy creates a completely independent copy of the object, including all nested objects or arrays. This ensures that changes made to one object do not affect the other.

#### JSON.parse(JSON.stringify())
```js
const obj = { name: 'Version 1', additionalInfo: { version: 1 } };
const deepCopy = JSON.parse(JSON.stringify(obj));
deepCopy.name = 'Version 2';
deepCopy.additionalInfo.version = 2;
console.log(obj); // { name: 'Version 1', additionalInfo: { version: 1 } }
console.log(deepCopy); // { name: 'Version 2', additionalInfo: { version: 2 } }
```
Advantage: It works well for simple structures.
Disadvantage: It doesn't copy functions, undefined, Symbol, BigInt, or circular references.

#### structuredClone()
It can perform deep copies of as many levels as needed; it creates a completely new copy of the original object without shared references or properties.
```js
const obj = {
    name: "Alan",
    details: {
        age: 25,
        skills: ["JavaScript", "TypeScript"],
    },
};
const copy = structuredClone(obj);
copy.details.age = 30;
console.log(obj.details.age); // 25 (The original doesn't change)
console.log(copy.details.age); // 30 (The clone is independent)
```

You can clone objects that have circular references, which is something not possible with the JSON approach.
```js
const circularObj = { name: "Circular" };
circularObj.self = circularObj; // Circular reference
const clone = structuredClone(circularObj);
console.log(clone.self === clone); // true (Deep copy preserves the reference)
```

However, it cannot clone functions or methods.
```js
const objWithFunc = {
    greet() {
        return "Hello!";
    },
};
const clonedObj = structuredClone(objWithFunc);
console.log(clonedObj.greet); // undefined (The function is lost)
```

### Summary

| Method | Copy type | Support nested | Support Date, Map, Set | Support functions |
|--------|-----------|----------------|------------------------|-------------------|
| Object.assign() | Shallow (copy references) | No | Yes | Yes |
| Spread operator | Shallow (copy references) | No | Yes | Yes |
| JSON.parse() | Deep (copy values) | No | No | No |
| structuredClone() | Deep (copy values) | Yes | Yes | No |

## Destructuring

The destructuring assignment syntax unpacks object properties into variables.

### Object Destructuring
```js
const person = {
    name: "John",
    lastName: "Doe",
    age: 50
};
const product = {
    name: "tablet",
    price: 50,
};

let { name, lastName } = person;
```

Avoid variable name collisions:
```js
let { name: productName } = product;
```

### Default Values
```js
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50
};
let { firstName, lastName, country = "US" } = person;
```

### Destructuring Nested Objects
```js
const client = {
    name: "Alan",
    premium: true,
    address: {
        street: "Av.México"
    }
};
const { name: clientName, address: { street } } = client;
console.log(street); // "Av.México"
```

### Destructuring and Renaming
```js
const user = {
    name: "Juan",
    address: {
        city: "Madrid",
        postalCode: "28001"
    }
};
const { address: { city: userCity } } = user;
console.log(userCity); // "Madrid"
```

### The Rest Operator
It allows us to collect and gather "the rest" of the properties of an object into a new object.
```js
const person = {
    name: 'John',
    age: 30,
    profession: 'Developer',
    country: 'USA'
};
const { name, age, ...rest } = person;
console.log(name);  // John
console.log(age);   // 30
console.log(rest);  // { profession: 'Developer', country: 'USA' }
```

### Array Destructuring
We can pick up array variables into our own variables.
```js
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];
let [fruit1, fruit2] = fruits;
console.log(fruit1, fruit2); // Bananas Oranges
```

#### Skipping Array Values
We can skip array values using two or more commas.
```js
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];
let [fruit1,,,fruit2] = fruits;
console.log(fruit1, fruit2); // Bananas Mangos
```

#### Array Position Values
We can pick up values from specific index locations of an array.
```js
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];
let {[3]: fruit1, [1]: fruit2} = fruits;
console.log(fruit2, fruit1); // Oranges Mangos
```

#### The Rest Operator in Arrays
You can end a destructuring syntax with a rest property. This syntax will store all remaining values into a new array.
```js
const numbers = [10, 20, 30, 40, 50, 60, 70];
const [a, b, ...rest] = numbers;
console.log(a, b); // 10 20
console.log(rest); // [ 30, 40, 50, 60, 70 ]
```
