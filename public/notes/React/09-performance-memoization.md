# Performance & Memoization

React re-renders a component when its **state or props change**. This means when a parent re-renders, all its children re-render too — even if their props haven't changed. Memoization tools prevent these unnecessary re-renders.

## The Problem: Unnecessary Re-renders

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <ExpensiveChild />
        </div>
    );
}

function ExpensiveChild() {
    console.log('ExpensiveChild rendered');
    // Heavy rendering work...
    return <p>I'm a heavy component</p>;
}
```

Every time `count` changes, `ExpensiveChild` re-renders too — even though it receives no props and its output is always the same. In small apps this is fine, but in complex UIs with expensive components it causes noticeable lag.

## React.memo

Wraps a component to skip re-rendering when its props haven't changed (shallow comparison).

```jsx
const ExpensiveChild = React.memo(function ExpensiveChild() {
    console.log('ExpensiveChild rendered');
    return <p>I'm a heavy component</p>;
});
```

Now `ExpensiveChild` only re-renders when its props actually change. See [React.memo](memo.md) for full details.

## useMemo for Derived Props

When you compute a value in the parent and pass it as a prop, it creates a new reference every render unless you memoize it.

```jsx
function Parent({ items }) {
    const [query, setQuery] = useState('');

    // New array reference every render, even if items didn't change
    const filtered = items.filter((i) => i.name.includes(query));

    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <MemoizedList items={filtered} />
        </div>
    );
}

const MemoizedList = React.memo(function MemoizedList({ items }) {
    console.log('MemoizedList rendered');
    return (
        <ul>
            {items.map((i) => (
                <li key={i.id}>{i.name}</li>
            ))}
        </ul>
    );
});
```

`filtered` is a new array on every render → `MemoizedList` always re-renders. Fix:

```jsx
const filtered = useMemo(
    () => items.filter((i) => i.name.includes(query)),
    [items, query]
);
```

Now `filtered` only changes when `items` or `query` change.

## Why Memoize Functions?

This is the key concept most developers miss. Consider this:

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        console.log('clicked');
    };

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <MemoizedChild onClick={handleClick} />
        </div>
    );
}

const MemoizedChild = React.memo(function MemoizedChild({ onClick }) {
    console.log('MemoizedChild rendered');
    return <button onClick={onClick}>Click me</button>;
});
```

**`MemoizedChild` re-renders on every parent render.** Why?

### The Problem

`handleClick` is recreated as a **new function** on every render of `Parent`. Even though the function body is identical, it's a **different reference in memory** each time. `React.memo` compares props by reference — new function = new prop = re-render.

```
Render 1: handleClick → function at 0x001
Render 2: handleClick → function at 0x023  (new reference!)
React.memo sees: onClick changed → re-render
```

### The Solution: useCallback

```jsx
const handleClick = useCallback(() => {
    console.log('clicked');
}, []);
```

`useCallback` returns the **same function reference** across renders (as long as dependencies don't change). Now `React.memo` sees the same `onClick` prop and skips the re-render.

```
Render 1: handleClick → function at 0x001
Render 2: handleClick → function at 0x001  (same reference)
React.memo sees: onClick didn't change → skip re-render
```

### Side-by-Side

```jsx
// Without useCallback — new reference every render
const handleClick = () => {
    console.log('clicked');
};

// With useCallback — same reference across renders
const handleClick = useCallback(() => {
    console.log('clicked');
}, []);
```

> **Without `React.memo` on the child, `useCallback` alone has no effect.** It only matters when the function is passed as a prop to a memoized component.

## Internal Relationship

`useCallback` is syntactic sugar over `useMemo`:

```jsx
// These are equivalent:
const handleClick = useCallback(() => doSomething(), [dep]);
const handleClick = useMemo(() => () => doSomething(), [dep]);
```

`useMemo` memoizes the **return value**. `useCallback` memoizes the **function itself**.

## The Combo Rule

`useCallback` and `React.memo` work together — but neither works alone:

| Combination | Result |
|---|---|
| `React.memo` without `useCallback` | Child skips re-render when props don't change, but functions create new references every time — so it re-renders anyway |
| `useCallback` without `React.memo` | Function has stable reference, but the child re-renders regardless — memoization is wasted |
| `React.memo` + `useCallback` | Child skips re-render AND function reference is stable — full optimization |

**Example:**

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    // Without useCallback — new reference every render
    const handleClick = () => console.log('clicked');

    // With useCallback — same reference across renders
    const handleClickStable = useCallback(() => {
        console.log('clicked');
    }, []);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            {/* ❌ Without React.memo — re-renders anyway, useCallback doesn't help */}
            <Button onClick={handleClickStable} />

            {/* ✅ With React.memo — skips re-render */}
            <MemoizedButton onClick={handleClickStable} />
        </div>
    );
}

