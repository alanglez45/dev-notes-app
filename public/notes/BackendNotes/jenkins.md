# Jenkins

Jenkins is an open-source automation server used to build, test, and deploy software through CI/CD pipelines.

## Key Concepts

- **Jobs** – A task or set of tasks Jenkins performs (build, test, deploy)
- **Pipelines** – Define the entire CI/CD workflow as code using a Jenkinsfile
- **Plugins** – Extend Jenkins functionality (Git, Docker, Slack, AWS, etc.)
- **Nodes/Agents** – Machines that execute jobs. The master distributes workload to agents
- **Jenkinsfile** – A text file that defines the pipeline as code, stored in the project repository

## Basic Jenkinsfile Example

```
pipeline {
    agent any
    stages {
        stage('Checkout') { steps { git 'https://github.com/user/repo.git' } }
        stage('Build')    { steps { sh 'npm install' } }
        stage('Test')     { steps { sh 'npm test' }  }
        stage('Deploy')   { steps { sh 'npm run deploy' } }
    }
}
```

## Installation

Download from jenkins.io and run:
```
java -jar jenkins.war
```

Or install via Homebrew:
```
brew install jenkins-lts
brew services start jenkins-lts
```

Jenkins runs on `http://localhost:8080` by default.
