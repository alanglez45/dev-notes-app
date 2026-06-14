# Production-Ready Node.js Applications

## The Twelve Factors

"The Twelve Factors" is a methodology for building modern and maintainable applications.
It aims to help developers build applications in the cloud that are portable, scalable, and resilient to changes.

1. Codebase: A Node.js app should have a single codebase, tracked in a version control system (VCS) such as Git. This ensures that there is a single source of truth for the application's code. This also gives you an ability to make as many deployments or delivery pipelines as it's needed without worrying about unexpected differences between various sources. Obviously, this is the simplest factor, which does not require any further explanation.

2. Dependencies: The dependencies of a Node.js app should be explicitly declared and isolated from the application code. In Node.js it's achieved by a package manager such as npm or yarn, which can manage and install dependencies for the application, as well as perform other handy stuff.
https://docs.npmjs.com/cli/v9/configuring-npm/package-json
https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json
https://docs.npmjs.com/cli/v9/configuring-npm/npm-shrinkwrap-json

3. Config: Configuration settings of your Node.js app (as you can suspect, all those principles apply to any application back-end, even for serverless) should be stored in environment variables, rather than hardcoded in the application code. For example, instead of keeping (hard-codding) a database URL in the application code, it should be stored as an environment variable that can be easily changed without modifying the code. In Node.js we have a lot of tools like dotenv or config to manage configuration through environment variables.

4. Backing services: When you design a new Node.js application, it should treat all external services (such as databases, caches, and message brokers) as attached resources that can be accessed through a URL or other connection string. This ensures that the application is decoupled from the specific implementation details of the services it uses. Again, store connection details in the environment and abstract them in your code using libraries like pg for PostgreSQL, redis for Redis, and amqplib for RabbitMQ. This also relates to external APIs. In this case you need to write your custom code to manage data to and from external APIs pursuing loose coupling between the services. Moreover, in some cases you can extract an independent npm package which will handle all the implementation details and accept a connection string to work with an API.

5. Build, release, run: While building your app you should have a clear separation between the build, release, and run stages of its lifecycle. There are a lot of build tools such as Webpack, Babel, tslib or esbuild to compile the application code, and a deployment tool such as Docker or Kubernetes to package and deploy the application.

6. Processes: You should design a stateless and scalable Node.js application, so that it can be run on multiple instances to handle incoming requests (in other words your app should be horizontally scalable). You can achieve it by using a process manager such as PM2 to manage the application instances or Kubernetes for orchestrating services. In all cases you need some kind of load balancer to distribute traffic across multiple instances within a single compute instance (server or virtual machine) or hosted on different/individual machines. Every instance should independently handle incoming request and do not relay on its internal/cached state.

7. Port binding: A Node.js application should be bind to a port specified by the environment variable, rather than hard-coding a specific port number in your app. This allows the application to be run on any given port number without modifying the code. To some extent this factor seems very similar to the Config factor, but it focuses only on app's port number, as it is important to run your app on a particular or available port to start handling request. If for some reason the port is used, you need to have an ability to change this configuration without doing a code change and additional deployment cycle.

8. Concurrency: You should design your Node.js architecture to handle concurrent requests and avoid blocking operations. Use asynchronous functions and callbacks, and offload blocking operations to worker threads or child processes. In cloud environments there are many ways of achieving concurrency: running multiple app instances and distributing traffic with a load balancer, using function as a service (FaaS) tools, using decoupled or event-driven architectures and related tools, etc.

9. Disposability: Your Node.js apps should be disposable, so that they can be started and stopped quickly and easily. You can use a process manager such as PM2 to start and stop application instances. Or you can configure auto-scaling capabilities in a cloud to automatically run and terminate application instances based on app's load. Your app must be ready to start quickly and terminate gracefully without interupting existing connections and breaking apps data. Hence, it's important to have a graceful shutdown implemented in your app. In Node.js you can use libraries like graceful-fs and/or similar to handle file system operations gracefully. The implementation of graceful shutdown will also be reviewed in depth soon.

### Pets VS Cattle
Pets (Cat): In traditional server management, servers are often treated as pets. This means that each server is unique, receives individual attention, and is manually maintained. Similar to how people care for their pet cats, they are given names, specialized configurations, and are often fixed when they encounter issues. This approach tends to be more time-consuming, less scalable, and prone to human error.
Cattle: The "cattle" approach treats servers as a herd, where they are seen as interchangeable and expendable resources. Instead of giving them unique names and configurations, servers are assigned identifiers or numbers. If a server becomes unhealthy or fails, it is replaced rather than spending time trying to fix it. This approach emphasizes automation, scalability, and resilience.

10. Dev/prod parity: You should design a Node.js app to have parity between the development and production environments, so that the same codebase can be run in both environments without modification. This can be achieved by using environment variables to configure the application, and by using a continuous integration and deployment (CI/CD) pipeline to automate the deployment process. This also means that development, staging, and production as similar in terms of hardware configuration. In a real world it can be quite expensive to have several environments (especially development) running on the hardware which is similar to production. Anyway, it is beneficial to have at least one environment similar to production one. You can use various configuration management tools like Ansible, Chef, or Terraform to manage infrastructure in an automated and standardized way.