// Without React.memo — always re-renders
const Button = ({ onClick }) => {
    console.log('Button rendered');
    return <button onClick={onClick}>Click</button>;
};

// With React.memo — only re-renders when onClick changes
const MemoizedButton = React.memo(({ onClick }) => {
    console.log('MemoizedButton rendered');
    return <button onClick={onClick}>Click</button>;
});
```

**Result:**
- `Button` → re-renders every time `count` changes, even with `useCallback`
- `MemoizedButton` → skips re-render because `handleClickStable` has the same reference

**Rule:** If you memoize a function, make sure the component receiving it is wrapped in `React.memo`. Otherwise, don't bother with `useCallback`.

## Without a Memoized Child

`useMemo` and `useCallback` are still useful even when you're NOT passing values to a child component.

### useMemo: Expensive Computations

Avoid recalculating expensive operations on every render:

```jsx
function Dashboard({ data }) {
    // Without useMemo — recalculates on every render
    const stats = calculateStats(data);

    // With useMemo — only recalculates when data changes
    const stats = useMemo(() => calculateStats(data), [data]);

    return <div>Average: {stats.average}</div>;
}
```

### useCallback: Stabilizing useEffect Dependencies

When a function is a dependency of `useEffect`, you need a stable reference to avoid infinite loops:

```jsx
function UserProfile({ userId }) {
    // Without useCallback — new function every render → useEffect runs every render
    const fetchUser = async () => {
        const res = await fetch(`/api/users/${userId}`);
        // ...
    };

    // With useCallback — same reference → useEffect only runs when userId changes
    const fetchUser = useCallback(async () => {
        const res = await fetch(`/api/users/${userId}`);
        // ...
    }, [userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]); // Without useCallback, this creates an infinite loop
}
```

> **Key takeaway:** `useMemo` and `useCallback` don't require `React.memo` on a child. They're also valuable for optimizing your own component's logic.

## All Three Together

The complete pattern for preventing unnecessary re-renders:

```jsx
function Parent({ items }) {
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState('');

    // Memoized value — same reference unless items/query change
    const filtered = useMemo(
        () => items.filter((i) => i.name.includes(query)),
        [items, query]
    );

    // Memoized function — same reference across renders
    const handleSelect = useCallback((id) => {
        console.log('selected', id);
    }, []);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            {/* Child only re-renders when filtered or handleSelect change */}
            <MemoizedList items={filtered} onSelect={handleSelect} />
        </div>
    );
}

const MemoizedList = React.memo(function MemoizedList({ items, onSelect }) {
    return (
        <ul>
            {items.map((i) => (
                <li key={i.id} onClick={() => onSelect(i.id)}>
                    {i.name}
                </li>
            ))}
        </ul>
    );
});
```

## When NOT to Optimize

- **Cheap computations** — `useMemo` and `useCallback` have overhead (comparing dependencies, storing previous results). For simple operations like `a + b`, just compute directly.
- **No memoized children** — `useCallback` without `React.memo` on the child does nothing useful.
- **Small component trees** — React is already fast. Only optimize when you see actual performance issues.

> Always profile before optimizing. Use **React DevTools Profiler** to identify what's actually slow, then apply memoization where it matters.

## Summary

| Tool | What it memoizes | When to use |
|---|---|---|
| `React.memo` | A **component's render** | Component is expensive and re-renders with unchanged props |
| `useMemo` | A **computed value** | Expensive calculation or value passed as prop to memoized child |
| `useCallback` | A **function reference** | Function passed as prop to memoized child |

**Rule of thumb:** Start without any memoization. Profile. If a component or computation is slow, apply the appropriate tool.
