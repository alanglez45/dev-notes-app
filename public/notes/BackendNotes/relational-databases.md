# Relational Databases

A relational database (RDB) is type of database that stores a collection of data items with pre-defined relationships between them. These items are organized as a set of tables with columns and rows.

The rows in the table represent a record and contains all values from its columns. Each row in a table should be marked with some unique identifier called a primary key.

## What is RDBMS

The software used to store, manage, query, and retrieve data stored in a relational database is called a relational database management system (RDBMS). The RDBMS provides an interface between users and applications and the database, as well as administrative functions for managing data storage, access, and performance.

- MySQL
- PostgreSQL
- Oracle
- SQL Server

## Transactions and ACID

All database transactions in any RDBMS are ACID compliant or Atomic, Consistent, Isolated and Durable to ensure data integrity.

Atomicity defines that all operations in transaction treated as one "unit", which either succeeds completely or fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails and the database is left unchanged. In previous example transaction consists of two operations with different bank accounts and its naturally that bank wants to roll back any changes if something goes wrong.

Consistency ensures that a transaction can only bring the database from one valid state to another. Database can have some constraints in tables, i.e. unique columns, cascades, triggers, foreign keys etc. and any data written to the database must be valid according to all defined rules. This prevents database corruption by an illegal transaction.

Isolation helps to isolate one transaction from another, because often operations are run simultaneously one transaction may affect results of another if changes are persisted immediately. In RDBMS changes usually can be seen only after transaction is finished, so the effects of an incomplete transaction might not even be visible to other transactions.

Durability guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure (e.g., power outage or crash). This usually means that completed transactions are recorded not in some cache but in non-volatile memory immediately, unlike from eventually consistent NoSql.

## When do I need RDB for my project

SQL is a good choice when working with related, structured data. Relational databases are efficient, flexible and easily accessed by any application. A benefit of a relational database is that when one user updates a specific record, every instance of the database automatically refreshes, and that information is provided in real-time.

## Data modelling

### Normalisation

Normalisation is a database design technique that reduces data redundancy and eliminates undesirable characteristics like Insertion, Update and Deletion Anomalies. Normalisation rules divides larger tables into smaller tables and links them using relationships. The purpose of Normalisation in SQL is to eliminate redundant (repetitive) data and ensure data is stored logically. There are 6 normal forms, however, in most practical applications, normalisation achieves its best in 3rd Normal Form.

#### 1 Normal form
To satisfy First normal form, each column of a table must have a single value. Columns which contain sets of values or nested records are not allowed, each record needs to be unique.

#### 2 Normal form
If a table has a single column primary key, it automatically satisfies 2NF,

#### 3 Normal form
The third normal form states that you should eliminate fields in a table that do not depend on the key.
- A Table is already in 2 NF
- Non-Primary key columns shouldn't depend on the other non-Primary key columns
- There is no transitive functional dependency.

### Relationships

One-to-one
A one-to-one (1:1) relationship means that each record in Table A relates to one, and only one, record in Table B, and each record in Table B relates to one, and only one, record in Table A.

One-to-many
Relationship is also maintained by FK column in one of the tables.

Many-to-many
A many-to-many relationship indicates that multiple records in a table are linked to multiple records in another table. Those records may only be associated with a single record (or none at all) but the key is that they can and often are linked to more than one. Many-to-many relation is implemented by creating a third table, known as a join table, and create one-to-many relationships between it and your two starting tables.

### Indexes and keys

A KEY in SQL is a value used to identify records in a table uniquely. An SQL KEY is a single column or combination of multiple columns used to uniquely identify rows or tuples in the table. SQL Key is used to identify duplicate information, and it also helps establish a relationship between multiple tables in the database.

### What is a Primary Key (or PK)?

A primary is a single column value used to identify a database record uniquely.
It has following attributes:
- A primary key cannot be NULL
- A primary key value must be unique
- The primary key values should rarely be changed
- The primary key must be given a value when a new record is inserted.

### What is Composite Key?

A composite key is a primary key composed of multiple columns used to identify a record uniquely.

### What is Foreign Key?

We have already used Foreign Keys (FK) during normalization process to build relations.
Foreign Key references the primary key of another Table! It helps connect your Tables.
- A foreign key can have a different name from its primary key
- It ensures rows in one table have corresponding rows in another
- Unlike the Primary key, they do not have to be unique. Most often they aren't
- Foreign keys can be null even though primary keys can not

### Indexes

