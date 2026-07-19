# React Router DOM

## What is React Router?

React Router is a routing library for React that enables navigation between different views/pages in a single-page application (SPA) without full page reloads.

```
npm install react-router-dom
```

To install a specific version:

```bash
npm install react-router-dom@6
```

## Setup

### BrowserRouter

Wraps your entire app and enables client-side routing. Use `HashRouter` if you need hash-based URLs (`/home#section`).

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            {/* Your routes go here */}
        </BrowserRouter>
    );
}
```

### Routes and Route

`Route` defines which component renders for a specific path. `Routes` is the container that holds all your routes.

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
```

- `path` — URL pattern to match
- `element` — Component to render when the path matches
- `*` — Catch-all route (404)

## Navigation

### Link

Creates navigation links without full page reloads. Prevents unnecessary re-renders.

```jsx
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}
```

### NavLink

Like `Link`, but adds an `isActive` class when the link matches the current route.

```jsx
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    );
}
```

### useNavigate

Programmatic navigation between routes.

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/about");
    }

    return <button onClick={handleClick}>Go to About</button>;
}
```

**With replace:**

```jsx
navigate("/about", { replace: true }); // replaces current history entry
```

**Go back:**

```jsx
navigate(-1); // go back one step
```

## Dynamic Routes

### useParams

Access dynamic URL parameters (e.g., `/post/:id`).

```jsx
import { useParams } from "react-router-dom";

function Post() {
    const { id } = useParams();
    return <div>Post ID: {id}</div>;
}
```

### useLocation

Returns the current URL location object.

```jsx
import { useLocation } from "react-router-dom";

function CurrentLocation() {
    const location = useLocation();
    return (
        <div>
            <p>Path: {location.pathname}</p>
            <p>Search: {location.search}</p>
            <p>Hash: {location.hash}</p>
        </div>
    );
}
```

### useMatch

Check if the current location matches a given path.

```jsx
import { useMatch } from "react-router-dom";

function MyComponent() {
    const match = useMatch("/about");
    return match ? <div>You're on the About page</div> : null;
}
```

## Nested Routes

Nested routes allow you to render child routes inside a parent layout. Use `Outlet` to define where child routes render.

```jsx
import { Routes, Route, Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="profile">Profile</Link>
                <Link to="settings">Settings</Link>
            </nav>
            {/* Child routes render here */}
            <Outlet />
        </div>
    );
}

function Profile() {
    return <h2>Profile</h2>;
}

function Settings() {
    return <h2>Settings</h2>;
}

function App() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}
```

- `Dashboard` renders at `/dashboard`
- `Profile` renders at `/dashboard/profile` inside `Dashboard`
- `Settings` renders at `/dashboard/settings` inside `Dashboard`
- `<Outlet />` is where child routes appear

## Protected Routes

Auth guard pattern — redirect to login if user is not authenticated.

```jsx
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}
```

## Redirects

### Navigate Component

Redirects to another route. Useful for default routes or auth redirects.

```jsx
import { Navigate } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/old-page" element={<Navigate to="/new-page" replace />} />
        </Routes>
    );
}
```

### Programmatic Redirect

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        await loginUser();
        navigate("/dashboard", { replace: true });
    };

    return <button onClick={handleLogin}>Login</button>;
}
```

## Advanced

### useRoutes

Define routes as an array of objects for more structured route management.

```jsx
import { BrowserRouter, useRoutes } from "react-router-dom";

function Home() { return <h2>Home Page</h2>; }
function About() { return <h2>About Page</h2>; }
function NotFound() { return <h2>404 - Not Found</h2>; }

function App() {
    const routes = [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "*", element: <NotFound /> },
    ];

    const element = useRoutes(routes);
    return element;
}

function Main() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Main;
```

### useSearchParams

Read and modify URL search parameters.

```jsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setSearchParams({ q: e.target.value })}
            />
            <p>Search: {query}</p>
        </div>
    );
}

// URL: /search?q=react
```

## Full Example

```jsx
import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
    useParams,
} from "react-router-dom";

// Protected Route wrapper
function ProtectedRoute({ isAuthenticated }) {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
}

// Layout
function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
            </nav>
            <Outlet />
        </div>
    );
}

// Pages
function Home() { return <h2>Home</h2>; }
function Login() { return <h2>Login</h2>; }
function Dashboard() { return <h2>Dashboard</h2>; }
function Profile() {
    const { id } = useParams();
    return <h2>Profile: {id}</h2>;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

## Quick Reference

| Hook / Component | What it does |
|---|---|
| `Link` / `NavLink` | Navigation without page reload |
| `useNavigate` | Programmatic navigation |
| `useParams` | Access dynamic URL parameters |
| `useLocation` | Access current URL location |
| `useMatch` | Check if location matches a path |
| `useSearchParams` | Read/write URL search parameters |
| `useRoutes` | Define routes as objects |
| `Navigate` | Redirect to another route |
| `Outlet` | Render child routes in nested layouts |

> **Tip:** When refreshing the page, app state (like authentication) is lost. Persist auth state in `localStorage` or `sessionStorage` to prevent unwanted redirects.
