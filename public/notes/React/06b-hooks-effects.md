# React Hooks: Effects

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

Fires **synchronously** after DOM mutations but **before** the browser repaints. Use it when you need to measure or modify the DOM and prevent visual flicker.

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip() {
    const ref = useRef(null);
    const [tooltipHeight, setTooltipHeight] = useState(0);

    useLayoutEffect(() => {
        const { height } = ref.current.getBoundingClientRect();
        setTooltipHeight(height);
    }, []);

    return (
        <div>
            <div ref={ref} className="tooltip">
                I'm a tooltip
            </div>
            <p>Tooltip height: {tooltipHeight}px</p>
        </div>
    );
}
```

### useEffect vs useLayoutEffect

| | useEffect | useLayoutEffect |
|---|---|---|
| **Timing** | After paint | Before paint |
| **Blocking** | No | Yes (blocks rendering) |
| **Use for** | Data fetching, subscriptions, general side effects | DOM measurements, preventing flicker |

> Almost always prefer `useEffect`. Only use `useLayoutEffect` when you need to measure or modify the DOM synchronously before the browser paints.
