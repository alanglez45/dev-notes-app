# React Context API

## Creating Context

```jsx
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
```

## Using the Provider

```jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import ChildComponent from "./ChildComponent";

function App() {
    return (
        <ThemeProvider>
            <ChildComponent />
        </ThemeProvider>
    );
}

export default App;
```

## Consuming Context with useContext

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ChildComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle theme</button>
        </div>
    );
};

export default ChildComponent;
```
