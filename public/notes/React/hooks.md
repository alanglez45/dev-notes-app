# React Hooks

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

## useEffect

Performs side effects in functional components: data fetching, event subscriptions, DOM manipulation, timers.

Combines `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.

### When Does useEffect Run?

**After every render (no dependency array):**

```jsx
useEffect(() => {
    // Runs on every render
});
```

**Only once (empty dependency array):**

```jsx
useEffect(() => {
    // Runs only on the first render
}, []);
```

**When dependencies change:**

```jsx
useEffect(() => {
    // Runs on first render and whenever prop or state changes
}, [prop, state]);
```

### Cleanup

Return a function from the effect. It runs before the effect re-runs and when the component unmounts. Prevents memory leaks.

```jsx
useEffect(() => {
    // Setup
    return () => {
        // Cleanup
    };
}, []);
```

### Common Use Cases

**Aborting Fetch Requests:**

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.example.com/users/${userId}`, {
                    signal: abortController.signal,
                });
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(error);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>User Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
```

**Cleanup of setInterval:**

```jsx
import React, { useState, useEffect } from "react";

function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div>Count: {count}</div>;
}

export default Timer;
```

**Cleanup of DOM event:**

```jsx
import React, { useEffect } from "react";

function ResizeListener() {
    useEffect(() => {
        const handleResize = () => {
            console.log("Window resized!");
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <div>Resize the window and check the console!</div>;
}

export default ResizeListener;
```

> **Note:** Without cleanup, `getEventListeners(window)` in the browser console would show stale subscriptions, causing memory leaks.

**Cleanup of WebSocket subscription:**

```jsx
import React, { useEffect } from "react";

function WebSocketComponent() {
    useEffect(() => {
        const socket = new WebSocket("wss://example.com/socket");

        socket.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        return () => {
            socket.close();
        };
    }, []);

    return <div>WebSocket is running...</div>;
}

export default WebSocketComponent;
```

## useLayoutEffect

A version of `useEffect` that fires before the browser repaints the screen. Can hurt performance — prefer `useEffect` when possible.

## useRef

Creates a mutable object with a `.current` property that persists across renders. Updating `.current` does **not** trigger a re-render.

```jsx
const ref = useRef(initialValue);
```

### Accessing DOM Elements

```jsx
import { useRef } from 'react';

function FocusExample() {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Escribe algo..." />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
```

### Traditional JS vs React

**Traditional JavaScript:**

```js
const inputRef = document.getElementById('myInput');
const focusButton = document.getElementById('focusButton');

const handleFocus = function () {
    inputRef.focus();
};

focusButton.addEventListener('click', handleFocus);
```

**React with useRef:**

```jsx
import { useRef } from 'react';

const FocusComponent = () => {
    const inputRef = useRef(null);

    const handleFocus = () => {
        let inputElement = inputRef.current;
        inputElement.focus();
    };

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
};
```

## Controlled vs Uncontrolled Components

**Controlled:** The input value is managed by React state.

**Uncontrolled:** The input manages its own state via the DOM.

## useCallback

Memoizes a function so it only changes when its dependencies change. Prevents unnecessary re-renders of child components that receive the function as a prop.

```jsx
const memoizedCallback = useCallback(() => {
    // Function logic
}, [dependencies]);
```

**Example:**

```jsx
import React, { useState, useCallback } from 'react';

function TodoList({ tasks, addTask }) {
    console.log('TodoList renderizado');
    return (
        <div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
            <button onClick={addTask}>Add task</button>
        </div>
    );
}

function App() {
    const [tasks, setTasks] = useState(['Task 1', 'Task 2']);
    const [input, setInput] = useState('');

    const addTask = useCallback(() => {
        setTasks((prevTasks) => [...prevTasks, input]);
        setInput('');
    }, [input]);

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="New task"
            />
            <TodoList tasks={tasks} addTask={addTask} />
        </div>
    );
}

export default App;
```

## useMemo

Memoizes a computed value. Recalculates only when dependencies change. Useful for expensive computations.

## Custom Hooks

JavaScript functions whose name starts with `use` and that can call other hooks. They encapsulate reusable logic.

### useFetch Example

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

import React from 'react';
import useFetch from './useFetch';

function DataComponent() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {data.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export default DataComponent;
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

## useContext

Allows consuming a React Context value inside a functional component. See [Context API](context-api.md) for details.

```jsx
const value = useContext(MyContext);
```
