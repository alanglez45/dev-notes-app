# React Hooks: State

Hooks allow functional components to use state and lifecycle features that were previously only available in class components. Hook names start with `use`.

## Rules of Hooks

1. **Only call Hooks at the top level** — before return, not inside loops, conditions, nested functions, or try/catch/finally.
2. **Only call Hooks from React functions** — from React function components or custom Hooks.

## useState

Adds state to functional components. Returns an array with the current state value and a function to update it.

```jsx
const [state, setState] = useState(initialState);
```

```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Has hecho clic {count} veces</p>
            <button onClick={() => setCount(count + 1)}>Aumentar</button>
        </div>
    );
}
```

### Why Is State Asynchronous?

- **Batching** — React groups multiple state updates into a single re-render for performance.
- **Consistency** — Ensures state is consistent across the component and its children.

### Handling Async State Updates

**Using a callback in setState:**

```jsx
const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
    console.log(count); // Still logs the old value
};
```

**Using useEffect:**

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Count updated:', count);
    }, [count]);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
}
```

## useReducer

Ideal for managing complex state logic with multiple sub-values. Follows the Redux pattern where state updates are handled by a reducer function.

```jsx
const [state, dispatch] = useReducer(reducer, initialState, init?);
```

- **reducer** — A pure function that takes the current state and an action, returns the new state.
- **dispatch** — A function that sends actions to the reducer.
- **initialState** — The initial state value.
- **init** (optional) — A function to lazily initialize state.

### Reducer Rules

- Must be a pure function (no side effects, no async, no localStorage).
- Must always return a new state.
- Should only require an action, which may have a payload.

### Example

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function init(initialValue) {
    return { count: initialValue * 2 };
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return init(action.payload);
        default:
            throw new Error(`Unsupported action: ${action.type}`);
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, 5, init);

    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
            <button onClick={() => dispatch({ type: 'reset', payload: 5 })}>Reset</button>
        </div>
    );
}

export default Counter;
```

> **Important:** If you call the reducer directly in each component instead of passing state/dispatch as props, you'd create a new reducer instance per component.
