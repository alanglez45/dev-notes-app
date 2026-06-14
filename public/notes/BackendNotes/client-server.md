# Client-Server Model

The client represents an application that makes requests to the server. It could be a web or mobile application as well as any other component that interacts with the server. The client is responsible for initiating requests and processing the response. It's important to note that the term "client" is not limited to UI-based applications. In the microservices world, a client can refer to a backend application as well.

The server is the central component that receives requests from clients, processes them, and generates responses. It stores and manages resources, executes business logic, and handles data storage and retrieval. The server is responsible for processing client requests, performing necessary computations or database operations, and returning the appropriate responses.

## Stateful vs Stateless architecture

### Stateful
In a stateful architecture, the server maintains the state or context of a client's interactions.
- The server retains information about the client's session or past interactions, which allows it to maintain continuity across multiple requests.
- The server can store session data, authentication tokens or any other relevant information.
- This approach often requires the server to allocate resources to manage and store the client's state, which may impact scalability and resource utilization.

### Stateless
In a stateless architecture, the server does not retain any information about the client's past interactions or session state.
- Each client request is self-contained and includes all the necessary information for the server to process it without relying on previous requests.
- The server treats each request independently and does not maintain any client-specific state between requests.
- Stateless architectures are typically more scalable and easier to manage as they don't require server resources for maintaining session information.
- To maintain client context on server, clients often include relevant information (such as tokens, session IDs, or authentication credentials) in each request.

It's important to note that stateless interactions do not mean that the server cannot maintain any state at all. The server can still have its internal state, such as databases or caches, to store and retrieve data. However, the client is responsible for providing all the necessary contextual information within each request, allowing the server to process it independently without relying on previous interactions.

---

# HTTP

HTTP (Hypertext Transfer Protocol) - is a protocol used for data exchange between clients (e.g web browsers) and web servers.

## Request-Response Model

HTTP request-response model is a fundamental concept which allows clients to request specific resources from servers, and servers respond with the requested data or appropriate error messages.

The request consists of:
- A method: Specifies the type of action to be performed on the server's resource (e.g., GET, POST, PUT, DELETE).
- URL (Uniform Resource Locator): Identifies the specific resource being requested.
- Headers: Include additional information about the request, such as content type, authentication credentials, caching directives, etc.
- Body (optional): Contains data sent with the request, often used in POST, PATCH or PUT requests.

The response consists of:
- Status code: Indicates the outcome of the request (e.g., 200 for "OK," 404 for "Not Found," 500 for "Internal Server Error").
- Headers: Provide additional information about the response, such as content type, cache-control, server details, etc.
- Body: Contains the requested resource (e.g., HTML page, JSON data) or an error message, depending on the server's processing.

---

# HTTPS

HTTPS (Hypertext Transfer Protocol Secure) - is a secure version of the HTTP protocol. It adds an extra layer of security by encrypting the data exchanged between the client and the server.

- Encryption: HTTPS uses encryption algorithms to secure the communication between the client and the server. It encrypts the data being transmitted, making it unreadable to anyone who might intercept it.
- Secure Sockets Layer (SSL) or Transport Layer Security (TLS): HTTPS relies on SSL or TLS protocols to establish a secure connection. These protocols ensure that the data exchanged between the client and the server remains private and protected.
- SSL/TLS Certificates: To enable HTTPS, web servers obtain SSL/TLS certificates from trusted certificate authorities. These certificates verify the server's identity and enable secure communication. When a client connects to a website using HTTPS, it verifies the server's certificate to ensure a secure connection.