11. Logs: An application should log all its events and errors, so that they can be analyzed and monitored. A logging framework such as Winston or Bunyan can be used for implementing this factor. To aggregate and analise logs data you should send it to a centralized log management system such as ELK or Splunk. It may be obvious, but it is another important aspect of any modern app.

12. Admin processes: In your Node.js appls you should provide administrative interfaces for tasks such as database migrations and system monitoring. You can fulfill this factor by exposing administrative endpoints over HTTP or through a command-line interface (using Node.js REPL or npm scripts to run tasks.).

---

# 15-factor cloud-native applications

This new 15-factor app methodology is loosely based around the original Twelve factors (with additional revisions to each of them), but the most significant difference is the inclusion of three new factors:
- API first
- Telemetry
- Authentication and authorization

## API-first
When implementing the API-first principle in Node.js, there are several key steps you can follow:
- Design the API: Begin by designing the API endpoints, request/response structures, and overall functionality. Determine the resources and operations that the API will expose. Tools like OpenAPI Specification (OAS) or API Blueprint can be helpful for designing and documenting your API.
- Build the API contract: Once the API design is ready, create a contract that defines the expected behavior of the API. This contract can be in the form of an OpenAPI document, which specifies the endpoints, input parameters, response formats, and other details.
- Generate server code: Use tools like Swagger Codegen or OpenAPI Generator to generate the server-side code scaffolding based on the API contract. These tools can generate Node.js code that sets up the basic structure of the API, including routing, request handling, and error management.
- Implement API endpoints: With the generated code as a starting point, implement the API endpoints by adding the necessary business logic and data access layers. This involves writing Node.js code to handle incoming requests, process the data, and generate appropriate responses.
- Validate and test the API: Ensure that the API implementation adheres to the defined API contract. Validate the requests and responses against the expected structures and perform thorough testing to ensure the API functions as intended. Tools like Jest, Mocha, or Supertest can assist with testing the API endpoints in Node.js.
- Document the API: Documenting the API is crucial for its effective usage. Generate API documentation automatically from the API contract or use tools like Swagger UI (there are a lot of framework-specific packages, e.g., nest-swagger) or Redoc to create interactive API documentation. This documentation helps developers understand how to interact with the API and its available endpoints.
- Enable client development: Once the API is implemented and documented, clients can start using it to build applications. Clients can be developed in any programming language or framework that supports making HTTP requests. By focusing on the API-first principle, you provide a clear and consistent interface for client developers to interact with.

## Telemetry

Although logging is an important element to building cloud-native applications, it is generally a tool used during development to diagnose errors and code flows. Logging is typically oriented around the internal structure of your app, rather than reflecting real-world customer usage. Telemetry, on the other hand, is focused on data collection once the app is released into the wild. Telemetry and real-time app monitoring enable developers to monitor their application's performance, health, and key metrics in this complicated and highly distributed environment.

Instrumentation. Instrumentation is the process of adding code to your Node.js application to collect relevant data. This can include metrics, logs, and traces. In Node.js, you can use various libraries and tools for instrumentation, such as Prometheus, StatsD, or the built-in console module.

1. Define metrics: Identify the metrics that are important for monitoring and understanding your Node.js application. These metrics can include CPU usage, memory consumption, request/response times, error rates, and any other relevant data points. Determine what information will help you assess the performance, stability, and usage of your application.
2. Integrate monitoring tools: Choose and integrate monitoring tools that are compatible with Node.js. Popular choices include Prometheus, Grafana, New Relic, Datadog, or the Elastic Stack (Elasticsearch, Logstash, and Kibana). These tools provide features for data collection, visualization, alerting, and analysis.
3. Collect and store data: Configure your instrumentation libraries and tools to collect the defined metrics and store the data in a suitable backend, such as a time-series database or log storage. This allows you to retain historical data and perform analysis over time.
4. Visualize and analyze data: Utilize the capabilities of your monitoring tools to visualize and analyze the collected data. Create dashboards and visualizations that display the metrics in a meaningful way. This helps you gain insights into the performance of your Node.js application, identify trends, and detect anomalies.
5. Set up alerts: Define thresholds and rules to trigger alerts when certain metrics exceed predefined thresholds or when specific events occur. This enables you to proactively respond to critical issues or performance degradation in your Node.js application.
6. Continuous improvement: Regularly review and analyze the telemetry data to identify areas for improvement. Use the insights gained from telemetry to optimize performance, identify bottlenecks, fix bugs, and enhance the user experience. Continuously iterate on your Node.js application based on the information gathered through telemetry.

## Authentication and Authorization

The addition of the Authentication and authorization factor adds in an important emphasis on security for cloud-native applications. Deploying applications in a cloud environment means that applications can be transported across many data centers worldwide, executed within multiple containers, and accessed by an almost unlimited number of clients. So, it's vital that security is not an afterthought for cloud-native applications and is a very important factor to consider.
