# Forms Patterns: Controlled vs Uncontrolled

## Intro

React has two ways to handle form inputs:

- **Controlled:** React manages the input state. The value lives in `useState` and updates via `onChange`.
- **Uncontrolled:** The DOM manages the input state. A `ref` reads the value when needed.

The difference is **who owns the data**: React or the browser.

```
Controlled:
  User types → onChange fires → setState → re-render → input shows new value

Uncontrolled:
  User types → DOM updates directly → ref reads value on demand
```

## Controlled Components

The input's `value` is bound to React state. Every keystroke triggers `onChange`, which updates state, which re-renders the input with the new value.

```jsx
import React, { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <input type="text" value={query} onChange={handleChange} />
            <p>You searched: {query}</p>
        </div>
    );
}
```

**How it works:**
- `value={query}` — input always shows the state value
- `onChange={handleChange}` — updates state on every keystroke
- React "controls" the input — the DOM never diverges from React state

### value vs defaultValue

| Prop | When | Use case |
|---|---|---|
| `value` | Controlled — value always comes from state | Search bars, dynamic forms |
| `defaultValue` | Uncontrolled — sets initial value, then DOM owns it | Simple forms, edit-once fields |

```jsx
// Controlled: value is always controlled by React
<input value={name} onChange={(e) => setName(e.target.value)} />

// Uncontrolled: defaultValue sets the initial value, DOM owns it after
<input defaultValue="John" ref={inputRef} />
```

> **Gotcha:** Using `value` without `onChange` makes the input read-only. React warns you: "You provided a `value` prop without an `onChange` handler."

### Real-time Validation

Controlled components make validation easy — you can check the value on every keystroke:

```jsx
function EmailInput() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value.includes('@')) {
            setError('Invalid email');
        } else {
            setError('');
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
```

## Uncontrolled Components

The input manages its own state. A `ref` reads the value when you need it (e.g., on form submission).

```jsx
import React, { useRef } from 'react';

function SimpleForm() {
    const nameRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Hello, ${nameRef.current.value}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={nameRef} defaultValue="John" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

**How it works:**
- `ref={nameRef}` — connects the input to a ref object
- `defaultValue="John"` — sets the initial value, DOM owns it after
- `nameRef.current.value` — reads the current DOM value on submit

### When Refs Are Useful

- File inputs (`<input type="file">`) — always uncontrolled, no `value` prop
- Integrating with non-React code
- Focusing an input programmatically

```jsx
function FileUpload() {
    const fileRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = fileRef.current.files[0];
        console.log(file.name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" ref={fileRef} />
            <button>Upload</button>
        </form>
    );
}
```

## Multiple Inputs Pattern

For forms with many fields, use a single handler with a dynamic state key:

```jsx
function RegistrationForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} />
            <input name="email" value={form.email} onChange={handleChange} />
            <input name="password" type="password" value={form.password} onChange={handleChange} />
            <button>Register</button>
        </form>
    );
}
```

**Key points:**
- Each input has a `name` attribute matching the state key
- `[name]: value` dynamically updates the correct field
- One handler for all inputs — no need for `handleChangeName`, `handleChangeEmail`, etc.

## Form Submission

| | Controlled | Uncontrolled |
|---|---|---|
| **Read values** | From state (`form.email`) | From refs (`emailRef.current.value`) |
| **Validate** | On every keystroke or on submit | On submit only |
| **Reset** | `setForm(initialState)` | `formRef.current.reset()` |
| **Submit handler** | `onSubmit` reads state | `onSubmit` reads refs |

```jsx
// Controlled: reset with state
function ControlledForm() {
    const [form, setForm] = useState({ name: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        setForm({ name: '', email: '' }); // reset
    };

    // ...
}

// Uncontrolled: reset with DOM method
function UncontrolledForm() {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        console.log(Object.fromEntries(formData));
        formRef.current.reset(); // reset
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <input name="name" />
            <input name="email" />
            <button>Submit</button>
        </form>
    );
}
```

## Table: Controlled vs Uncontrolled

| Feature | Controlled | Uncontrolled |
|---|---|---|
| State owner | React (`useState`) | DOM |
| Value access | `state.value` | `ref.current.value` |
| Updates | `onChange` → `setState` | DOM updates directly |
| Initial value | `value` prop | `defaultValue` prop |
| Validation | Real-time (every keystroke) | On submit |
| Reset | `setState(initial)` | `formRef.reset()` |
| Re-renders | On every keystroke | Fewer (DOM handles updates) |
| Code complexity | More verbose | Less code |
| Best for | Complex forms, live validation, search | Simple forms, file inputs, quick prototyping |

## When to Use Each

**Use Controlled when:**
- You need real-time validation or feedback
- You need to dynamically disable/enable submit buttons
- You need to populate fields programmatically (e.g., autofill)
- You're building complex multi-step forms

**Use Uncontrolled when:**
- The form is simple and you only need values on submit
- You're integrating with non-React code
- You're working with file inputs
- Performance is critical and you want to avoid re-renders on every keystroke

**In practice:** Most React apps use controlled components. They're more predictable and easier to debug. Use uncontrolled only when you have a specific reason.
