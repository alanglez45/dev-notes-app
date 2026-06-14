# Backend Notes - Index

## Node.js Core Concepts
- [Fundamentals](fundamentals.md) - Node.js intro, V8, NVM, package.json, npm, NPX
- [Event Loop](event-loop.md) - 6 phases, Libuv, Microtasks vs Macrotasks
- [REPL & Event Emitters](repl-emitters.md) - REPL, EventEmitter, on/emit/once/prependListener
- [Package.json](package-json.md) - Metadata, dependencies, devDependencies, globales
- [Modules (ESM vs CommonJS)](modules.md) - import/export, require/module.exports, nodemon

## Node.js Built-in Modules
- [Buffers](buffers.md) - Buffer, alloc, allocUnsafe, binary data
- [File System](file-system.md) - Read/write/update/delete, callbacks, promises, sync, permissions
- [Path](path.md) - join, resolve, basename, extname, absolute vs relative paths
- [Streams](streams.md) - Readable, Writable, Duplex, Transform, pipe, pipeline, backpressure
- [Networking](networking.md) - HTTP(S), WebSockets, net, dns, url, querystring
- [Console & Errors](console-errors.md) - Console methods, Error types, error handling
- [OS & Child Process](os-child-process.md) - OS module, exec, execFile, spawn, fork, Cluster, Worker Threads

## Architecture
- [Client-Server Model](client-server.md) - Client-Server, Stateful vs Stateless, HTTP/HTTPS
- [REST API](rest-api.md) - REST principles, cacheability, HATEOAS

## API
- [Express & Layered Architecture](express.md) - Routing, middleware, error handling, layers
- [GraphQL](graphql.md) - Schema, query, mutation, resolvers, typeDefs

## Databases
- [NoSQL](databases.md) - NoSQL types, ACID, BASE, CAP, ODM, modeling techniques
- [Relational Databases](relational-databases.md) - RDBMS, normalization, keys, SQL (DDL, DML, JOINs), ORM

## Security
- [Authentication & Authorization](auth.md) - Auth factors, RBAC, ABAC, ACL, Basic Auth, JWT, OAuth 2.0, IdP

## Testing
- [Testing](testing.md) - Unit, Integration, E2E, Jest (lifecycle, mocks, spies, coverage)

## Design Patterns
- [Design Patterns](design-patterns.md) - Factory functions, Adapter Pattern

## Production
- [12 Factors & 15-Factor Apps](12-factors.md) - Twelve Factors, 15-factor cloud-native, API-first, telemetry
- [Configuration Management](config-management.md) - Environment variables, graceful shutdown, healthchecks
- [Logging & Debugging](logging-debugging.md) - Debugging terminology, console, util.debuglog, winston

## CI/CD
- [CI/CD](ci-cd.md) - DevOps Life Cycle, pipeline stages, best practices
- [Docker](docker.md) - Docker, Docker Compose, Podman
- [Jenkins](jenkins.md) - Jobs, Pipelines, Jenkinsfile, Nodes
