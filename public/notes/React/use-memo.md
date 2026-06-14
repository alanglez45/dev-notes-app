# useMemo Hook

Sintaxis
```js
const memoizedValue = useMemo(() => {
    // Expensive computation
    return computedValue;
}, [dependencies]); // Dependency array
import React, { useMemo, useState } from 'react';
function MyComponent({ items }) {
    const [count, setCount] = useState(0);
    // Calculo costoso
    const expensiveCalculation = useMemo(() => {
        console.log('Calculando...');
        return items.reduce((total, item) => total + 
item.value, 0);
    }, [items]); // Solo se recalcula cuando "items" 
```
cambia
```js
    return (
        <div>
            <p>Cálculo costoso: {expensiveCalculation}
</p>
            <p>Contador: {count}</p>
            <button onClick={() => setCount(count + 1)}
```
>Incrementar contador</button>
```js
        </div>
    );
}
```
Custom Hooks

They are essentially JavaScript functions that use React hooks (like useState, 
useEffect, etc.) internally. Custom hooks enable you to encapsulate complex 
logic, making your components cleaner, more modular, and easier to main
