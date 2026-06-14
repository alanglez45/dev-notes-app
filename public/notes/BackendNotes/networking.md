# Networking (pendiente)

## HTTP(S)

Node.js has built-in support for HTTPS (HTTP Secure) through the https module. This allows you to create secure web servers and make secure requests to other servers.

```
const http = require('http');
const https = require('https');
```

### Running HTTP Web Server

The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
```
const http = require('http');
const port = 4000;
const server = http.createServer((req, res) => {
    res.end('Hello World');
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
// node app.js
// Server running at http://localhost:4000/
```

### Network modules

#### http
The http module is a core module in Node.js that provides functionality for creating HTTP servers and making HTTP requests. It enables you to build networking applications, handle incoming requests, and communicate with other web servers.

Create HTTP server
```
const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Make HTTP GET request
```
const http = require('http');
const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/',
  method: 'GET',
};
const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Response Headers:', res.headers);
  res.on('data', (chunk) => {
    console.log(`Received Data: ${chunk}`);
  });
  res.on('end', () => {
    console.log('Request Complete');
  });
});
req.on('error', (error) => {
  console.error(`Request Error: ${error.message}`);
});
req.end();
```

Process HTTP POST request
```
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      console.log(`Received Data: ${body}`);
      res.end('Data Received');
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### https
The https module extends the http module to provide support for HTTPS (HTTP over SSL/TLS) connections. It allows to create HTTPS server or make secure HTTPS requests.

Create HTTPS server
```
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem'),
  ca: fs.readFileSync('ca.pem'),
  requestCert: true,
  rejectUnauthorized: true
};
const server = https.createServer(options, (req, res) => {
  const cert = req.socket.getPeerCertificate();
  console.log('Client Certificate:', cert);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### Net
The net module provides API for creating TCP servers and establishing raw TCP connections. It is a lower-level module that can be used to implement custom protocols or handle specific network scenarios where higher-level modules like http or https are not suitable.

Create a TCP Server
```
const net = require('net');
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    // Handle incoming data
  });
  socket.on('end', () => {
    // Handle connection termination
  });
});
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Create a TCP Client
```
const net = require('net');
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server!');
  client.write('Hello, server!');
});
client.on('data', (data) => {
  console.log('Received data:', data.toString());
  client.end();
});
client.on('end', () => {
  console.log('Disconnected from server');
});
```

#### dns
The dns module provides API to perform DNS (Domain Name System) lookups and reverse lookups. It allows you to resolve domain names to IP addresses and vice versa.

DNS lookup
```
const dns = require('dns');
dns.lookup('www.example.com', (err, address, family) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('IP Address:', address);
});
/*
IP Address: 93.184.216.34
*/
```

Resolve DNS
```
const dns = require('dns');
dns.resolve('www.example.com', (err, addresses) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('IP Addresses:', addresses);
});
/*
IP Addresses: [ '93.184.216.34' ]
*/
```

#### url
The url module provides utilities for working with URLs. It allows you to parse, format, and manipulate URL strings.

URL Parsing
```
const url = require('url');
const urlString = 'https://www.example.com:8080/path?param1=value1&param2=value2#fragment';
const parsedUrl = new URL(urlString);
console.log('Protocol:', parsedUrl.protocol);
console.log('Host:', parsedUrl.host);
console.log('Port:', parsedUrl.port);
console.log('Path:', parsedUrl.pathname);
console.log('Query:', parsedUrl.searchParams.toString());
console.log('Fragment:', parsedUrl.hash);
/*
Protocol: https:
Host: www.example.com:8080
Port: 8080
Path: /path
Query: param1=value1&param2=value2
Fragment: #fragment
*/
```

URL Formatting
```
const url = require('url');
const urlObject = {
  protocol: 'https:',
  host: 'www.example.com',
  pathname: '/path',
  search: '?param1=value1&param2=value2',
  hash: '#fragment'
};
const formattedUrl = url.format(urlObject);
console.log('Formatted URL:', formattedUrl);
/*
Formatted URL: https://www.example.com/path?param1=value1&param2=value2#fragment
*/
```

#### Querystring
The querystring module provides utilities to parse and stringify query strings. It allows you to parse URL query parameters and generate query strings for HTTP requests.

```
const querystring = require('querystring');
const queryString = 'param1=value1&param2=value2&param3=value3';
const parsedQuery = querystring.parse(queryString);
console.log('Parsed Query:', parsedQuery);
/*
Parsed Query: [Object: null prototype] {
  param1: 'value1',
  param2: 'value2',
  param3: 'value3'
}
*/
```

Stringify an Object into a Query String
```
const querystring = require('querystring');
const obj = {
  param1: 'value1',
  param2: 'value2',
  param3: 'value3'
};
const queryString = querystring.stringify(obj);
console.log('Query String:', queryString);
/*
Query String: param1=value1&param2=value2&param3=value3
*/
```

Encode and decoding URL
```
const querystring = require('querystring');
const encodedValue = querystring.escape('Special Characters: ?, =, &');
console.log('Encoded Value:', encodedValue);
const decodedValue = querystring.unescape(encodedValue);
console.log('Decoded Value:', decodedValue);
/*
Encoded Value: Special%20Characters%3A%20%3F%2C%20%3D%2C%20%26
Decoded Value: Special Characters: ?, =, &
*/
```

### WebSockets

WebSockets - is a communication protocol that provides full-duplex, bidirectional communication between a client and a server over a single, long-lived connection. Unlike traditional HTTP, which follows a request-response model, WebSockets allow for real-time, interactive communication.

- Persistent Connection: WebSockets establish a persistent connection between the client and the server, allowing for continuous communication. Once the connection is established, both the client and server can send data to each other without the need for initiating new requests.
- Full-Duplex Communication: WebSockets support simultaneous bidirectional communication. This means that the client and server can send messages to each other independently and concurrently. It allows for real-time data streaming and instant updates.
- Low Overhead: The WebSocket protocol has a smaller overhead compared to HTTP. After the initial handshake, the subsequent messages have a minimal header size, reducing the amount of data transferred over the network.
- Event-Driven Model: WebSockets use an event-driven model where the client and server can trigger events and send messages to each other based on specific actions or conditions. This allows for efficient and reactive communication.

WebSockets are commonly used in various scenarios such as chat applications, real-time dashboards, and multiplayer games. Socket.io is a popular JavaScript library which simplifies the process of implementing real-time features in Node.js applications.
