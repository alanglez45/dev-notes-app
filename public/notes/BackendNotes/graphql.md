# Graphql

GraphQL is a query language for APIs and a runtime for executing those queries. It was developed by Facebook and provides a flexible, efficient alternative to REST.

- Ask only for the data you need (no more, no less)
- Get everything in one request (even nested data)
- Strongly typed schema
- Enables real-time updates with subscriptions (optional)

## Key Concepts in GraphQL

### Schema
Defines types, queries, and mutations your API supports.
```
type Book {
  title: String
  author: String
}
type Query {
  books: [Book]
}
```

### Query
The client requests exactly the data it wants.
```
{
  books {
    title
  }
}
```

### Mutation
Used to modify data (like POST/PUT in REST).
```
mutation {
  addBook(title: "1984", author: "Orwell") {
    title
  }
}
```

### Resolvers
Functions that handle fetching the data for each field.

### Types
Strongly-typed system: String, Int, Boolean, Float, ID, and custom types.

## Installing GraphQL with Express.js

```
npm install express graphql express-graphql
```

Create server.js
```
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => 'Hello world!',
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
```

Go to http://localhost:4000/graphql and try this query:
```
{
  hello
}
```

## GraphQL typically uses a single route

Why Only One Route?
GraphQL is not REST. Instead of having multiple endpoints like:
- GET /users
- GET /users/:id
- POST /users

GraphQL uses one endpoint (e.g., /graphql) and the request body defines what to fetch or mutate.

## typeDefs

typeDefs (short for type definitions) are used to define the schema of your GraphQL API — that is, the shape of the data and the operations (queries/mutations) that can be performed.