Indexing is the way to get an unordered table into an order that will maximize the query's efficiency while searching. When there is no index, and you try to search something in database its engine has to scan through every row to find all matching records. While nowadays hardware can be really performant still such operations are time-consuming, especially if you have millions and millions of rows. Looking through every single row is not very efficient.

---

## SQL basics

SQL. Structured Query Language(SQL) is the database language by the use of which we can perform certain operations on the existing database, and also we can use this language to create a database. SQL uses certain commands like Create, Drop, Insert, etc. to carry out the required tasks.

These SQL commands are mainly categorized into four categories as:
- DDL – Data Definition Language
- DQl – Data Query Language
- DML – Data Manipulation Language
- DCL – Data Control Language

### DDL (Data Definition Language)

DDL or Data Definition Language actually consists of the SQL commands that can be used to define the database schema. DDL is a set of SQL commands used to create, modify, and delete database structures but not data.

Create
This command is used to create the database or its objects (like table, index, function, views, store procedure, and triggers).
```
CREATE DATABASE test;
CREATE INDEX idx_name
ON Employee (Name);
CREATE TABLE [IF NOT EXISTS] table_name (
   column1 datatype(length) column_contraint,
   column2 datatype(length) column_contraint,
   column3 datatype(length) column_contraint,
   table_constraints
);
```

Drop
DROP is a DDL command used to delete/remove the database objects from the SQL database. We can easily remove the entire table, view, or index from the database using this DDL command.
```
DROP DATABASE database_name;
DROP TABLE Employee;
DROP INDEX index_name;
```

Alter
ALTER is a DDL command which changes or modifies the existing structure of the database, and it also changes the schema of database objects. We can also add and drop constraints of the table using the ALTER command.
```
ALTER TABLE Employee ADD Surname varchar;
ALTER TABLE Employee DROP Surname;
```

### DML (Data Manipulation Language)

DML is an abbreviation of Data Manipulation Language. We can easily access, store, modify, update and delete the existing records from the database using DML commands.

Following are the four main DML commands in SQL:
- SELECT Command
- INSERT Command
- UPDATE Command
- DELETE Command

Insert
INSERT is a data manipulation command in SQL, which allows users to insert data in database tables and has next syntax.
```
INSERT INTO TABLE_NAME ( column_Name1 , column_Name2 , column_Name3 , .... column_NameN )  VALUES (value_1, value_2, value_3, .... value_N );
INSERT INTO Hardware ("Serial", os, ram) VALUES ('1dfg124sd2a', 'MAC', 32);
INSERT INTO Hardware ("Serial", os, ram) VALUES
    ('1dfg124sd2a', 'MAC', 32),
    ('aa45g5dd71a', 'Windows', 64),
    ('gh26s2h61sd', 'Windows', 16);
```

Select
SELECT is one of the most frequently used commands in SQL. The SELECT command shows the records of the specified table. It also shows the particular record of a particular column by using the WHERE clause.
```
SELECT column_Name_1, column_Name_2, ….., column_Name_N FROM Name_of_table;
SELECT * from Table
SELECT * from Hardware WHERE ram >= 16
```

Update
UPDATE is a command in SQL, which allows users to update or modify the existing data in database tables and has next syntax:
```
UPDATE Table_name SET [column_name1= value_1, ….., column_nameN = value_N] WHERE CONDITION;
UPDATE Employee SET office_id = 2 WHERE id = 2;
```

Delete
DELETE is a DML command which allows SQL users to remove single or multiple existing records from the database tables. We use the WHERE clause with the DELETE command to select specific rows from the table. Syntax of DELETE Command:
```
DELETE FROM Table_Name WHERE condition;
```

### How to query relations

In lots of situations you will want to get information from several tables in one request.
There is JOIN operator in SQL that is used in such situation. A JOIN clause is used to combine rows from two or more tables, based on a related column between them. There are 4 different types of the JOINs in SQL:

- (INNER) JOIN: Returns records that have matching values in both tables
- LEFT JOIN: Returns all records from the left table, and the matched records from the right table
- RIGHT JOIN: Returns all records from the right table, and the matched records from the left table
- FULL JOIN: Returns all records when there is a match in either left or right table

---

## Node.js and database interactions

### ORM

ORM solves most of these problems. Object-relational mapping lets people interact with databases using their programming languages rather than forcing them to use SQL. Developers can use tools called object-relational mappers. They show the data in a structured way that helps users understand the content and layout of a database without using SQL. One of the major benefits is that it saves time compared to entering SQL queries.

MikroORM is the TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns.
