# Streams

Streams are collections of data. They are a way to work with data as it becomes available, piece by piece, instead of waiting for the entire dataset to load at once.

Streams are like pipes that let you read or write data piece by piece, instead of loading the whole thing into memory at once.

Streaming data is data that is continuously generated and sent in small pieces, often in real time.

## Buffer

A buffer a temporary storage area in memory used to hold chunks of data being passed back and forth in streams. Since streams process data asynchronously and incrementally, chunks of data need to be temporarily stored somewhere before being used. Buffers allow handling raw binary data (like text, images, or videos) directly without converting it.

Chunks are small manageable pieces of data that are read from a source or written to a destination in streams. Streams work on chunks instead of loading the entire data at once, which saves memory and boosts performance when working with large datasets or continuous data flows.

## HighWaterMark

The HighWaterMark property in streams defines the maximum number of bytes (or chunks) that the buffer can hold before stopping temporary data flow. It acts as a threshold for the internal buffer.

1. In Readable Streams, it controls how much data can be read into memory (buffered) before emitting the data event and asking for more data.
2. In Writable Streams, it controls how much data can be stored in memory before telling the producer to stop and wait for space.

## Backpressure

Backpressure occurs when writable streams receive more data than they are capable of processing. This mismatch can lead to resource overuse, memory issues, or even crashes if not properly managed.

### Backpressure solution

To deal with backpressure in streams, the goal is to slow down the producer (readable stream) when the consumer (writable stream) is overwhelmed.

How to handle backpressure:
- Use the writable stream's write() method to check if more data can be written. It will return false when backpressure starts building up.
- Wait for the drain event to resume writing after backpressure is reduced.
- pipe() – This method handles backpressure automatically — if the writable stream can't handle the current pace of data, the readable stream pauses until the writable stream emits the drain event.
- Set highWaterMark to control buffer thresholds – Adjusting this value can help you manage backpressure effectively, especially for applications with specific needs (e.g., handling large chunks at once or limiting memory usage).
- Pipeline – This utility is a safer and more declarative way to manage streams and automatically handles backpressure. It also takes care of stream cleanup and error handling.

## Types of Streams

### Readable streams
These streams are used to read data from a source.

Other common uses of readable streams in Node.js applications are:
- Reading data from a file
- process.stdin - To read user input via stdin in a terminal application.
- http.IncomingMessage - To read an incoming request's content in an HTTP server or to read the server HTTP response in an HTTP client.

### Writable streams
These streams are used to write data to a destination.
- Writing to a file, HTTP responses, or network sockets.
- process.stdout can be used to write data to standard output and is used internally by console.log.

### Duplex streams
Duplex streams are both Readable and Writable, meaning they can read and write data simultaneously.
- The most common example of a duplex stream is net.Socket, used to read and write data to and from a socket.

### Transform Streams
They are used to modify or transform data as it is read or written.
- zlib compression streams, crypto for encryption/decryption, or converting data formats.

How Transform Streams Work
- Receives data from a Readable Stream.
- Processes the data (e.g., converting, compressing, encrypting).
- Pushes the transformed data to the next Writable Stream.

## Advantages working with streams
- Efficient memory usage - With streams, large amounts of data do not need to be loaded into memory, reducing the number of reads and write cycles required to perform operations.
- Better performance - With streams, there is higher data processing throughput since data is processed as soon as it becomes available rather than waiting for all the data to arrive and then process it.
- Increased composability - With streams, developers can compose complex applications that interconnect data between multiple pieces of code or even across applications. This benefit allows developers to build microservices with Node.js.
- Real-time applications - Streams are essential for creating real-time applications such as video streaming or chat applications

## Example: Stream with backpressure handling

```
const fs = require('fs');
const readableStream = fs.createReadStream('./archivo_grande.txt', {
    encoding: 'utf8',
    highWaterMark: 16 * 1024 // 16 KB (buffer size or chunk)
});
const writableStream = fs.createWriteStream('./archivo_copia.txt', {
    highWaterMark: 16 * 1024 // 16 KB
});

let bytesRead = 0;

readableStream.on('data', (chunk) => {
    console.log(`Read: ${chunk.length} bytes`);
    bytesRead += chunk.length;
    const canContinue = writableStream.write(chunk);
    if (!canContinue) {
        console.log('Buffer full, pausing reading...');
        readableStream.pause();
    }
});

writableStream.on('drain', () => {
    readableStream.resume();
});

readableStream.on('end', () => {
    console.log('reading complete.');
    console.log(`Total of read bytes: ${bytesRead}`);
    writableStream.end();
});

readableStream.on('error', (err) => {
    console.error('Error en el stream de lectura:', err.message);
});
writableStream.on('error', (err) => {
    console.error('Error en el stream de escritura:', err.message);
});
writableStream.on('finish', () => {
    console.log('Escritura finalizada.');
});
```

## pipe()

The pipe method is a basic and widely used way to connect one stream to another stream. It allows you to transfer data from a Readable Stream to a Writable Stream, automatically managing the flow and backpressure.

