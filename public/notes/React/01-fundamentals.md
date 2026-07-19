# React Fundamentals

## Instalación con Vite

```
npm create vite@latest
```

Project name: my-app
Select a framework: **React**
Select a variant: **JavaScript + SWC** (SWC es un compilador JS/TS rápido escrito en Rust)

```
cd my-app
npm install
npm run dev
```

### Recommended tools

**Browser extensions:** React Developer Tools, Redux Dev Tools

**VSCode extensions:** TypeScript Importer, Simple React Snippets, ES7+ React/Redux/React-Native snippets

## React Library

React is a JavaScript library used to build single-page applications (SPAs) by creating reusable UI components.

### Single Page Application (SPA)

Refers to a web application that dynamically rewrites the current page rather than loading entire new pages from the server.

**Pros:**
- Much faster user experience (no full page reloads)
- Reduces server resource consumption
- Same API can be reused for mobile apps
- Easy to transform into Progressive Web Apps (offline support)
- Backend and frontend teams can work independently

**Cons:**
- Not ideal for SEO-required apps (unless using SSR)
- Large JavaScript bundles
- Potential memory leaks (app runs for extended periods)
- Poor performance on low-power devices
- Accessibility concerns if JS is disabled

### Overriding Navigation

As default browser navigation is eliminated in SPAs, URLs must be manually managed via a **router** (e.g., React Router).

### Why React is not a framework

React is a library because it needs additional dependencies to build a complete web application, whereas a framework includes tools/dependencies out of the box.

### How does React work?

React operates by creating an in-memory **virtual DOM** rather than directly manipulating the browser's DOM.

### Features of React

- **Declarative** — describe what the UI should look like, not how to achieve it
- **Server-Side Rendering (SSR)** — renders components on the server (e.g., Next.js)
- **Component-Based Architecture** — break UI into reusable, self-contained components
- **JSX** — syntax extension that allows writing HTML-like code within JavaScript
- **Virtual DOM** — lightweight in-memory representation of the real DOM
- **One-way Data Binding** — data flows from parent to child via props

#### Declarative vs Imperative

```jsx
// Declarative
const element = <h1>Hello, world</h1>;

// Imperative
const element = document.createElement('h1');
element.innerHTML = 'Hello, world';
```

## React Element

The smallest building block of a React application. Represents a virtual DOM node. Elements are **immutable**.

```jsx
const element = <h1>Hello, world!</h1>;
```

Is equivalent to:

```js
const element = React.createElement('h1', null, 'Hello, world!');
```

### Rendering Elements

```jsx
const element = <h1>Hello, world!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
```

### React Element vs Component

**Component:** A function (or class) that returns element(s).
**Element:** What React renders.

## Virtual DOM

A lightweight copy of the browser's DOM used to optimize performance by reducing direct manipulation of the real DOM.

### Why Virtual DOM?

- Real DOM manipulation is slow and expensive
- Virtual DOM allows React to batch updates and minimize changes to the real DOM

### How it works

1. **Initial Render** — React creates a Virtual DOM tree
2. **Re-render** — on state/prop changes, React creates a new Virtual DOM tree
3. **Diffing (Reconciliation)** — React compares the new tree with the previous one
4. **Minimal Updates** — only necessary changes are applied to the real DOM

### Key Benefits

- **Performance** — minimizes direct DOM manipulation
- **Batching** — groups multiple updates together
- **Declarative UI** — describe desired state, React handles updates

## React.StrictMode

A development-only tool that detects problems in the application.

- **Double renders** — components render twice in dev to detect side effects
- **Detects unsafe lifecycle methods** — warns about deprecated APIs
- **Warns about string refs** — recommends `createRef` or `useRef`
- **Detects unexpected side effects** — helps find impure rendering logic
- **Helps migrate to future React features** — prepares for upcoming changes

StrictMode has no effect in production. It only runs in development.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

## Estructura de archivos de un proyecto

```
src/
  components/     Componentes reutilizables
  hooks/          Custom hooks
  utils/          Funciones helper, utilidades
  services/       Llamadas a APIs, lógica externa
  assets/         Imágenes, fuentes, iconos
  styles/         Archivos CSS globales
  App.jsx         Componente raíz
  main.jsx        Punto de entrada (monta React en el DOM)
public/
  index.html      HTML base
  data/           Archivos JSON accesibles por URL
vite.config.*     Configuración de Vite
package.json      Dependencias y scripts
```
