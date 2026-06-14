# React.memo

`React.memo` is a higher-order component that memoizes a functional component. It compares previous props with new props — if they haven't changed, the component won't re-render.

```jsx
const MemoizedComponent = React.memo(Component, arePropsEqual?);
```

- **Component** — The functional component to memoize.
- **arePropsEqual** (optional) — Custom comparison function. Default is shallow comparison.

Similar to `PureComponent` for class components.

## Why Use React.memo?

- **Performance Optimization** — prevents unnecessary re-renders
- **Avoid Unnecessary Work** — reduces computational cost for expensive components
- **Improves UX** — smoother UI updates in complex applications

## Example

```jsx
import React, { useState } from 'react';

function ChildComponent({ name }) {
    console.log('ChildComponent rendered');
    return <p>Hello, {name}!</p>;
}

const MemoizedChild = React.memo(ChildComponent);

function ParentComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Juan');

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Increment counter: {count}
            </button>
            <MemoizedChild name={name} />
        </div>
    );
}

export default ParentComponent;
```

`MemoizedChild` only re-renders when the `name` prop changes. Clicking the button updates `count` and re-renders the parent, but `MemoizedChild` stays the same.
