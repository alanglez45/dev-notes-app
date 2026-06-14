# Docker

Think of Docker as a suitcase. Just as a suitcase allows you to pack your clothes and essentials for any journey, Docker lets you package your application and all its dependencies for easy transportation. This 'suitcase' ensures your application works seamlessly, no matter where it is deployed - your computer, a colleague's machine, or a server in the cloud.

Docker enables developers to package an application with all its dependencies into a standardized unit called a Docker container. This container ensures the application behaves the same way, irrespective of where it's deployed, thereby resolving environment inconsistencies.

A Docker Image is the skeleton of this container. It's a lightweight, standalone, executable package containing everything needed to run an application - the code, runtime, libraries, and environment variables. Docker creates these images using a Dockerfile, a file containing all the commands to assemble the Docker Image. Essentially, a Dockerfile serves as a set of instructions for Docker to build an image.

## Docker Compose

As your application becomes more complex with multiple components that need to interact, managing these becomes more challenging. That's where Docker Compose comes in, acting like an organizer. It lets you outline the interactions of each component of your application and handle them all together in a simpler, more coordinated way.

Together, Docker and Docker Compose make managing and deploying complex applications easier, smoother and more reliable.

## Docker licensing model

Docker has several key components that allow it to build, transport, and manage containers efficiently. Here are the fundamental parts:
- Docker Engine: The heart of Docker, it's a lightweight runtime and tooling that builds and manages containers.
- Docker CLI (Command Line Interface): A tool that allows users to interact with Docker directly using commands. This is where user inputs commands to interact with the Docker daemon.
- Docker Desktop (UI): An application that is designed to facilitate the developer's workflow by providing an intuitive user interface to interact with Docker.

## Podman & Podman Compose

It is an open-source, free to use tool that is designed to be a drop-in replacement for Docker. Podman supports Dockerfile syntax, can pull and run Docker images. Podman can be used instead of Docker without having to modify existing Dockerfiles or images.

podman-compose is a command-line tool for defining and running multi-container Docker applications with Podman. It is similar to Docker Compose, but instead of requiring Docker, it uses Podman container engine to build and run the containers.
