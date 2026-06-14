# Redux Traditional Steps (TypeScript)

## Step 1: Install

```bash
npm install redux react-redux
npm install -D @types/react-redux
```

## Step 2: Create Types for Actions

```ts
// types/actions.ts
export const ADD_ITEM = 'ADD_ITEM';
export const ITEMS_LOADING = 'ITEMS_LOADING';
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS';
export const ITEMS_ERROR = 'ITEMS_ERROR';

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
}

interface ItemsLoadingAction {
  type: typeof ITEMS_LOADING;
}

interface ItemsSuccessAction {
  type: typeof ITEMS_SUCCESS;
  payload: Item[];
}

interface ItemsErrorAction {
  type: typeof ITEMS_ERROR;
  payload: string;
}

export type ItemsActionTypes =
  | AddItemAction
  | ItemsLoadingAction
  | ItemsSuccessAction
  | ItemsErrorAction;
```

```ts
// types/item.ts
export interface Item {
  id: number;
  name: string;
}
```

## Step 3: Create Reducers and Actions

**Actions**

```ts
// actions/itemsActions.ts
import {
  ADD_ITEM,
  ITEMS_LOADING,
  ITEMS_SUCCESS,
  ITEMS_ERROR,
  type ItemsActionTypes,
} from '../types/actions';
import type { Item } from '../types/item';

export const addItem = (item: Item): ItemsActionTypes => ({
  type: ADD_ITEM,
  payload: item,
});
```

**Reducer**

```ts
// reducers/itemsReducer.ts
import {
  ADD_ITEM,
  ITEMS_LOADING,
  ITEMS_SUCCESS,
  ITEMS_ERROR,
  type ItemsActionTypes,
} from '../types/actions';
import type { Item } from '../types/item';

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsReducer = (
  state = initialState,
  action: ItemsActionTypes
): ItemsState => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ITEMS_LOADING:
      return { ...state, loading: true, error: null };
    case ITEMS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case ITEMS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default itemsReducer;
```

## Step 4: Combine Reducers (if needed)

```ts
// reducers/index.ts
import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
```

## Step 5: Create the Store

```ts
// store.ts
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;

export type AppDispatch = typeof store.dispatch;
```

## Step 6: Provide the Store

```tsx
// index.tsx
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

## Step 7: Connect Components

```tsx
// components/ItemsList.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../reducers';

const ItemsList = () => {
  const items = useSelector((state: RootState) => state.items.items);

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

```tsx
// components/AddItemForm.tsx
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/itemsActions';

const AddItemForm = () => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem({ id: 1, name: 'Item 1' }));
  };

  return <button onClick={handleAddItem}>Add Item</button>;
};

export default AddItemForm;
```

## Step 8: Async with Redux Thunk

```bash
npm install redux-thunk
```

```ts
// store.ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type AppDispatch = typeof store.dispatch;
```

```ts
// actions/itemsActions.ts
import { ThunkAction } from 'redux-thunk';
import type { RootState } from '../reducers';
import {
  ITEMS_LOADING,
  ITEMS_SUCCESS,
  ITEMS_ERROR,
  type ItemsActionTypes,
} from '../types/actions';
import type { Item } from '../types/item';

export const fetchItems = (): ThunkAction<
  void,
  RootState,
  unknown,
  ItemsActionTypes
> => {
  return async (dispatch) => {
    dispatch({ type: ITEMS_LOADING });

    try {
      const response = await fetch('/api/items');
      const data: Item[] = await response.json();
      dispatch({ type: ITEMS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ITEMS_ERROR,
        payload: (error as Error).message,
      });
    }
  };
};
```

```tsx
// components/ItemsList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../reducers';
import { fetchItems } from '../actions/itemsActions';

const ItemsList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.items
  );

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
