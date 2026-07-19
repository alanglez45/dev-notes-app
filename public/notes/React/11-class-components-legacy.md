# Class Components React

## Creating a React App

```
npx create-react-app my-app
cd my-app
npm start
```

## The render() Method

Returns JSX elements describing the UI.

```jsx
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
            </div>
        );
    }
}

export default App;
```

## Props

Data passed from parent to child component via `this.props`.

```jsx
import React, { Component } from 'react';
import Greet from './components/Greet';

class App extends Component {
    render() {
        return (
            <div>
                <Greet name={'Alan'} />
            </div>
        );
    }
}

export default App;
```

```jsx
import React, { Component } from "react";

class Greet extends Component {
    render() {
        return <h1>Hello {this.props.name}</h1>;
    }
}

export default Greet;
```

## State

Managed via `this.state` (initialized in constructor) and `this.setState()`.

```jsx
import { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    incrementCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.incrementCount}>Increment</button>
            </div>
        );
    }
}

export default Counter;
```

## Method Binding

Regular methods lose their `this` context when passed as callbacks. Arrow functions are the best choice for event handlers.

```jsx
// Regular method — loses context
toggleGoOut() {
    this.setState(prevState => ({
        goOut: prevState.goOut === "Yes" ? "No" : "Yes"
    }));
}

// Arrow function — preserves context
toggleGoOut = () => {
    this.setState(prevState => ({
        goOut: prevState.goOut === "Yes" ? "No" : "Yes"
    }));
};
```

## Lifecycle Overview

Class components have three main phases:

| Mounting | Updating | Unmounting |
|---|---|---|
| `constructor()` | `shouldComponentUpdate()` | `componentWillUnmount()` |
| `render()` | `render()` | |
| `componentDidMount()` | `componentDidUpdate()` | |

## Lifecycle: Mounting

Called when a component is first created and inserted into the DOM.

| Method | When |
|---|---|
| `constructor()` | Initialize state, bind methods |
| `render()` | Return JSX |
| `componentDidMount()` | DOM is ready, fetch data, set up subscriptions |

```jsx
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    componentDidMount() {
        fetch(`/api/users/${this.props.userId}`)
            .then((res) => res.json())
            .then((user) => this.setState({ user }));
    }

    render() {
        if (!this.state.user) return <p>Loading...</p>;
        return <h1>{this.state.user.name}</h1>;
    }
}
```

**Equivalent in hooks:**

```jsx
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then((res) => res.json())
            .then(setUser);
    }, [userId]);

    if (!user) return <p>Loading...</p>;
    return <h1>{user.name}</h1>;
}
```

How the mapping works:

| Class | Hooks | Why |
|---|---|---|
| `this.state = { user: null }` | `useState(null)` | Initial state |
| `componentDidMount` | `useEffect(() => {}, [])` | Empty array `[]` = run only once after first render |
| `this.setState({ user })` | `setUser(data)` | Update state |
| `this.props.userId` | `userId` (parameter) | Props become function parameters |

> `useEffect` with `[]` runs once on mount — same as `componentDidMount`. If you add `[userId]`, it re-runs when `userId` changes.

## Lifecycle: Updating

Called when props or state change.

| Method | When |
|---|---|
| `shouldComponentUpdate()` | Before re-render, return `false` to skip |
| `render()` | Return updated JSX |
| `componentDidUpdate()` | After DOM update, side effects here |

```jsx
class DataList extends Component {
    shouldComponentUpdate(nextProps) {
        // Only re-render if data actually changed
        return nextProps.data !== this.props.data;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            console.log('Data changed, updating list...');
        }
    }

    render() {
        return (
            <ul>
                {this.props.data.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        );
    }
}
```

**Equivalent in hooks:**

```jsx
function DataList({ data }) {
    useEffect(() => {
        console.log('Data changed, updating list...');
    }, [data]);

    return (
        <ul>
            {data.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    );
}

// React.memo prevents re-render if props haven't changed
export default React.memo(DataList);
```

How the mapping works:

| Class | Hooks | Why |
|---|---|---|
| `shouldComponentUpdate(nextProps)` | `React.memo(Component)` | Both skip re-render if props haven't changed |
| `componentDidUpdate(prevProps)` | `useEffect(() => {}, [data])` | `data` in array = run only when `data` changes |

> `React.memo` wraps the entire component — it compares all props automatically. `useEffect` with `[data]` runs the effect only when `data` changes, replacing the manual `prevProps` check.

## Lifecycle: Unmounting

Called right before the component is removed from the DOM. Clean up subscriptions, timers, event listeners here.

```jsx
class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prev) => ({ seconds: prev.seconds + 1 }));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <p>Seconds: {this.state.seconds}</p>;
    }
}
```

**Equivalent in hooks:**

```jsx
function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval); // cleanup = componentWillUnmount
    }, []);

    return <p>Seconds: {seconds}</p>;
}
```

How the mapping works:

| Class | Hooks | Why |
|---|---|---|
| `componentDidMount` | `useEffect(() => { ... }, [])` | Start the timer once on mount |
| `componentWillUnmount` | `return () => { ... }` | The return function in `useEffect` runs on unmount |
| `this.interval = ...` | `const interval = ...` | Store the timer ID in a local variable |

> In `useEffect`, the **return function** is the cleanup. It runs when the component is removed from the DOM — same as `componentWillUnmount`. The `[]` ensures the timer starts only once.

## Error Boundaries

The **only** lifecycle that has no hook equivalent. Catches JavaScript errors in child components, displays a fallback UI instead of crashing the entire app.

```jsx
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong.</h2>;
        }
        return this.props.children;
    }
}
```

**Usage:**

```jsx
function App() {
    return (
        <ErrorBoundary>
            <BuggyComponent />
        </ErrorBoundary>
    );
}
```

> **Why no hook equivalent?** Error boundaries rely on the class lifecycle (`getDerivedStateFromError` + `componentDidCatch`). React has not added a hook alternative yet. This is one of the few valid reasons to use class components in new code.

## Class vs Hooks

| Feature | Class Component | Function + Hooks |
|---|---|---|
| State | `this.state` + `this.setState()` | `useState()` |
| Lifecycle | `componentDidMount`, etc. | `useEffect()` |
| Context | `static contextType` | `useContext()` |
| Refs | `this.refs` / `createRef()` | `useRef()` |
| Performance | No extra overhead | Slightly faster (no `this`) |
| Reusability | HOCs, render props | Custom hooks |
| Error handling | `componentDidCatch` | No equivalent |
| Code size | More boilerplate | Less verbose |

## When to Use Class Components

- **Legacy codebases:** Maintaining apps written with class components
- **Error boundaries:** The only case where class components are still required in new code
- **Third-party libraries:** Some APIs expose class-based component APIs

For everything else, prefer function components with hooks.
