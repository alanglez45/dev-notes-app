# Node.js Event Loop

The Event Loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded.

Event Loop plays an orchestration role for queues. Its key responsibility is to iterate over a set of queues and execute callbacks registered for those events sequentially.

## There are 6 Event Loop phases:

### 1. Timers Phase
Executes callbacks scheduled by setTimeout() and setInterval().
These callbacks are not guaranteed to run exactly at the time you set — they run as soon as possible after the time has passed, depending on other phases.
```
setTimeout(() => {
    console.log('Timer callback');
}, 1000);
```
If a timer is set for 100ms, but the poll phase takes 150ms, it runs immediately in the next timers phase.

### 2. Pending Callbacks
Pending callbacks — I/O-related callbacks will be executed, delayed to the next loop iteration. For example, if you registered a callback fired after write or read to file has finished, or some network operation is completed, this callback will run in this phase (I/O Events queue).

### 3. Idle, Prepare
Used internally by Node.js and libuv (you won't directly interact with this).
It prepares for the next poll phase.

### 4. Poll Phase
This is where most of the I/O happens!
Event Loop looks for new I/O events and does its best to execute their callbacks immediately if possible. If not, it will defer a callback execution and register this as a pending callback (I/O Events queue).

What happens here:
- If there are I/O events ready (like file read complete, new data on socket), their callbacks are executed here.
- If no timers are ready, and no immediate callbacks, the event loop may block here and wait for I/O.

### 5. Check Phase
Executes callbacks passed to setImmediate().
```
setImmediate(() => {
    console.log('Check phase - setImmediate callback');
});
```

## Libuv

libuv is a C-based library that Node.js uses under the hood to handle asynchronous operations.
It provides:
- Asynchronous I/O (File System, Networking, Timers)
   What it is: A programming model where operations (like reading files or network requests) happen in the background without blocking the main thread.
- Event Loop Implementation
   What it is: The core mechanism that processes asynchronous callbacks in Node.js.
- Thread Pool for Blocking Operations
   What it is: A set of worker threads that handle operations the OS can't do asynchronously.

## Microtasks vs Macrotasks

### Microtasks (higher priority):
Microtasks are smaller, high-priority tasks that run right after the current task finishes, before the event loop moves to the next macro task.
- Smaller, higher-priority tasks executed between Event Loop phases
- Must complete before the Event Loop continues

```
console.log('script start');
setTimeout(() => {
    console.log('setTimeout');   // macro
}, 0);
Promise.resolve().then(() => {
    console.log('promise1');    // micro
});
queueMicrotask(() => {
    console.log('microtask');  // micro
});
console.log('script end');
```

output
```
script start
script end
promise1
microtask
setTimeout
```
1. Synchronous code runs first.
2. Then microtasks: promise1 and microtask.
3. Then macro task: setTimeout.

### Macro Tasks (a.k.a. "Tasks")
These are the main units of work that the JavaScript event loop pulls from the task queue.
- Larger, heavier operations processed in the Event Loop phases
- Each macrotask runs in a new Event Loop cycle
