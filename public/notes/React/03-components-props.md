# Components & Props

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

### Destructuring Props

Extract props directly in the function parameter instead of accessing via `props.`:

```jsx
// Without destructuring
function ChildComponent(props) {
    return <p>{props.name}</p>;
}

// With destructuring
function ChildComponent({ name, age }) {
    return (
        <div>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
        </div>
    );
}
```

You can also rename during destructuring:

```jsx
function ChildComponent({ name: userName }) {
    return <p>{userName}</p>;
}
```

### Default Props

Set fallback values when a prop is not provided:

```jsx
function Greeting({ name = "Guest", age = 0 }) {
    return (
        <p>Hello, {name}. You are {age} years old.</p>
    );
}

<Greeting />              // "Hello, Guest. You are 0 years old."
<Greeting name="Alan" />  // "Hello, Alan. You are 0 years old."
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

`key` is a special prop used by React to identify which items in a list have changed, been added, or removed. It's not passed to the component — React uses it internally.

Improves performance by avoiding unnecessary re-renders.

```jsx
items.map((item) => <li key={item.id}>{item.name}</li>)
```

#### Rules for Keys

- Must be **unique** among siblings
- Must be **stable** — don't use `Math.random()` or `Date.now()`
- Use IDs from your data when available

```jsx
// Good — unique ID from data
items.map((item) => <li key={item.id}>{item.name}</li>)

// Bad — changes every render
items.map((item) => <li key={Math.random()}>{item.name}</li>)
```

#### Don't Use Index as Key

```jsx
// Bad — causes issues with reordering, filtering, adding/removing
items.map((item, index) => <li key={index}>{item.name}</li>)

// Good
items.map((item) => <li key={item.id}>{item.name}</li>)
```

Using array index as key causes bugs when:
- Items are reordered
- Items are inserted or deleted
- Items have local state

### Props Drilling

Passing data through multiple component layers even when some don't need it. Avoid with:
- **Context API** — global state without prop drilling
- **State Management Libraries** (Redux, Zustand, etc.)

## Composition

React recommends composition over inheritance. Build complex UIs by nesting components inside others.

**Using children:**

```jsx
function Card({ children }) {
    return <div className="card">{children}</div>;
}

function App() {
    return (
        <Card>
            <h2>Title</h2>
            <p>Content</p>
        </Card>
    );
}
```

**Using custom props for slots:**

```jsx
function Layout({ sidebar, content }) {
    return (
        <div className="layout">
            <aside>{sidebar}</aside>
            <main>{content}</main>
        </div>
    );
}

function App() {
    return (
        <Layout
            sidebar={<Navigation />}
            content={<HomePage />}
        />
    );
}
```

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
