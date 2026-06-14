# React Fundamentals

## Instalación con Vite

```
cd /Users/alanglez/Downloads/react-2024
npm create vite@latest
```

Project name: my-app
Select a framework: **React**
Select a variant: **JavaScript + SWC** (SWC es un compilador JS/TS rápido escrito en Rust)

```
cd my-app
npm install
npm run dev
```

### Recommended tools

**Browser extensions:** React Developer Tools, Redux Dev Tools

**VSCode extensions:** TypeScript Importer, Simple React Snippets, ES7+ React/Redux/React-Native snippets

## React Library

React is a JavaScript library used to build single-page applications (SPAs) by creating reusable UI components.

### Single Page Application (SPA)

Refers to a web application that dynamically rewrites the current page rather than loading entire new pages from the server.

**Pros:**
- Much faster user experience (no full page reloads)
- Reduces server resource consumption
- Same API can be reused for mobile apps
- Easy to transform into Progressive Web Apps (offline support)
- Backend and frontend teams can work independently

**Cons:**
- Not ideal for SEO-required apps (unless using SSR)
- Large JavaScript bundles
- Potential memory leaks (app runs for extended periods)
- Poor performance on low-power devices
- Accessibility concerns if JS is disabled

### Overriding Navigation

As default browser navigation is eliminated in SPAs, URLs must be manually managed via a **router** (e.g., React Router).

### Why React is not a framework

React is a library because it needs additional dependencies to build a complete web application, whereas a framework includes tools/dependencies out of the box.

### How does React work?

React operates by creating an in-memory **virtual DOM** rather than directly manipulating the browser's DOM.

### Features of React

- **Declarative** — describe what the UI should look like, not how to achieve it
- **Server-Side Rendering (SSR)** — renders components on the server (e.g., Next.js)
- **Component-Based Architecture** — break UI into reusable, self-contained components
- **JSX** — syntax extension that allows writing HTML-like code within JavaScript
- **Virtual DOM** — lightweight in-memory representation of the real DOM
- **One-way Data Binding** — data flows from parent to child via props

#### Declarative vs Imperative

```jsx
// Declarative
const element = <h1>Hello, world</h1>;

// Imperative
const element = document.createElement('h1');
element.innerHTML = 'Hello, world';
```

#### JSX with expressions

```jsx
const name = "GeekforGeeks";
const element = <h1>Welcome to {name}</h1>;
```

## Component

A reusable, self-contained building block that defines a part of the UI. Components are like JS functions/classes that accept **props** and return React elements (JSX).

```jsx
export default function Profile() {
    return (
        <img
            src="https://i.imgur.com/MK3eW3Am.jpg"
            alt="Katherine Johnson"
        />
    );
}
```

> Always start component names with a capital letter. `<div />` is an HTML tag, but `<Greeting />` is a component.

### Types of Components

- **Functional Components** — plain JS functions that accept props and return JSX
- **Class Components** — ES6 classes extending `React.Component` with lifecycle methods
- **Stateful vs Stateless** — stateful manages internal state; stateless only receives props
- **Presentational vs Container** — presentational focuses on UI; container handles logic/state

### Why Components?

- **Modularity** — break UI into smaller, self-contained units
- **Reusability** — use the same component across different parts of the app
- **Separation of Concerns** — separate logic from presentation

## Props

Props (short for "properties") pass data from parent to child. They are **read-only** and immutable within the child.

```jsx
function ParentComponent() {
    return <ChildComponent name="John" age={25} />;
}

function ChildComponent(props) {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
}
```

### Props vs State

| Props | State |
|---|---|
| Passed from parent to child | Managed internally within component |
| Immutable | Can change over time |
| Read-only in child | Updated via setter (e.g., setState) |

### Children Prop

`props.children` passes content between opening and closing tags of a component.

```jsx
function ParentComponent() {
    return (
        <ChildComponent>
            <p>This is the children content.</p>
        </ChildComponent>
    );
}

function ChildComponent({ children }) {
    return <div>{children}</div>;
}
```

### Key Prop

Used by React to identify which items in a list have changed, been added, or removed. Improves performance by avoiding unnecessary re-renders.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
);
const element = <ul>{listItems}</ul>;
```

### Props Drilling

Passing data through multiple component layers even when some don't need it. Avoid with:
- **Context API** — global state without prop drilling
- **State Management Libraries** (Redux, Zustand, etc.)

### PropTypes

Runtime type-checking for props. Optional but recommended.

```
npm install prop-types
```

```jsx
import PropTypes from 'prop-types';

