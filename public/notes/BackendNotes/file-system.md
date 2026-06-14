# File System

A file is a container for data.
- It has a name and a location (path) in the file system
- It can contain any type of data - text, binary, images, etc.
- Files persist even after the program that created them has stopped running

```
const fs = require('fs');
```

## File System Module

This module allows you to:
- Read from files
- Write to files
- Update files
- Delete files
- Get file information

Synchronous and Asynchronous methods:
- Asynchronous (non-blocking) methods are preferred for performance
- Synchronous (blocking) methods end with "Sync" (e.g., readFileSync)

## Read Files

The fs.readFile() method is used to read files on your computer.
```
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content:", data);
});
```

## Create Files

The File System module has methods for creating new files:
- fs.appendFile()
- fs.writeFile()
- fs.open()

### fs.appendFile()
The fs.appendFile() method appends specified content to a file. If the file does not exist, the file will be created:
```
fs.appendFile('mushroomList.txt', 'Champignon', (err) => {
    if (err) throw err;
    console.log('Saved!');
});
```
Therefore, mushroomList.txt file will be created with the content Champignon.

### fs.writeFile()
The fs.writeFile() method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created.
```
const fs = require('fs');
fs.writeFile('mushroomList.txt', 'Champignon', (err) => {
    if (err) throw err;
    console.log('Saved!');
});
```

### fs.open()
The fs.open() method in Node.js is used to open a file for reading, writing, or both.
```
const fs = require('fs');
fs.open('mushroomList.txt', 'r', (err, f) => {
    console.log('Saved!');
});
```

## Update Files

The File System module has methods for updating files:
- fs.appendFile()
- fs.writeFile()

```
const fs = require('fs');
fs.appendFile('mushroomList.txt', ', Shiitake', (err) => {
    if (err) throw err;
    console.log('Updated!');
});
```

The fs.writeFile() method replaces the specified file and content:
```
const fs = require('fs');
fs.writeFile('mushroomList.txt', 'Enoki, Chanterelle', (err) => {
    if (err) throw err;
    console.log('Replaced!');
});
```

## Delete Files

To delete a file with the File System module, use the fs.unlink() method.
```
const fs = require('fs');
fs.unlink('mushroomList.txt', (err) => {
    if (err) throw err;
    console.log('File deleted!');
});
```

## Rename Files

Use fs.rename() method for renaming a file.
```
const fs = require('fs');
fs.rename('mushroomList.txt', 'fungusList.txt', (err) => {
    if (err) throw err;
    console.log('File Renamed!');
});
```

## Three main ways to work with files

1. Promise-based (Async/Await)
2. Callback-based (Asynchronous)
3. Synchronous (Blocking)

### 1. Promise-based (Async/Await)
The File System Promises API is introduced to make file system operations easier to work with in modern JavaScript through the use of Promises and async/await syntax.

Errors in promises can be caught using try...catch.
```
const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('example.txt', 'utf-8');
        console.log(data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
readFile();
```

### 2. Callback-based (Asynchronous)
The regular File System API uses callbacks to handle asynchronous file system operations.

Key Features:
- Callback-based: Requires you to pass a callback function to handle the result of asynchronous operations.
- Nested structure: Often leads to "callback hell" when handling multiple asynchronous operations.
- Error handling: Error-handling is done inside the callback, making it less intuitive compared to promises.
```
const fs = require('fs');
fs.readFile('example.txt', 'utf-8', (error, data) => {
    if (error) {
        console.error('Error reading file:', error);
    } else {
        console.log(data);
    }
});
```

### 3. Synchronous (Blocking)
There's also the Synchronous File System API (fs with no callbacks or promises), which you can use for blocking operations. These methods block the event loop, so they're typically used only in scenarios where blocking behavior is acceptable.
```
const fs = require('fs');
const data = fs.readFileSync('example.txt', 'utf-8');
console.log(data);
```

## Error Handling in File Operations

File system operations can fail for various reasons, such as incorrect file paths, insufficient permissions, missing files, or system-related issues. Proper error handling ensures that your application reacts appropriately to these errors without crashing.

Always handle errors in async operations (callbacks, promises).
- Using Callbacks – Errors will be passed as the first parameter of the callback.
- Using Synchronous Methods – You can catch these errors using a try/catch block.
- Using Promises – try/catch with async/await

### Types of Errors in File System Operations
- File Not Found: Attempting to read or delete a file that does not exist.
- Permission Denied: Lack of sufficient permissions to perform an operation (e.g., trying to write to a read-only file).
- Invalid Path: Providing an invalid or malformed file or directory path.
- File Lock: Trying to perform operations on a file that's in use by another process.
- Disk Space: Running out of disk space while writing to a file.

### Error Codes in Node.js File System
- ENOENT: The file or directory does not exist.
- EACCES: Permission denied.
- EEXIST: File/directory already exists
- EISDIR: The operation was attempted on a directory instead of a file.
- EPERM: Operation not permitted.
- ENOTEMPTY: Directory not empty (when attempting to delete a non-empty directory).

## File Permissions

Permission Types
- Read (r): Allows viewing/reading the file
- Write (w): Allows modifying the file
- Execute (x): Allows executing the file (for scripts/programs)

Permission Groups
- User (u): The owner of the file
- Group (g): Users who are members of the file's group
- Others (o): All other users

### Permission Representation - Octal Notation
In Node.js, permissions are often represented as 3-digit octal numbers (base-8), where each digit represents permissions for user, group, and others respectively.

Each digit is a sum of:
- 4 = read
- 2 = write
- 1 = execute

- fs.chmod(): Used to change the permission of a file.
- fs.chown(): Used to change the owner and group of a file.

Examples:
- 0o755 (or 0755 in older Node versions):
  User: 7 (4+2+1 = read+write+execute)
  Group: 5 (4+1 = read+execute)
  Others: 5 (4+1 = read+execute)
- 0o644:
  User: read+write
  Group: read
  Others: read

## File descriptor

In Node.js, when you open a file (using fs.open), the function returns a file descriptor that can be used to perform further operations on the file.

A file descriptor serves as a unique identifier for an open file or I/O resource in the operating system, allowing programs to refer to and interact with that resource.

## What are System Calls?

System calls are the fundamental interface between an application and the operating system kernel. They allow programs to request services from the OS like:
- File operations (open, read, write, close)
- Process control
- Device management
- Information maintenance
- Communication
