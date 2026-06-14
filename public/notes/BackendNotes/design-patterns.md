# Patrones de Diseño / Design Patterns

## Factory functions

Las factory functions en JavaScript son funciones que crean y devuelven objetos. Son una alternativa a las clases y a los constructores para crear múltiples instancias de objetos con las mismas propiedades y métodos.

Se llaman "factory" porque actúan como una fábrica que genera objetos. A diferencia de usar clases, con las factory functions no se necesita la palabra clave new para crear instancias.

```
function createUser(name, age) {
    return {
      name,
      age,
      greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
      },
    };
  }

  const user1 = createUser('Alice', 30);
  const user2 = createUser('Bob', 25);

  console.log(user1.greet());
// Hello, my name is Alice and I am 30 years old.
  console.log(user2.greet());
// Hello, my name is Bob and I am 25 years old.
```

---

## Adapter method

Adapter Pattern in JavaScript is a structural design pattern that allows you to make one interface or object work with another that has a different interface.

### Example

```
class Calculator {
    operation(num1, num2, operation) {
      switch (operation) {
        case 'multiplication':
          return num1 * num2;
        case 'division':
          return num1 / num2;
        default:
          return NaN;
      }
    }
  }

  export default Calculator;
```

and we can use the class like this:

```
import Calculator from "./Calculator"
const calculator = new Calculator();
const multi = calculator.operation(1, 2, 'multiplication');
console.log(multi); //output 2
const div = calculator.operation(10, 2, 'division');
console.log(div); //output 5
```

The time passes and the project gets bigger and bigger. It's time for a complete refactor of the Calculator class!

```
class Calculator {
    add(num1, num2) {
      return num1 + num2;
    }
    div(num1, num2) {
      return num1 / num2;
    }
    mult(num1, num2) {
      return num1 * num2;
    }
  }

  export default Calculator;
```

This is the new way of using the calculator:

```
import Calculator from "./Calculator"
const calculator = new Calculator();
const sum = calculator.add(1, 2);
console.log(sum); //output 3
const sub = calculator.div(10, 2);
console.log(sub); //output 5
```

As we can see, the refactor is no more compatible with the last version. For this we need to create an adaptor to make it work with both versions.

```
import Calculator from "./Calculator";
class CalculatorAdapter {
  constructor() {
    this.calculator = new Calculator();
  }
  operation(num1, num2, operation) {
    switch (operation) {
      case "add":
        return this.calculator.add(num1, num2);
      case "multiplication":
        return this.calculator.mult(num1, num2);
      case "division":
        return this.calculator.div(num1, num2);
      default:
        return NaN;
    }
  }
}
export default CalculatorAdapter;
```

Now we can use the the original Calculator with the Adapter.

```
import Calculator from "./Calculator";
import CalculatorAdapter from "./CalculatorAdapter";

const calcAdapter = new CalculatorAdapter();
const sumAdapter = calcAdapter.operation(2, 2, "multiplication");
console.log(sumAdapter); //output 4

const calculator = new Calculator();
const sum = calculator.mult(2, 2);
console.log(sum); //output 4
```
