# Operating System

The OS module in Node.js provides methods and properties for interacting with the operating system. It allows you to gather information about the system's hardware, operating system, current user environment, and more.

```
const os = require('os');
```

It helps in:
- Getting system information (CPU, memory, OS type).
- Managing network interfaces.
- Handling user-related data.

---

# Child Process

The child_process module in Node.js allows you to run shell commands, scripts, or other programs from your Node.js application.

- stdout: the output from the command
- stderr: errors from the command

## exec() - Run a Shell Command

When you use exec(), Node collects all the output of a command into a buffer in memory, and only gives it to you when it's done.
A buffer is a chunk of memory that temporarily holds data — in Node.js, a Buffer holds binary data.
"Collect everything in a basket first… then hand it to me all at once."

```
const childProcess = require('child_process');
const execProcess = (command) => {
    childProcess.exec(command, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`error: ${error}`);
        }
    });
}
execProcess('node -v');
// The output is the following:
// stdout: v16.14.0
// stderr:
```

## execFile()

execFile() is a method from Node's child_process module that runs an executable file directly, without using a shell.

```
// sayHello.js
console.log('Hello from another file!');

// main.js
const { execFile } = require('child_process');
execFile('node', ['sayHello.js'], (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Output:', stdout); // Hello from another file!
});
```

## spawn()

spawn() is a method in Node.js that lets you start a new process (run another command or program) and interact with it in real time.
A stream lets you handle data piece by piece, as it comes in.
When you use spawn(), it gives you a stream (stdout, stderr) — so you can listen for chunks of data and process them right away.
"The water (data) flows in little by little — and I can start using it immediately."

```
const { spawn } = require('child_process');
const python = spawn('python3', ['script.py', 'arg1', 'arg2']);

python.stdout.on('data', (data) => {
    console.log(`Python said: ${data}`);
});
python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
});
python.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
});
```

## fork()

The fork() method is a specialized ersión of spawn() designed specifically for running Node.js scripts as child processes.
where the parent and the child process can communicate with each other via send() (but child processes cannot communicate with each other).

```
// index.js
const { fork } = require('child_process');
const child = fork('./child.js');

child.on('message', (message) => {
    console.log('Parent process received:', message);
});
child.send({ hello: 'from parent process' });

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
```

```
// child.js
process.on('message', (message) => {
    console.log('Child process received:', message);
});
process.send({ hello: 'from child process' });
```

## The *Sync function

The functions spawn, exec, and execFile from the child_process module also have synchronous blocking versions that will wait until the child process exits.

```
const {
    spawnSync,
    execSync,
    execFileSync,
} = require('child_process');
```

---

# Cluster

Node.js runs on a single thread by default, which means it can only use one CPU core at a time.

The Cluster module allows you to:
- Take advantage of multiple CPU cores
- Run multiple instances of your app (called "workers")
- Share the same server port among them

```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World\n');
    }).listen(8000);
    console.log(`Worker ${process.pid} started`);
}
```

## How Clustering Works (Multiple Copies)

Your main application is duplicated one copy per CPU core by default.

Each copy:
- Runs in a separate process with its own memory
- Has its own event loop and V8 instance
- Shares the same port (e.g. all listen on port 3000)
- Operates completely independently from others

---

# Worker Threads

Worker Threads are a Node.js module (worker_threads) that enables the use of threads to execute JavaScript in parallel.

## Why Use Worker Threads?

Node.js is single threaded by default which means CPU heavy tasks can block the event loop. Worker threads help by:
- Offloading CPU-intensive tasks from the main thread
- Improving performance for computational workloads
- Maintaining responsiveness of the main application
- Utilizing multiple CPU cores effectively

## Key Concepts

- Isolation: Each worker has its own V8 instance, event loop, and memory.
- Communication: Workers communicate with the main thread via message passing.
- Shared Memory: You can share memory between threads using SharedArrayBuffer.
- No DOM: Unlike web workers, Node.js worker threads don't have access to browser APIs.

## Process and a Thread

### Process
An independent program execution unit with its own memory space.
Created by the operating system when a program launches.
Has its own: Memory (code, data, heap, stack), File descriptors, Security context (user permissions), Process ID (PID)

### Thread
A thread is a lightweight unit of execution within a process. Threads share memory within the same process, allowing them to efficiently communicate and work concurrently.

Key Characteristics:
- Threads within a process use shared memory, making communication between threads faster.
- Node.js is inherently single threaded in its event loop, but there are worker threads available for multithreading.
- A thread is a smaller part inside a process. A process can have one or more threads, all working within the same memory space.

Think of it like this:
- A process is like an office with its own isolated space.
- Threads are employees inside that office who share the resources (like the office memory) and work together.

In Node.js: by default the event loop runs on a single thread (Node.js is single-threaded). However you can use worker threads for heavier tasks and parallel execution within the same process.

Cluster module = Multiple processes (good for web servers)
Worker threads = Multiple threads in same process (good for CPU tasks)
