# Configuration management and environments in Node.js

## Configuration management

1. Using environment variables: They can be set using the command line, a .env file, or through the hosting environment. Through environment variables you can specify different configuration settings, such as database credentials or the API keys needed for third-party services.
```
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
```

2. Using a configuration file: Another common way to configure Node.js apps is by using a configuration file, such as a JSON or YAML file.
```
{
  "port": 80,
  "db": {
    "host": "example.db.host"
  }
}
```
```
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const PORT = config.port || 3000;
const DB_HOST = config.db.host || 'localhost';
```

---

# Graceful shutdown in Node.js

Graceful shutdown refers to the process of closing down an application in a controlled and orderly way, ensuring that all in-progress operations are completed, and no data is lost.

If an application is shut down abruptly, it can leave resources in an inconsistent state, such as open network connections (and unhandled user requests consequently), unfinished database transactions, or data in memory that has not been persisted to disk. This can lead to data loss (which is not acceptable for production workloads), increased resource usage, and other issues. The most significant issue of not having graceful shutdown in place is that it makes bad user experience.

With a graceful shutdown, an application can be notified of the shutdown process and take appropriate steps to gracefully close down any in-progress operations, such as closing open database connections or finishing processing pending requests. Consequently, it can prevent data loss and other issues, and ensure that resources are freed up properly.

```
const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000);

const connections = [];
server.on('connection', (connection) => {
  connections.push(connection);
  connection.on('close', () => {
    connections = connections.filter((currentConnection) => currentConnection !== connection);
  });
});

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);
  connections.forEach((connection) => connection.end());
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

---

# Healthcheck for Node.js apps

Implementing health checks in a Node.js application is important for ensuring that the application is functioning properly and able to handle incoming requests. Health checks provide a way to monitor the health of your application and quickly detect and respond to issues.

```
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200);
        res.end('Healthy');
    } else {
        // Handle other requests as usual
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
```

When the /health route is accessed, the server responds with a 200 OK status code and a simple text message indicating that the server is healthy.

```
const express = require('express');
const mysql = require('mysql2');
const port = process.env.PORT || 3000;
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'mydatabase',
};
const app = express();
const pool = mysql.createPool(dbConfig);

app.get('/health', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error connecting to database');
        }
        res.status(200).send('OK');
        connection.release();
    });
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
```

Here's an example response when the health check is successful:
```
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
```

And here's an example response when the health check fails:
```
{
  "status": "error",
  "errors": {
    "database": {
      "status": "down",
      "message": "Database connection timed out after 300ms"
    }
  }
}
```
