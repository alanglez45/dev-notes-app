# REST API

REST (REpresentational State Transfer) is an architectural style that defines a set of constraints to be used for creating web services.

## Client-Server Architecture

- Separation of Concerns: The client and server have distinct responsibilities and concerns.
- Scalability: The client-server architecture allows independent scaling of client and server components. For example the server can be scaled up across multiple machines to handle increased load.
- Loose Coupling: The client and server are loosely coupled, meaning they can evolve and change independently without impacting each other. As long as the interface between the client and server remains consistent, updates or modifications to one component can be made without affecting the other.
- Interoperability: Clients and servers can be developed using different technologies or run on different platforms.

## Stateless Interactions

Each request from a client to a server must contain all the necessary information for the server to understand and process the request. The server does not rely on any previous requests or stored client context to fulfill the current request.

## Uniform interface

- Resource-Based: REST APIs expose resources, which are represented as nouns, such as "users", "products" or "orders" (pay attention that plural forms are used). Resources are identified by unique URLs. For example, /users might represent the collection of users, /users/123 - a specific user with the ID 123.
- CRUD Operations: The uniform interface provides standard operations (Create, Read, Update, Delete) that map to the HTTP methods: POST, GET, PUT/PATCH, and DELETE, respectively. These methods correspond to operations that can be performed on resources.
- Stateless Requests: Each request from the client to the server should contain all the necessary information for the server to understand and process the request. The server should not rely on any client-specific state or session.
- Hypermedia as the Engine of Application State (HATEOAS): REST APIs include hypermedia links in the response to provide navigation and discoverability. These links allow clients to discover related resources and available actions without prior knowledge. For example, a response for a user might include links to view the user's details, update the user, or retrieve related resources like the user's orders.

## Cacheability

Responses from the server can be marked as cacheable or non-cacheable. If they are defined as cacheable ones, then the client can reuse the response data for equivalent requests in the future.

By default responses are not cached, meaning that the server needs to recompute it for each request. However, there are some cases when the response for a particular request may not change frequently or at all. In this case, responses can be stored in cache and served directly from it for subsequent identical requests. It allows to improve performance significantly by reducing the need for redundant processing and network round trips.

- Cache-Control: allows the server to specify caching directives to the client. Some common directives include:
  - max-age: Indicates the maximum time in seconds that the response can be cached before it is considered stale.
  - private: Specifies that the response is intended for a specific user and should not be cached by shared caches.
  - public: Indicates that the response can be cached by both private and shared caches.
  - no-cache: Indicates that the response should not be served from the cache.
- Expires: specifies date and time after which the response is considered stale and should not be used from the cache. It is often used together with the Cache-Control header to provide additional caching instructions.
- ETag: is used to uniquely identify a specific version of a resource representation.
- Last-Modified: indicates the date and time when the resource was last modified on the server.

Note: Cached responses should be invalidated or refreshed when the corresponding resources change to maintain data consistency

## Layered system

REST allows the usage of intermediaries, such as proxies, gateways, or load balancers, between the client and the server.

These intermediaries can improve performance, security, and scalability. Each layer remains unaware of any internals of other layers, promoting loose coupling and system extensibility. For example, a client cannot tell whether it is connected directly to the end server or to an intermediary.

## Code on demand

It allows the server to dynamically send executable code (such as JavaScript) to the client as part of the API response. The client can then execute this code to enhance its functionality or behavior.

This feature is typically used in scenarios where the server wants to provide additional functionality to the client without requiring prior knowledge or hardcoding everything into the client application.

For example, suppose a REST API provides a service that performs complex calculations or generates customized user interfaces. Instead of the client having to implement those functionalities themselves, the server can send executable code along with the response. The client then executes this code to perform the desired calculations or modify its user interface based on the provided logic.
