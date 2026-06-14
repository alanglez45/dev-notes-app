# Class Components React

## Creating a React App

```
npx create-react-app my-app
cd my-app
npm start
```

## The render() Method

Returns JSX elements describing the UI.

```jsx
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
            </div>
        );
    }
}

export default App;
```

## Props

Data passed from parent to child component via `this.props`.

```jsx
import React, { Component } from 'react';
import Greet from './components/Greet';

class App extends Component {
    render() {
        return (
            <div>
                <Greet name={'Alan'} />
            </div>
        );
    }
}

export default App;
```

```jsx
import React, { Component } from "react";

class Greet extends Component {
    render() {
        return <h1>Hello {this.props.name}</h1>;
    }
}

export default Greet;
```

## State

Managed via `this.state` (initialized in constructor) and `this.setState()`.

```jsx
import { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    incrementCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.incrementCount}>Increment</button>
            </div>
        );
    }
}

export default Counter;
```

## Method Binding

Regular methods lose their `this` context when passed as callbacks. Arrow functions are the best choice for event handlers.

```jsx
// Regular method — loses context
toggleGoOut() {
    this.setState(prevState => ({
        goOut: prevState.goOut === "Yes" ? "No" : "Yes"
    }));
}

// Arrow function — preserves context
toggleGoOut = () => {
    this.setState(prevState => ({
        goOut: prevState.goOut === "Yes" ? "No" : "Yes"
    }));
};
```
