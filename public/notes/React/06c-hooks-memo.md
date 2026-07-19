# React Hooks: Refs & Memoization

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

### Storing Mutable Values

`useRef` can store any value — not just DOM elements. Unlike `useState`, updating a ref does **not** re-render the component. This makes it useful for values that change over time but don't affect the UI directly.

```jsx
import { useRef, useState } from 'react';

function Timer() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}
```

Without `useRef`, you'd need `useState` for the interval ID — which would trigger an unnecessary re-render every time the timer starts/stops.

### useRef vs useState

| | `useRef` | `useState` |
|---|---|---|
| Triggers re-render | No | Yes |
| Use case | Storing values that don't affect UI | Storing values that affect UI |
| Example | Timer ID, previous value, DOM element | Counter, form input, toggle |

### Common Use Cases

1. **Accessing DOM elements** — focus, measure dimensions, scroll
2. **Storing timer/interval IDs** — `setInterval`, `setTimeout`
3. **Tracking previous values** — compare current vs last prop/state
4. **Storing mutable values** — values that change but shouldn't re-render
5. **Keeping references to third-party instances** — maps, charts, WebSocket connections

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

> For a full breakdown of when to use `React.memo`, `useMemo`, and `useCallback` together, see: [09-performance-memoization.md](./09-performance-memoization.md)

## useMemo

Memoizes a computed value. Recalculates only when dependencies change. Useful for expensive computations or preventing unnecessary recalculations.

```jsx
const memoizedValue = useMemo(() => {
    return expensiveComputation(a, b);
}, [a, b]);
```

**Example:**

```jsx
import React, { useMemo, useState } from 'react';

function FilteredList({ items, filter }) {
    const [search, setSearch] = useState('');

    const filteredItems = useMemo(() => {
        console.log('Filtering...');
        return items
            .filter((item) => item.includes(filter))
            .filter((item) => item.includes(search));
    }, [items, filter, search]);

    return (
        <div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <p>Results: {filteredItems.length}</p>
        </div>
    );
}
```

Without `useMemo`, filtering runs on every render. With it, only when `items`, `filter`, or `search` change.

> `useMemo` returns the **value**, `useCallback` returns the **function**. They solve the same problem from different angles.
