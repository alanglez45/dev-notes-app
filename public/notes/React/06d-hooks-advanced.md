# React Hooks: Advanced

## Custom Hooks

JavaScript functions whose name starts with `use` and that can call other hooks. They encapsulate reusable logic.

### useFetch Example

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

import React from 'react';
import useFetch from './useFetch';

function DataComponent() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {data.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export default DataComponent;
```

## useContext

Allows consuming a React Context value inside a functional component. Avoids prop drilling by letting deep children access data from an ancestor provider.

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Button = () => {
    const { theme } = useContext(ThemeContext);
    return <button className={theme}>Click me</button>;
};
```

Returns whatever value was passed to the nearest `Provider` above in the tree. When the provider's value changes, all consumers re-render.

For the full Context pattern (create, provide, multiple contexts, performance): see [Context API](./07-context-api.md).
