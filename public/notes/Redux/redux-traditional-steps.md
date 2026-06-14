# Redux Traditional Steps (JavaScript)

## Step 1: Install Redux and React-Redux

```bash
npm install redux react-redux
```

## Step 2: Create the Redux Store

```js
// store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;
```

## Step 3: Create Reducers and Actions

**Reducers**

```js
// reducers/itemsReducer.js
const initialState = { items: [] };

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        default:
            return state;
    }
};

export default itemsReducer;
```

**Actions**

```js
// actions/itemsActions.js
export const addItem = (item) => ({
    type: 'ADD_ITEM',
    payload: item,
});
```

## Step 4: Combine Reducers (if needed)

```js
// reducers/index.js
import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
    items: itemsReducer,
});

export default rootReducer;
```

## Step 5: Provide the Redux Store to Your App

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

## Step 6: Connect React Components to Redux

```jsx
// components/ItemsList.js
import { useSelector } from 'react-redux';

const ItemsList = () => {
    const items = useSelector((state) => state.items.items);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default ItemsList;
```

```jsx
// components/AddItemForm.js
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/itemsActions';

const AddItemForm = () => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    return (
        <button onClick={() => handleAddItem({ id: 1, name: 'Item 1' })}>
            Add Item
        </button>
    );
};

export default AddItemForm;
```

## Step 7: Handle Asynchronous Actions (optional)

For async operations like API calls, use Redux Thunk.

```bash
npm install redux-thunk
```

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

```js
// actions/itemsActions.js
export const fetchItems = () => {
    return async (dispatch) => {
        dispatch({ type: 'ITEMS_LOADING' });

        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            dispatch({ type: 'ITEMS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'ITEMS_ERROR', payload: error.message });
        }
    };
};
```

```js
// reducers/itemsReducer.js
const initialState = { items: [], loading: false, error: null };

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ITEMS_LOADING':
            return { ...state, loading: true, error: null };
        case 'ITEMS_SUCCESS':
            return { ...state, loading: false, items: action.payload };
        case 'ITEMS_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default itemsReducer;
```

```jsx
// components/ItemsList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../actions/itemsActions';

const ItemsList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
};

export default ItemsList;
```
