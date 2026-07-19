# JSX

**JSX** (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like code inside JavaScript. It's not valid JavaScript on its own — tools like Babel or SWC transpile it into regular `React.createElement()` calls.

```jsx
// JSX
const element = <h1>Hello, world!</h1>;

// What React compiles it to
const element = React.createElement('h1', null, 'Hello, world!');
```

JSX makes it easier to visualize and write UI structures compared to pure JavaScript calls.

## JSX Expressions

Use curly braces `{}` to embed any JavaScript expression inside JSX.

**Variables:**

```jsx
const name = "Alan";
const element = <h1>Hello, {name}</h1>;
```

**Function calls:**

```jsx
function getGreeting() {
    return "Welcome back!";
}

const element = <h1>{getGreeting()}</h1>;
```

**Template literals:**

```jsx
const user = "Alan";
const element = <p>Hello, {`Mr. ${user}`}</p>;
```

**Arithmetic:**

```jsx
const element = <p>{2 + 3}</p>;
```

**Object access:**

```jsx
const user = { name: "Alan", age: 25 };
const element = <p>{user.name} is {user.age}</p>;
```

> You can only embed **expressions**, not statements. `{if (true) {}}` won't work.

## JSX Rules

### 1. Return a single root element

```jsx
<div>
    <h1>Hedy Lamarr's Todos</h1>
    <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        class="photo"
    />
    <ul>
        ...
    </ul>
</div>
```

## Fragment

If you don't want to add an extra `<div>`, use `<>` `</>` or `<Fragment>`:

```jsx
<>
    <h1>Hedy Lamarr's Todos</h1>
    <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        class="photo"
    />
    <ul>
        ...
    </ul>
</>
```

```jsx
import { Fragment } from "react";

export default function Component() {
    return (
        <Fragment>
            <h1>Hedy Lamarr's Todos</h1>
            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                class="photo"
            />
            <ul>
                ...
            </ul>
        </Fragment>
    );
}
```

## 2. Close all tags

JSX requires explicit closing. HTML void elements must be self-closed with ` />`.

```jsx
// Bad — won't compile
<img src="photo.jpg">
<br>
<input type="text">

// Good — self-closed
<img src="photo.jpg" />
<br />
<input type="text" />
```

Elements with children use opening and closing tags normally:

```jsx
<li>Invent new traffic lights</li>
```

## 3. Conditional Rendering

**if/else:**

```jsx
if (isPacked) {
    return <li className="item">{name}</li>;
}
return <li className="item">{name}</li>;
```

**Ternary operator:**

```jsx
return (
    <li className="item">
        {isPacked ? name + 'John' : name}
    </li>
);
```

**Logical AND (&&):**

```jsx
return (
    <li className="item">
        {name} {isPacked && 'hola'}
    </li>
);
```

> Don't put numbers on the left side of `&&`. `0 && <p>hi</p>` renders `0`. Fix: `messageCount > 0 && <p>New messages</p>`.

## 4. Lists and Keys

Use `.map()` to render arrays as JSX elements.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
);
const element = <ul>{listItems}</ul>;
```

> Each element in a list needs a unique `key` prop. See [Components & Props - Key Prop](03-components-props.md) for details.

## 5. Use camelCase for HTML attributes

```jsx
// class → className
<div className="container"></div>

// for → htmlFor
<label htmlFor="inputId">Input:</label>

// Events
<button onClick={handleClick}>Click me</button>
```

## 6. Components vs HTML elements

JSX distinguishes between HTML elements and React components by **case**:

- **Lowercase** — treated as HTML: `<div>`, `<span>`, `<img>`
- **Uppercase** — treated as a component: `<MyComponent />`

```jsx
// HTML element
<div className="container">Hello</div>

// React component (must be defined or imported)
function Greeting({ name }) {
    return <h1>Hello, {name}</h1>;
}

// Usage
<Greeting name="Alan" />
```

> If a component starts with a lowercase letter, React treats it as an HTML tag and it won't work. Always start component names with an uppercase letter.
