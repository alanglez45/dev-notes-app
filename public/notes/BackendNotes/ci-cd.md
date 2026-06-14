# CI/CD

CI/CD (Continuous Integration / Continuous Delivery or Continuous Deployment) is a set of practices that automate the integration, testing, and deployment of code to deliver software faster and more reliably.

## DevOps Life Cycle

### Continuous Integration (CI)

Developers integrate code changes into a shared repository multiple times a day. Each integration is automatically verified through builds and tests.

- **Build** – Compile the code and create artifacts (e.g., .jar files, .zip, bundles)
- **Test** – Run unit tests, integration tests, and static analysis to catch errors early

Benefits: early bug detection, fewer merge conflicts, more stable code.

### Continuous Delivery (CD)

Code passes through an automated testing and validation pipeline, but requires human approval to deploy to production.

- **Release** – Prepare artifacts for production use
- **Staging** – Deploy to an environment that mirrors production for final testing

### Continuous Deployment (CD)

Similar to Continuous Delivery, but deployment to production happens automatically if the code passes all tests — no human intervention required.

- **Deploy** – Automatically publish validated changes to the production environment

## Typical CI/CD Pipeline Stages

1. **Source** – Developer pushes code to the repository (GitHub, GitLab, Bitbucket)
2. **Build** – Code is compiled and packaged as an artifact
3. **Test** – Unit, integration, functional, and security tests
4. **Staging** – Deploy to a pre-production environment for final validation
5. **Production** – Deploy to the live environment for end users

## Popular Tools

- **Jenkins** – Ver [Jenkins](./jenkins.md)
- **GitHub Actions** – Native CI/CD integrated with GitHub
- **GitLab CI** – Built-in pipeline with self-hosted runners
- **AWS CodePipeline** – Managed CI/CD service on AWS
- **CircleCI** – Cloud-based continuous integration platform
- **Semaphore** – Fast and scalable CI/CD platform

## Best Practices

- Keep the pipeline fast for immediate feedback
- Run tests in parallel when possible
- Use containers (Docker) for consistent environments
- Version pipeline configuration (Infrastructure as Code)
- Never deploy code that fails any test
