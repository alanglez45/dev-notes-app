# Path module

The path module in Node.js is a built-in module that provides utilities to work with file and directory paths. It allows you to handle and manipulate file paths in a way that is platform-independent, meaning it works correctly on both Windows (which uses backslashes \) and Unix-like systems (which use forward slashes /). This ensures that your application can operate seamlessly across different platforms.

## Common Scenarios Where the path Module is Useful:
- Joining or resolving path segments into a single path.
- Getting the extension of a file.
- Getting the directory name or file name from a path.
- Handling path formats across different operating systems (e.g., Windows vs. Linux).

## Methods

### path.join()
Joins multiple path segments into a single normalized path. It automatically handles platform-specific path separators.
```
const filePath = path.join('folder', 'subfolder', 'file.txt');
console.log(filePath); // Outputs: "folder/subfolder/file.txt" (on Unix)
```

### path.resolve()
Resolves a sequence of path segments into an absolute path. It starts from the current working directory unless you provide an absolute path.
```
const absolutePath = path.resolve('folder', 'subfolder', 'file.txt');
console.log(absolutePath); // Outputs: "/absolute/path/to/folder/subfolder/file.txt"
```

### path.basename()
Returns the last portion (the file name) of a path. It can also strip the file extension if specified.
```
const filePath = '/folder/subfolder/file.txt';
console.log(path.basename(filePath)); // Outputs: "file.txt"
console.log(path.basename(filePath, '.txt')); // Outputs: "file"
```

### path.extname()
Returns the extension (if any) of the file in a path.
```
const filePath = '/folder/file.txt';
console.log(path.extname(filePath)); // Outputs: ".txt"
```

## Absolute Path VS Relative Path

### When to Use Each?

Absolute Path
- When you need to reference a file or directory from anywhere in the file system.
- For scripts or files that rely on specific system locations.
- When unambiguity is required.

Relative Path
- When working on a project where file locations are relative to the project root folder or the current working directory.
- To improve portability and flexibility (e.g., your project can run in different environments without modification).
- To avoid hardcoding the absolute paths into your code.

## Notes

Absolute Path
An absolute path is the full path to a file or directory starting from the root of the file system.

mac: /usr/local/bin/node

linux: /home/user/documents/file.txt

windows: C:\Users\JohnDoe\Documents\file.txt

Relative Path
A relative path is a way to specify the location of a file or directory in relation to your current working directory (or the directory in which a script is running).
- Depends on the current working directory.
- May use special notations like:
  . → Current directory.
  .. → Parent directory.
