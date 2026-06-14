# Controlled vs Uncontrolled Components

## Controlled Components

The input state is managed by React. The value is stored in state and updated via an `onChange` handler.

```jsx
import React, { useState } from 'react';

const ControlledComponent = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange} />
            <p>You typed: {inputValue}</p>
        </div>
    );
};

export default ControlledComponent;
```

**How it works:**
- The input value is stored in the component's state.
- An `onChange` handler updates the state whenever the input changes.
- The input's `value` prop reflects the current state.

## Uncontrolled Components

The input state is managed by the DOM itself. A `ref` is used to access the value when needed.

```jsx
import React, { useRef } from 'react';

const UncontrolledComponent = () => {
    const inputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`You typed: ${inputRef.current.value}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UncontrolledComponent;
```

**How it works:**
- The input value is stored in the DOM.
- A `ref` accesses the value when required (e.g., on form submission).
- React does not control the input's value.

## When to Use Each

| Use Controlled Components | Use Uncontrolled Components |
|---|---|
| Real-time validation or updates (live search, dynamic forms) | Simple forms, only need value on submission |
| Need to reset/clear input programmatically | Want to avoid unnecessary re-renders |
