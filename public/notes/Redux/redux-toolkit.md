# Redux Toolkit (RTK)

Redux Toolkit is the recommended way to write Redux logic. It includes utilities like `createSlice`, `configureStore`, `createAsyncThunk`, and RTK Query.

For a side-by-side comparison with traditional Redux, see [Redux vs RTK](./redux-vs-rtk.md).

For TypeScript setup, see [Redux Toolkit TS](./redux-toolkit-ts.md).

## Steps for Redux Toolkit

### Step 1: Install Redux Toolkit and React-Redux

```bash
npm install @reduxjs/toolkit react-redux
```

### Step 2: Create the Redux Store Using configureStore

The store is the central place where your application's state is stored. Redux Toolkit simplifies the store setup using the `configureStore` function.

```js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
```

### Step 3: Create Slices with createSlice

Slices are a way to manage state and actions together in Redux Toolkit. `createSlice` automatically generates action creators and reducers.

```js
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1; // Direct mutation is safe with Immer
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Step 4: Provide the Redux Store to Your App

Use the `<Provider>` component from `react-redux` to pass the Redux store down the component tree. This allows all components to access the store.

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

### Step 5: Access Redux Store in Components

Use `useSelector` to access state:

```jsx
import { useSelector } from 'react-redux';

const Counter = () => {
    const value = useSelector((state) => state.counter.value);

    return <div>Counter Value: {value}</div>;
};
```

Use `useDispatch` to dispatch actions:

```jsx
import { useDispatch } from 'react-redux';
import { increment, decrement } from './features/counter/counterSlice';

const CounterControls = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};
```

### Step 6: Handle Asynchronous Actions (Optional)

For async operations like API calls, use `createAsyncThunk`.

```js
// fetchItems.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('items/fetch', async () => {
    const response = await fetch('/api/items');
    return response.json();
});
```

Handle async actions in a slice:

```js
import { createSlice } from '@reduxjs/toolkit';
import { fetchItems } from './fetchItems';

const itemsSlice = createSlice({
    name: 'items',
    initialState: { items: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default itemsSlice.reducer;
```

### Step 7: Dispatch Asynchronous Actions

```jsx
import { useDispatch } from 'react-redux';
import { fetchItems } from './features/items/fetchItems';

const ItemsList = () => {
    const dispatch = useDispatch();

    const loadItems = () => {
        dispatch(fetchItems());
    };

    return <button onClick={loadItems}>Load Items</button>;
};
```

## Rules for Reducers

- Only modify state
- No side effects (no API calls, console.log, localStorage, async logic)
- Must be pure functions
- Must always return a new state
