# Databases. NoSQL

NoSQL does not store data in a relational format. The data does not need to have a strict schema nor the usual SQL table structure.

## Key Features of NoSQL:
- Flexible Schema – No fixed structure; supports dynamic data.
- High Scalability – Easily scales horizontally across servers.
- Fast Performance – Optimized for quick reads/writes.
- Multiple Data Models – Supports document, key-value, column, and graph types.

## ACID

A – Atomicity
Transactions are all-or-nothing: either everything succeeds, or nothing happens.

C – Consistency
The database remains in a valid state before and after the transaction.

I – Isolation
Concurrent transactions do not interfere with each other.

D – Durability
Once a transaction is committed, it is permanently saved—even if the system crashes.

If ACID properties belong to RDBMSs, BASE properties belong to NoSQL databases.

## BASE

- Basically Available:
  Writing and reading operations are available as much as possible even if it's a failure. Will ensure availability of data by spreading and replicating it across the nodes of the database cluster.
- Soft State:
  No guarantees that the data eventually becomes consistent.
- Eventual Consistency
  The components in the system may not reflect the same value/state of a record at a given point in time. They will settle it eventually.

## CAP

The CAP theorem states that it's impossible for a database system to achieve Consistency, Availability, and Partition Tolerance at the same time.

- Consistency:
  Data should be sequential consistent. Refers to linearizability across all nodes of a distributed system. All nodes in a system return same data after a successful write operation. Consistency is definitely an important characteristic of any distributed NoSQL database. However, not all of them can provide it.

- Availability:
  Every request served by a non-failing (Fault Tolerance) node must result in a response in a reasonable amount of time.

- Partition tolerance:
  In the case of partition failure, system will continue to work and provide consistent data.

It's theoretically impossible to have all 3 requirements met, so a combination of 2 must be chosen and this is usually the deciding factor in what technology is used.

- AP systems. Highly available and partitioning tolerant databases that will always respond to your requests, no matter what happens.
- CP systems. Consistent and partitioning tolerant databases that will care for the data no matter what.
- AC systems. Highly available and consistent databases will always respond to all your requests from any node with the latest version of the data.

### CAP Category

| CAP Category | DB Types | DB |
|---|---|---|
| AP | Key-Value Pair | Riak |
| CP | Key-Value Pair | Redis |
| AP | Document-oriented | CouchBase |
| CP | Document-oriented | MongoDB |
| AP | Column-oriented | Cassandra |
| CP | Column-oriented | HBase |
| CA | Graph | Neo4J |

## SQL VS NoSQL

| | SQL | NoSQL |
|---|---|---|
| Definition | SQL databases are primarily called RDBMS or Relational Databases | NoSQL databases are primarily called as Non-relational or distributed database |
| Query Language | Structured query language (SQL) | No query language |
| Type | SQL databases are table based databases | NoSQL databases can be document based, key-value pairs, graph databases |
| Schema | SQL databases have a predefined schema | NoSQL databases use dynamic schema for unstructured data |
| Scalability | SQL databases are vertically scalable | NoSQL databases are horizontally scalable |
| Performance | Need a larger server to accommodate the increasing amount of data | Can add new servers to what you already have |

## Types of NoSQL

### Key-value DB
It is the least complicated type of NoSQL databases that using dictionary-like storing method and does't require a predefined schema.

Key-Value DBs provide a way to store and access data using simple operations:
- Get (key) - Retrieve value by provided key
- Put (key, value) - Add new key-value pair
- Update (key, value) - Update value by provided key
- Delete (key) - delete key-value pair

Specifics
- Consistency - applicable for operations on a single key in a key-value store
- Query - can use query by the key only
- Scaling - scale by a process called sharding

Examples:
- Redis
- Amazon DynamoDB

### Document-oriented DB
This database is designed to store and query data in the form of documents, usually JSON, but also XML or YAML. Objects within a database are stored completely within one document.
```
{
    "ID": "001",
    "Book": "NodeJS Cookbook",
    "Genre": "Work and Education",
    "Author": "Bethany Griggs"
}
```

Specifics
- Consistency - some databases offers eventual consistency with a period of inconsistency
- Query - can use query based on unique identifiers or field values
- Scaling - databases are distributed and resilient. They allow for horizontal scaling

Examples
- MongoDB

### Graphs
A graph database is a database designed for storing and querying data that is connected via defined relationships. Graphs contain nodes, edges, and properties. Data points in a graph database are nodes and these nodes are connected to related data via edges. The data attached to each node are known as properties. Graph databases aren't restricted by predefined schema. There are two types of graphs: property graphs and RDF graphs. The property graph focuses on analytics and querying, while the RDF graph emphasizes data integration. Both types of graph consist of a collection of points (vertices) and the connections between those points (edges).

Specifics
- Consistency - offers eventual consistency with a period of inconsistency
- Query - can use specially defined query language like Cypher, SPARQL
- Scaling - databases are distributed and resilient. They allow for horizontal scaling

Examples
- Neo4j
- DataStax Astra DB

### Column-oriented Graph
These databases are designed to speed up workloads that operate on column data across all records/rows. They organize data by field and keeping all of the data associated with a field next to each other in memory storage.

Specifics
- Consistency - offers eventual consistency with a period of inconsistency
- Query - can use traditional SQL to perform queries
- Scaling - databases are distribute and can be sharded or partitioned across multiple servers
- Compression - databases are highly compressed compared to relatinal databases. Easy to optimize storage size.

Examples
- Amazon Redshif

## Conceptual techniques

Denormalization: could be used to simplify and optimize query processing by grouping all the data to query in one place. Can be defined as the coping of the same data into multiple tables or documents. Drawback is the data volume increases for various parameters, considerably increasing the data volume.

Databases:
- Key-Value Stores
- Document Databases

Aggregates: could be used to create nested entities with complex internal structures thanks to the soft schema. It helps to reduce joins by minimizing one-to-one relationships.

Databases:
- Key-Value Stores
- Document Databases

Application Side Joins: could be used during designing and developing the application. Compared to relational databases - queries are performed at query execution time. This tends to increase a performance penalty.

Databases:
- Key-Value Stores
- Document Databases
- Graph Databases

## General modeling techniques

Atomic Aggregates. Because Aggregates allow to store a single entity as one document, row or key-value pair, it is possible to update this entity atomically.

Enumerable keys. Because entity can be distributed across multiple servers, it is possible to use one hashed key. Drawback is sorting such keys may add a bit of complexity and a performance hit.

Index table. This technique requires to create an additional table. The keys in this table follow the access pattern and simplify query execution. Working with this technique could result an additional performance penalty and become a consistency issue.

Composite key index. This technique allows to create composite key to simplify query execution and aggregate data by a partial key. Composite keys are great when using ordered keys.

Inverted Lookup. This technique allows to use an index to find data that meets a criteria, but aggregate data using original representation or full scans. Using such indexes it is possible to intersect or unify corresponding data.

## Object Document Mapper

The Object Document Mapper (ODM) is an interface that treats a document as a tree structure. Similar to Object Relational Mapping (ORM), it is used to change the structure and content of a document. And also allows to define data schemas which represent the data structure. The usage of ODMs additionally simplifies the process of changing the database engine whenever the need arises.

Multiple ODMs are designed to support different NoSQL databases:
- Express-Cassandra is designed to work with Node.js for a NoSQL database like Cassandra
- Mongoose is designed for MongoDB database
- Amazon DynamoDB DataMapperis a helper for DynamoDB