```
const fs = require('fs');
const readableStream = fs.createReadStream('./input.txt');
const writableStream = fs.createWriteStream('./output.txt');

readableStream.pipe(writableStream);

writableStream.on('finish', () => {
    console.log('Data successfully written to output.txt!');
});
```

## The Stream module

### Writable
You can use the Writable class to define custom behavior for handling written chunks of data.
```
const { Writable } = require('stream');
const fs = require('fs');

class UpperCaseWritable extends Writable {
    constructor(outputFilePath, options) {
        super(options);
        this.fileStream = fs.createWriteStream(outputFilePath);
    }
    _write(chunk, encoding, callback) {
        const upperCaseData = chunk.toString().toUpperCase();
        this.fileStream.write(upperCaseData, callback);
    }
    _final(callback) {
        this.fileStream.end(() => {
            console.log('File write complete!');
            callback();
        });
    }
}

const outputFilePath = 'output.txt';
const upperCaseStream = new UpperCaseWritable(outputFilePath);

upperCaseStream.write('hello, ');
upperCaseStream.write('world!\n');
upperCaseStream.end(() => {
    console.log('Finished writing to the stream!');
});
```

### Readable
The Readable class allows developers to define their own custom streams to handle specialized data sources in a memory-efficient, streaming manner.
```
const { Readable } = require("node:stream");
const fs = require("node:fs");

class FileReadStream extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }
  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);
      this.push(bytesRead > 0 ? buff.subarray(0, 12) : null);
    });
  }
  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => callback(err || error));
    } else {
      callback(error);
    }
  }
}

const stream = new FileReadStream({ fileName: "text.txt" });
stream.on("data", (chunk) => {
  console.log(chunk.length);
  console.log(chunk.toString("utf-8"));
});
stream.on("end", () => {
  console.log("Stream is done reading.");
});
```

### pipeline()
A pipeline refers to chaining multiple streams together in a sequential manner such that the output of one stream serves as the input to the next.

Key Benefits of pipeline:
- Automatic Error Handling: It listens for errors on all streams and destroys them if any stream fails.
- Cleaner Syntax: It removes the boilerplate code required for chaining streams manually.
- Resource Management: It ensures that streams are closed/cleaned up properly.

#### File Compression Pipeline (Working Example)
```
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');

async function compressFile() {
    try {
        await pipeline(
            fs.createReadStream('input.txt'),
            zlib.createGzip(),
            fs.createWriteStream('output.txt.gz')
        );
        console.log('Pipeline succeeded - file compressed!');
    } catch (err) {
        console.error('Pipeline failed:', err);
    }
}
compressFile();
```

### pipe vs pipeline

Pipe (disadvantages): If something goes wrong (e.g., reading fails, compression throws an error), you need to manually handle errors for each stream. You must also manually handle cleanup (e.g., closing streams).

Pipeline (advantages): Errors in any stream in the chain are automatically handled. All streams are cleaned up (destroyed) to ensure there are no resource leaks.

#### Pipe example – handling errors
```
const fs = require('fs');
const zlib = require('zlib');

const readableStream = fs.createReadStream('input.txt');
const gzipStream = zlib.createGzip();
const writableStream = fs.createWriteStream('output.txt.gz');

readableStream
    .pipe(gzipStream)
    .pipe(writableStream)
    .on('finish', () => {
        console.log('Compression succeeded!');
    })
    .on('error', (err) => {
        console.error('Pipeline failed:', err);
    });
```

#### Pipeline example – handling errors
```
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

const readableStream = fs.createReadStream('input.txt');
const gzipStream = zlib.createGzip();
const writableStream = fs.createWriteStream('output.txt.gz');

pipeline(
    readableStream,
    gzipStream,
    writableStream,
    (err) => {
        if (err) {
            console.error('Pipeline failed:', err);
        } else {
            console.log('Pipeline succeeded!');
        }
    }
);
```

### Duplex Streams
A Duplex stream is a combination of both a readable and a writable stream. It allows two-way communication, meaning you can both read from and write to the same stream.
```
const { Duplex } = require('stream');

class MyDuplexStream extends Duplex {
    constructor() {
        super();
        this.data = [];
    }
    _write(chunk, encoding, callback) {
        console.log(`Writing: ${chunk.toString()}`);
        this.data.push(chunk);
        callback();
    }
    _read(size) {
        if (this.data.length > 0) {
            this.push(this.data.shift());
        } else {
            this.push(null);
        }
    }
}

const myDuplex = new MyDuplexStream();
myDuplex.write('Hello World');
myDuplex.write('Node.js');
myDuplex.end();
myDuplex.on('data', (chunk) => {
    console.log(`Reading: ${chunk.toString()}`);
});
```

### Transform Streams
A Transform stream is a special type of Duplex stream specifically designed for modifying ("transforming") the data as it passes through.
```
const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

const upperCaseStream = new UpperCaseTransform();
process.stdin.pipe(upperCaseStream).pipe(process.stdout);
```
