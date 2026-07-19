# Styling in React

## Importing CSS Files

Import a CSS file directly into a component. Vite (and other bundlers) process it and inject it into the page.

```jsx
import './App.css';

function App() {
    return <div className="container">Hello</div>;
}
```

The class names are **global** — any CSS file you import applies to the entire app. This can cause naming conflicts in larger projects.

## Inline Styles

Styles are passed directly as JavaScript objects. Properties are in camelCase.

```jsx
const divStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
};

const element = <div style={divStyle}>Styled text</div>;
```

### Full Examples

```jsx
function InlineStyleInline() {
    return (
        <button
            style={{
                backgroundColor: "purple",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            ¡Haz clic aquí!
        </button>
    );
}
```

```jsx
function InlineStyleExample() {
    const style = {
        backgroundColor: "lightblue",
        color: "darkblue",
        padding: "10px",
        borderRadius: "5px",
    };

    return (
        <div style={style}>
            ¡Hola! Este es un ejemplo de estilos inline en React.
        </div>
    );
}
```

**When to use inline styles:**
- Truly dynamic values (calculated at runtime)
- Quick one-off styling
- Avoid for static styles — use CSS files or Modules instead

**Limitations:**
- No pseudo-selectors (`:hover`, `:focus`)
- No media queries
- No keyframes animations

For these, use regular CSS files or CSS Modules.

## CSS Modules

CSS Modules scope class names locally by default. The file must end with `.module.css`.

```css
/* Button.module.css */
.primary {
    background-color: blue;
    color: white;
}

.secondary {
    background-color: gray;
    color: white;
}
```

```jsx
import styles from './Button.module.css';

function Button({ variant }) {
    return (
        <button className={styles[variant]}>
            Click me
        </button>
    );
}
```

The `styles` object maps original class names to unique, hashed versions (`Button_primary_a1b2c`). No naming conflicts.

## Conditional className

Apply classes dynamically based on state or props.

**Ternary:**

```jsx
<button className={isActive ? 'btn active' : 'btn'}>
    Click
</button>
```

**Logical OR:**

```jsx
<div className={error || 'default-class'}>
    Message
</div>
```

**Template literal:**

```jsx
<div className={`card ${isLarge ? 'card--large' : ''}`}>
    Content
</div>
```

**With CSS Modules:**

```jsx
import styles from './Card.module.css';

<div className={`${styles.card} ${isLarge ? styles.large : ''}`}>
    Content
</div>
```

## Dynamic Styles

Use JavaScript objects when styles depend on state or props. Properties are in camelCase.

```jsx
function ProgressBar({ percent }) {
    return (
        <div
            style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#eee',
            }}
        >
            <div
                style={{
                    width: `${percent}%`,
                    height: '100%',
                    backgroundColor: 'blue',
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    );
}
```

Use **inline styles** for truly dynamic values (calculated at runtime). Use **className** for static styles.

## Why camelCase

CSS properties with dashes are converted to camelCase in JavaScript:

| CSS | JSX |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `text-align` | `textAlign` |

## CSS Variables in React

Pass dynamic values from JavaScript to CSS using custom properties:

```jsx
function ThemeButton({ color }) {
    return (
        <button style={{ '--btn-color': color }}>
            Themed Button
        </button>
    );
}
```

```css
/* Button.css */
button {
    background-color: var(--btn-color);
    color: white;
    padding: 10px 20px;
}
```

This is useful when you need to set CSS values that can't be expressed with inline styles (pseudo-selectors, media queries).

## Tailwind CSS

A utility-first CSS framework. Instead of writing CSS files, you apply small utility classes directly in JSX.

### Installation with Vite

```bash
npm install -D tailwindcss @tailwindcss/vite
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [tailwindcss()],
})
```

```css
/* index.css */
@import "tailwindcss";
```

### Basic Usage

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Click me
</button>
```

### Common Utilities

| Category | Classes | Example |
|---|---|---|
| **Spacing** | `p-*`, `m-*`, `px-*`, `py-*` | `p-4`, `mx-auto`, `mt-2` |
| **Colors** | `bg-*`, `text-*`, `border-*` | `bg-red-500`, `text-gray-700` |
| **Typography** | `text-sm`, `text-lg`, `font-bold` | `text-xl font-semibold` |
| **Flexbox** | `flex`, `items-center`, `justify-between` | `flex gap-4` |
| **Grid** | `grid`, `grid-cols-3`, `col-span-2` | `grid grid-cols-3 gap-4` |
| **Sizing** | `w-*`, `h-*`, `max-w-*` | `w-full`, `h-screen` |
| **Rounded** | `rounded`, `rounded-lg`, `rounded-full` | `rounded-lg` |

### Responsive Design

Use breakpoint prefixes to apply styles at specific screen sizes:

```jsx
<div className="text-sm md:text-lg lg:text-xl">
    Responsive text
</div>
```

| Prefix | Min-width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

### Dark Mode

Use the `dark:` prefix with class strategy:

```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
    Theme content
</div>
```

### Conditional Classes

```jsx
// Template literal
className={`px-4 py-2 ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}

// With clsx library (optional)
import clsx from 'clsx';
className={clsx('px-4 py-2', isActive && 'bg-blue-500')}
```
