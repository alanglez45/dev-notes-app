# Node.js REPL

The Node.js REPL is an interactive programming environment that allows you to execute JavaScript code without saving it to a file.

Read - Reads your input

Eval - Evaluates your JavaScript code

Print - Prints the result

Loop - Repeats the process until you exit

## How to Start the Node.js REPL

Simply type node in your terminal/command prompt without any filename.
```
$ node
Welcome to Node.js v18.12.1.
Type ".help" for more information.
>
```

The REPL is waiting for us to enter some JavaScript code, to be more precise.

---

# Event Emitters

Event Emitters are a fundamental pattern in Node.js that enables objects to communicate asynchronously using events. They are at the core of Node's event-driven architecture. The EventEmitter is a core module that facilitates this communication between objects by allowing them to emit named events and listen (subscribe) to those events.

- Emit an event: Trigger an event with optional data.
- Listen for an event: Register a callback function that gets executed when the event is emitted.

```
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'Alice');  // Output: Hello, Alice!
```

The EventEmitter in Node.js works with custom, user-defined events, not with operating system events or browser events.

## What is an Event Emitter?

An Event Emitter is an object that can:
- Emit named events
- Register listener functions to be executed when specific events occur

This follows the publish-subscribe pattern where:
- Emitters "publish" (emit) events
- Listeners "subscribe" to events they're interested in

## What kind of events?

EventEmitter handles asynchronous, custom events within a Node.js application. These events are simple string names that you define and control — you decide when to emit them (emit) and how to listen for them (on or once).

Common examples:
- Stream events like 'data', 'end', 'error'
- Server events like 'connection', 'disconnect'
- Custom application events like 'userRegistered', 'fileProcessed', 'taskCompleted'

What it's not:
- It's not for DOM events like 'click' or 'mouseover' (those are for browsers).
- It's not directly for OS signals (though Node's process can listen to things like SIGINT using EventEmitter).
- It's not related to Observables or Promises.

### Real-world example

```
// eventBus.js
const EventEmitter = require('events');
const eventBus = new EventEmitter();
module.exports = eventBus;

// listeners/email.js
const eventBus = require('../eventBus');
eventBus.on('userRegistered', (user) => {
    console.log(`📧 Sending welcome email to ${user.email}...`);
    setTimeout(() => {
        console.log(`Email sent to ${user.email}`);
    }, 1000);
});

// app.js
const express = require('express');
const eventBus = require('./eventBus');
require('./listeners/email');
const app = express();
app.use(express.json());
app.post('/register', (req, res) => {
    const user = req.body;
    console.log(`Registering user: ${user.name}`);
    eventBus.emit('userRegistered', user);
    res.status(201).send({ message: 'User registered successfully' });
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## Creating an Event Emitter

```
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();
```

Below are the member functions in the EventEmitter class.
```
class EventEmitter extends internal {
    static listenerCount(emitter: EventEmitter, event: string | symbol): number;
    static defaultMaxListeners: number;
    addListener(event: string | symbol, listener: (...arg: any[]) => void): this;
    on(event: string | symbol, listener: (...arg: any[]) => void): this;
    once(event: string | symbol, listener: (...arg: any[]) => void): this;
    prependListener(event: string | symbol, listener: (...arg: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...arg: any[]) => void): this;
    off(event: string | symbol, listener: (...arg: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...arg: any[]): boolean;
    eventNames(): Array<string | symbol>;
    listenerCount(type: string | symbol): number;
}
```

## .on() and .emit() of the EventEmitter

Emit events using .emit(eventName, [...args])
Listen to events using .on(eventName, callback)

```
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', () => {
    console.log('Data Received');
});

eventEmitter.emit('myEvent');
// output: Data Received
```

## EventEmitter Instance Should Be Singleton for a Single Event Name

In other words, the on() and the emit() functions must be called on the same EventEmitter instance.
The listeners won't work if registered on a separate EventEmitter instance.

## Event Emitter Execution Model: Synchronous by Default

Event emitters in Node.js are synchronous by default.

## Order of Execution of the Listeners

```
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', (data) => {
    console.log(data, '- FIRST');
});

console.log('Statement A');

eventEmitter.on("myEvent", data => {
    console.log(data, '- SECOND');
});

eventEmitter.emit('myEvent', 'Emitted Statement');
console.log("Statement B");

// output:
// Statement A
// Emitted Statement - FIRST
// Emitted Statement - SECOND
// Statement B
```

Note: once eventEmitters emits the event, listeners will be executed. That's why first prints Statement A, then the listeners and finally the Statement B.

## Some Useful Member Functions of the EventEmitter Class

### once()
With once(), the listener will be discarded after listening for an event. Events listened with once() will be triggered only once.
```
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

eventEmitter.on("myEvent", data => {
    console.log(data, "- ON");
});
eventEmitter.once("myEvent", data => {
    console.log(data, "- ONCE");
});

eventEmitter.emit("myEvent", "Emitted Statement");
eventEmitter.emit("myEvent", "Emitted Statement");
eventEmitter.emit("myEvent", "Emitted Statement");

// output:
// Emitted Statement - ON
// Emitted Statement - ONCE
// Emitted Statement - ON
// Emitted Statement - ON
```

Note: first, on and once are printed because the first emit triggers them. Then on, and finally on.

### prependListener()
By default, event listeners are invoked in the order they are added. The prependListener() method can be used as an alternative to adding the event listener to the beginning of the listener array.

```
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

eventEmitter.on("myEvent", (arg) => console.log(arg, "- ON"));
eventEmitter.prependListener("myEvent", (arg) => console.log(arg, "- PREPENDLISTENER"));

eventEmitter.emit("myEvent", "Emitted Statement");
console.log(eventEmitter.eventNames());
```

### eventNames()
Get all the active event names.

### removeListener()
This is used to remove a listener.
```
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

function func1(): void {
    console.log("EVENT TRIGGERED");
}

eventEmitter.on("myEvent", func1);
eventEmitter.on("myEvent2", func1);
console.log(eventEmitter.eventNames());

eventEmitter.removeListener("myEvent", func1);
console.log(eventEmitter.eventNames());

// Output
// [ 'myEvent', 'myEvent2' ]
// [ 'myEvent2' ]
```

To remove a listener, we need to pass the same function reference in the second parameter that was used to create a listener.

### removeAllListeners()
This is used to remove all active event listeners from an EventEmitter instance.
```
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

function func1(): void {
    console.log("EVENT TRIGGERED");
}

eventEmitter.on("myEvent", func1);
eventEmitter.on("myEvent2", func1);
eventEmitter.removeAllListeners();
console.log(eventEmitter.eventNames());

// Output
// []
```