function MyComponent({ name, age, isStudent }) {
    return (
        <div>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Is Student: {isStudent ? 'Yes' : 'No'}</p>
        </div>
    );
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isStudent: PropTypes.bool,
};
```

## React Element

The smallest building block of a React application. Represents a virtual DOM node. Elements are **immutable**.

```jsx
const element = <h1>Hello, world!</h1>;
```

Is equivalent to:

```js
const element = React.createElement('h1', null, 'Hello, world!');
```

### Rendering Elements

```jsx
const element = <h1>Hello, world!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
```

### React Element vs Component

**Component:** A function (or class) that returns element(s).  
**Element:** What React renders.

## Virtual DOM

A lightweight copy of the browser's DOM used to optimize performance by reducing direct manipulation of the real DOM.

### Why Virtual DOM?

- Real DOM manipulation is slow and expensive
- Virtual DOM allows React to batch updates and minimize changes to the real DOM

### How it works

1. **Initial Render** — React creates a Virtual DOM tree
2. **Re-render** — on state/prop changes, React creates a new Virtual DOM tree
3. **Diffing (Reconciliation)** — React compares the new tree with the previous one
4. **Minimal Updates** — only necessary changes are applied to the real DOM

### Key Benefits

- **Performance** — minimizes direct DOM manipulation
- **Batching** — groups multiple updates together
- **Declarative UI** — describe desired state, React handles updates

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

### Fragment

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

### 2. Close all tags

JSX requires explicit closing. `<img>` becomes `<img />`, `<li>oranges` becomes `<li>oranges</li>`.

```jsx
<>
    <h1>Hedy Lamarr's Todos</h1>
    <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        class="photo"
    />
    <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
    </ul>
</>
```

### 3. Styling in JSX

Styles are written as objects, properties in camelCase.

```jsx
const divStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
};

const element = <div style={divStyle}>Styled text</div>;
```

### 4. Conditional Rendering

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

### 5. Lists and Keys

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
);
const element = <ul>{listItems}</ul>;
```

### 6. Use camelCase for HTML attributes

```jsx
// class → className
<div className="container"></div>

// for → htmlFor
<label htmlFor="inputId">Input:</label>

// Events
<button onClick={handleClick}>Click me</button>
```

### Inline Styling

Inline styles are passed as JavaScript objects.

```jsx
import React from "react";

function InlineStyleInline() {
    return (
        <button
            style={{
                backgroundColor: "purple",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            ¡Haz clic aquí!
        </button>
    );
}

export default InlineStyleInline;
```

```jsx
import React from "react";

function InlineStyleExample() {
    const style = {
        backgroundColor: "lightblue",
        color: "darkblue",
        padding: "10px",
        borderRadius: "5px",
    };

    return (
        <div style={style}>
            ¡Hola! Este es un ejemplo de estilos inline en React.
        </div>
    );
}

export default InlineStyleExample;
```

## XSS Prevention

By default, React DOM escapes any values embedded in JSX before rendering, preventing injection attacks. Everything is converted to a string before rendering.

## React Lifecycle

Every React component has a lifecycle with methods invoked at different stages.

### Mounting Phase

1. **constructor()** — initializes state and binds event handlers
2. **getDerivedStateFromProps()** — syncs state with props
3. **render()** — returns JSX representation
4. **componentDidMount()** — called after DOM insertion (data fetching, timers)

### Updating Phase

1. **getDerivedStateFromProps()** — syncs state with props on update
2. **shouldComponentUpdate()** — determines if component should re-render
3. **render()** — re-renders HTML with new changes
4. **getSnapshotBeforeUpdate()** — captures DOM info before update
5. **componentDidUpdate(prevProps, prevState)** — called after update (side effects)

### Unmounting Phase

- **componentWillUnmount()** — cleanup before removal (event listeners, timers)

### Functional Components

For functional components, lifecycle behaviors are accessed via **React Hooks** (useEffect, etc.).

## React.StrictMode

- Detects deprecated APIs and unsafe practices
- **Double renders** components in development to detect side effects
- Warns about string refs
- Helps migrate to future React features

## Estructura de archivos de un proyecto

```
public/         Archivos estáticos accesibles por URL
src/            Código fuente
  main.js/ts    Punto de entrada (monta React en el DOM)
  App.jsx/tsx   Componente raíz
vite.config.*   Configuración de Vite
package.json    Dependencias y scripts
node_modules/   Dependencias instaladas (no versionada)
.gitignore      Archivos ignorados por Git
```
