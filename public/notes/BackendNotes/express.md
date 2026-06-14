# Express and Layered Architecture

Framework provides a developer with some tools and dictates how to use these tools properly.

## Overview of Express

The code snippet below creates a simple Express server:
```
const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('Server is started');
})
```

Expressjs provides us with three major features:
- routing
- middleware
- error handling

### Routing

As you might have noticed from our previous example of using HTTP, it doesn't have any routing features. If you want to add a new endpoint you need manually check the HTTP method and URL of a request. Express provides quite a handy routing feature. For adding an endpoint you can just use app.<method>(url, handler)

method - is any HTTP request method, you can add an endpoint for. Or all it for all methods.
url - is a string that represents URL of your endpoint
handler - is a callback that will be called when a request with provided method and URL was made

```
app.get('/users/:userId', () => {});
app.put('/users/:userId/groups', () => {});
app.post('/comments', () => {});
app.get('/comments', () => {});
app.delete('/comments/:commentId', () => {});
```

You might have noticed column: symbol in the path, that's route param. /users/:userId will match any route that starts with /users/.

### Middlewares

Middleware - is a function that has 3 arguments: request, response, and next. Middlewares can be used for some logic that should be executed for several or even all endpoints. For example, if you need to log information about every request, you can add a logger invocation in every handler, but it's much better to implement it only once. Another use case is user authentication. You can create auth middleware that will reject all requests that don't have correct tokens in their headers. Example of logger middleware:

```
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`New request: ${req.method}, ${req.url}`);
    next();
}
```

To add middleware to all routes you can use use method of express instance:
```
app.use(logger);
```

You can also specify paths when a middleware should be executed:
```
app.use('/api', logger);
```

Express provides some built-in middlewares:
- express.static
- express.json
- express.urlencoded

Still there are plenty of open-source ones that you can use. Here is a small list of middlewares that Express team developed:
- body-parser
- cookie-parser
- cors
- multer
- server-static

### Error handling

Express has its own error handling out of the box. If any of your middleware throws an exception, it will be caught by a built-in error handler and return an HTML string with a message and stack trace from an error object.

You can create error handler middleware that will be invocated only when there is an exception in middleware (or handlers) that were declared before the error handler. To convert a middleware into an error handler middleware, you need just to add one more argument at the beginning of the arguments list - error. Express distinguishes regular middleware from error handlers by the number of arguments that they have. For example:

```
app.get('/api/users/:userId', () => {
    throw new Error('User was not found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send({ message: err.message });
});
```

## Layered architecture

Layered architecture in Express.js is a way of organizing your application code into distinct layers, where each layer has a specific responsibility. This design pattern helps with code readability, maintainability, scalability, and testability.

Routes Layer (Router)
- Responsibility: Maps HTTP requests (e.g. GET /users) to controller functions.
- Typical File(s): routes/userRoutes.js

Controller Layer
- Responsibility: Handles the request logic (e.g. parsing input, calling services).
- Typical File(s): controllers/userController.js

Model Layer (Optional if using ORM)
- Responsibility: Defines data structures or ORM schemas (e.g., using Mongoose, Sequelize).

### Benefits of Layered Architecture
- Separation of concerns
- Reusability of logic (e.g., services can be reused by other interfaces like CLI or cron jobs)
- Easier testing (you can mock dependencies)
- Cleaner code organization
