# TypeScript Classes

```ts
class Car {
    engine: string;

    constructor(engine: string) {
        this.engine = engine;
    }

    disp(): void {
        console.log("Function displays Engine is : " + this.engine);
    }
}

let obj = new Car("XXSY1");
console.log("Reading attribute value Engine as : " + obj.engine);
obj.disp();
```

Output:
```
Reading attribute value Engine as : XXSY1
Function displays Engine is : XXSY1
```

## Forma corta

```ts
class Heroe {
    static avgAge: number = 35;

    constructor(
        private name: string,
        private team: string,
        private realName?: string
    ) { }
}

const antman: Heroe = new Heroe('Antman', 'Capitan');
console.log(antman);
```

## Forma larga

```ts
class Heroe {
    private name: string;
    private team: string;
    private realName?: string;
    static avgAge: number = 35;

    constructor(name: string, team: string, realName?: string) {
        this.name = name;
        this.team = team;
        this.realName = realName;
    }
}

const antman: Heroe = new Heroe('Antman', 'Capitan');
console.log(antman);
```

## Class Inheritance

```ts
class Shape {
    Area: number;

    constructor(a: number) {
        this.Area = a;
    }
}

class Circle extends Shape {
    disp(): void {
        console.log("Area of the circle: " + this.Area);
    }
}

let obj = new Circle(223);
obj.disp();
```

Output:
```
Area of the Circle: 223
```

## Class Inheritance and Method Overriding

```ts
class PrinterClass {
    doPrint(): void {
        console.log("doPrint() from Parent called…");
    }
}

class StringPrinter extends PrinterClass {
    doPrint(): void {
        console.log("doPrint() is printing a string…");
    }
}

let obj = new StringPrinter();
obj.doPrint();
```

## The static Keyword

```ts
class StaticMem {
    static num: number;

    static disp(): void {
        console.log("The value of num is " + StaticMem.num);
    }
}

StaticMem.num = 12;
StaticMem.disp();
```

Output:
```
The value of num is 12
```

## The instanceof Operator

```ts
class Person { }

let obj = new Person();
let isPerson = obj instanceof Person;
console.log("is obj an instance of Person? " + isPerson);
```

Output:
```
is obj an instance of Person? true
```

## Data Hiding

### Access Specifiers

| Specifier | Description |
|---|---|
| public | Universal accessibility. Data members in a class are public by default. |
| private | Accessible only within the class that defines them. |
| protected | Accessible within the same class and by child classes. |

### Public

```ts
class Person {
    name: string;
}

const person = new Person();
person.name = "Jane";
```

### Private

```ts
class Encapsulate {
    str: string = "hello";
    private str2: string = "world";
}

var obj = new Encapsulate();
console.log(obj.str);    // accessible
console.log(obj.str2);   // compilation Error — str2 is private
```

### Protected

```ts
class Person {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    protected greet() {
        return `Hello, my name is ${this.name}`;
    }
}

class Employee extends Person {
    private position: string;

    constructor(name: string, position: string) {
        super(name);
        this.position = position;
    }

    public introduce() {
        return `${this.greet()} and I am a ${this.position}`;
    }
}

const emp = new Employee("Alice", "Developer");
console.log(emp.introduce()); // "Hello, my name is Alice and I am a Developer"

// Accesos inválidos:
// console.log(emp.name);   // Error: 'name' is protected
// console.log(emp.greet());// Error: 'greet' is protected
```

## Getters y Setters

```ts
class TemperatureConverter {
    private _celsius: number = 0;

    get celsius(): number {
        return this._celsius;
    }

    set celsius(value: number) {
        if (value >= -273.15) {
            this._celsius = value;
        } else {
            console.error("Invalid temperature. Must be greater than or equal to -273.15°C.");
        }
    }

    get fahrenheit(): number {
        return (this._celsius * 9 / 5) + 32;
    }

    set fahrenheit(value: number) {
        this._celsius = (value - 32) * 5 / 9;
    }
}

const temperatureConverter = new TemperatureConverter();
temperatureConverter.celsius = 25;
console.log("Temperature in Celsius:", temperatureConverter.celsius);
console.log("Temperature in Fahrenheit:", temperatureConverter.fahrenheit);
```

## Abstract Classes

Abstract classes are mainly for inheritance where other classes may derive from them. We cannot create an instance of an abstract class.

```ts
abstract class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    display(): void {
        console.log(this.name);
    }

    abstract find(name: string): Person;
}

class Employee extends Person {
    empCode: number;

    constructor(name: string, code: number) {
        super(name);
        this.empCode = code;
    }

    find(name: string): Person {
        return new Employee(name, 1);
    }
}

let emp: Person = new Employee("James", 100);
emp.display(); // James
let emp2: Person = emp.find('Steve');
```

### Constructor en clase abstracta

Las clases abstractas pueden tener constructor. Aunque no puedes instanciarlas directamente, las subclases llaman al constructor mediante `super()` para inicializar propiedades o configuración común.

```ts
abstract class Animal {
    constructor(public name: string) {
        console.log(`Animal ${name} is created.`);
    }

    abstract makeSound(): void;
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} says: Meow!`);
    }
}

const dog = new Dog("Buddy");    // Animal Buddy is created.
dog.makeSound();                  // Buddy says: Woof!
const cat = new Cat("Whiskers");  // Animal Whiskers is created.
cat.makeSound();                  // Whiskers says: Meow!
```

### Variables abstractas

```ts
abstract class Animal {
    abstract species: string;

    constructor(public name: string) {}

    describe(): void {
        console.log(`${this.name} is a ${this.species}.`);
    }

    abstract makeSound(): void;
}

class Dog extends Animal {
    species: string = "Dog";

    makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

class Cat extends Animal {
    species: string = "Cat";

    makeSound(): void {
        console.log(`${this.name} says: Meow!`);
    }
}

const dog = new Dog("Buddy");
dog.describe();   // Buddy is a Dog.
dog.makeSound();  // Buddy says: Woof!

const cat = new Cat("Whiskers");
cat.describe();   // Whiskers is a Cat.
cat.makeSound();  // Whiskers says: Meow!
```

## Private Constructors (Singleton Pattern)

```ts
class Logger {
    private static instance: Logger;

    private constructor() {
        console.log("Logger initialized.");
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string): void {
        console.log(`Log entry: ${message}`);
    }
}

const logger1 = Logger.getInstance();
logger1.log("First log entry.");  // Log entry: First log entry.

const logger2 = Logger.getInstance();
logger2.log("Second log entry."); // Log entry: Second log entry.

console.log(logger1 === logger2);  // true
```
