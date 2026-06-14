# React Router DOM

```
npm install react-router-dom@6
```

## Key Concepts

### BrowserRouter

Main container that keeps the navigation history. `BrowserRouter` for normal URLs (`/home`), `HashRouter` for hash-based URLs (`/home#section`).

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            {/* Your components here */}
        </BrowserRouter>
    );
}
```

### Routes and Route

`Route` defines which component to display for a specific path. `Routes` is the container for all routes.

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
}
```

### Link and NavLink

`Link` creates navigation links without page reload. `NavLink` adds active styling when the link matches the current route.

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

Returns the current URL location.

```jsx
import { useLocation } from "react-router-dom";

function CurrentLocation() {
    const location = useLocation();
    return <div>Current URL: {location.pathname}</div>;
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

### useRoutes

Define routes as an array of route objects for more structured and reusable route management.

```jsx
import React from "react";
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

## Full Example

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() { return <h2>Welcome to the Home Page!</h2>; }
function About() { return <h2>Learn more About Us here.</h2>; }
function NotFound() { return <h2>Page not found!</h2>; }

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

> **Note:** When refreshing the page, app state (like authentication) is lost. To prevent redirects on refresh, persist auth state in `localStorage` or `sessionStorage`.
