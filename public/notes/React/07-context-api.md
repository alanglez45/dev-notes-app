# React Context API

## What is Context?

Context provides a way to pass data through the component tree without having to pass props manually at every level. It solves the **prop drilling** problem — when you need to pass data through many intermediate components that don't use it.

```
// Without Context: prop drilling
App (theme="dark")
 └─ Layout (theme="dark") ← doesn't use it
     └─ Sidebar (theme="dark") ← doesn't use it
         └─ Button (theme="dark") ← finally uses it

// With Context: direct access
App (ThemeContext.Provider value="dark")
 └─ Layout
     └─ Sidebar
         └─ Button (useContext(ThemeContext)) ← reads directly
```

## When to Use Context vs Props

| Use Props | Use Context |
|---|---|
| Data needed by 1-2 levels | Data needed by 3+ levels |
| Component-specific data | Global/shared data (theme, auth, locale) |
| Simple data passing | State that many components read |

**Rule of thumb:** If you're passing the same prop through 2+ intermediate components, consider Context.

## Creating Context

```jsx
import { createContext } from 'react';

const ThemeContext = createContext('light'); // default value
```

```jsx
import { createContext, useContext } from 'react';

// 1️⃣ Crear el contexto con valor por defecto
const ThemeContext = createContext('light');

// 2️⃣ Componente que CONSUME el contexto
function Button() {
    const theme = useContext(ThemeContext);
    return <button>El tema es: {theme}</button>;
}

// 3️⃣ CASO A: SIN PROVIDER
function App() {
    return (
        <div>
            <Button />  {/* ← No hay Provider arriba */}
        </div>
    );
}
// Resultado: "El tema es: light" (valor por defecto)

// 4️⃣ CASO B: CON PROVIDER
function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Button />  {/* ← Está DENTRO del Provider */}
        </ThemeContext.Provider>
    );
}
// Resultado: "El tema es: dark" (valor del Provider)
```

> In practice, most apps use `createContext(null)` — this forces you to always wrap with a Provider. If someone forgets, they get `null` immediately — easier to debug than a silent wrong value.

## Provider

Wraps the part of the tree that needs access to the context value. Any descendant can consume it.

```jsx
import React, { createContext, useState } from 'react';

// 1️⃣ Crear el contexto
const ThemeContext = createContext(null);

// 2️⃣ Provider: envuelve el árbol y provee el valor
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
```

**Usage in App:**

```jsx
import { ThemeProvider } from './ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    );
}
```

## Consuming with useContext

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className={theme}>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle</button>
        </header>
    );
};
```

`useContext` reads the nearest `Provider` value above the component. When the provider's value changes, all consumers re-render.

## Multiple Contexts

Combine independent contexts to avoid unnecessary re-renders. Each context triggers re-renders only for its own consumers.

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();
const AuthContext = createContext();

function App() {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <Layout />
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
}

// Each component picks only what it needs
const Header = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    return <header className={theme}>Welcome, {user?.name}</header>;
};
```

**Why separate?** If theme and auth are in the same context, changing the theme re-renders components that only care about auth. Separate contexts = granular re-renders.

## Performance Considerations

### Problem: Context + useMemo

When the Provider's `value` changes, **every consumer** re-renders — even if the component only uses a subset of the value.

```jsx
// BAD: new object every render → all consumers re-render
<ThemeContext.Provider value={{ theme, toggleTheme }}>
```

**Solution 1: useMemo in the Provider:**

```jsx
const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
);

<ThemeContext.Provider value={contextValue}>
```

**Solution 2: Split contexts** (as shown above).

**Solution 3: React.memo on consumers:**

```jsx
const Header = React.memo(() => {
    const { theme } = useContext(ThemeContext);
    return <header className={theme}>Hello</header>;
});
```

This works because `useContext` inside a memo'd component still triggers re-renders when the context value changes, but `React.memo` prevents re-renders from parent prop changes.

### When Context Causes Unnecessary Re-renders

```jsx
// BAD: value changes on every render (new array created)
<AuthContext.Provider value={[user, setUser]}>

// GOOD: stable reference
const authValue = useMemo(() => ({ user, setUser }), [user]);
<AuthContext.Provider value={authValue}>
```

## Best Practices

1. **Don't put everything in one context.** Split by concern (theme, auth, locale).
2. **Keep Provider value stable.** Use `useMemo` or `useCallback` to avoid unnecessary re-renders.
3. **Default values are for testing.** In production, always wrap with a Provider.
4. **Don't overuse Context.** For component-specific state (form inputs, modals), local `useState` is better.
5. **Avoid nesting Providers deeply.** It makes the component tree harder to read. Consider combining related providers into a single wrapper.

```jsx
// Clean: compose providers
function AppProviders({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RouterProvider>
                    {children}
                </RouterProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

// Usage
function App() {
    return <AppProviders><Layout /></AppProviders>;
}
```

## Quick Reference

| Concept | API |
|---|---|
| Create | `const Ctx = createContext(default)` |
| Provide | `<Ctx.Provider value={...}>` |
| Consume | `useContext(Ctx)` |
| Stable value | `useMemo(() => ({ ... }), [deps])` |

> For `useContext` hook basics, see: [06-hooks.md](./06-hooks.md#usecontext)
