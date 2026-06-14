# Strings & String Methods

String y String Methods
You can use single or double quotes:
```js
let carName1 = "Volvo XC60";  // Double quotes
let carName2 = 'Volvo XC60';  // Single quotes
```
Quotes Inside Quotes
You can use quotes inside a string, as long as they don't match the quotes 
surrounding the string.
```js
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"';
  
```
Template Strings
Templates are strings enclosed in backticks (`This is a template string`).
Templates allow single and double quotes inside a string.
```js
let text = `He's often called "Johnny"`;
```
Escape Characters
Because strings must be written within quotes, JavaScript will misunderstand 
this string:
```js
let text = "We are the so-called "Vikings" from the 
north.";
```
The string will be chopped to "We are the so-called ".
To solve this problem, you can use a backslash escape character.
```js
let text = "We are the so-called \"Vikings\" from the 
north.";
let text= 'It\'s alright.';
let text = "The character \\ is called backslash.";
  

```
String methods
- JavaScript String Length
The length property returns the length of a string.
```js
let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;
console.log(length); // 26
```
- JavaScript String includes()
The includes() method returns true if a string contains a specified string.
Otherwise it returns false.
The includes() method is case sensitive.
```js
let text = "Hello world, welcome to the universe.";
let result = text.includes("world");
console.log(result); // true
```
- JavaScript String trimStart(), trimEnd(), trim()
trimStart() removes whitespace only from the start of a string.
trimEnd() removes whitespace only from the end of a string.
trim() removes whitespace from both sides of a string.
```js
let text1 = "     Hello World!     ";
let text2 = text1.trimStart();
let text3 = text1.trimEnd();
let text4 = text1.trim();
 
console.log(text1.length); // 22
console.log(text2.length); // 17
console.log(text3.length); // 17
console.log(text4.length); // 12

```
- JavaScript String replace()
The replace() method replaces a specified value with another value in a string.
```js
let text = "Please visit Microsoft!";
let newText = text.replace("Microsoft", "W3Schools");
console.log(newText); // Please visit W3Schools!
```
- JavaScript String slice()
```js
slice() extracts a part of a string and returns the extracted part in a new 
```
string.
The method takes 2 parameters: start position, and end position (end not in
cluded).
```js
let text = "Apple, Banana, Kiwi";
let part = text.slice(7, 13);
console.log(part); // Banana
```
- JavaScript String substring()
The substring() method of String values returns the part of this string from 
the start index up to and excluding the end index.
```js
let str = "Apple, Banana, Kiwi";
let part = str.substring(1,5);
 
console.log(part); // pple

```
If you omit the second parameter, substring() will slice out the rest of the 
string.
```js
let str = "Apple, Banana, Kiwi";
let part = str.substring(7);
console.log(part); // Banana, Kiwi
```
- JavaScript String repeat()
The repeat() method returns a string with a number of copies of a string.
The repeat() method returns a new string.
The repeat() method does not change the original string.
```js
let text = "Hello world!";
let result = text.repeat(2);
console.log(result);  // Hello world!Hello world!
```
- JavaScript String split()
A string can be converted to an array with the split() method.
```js
let text = "a,b,c,d,e,f";
const myArray = text.split(",");
console.log(myArray); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

- Converting to Upper and Lower Case
A string is converted to upper case with toUpperCase():
A string is converted to lower case with toLowerCase():
```js
let text1 = "Hello World!";

let text2 = text1.toUpperCase();
let text3 = text1.toLowerCase();
console.log(text2); // HELLO WORLD!
console.log(text3); // hello world!

```

## String concatenation

String concatenation refers to combining multiple strings into a single string.

### Using the + Operator
```js
let greeting = "Hello";
let name = "John";
let result = greeting + name;
console.log(result); // Output: HelloJohn
```

### Using the += Operator
```js
let name = "John ";
name += "Doe";
console.log(name); // Output: John Doe
```

### Using String concat() Method
```js
str1.concat(str2, str3, . . . , strN)
let str = 'Geeks';
let value = str.concat('for', 'Geeks');
console.log(value);
```

### Using Template Literals (Template Strings)
```js
const producto = "Tablet de 12 pulgadas";
const precio = 30;
const marca = "Apple";
console.log(producto + ", $" + precio + " dolares, marca " + marca);
console.log(`${producto}, $${precio} dolares, marca ${marca}`);
```

Salida:
```
Tablet de 12 pulgadas, $30 dolares, marca Apple
Tablet de 12 pulgadas, $30 dolares, marca Apple
```
