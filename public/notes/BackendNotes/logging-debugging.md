# Logging and debugging in Node.js

## Debugging

Debugging is the process of identifying and fixing errors or issues in your code. It involves using various tools and techniques to examine the state of your program at runtime and track down the root cause of problems.

### Terminology

Debugging has its own set of obscure jargon, such as the following:
- Breakpoint – When a debugger stops a program so that its state may be examined
- Debugger – A debugging tool that allows you to see internal variable states by running code line by line
- Feature – It's something that every developer says at some time in their career.
- Frequency – How frequently or under what circumstances a bug will appear
- It doesn't work – The most common but ineffective bug report
- Log point – A debugging instruction that displays the value of a variable at a certain point during execution
- Logging – Runtime data is written to the console or a file
- Logic error – The program works, but it doesn't do what it's supposed to do
- Priority – A bug is assigned to a list of upcoming updates
- Race condition – Bugs that are difficult to track are those that are reliant on the sequence or timing of uncontrollable events
- Refactoring – Rewriting code to make it easier to read and maintain
- Regression – A previously repaired bug reappears, possibly as a result of other updates
- Related – A bug that is linked to or comparable to another
- Reproduce – The steps that must be taken to cause the error
- RTFM error – A bug report disguised as user ignorance, usually followed by a response to "Read the Flipping Manual."
- Step into – Step inside the function being called when debugging code line by line
- Step out – Complete the current function's execution and return to the calling code when running line by line
- Step over – Complete the execution of a command without stepping into a function it calls when running line by line.
- Severity – The system's influence as a result of a bug
- Stack trace – The list of all methods that were called before the error
- Syntax error – Typographical errors, like console.lug()
- User error – An error created by a user rather than the application, although depending on that person's seniority, an update may still be required
- Watch – A variable to look at while the debugger is running
- Watchpoint – When a variable is set to a specified value, the program is stopped, similar to a breakpoint

### Debugger statement

This statement allows you to pause the execution of your code at a particular point and examine the current state of your program.
```
function addNumbers(a, b) {
    debugger;
    return a + b;
}
const result = addNumbers(2, 3);
```

### Console methods

You can use the console.log() method to output information to the console at various points in your code to help you track down errors.
```
function addNumbers(a, b) {
    console.log(`Adding ${a} and ${b}...`);
    const result = a + b;
    console.log(`Result: ${result}`);
    return result;
}
const result = addNumbers(2, 3);
console.log(`Final result: ${result}`);
```

### Node.js util.debuglog

The Node.js util module offers a built-in debuglog method which conditionally writes messages to STDERR:
```
const util = require('util');
const debuglog = util.debuglog('myapp');
debuglog('myapp debug message [%d]', 123);
```

### The debug module

The debug module in Node.js provides a simple and flexible logging utility that can be used to debug applications. This is a tiny, more advanced third-party alternative to util.debuglog.

## Logging

Logging is the process of capturing events, messages, and data that occur during the operation of a software application or system. The purpose of logging is to provide a record of what happened in the system for diagnostic, monitoring, and analysis purposes.

- Debugging: logs can help you diagnose and troubleshoot issues that arise during development and production. With the right logging data, you can quickly identify the source of a problem and take steps to fix it.
- Monitoring: logs can be used to monitor the health and performance of your application in real-time. By analyzing your logs, you can detect and address potential issues before they become critical.
- Auditing: logs provide a record of the activity that occurs in your application, which can be useful for compliance and auditing purposes.

Libraries:
- Morgan
- Bunyan
- winston
