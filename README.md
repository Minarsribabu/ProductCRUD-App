📦 Product Management – Full Stack Dockerized Application
📌 Project Overview
This project is a full-stack Product Management application built using:
1-Frontend: React (Vite)
2-Backend: Spring Boot (REST API)
3-Database: MySQL
4-Containerization: Docker & Docker Compose
The entire application (Frontend + Backend + Database) runs using a single command: docker-compose up --build

Work Flow/Architecture
Browser
   ↓
React Frontend (nginx container)
   ↓
Spring Boot Backend (Docker container)
   ↓
MySQL Database (Docker container + volume)

->The frontend communicates with the backend via REST APIs.
-> The backend connects to MySQL.
-> MySQL data is persisted using Docker volumes.
-> Docker Compose orchestrates all services.

🐳 Docker Setup
1-Multi-Stage Dockerfile (Frontend)
>The frontend uses a multi-stage Docker build:
-Stage 1 – Build React app using Node
-Stage 2 – Serve static files using Nginx
>This reduces the final image size and improves performance.

2-Backend Dockerfile
>The backend container:
-Uses Eclipse Temurin JDK
-Copies the built .jar file
>Runs the application with Docker profile enabled

3-Docker Compose Services
>The docker-compose.yml file defines:
-frontend
-backend
-mysql
-persistent volume for MySQL
>All services run together using a single command.

🚀 How to Run the Application
-> Prerequisites
- Docker installed
- Docker Compose installed

Steps:
1- Clone the Repo
2- Build and run containers:
  -> docker-compose up --build
3- docker-compose up --build:
  - Frontend : http://localhost:3000
  - backend : http://localhost:8080/backend/Products

Database Configuration
- MySQL runs inside Docker.
  > Port: 3307 (mapped to 3306 inside container)
  > Database Name: test
  > Data persists using Docker volume.
