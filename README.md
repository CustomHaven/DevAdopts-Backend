# DevAdopt Backend Server Application

## Introduction
This repository contains the backend server application for DevAdopt, a company dedicated to the care and adoption of shelter dogs. The backend is deployed in the AWS cloud and is responsible for managing user interactions, dog data, adoption processes, chatbot integration, and geolocation services.

## Technologies Used
- [**Node.js (Express)**](#nodejs-and-express)
- [**JWT (JSON Web Tokens)**](#nodejs-and-express)
- [**PostgreSQL**](#postgresql)
- [**Swagger**](#swagger-documentation)
- [**Deployment**](#deployment)
- [**Jenkins**](#jenkins)
- [**Docker**](#docker)
- [**Terraform**](#terraform)
- [**Ansible**](#ansible)

## Node.js and Express

The server is built using **Node.js** and **Express**, a lightweight framework that simplifies the development of robust and scalable APIs. Express manages all the HTTP requests and responses within the application. Here’s how each of the following key technologies integrates with Express:

- **Express**: The core framework used to handle routing, middleware, and HTTP methods. It is responsible for defining the RESTful API endpoints, managing requests, and sending back appropriate responses.
- **JWT**: JSON Web Tokens are used to secure the application by handling authentication and authorisation for different users. When users log in, they receive a token, which is required for accessing secure routes.
- **PostgreSQL**: The PostgreSQL database is accessed through SQL queries from the Express server to manage persistent data such as user accounts, dog details, and adoption records.

In summary, the Express server powers the core functionality of the application, handling everything from routing and middleware to database management and security through JWT tokens.

## PostgreSQL

**PostgreSQL** is the primary database used in the backend to manage and store all persistent data. It is a powerful, open-source relational database management system known for its reliability and robustness. PostgreSQL handles data related to:

- **Users Table**: Stores user profiles, authentication details, and role management (standard users or admin).
- **Dogs Table**: Contains information about each dog in the shelter, including breed, age, health status, and adoption history.
- **Adoptions Table**: Records adoption events and stores adoption-related metadata such as costs.
- **User Preferences Table**: Stores user preferences for interactions with the chatbot.
- **Blacklisted Tokens Table**: Stores JWT tokens that have been blacklisted after logout to prevent unauthorised access.

**Adoption Costs Tables**

The adoption costs for each dog are stored with the following cost breakdown:

- **Initial Adoption Cost**: A one-time cost required for adopting the dog.
- **Monthly Adoption Cost**: The recurring monthly cost to cover the dog’s upkeep and care.
- **Long Term or Lifetime Adoption Cost**: A cost for long-term or lifetime plans to adopt a dog, providing a more comprehensive adoption option for those who wish to commit to the dog.

The **Node.js** server interacts with PostgreSQL through SQL queries to fetch, update, and manage data in real-time, ensuring that the application is responsive and data integrity is maintained across all transactions.

## Swagger Documentation

**Swagger** is used to document the API endpoints of this application, providing a user-friendly interface for understanding and testing the available routes.

### Dogs
- **GET /dogs** - Fetch all available dogs.
- **POST /dogs** - Add a new dog to the shelter.
- **GET /dogs/:id** - Get a specific dog by its ID.
- **PATCH /dogs/:id** - Update details of a specific dog.
- **DELETE /dogs/:id** - Remove a dog from the system.

### Users
- **GET /users/logout** - Log out a user.
- **POST /users/register** - Register a new user.
- **POST /users/login** - Log in a user.
- **POST /users/create-admin** - Create a new admin user.
- **GET /users/:id** - Get a specific user by their ID.
- **DELETE /users/:id** - Remove a user from the system.

### Adoptions
- **GET /adoptioncosts/:dogId** - Retrieve the adoption costs for a specific dog.

### Chatbot
- **POST /bot/preferences** - Initiate the chatbot by assigning it to a user.
- **GET /bot/preferences/interact-with-bot/:preference_id** - Interact with the chatbot based on the user's preferences.
- **PATCH /bot/preferences/:preference_id** - Update the preferences of the interacting user.
- **DELETE /bot/preferences/:preference_id** - Remove the user's preferences and end the chatbot engagement.

### Maps
- **GET /maps/geocode/zip?postcode** - Retrieve geolocation data based on a postcode.

## Deployment
The backend application is fully deployed in the **Amazon AWS** cloud. The deployment leverages a range of AWS services for scaling, load balancing, and managing the infrastructure.

## Jenkins
**Jenkins** was used to orchestrate the Continuous Integration/Continuous Deployment (CI/CD) pipeline. It automates the process of building, testing, and deploying the server application. Jenkins ensures that every change to the codebase is automatically tested and deployed, minimising downtime and improving development efficiency.

## Docker
**Docker** is used to containerise the application. The server follows a microservices architecture, with two distinct containers:
- **MVC Microservice**: Handles all server-side logic for the backend, including routing and database interactions.
- **PostgreSQL Database Microservice**: A separate container dedicated to the PostgreSQL database to ensure proper decoupling of services and easy scalability.

## Terraform
**Terraform** was employed for Infrastructure as Code (IaC), automating the creation of AWS resources. Terraform provisions the following:
- **EC2 Instances**: The server runs on multiple EC2 instances for scalability and redundancy.
- **Elastic Load Balancer (ELB)**: Distributes incoming HTTP requests evenly across the EC2 instances, ensuring efficient load management and high availability.

## Ansible
**Ansible** was used for configuration management and deployment automation. It installs Docker and runs `docker-compose up` on each EC2 instance, ensuring that the application containers are up and running with minimal manual intervention.

---

By using these technologies, DevAdopt's backend infrastructure is highly scalable, secure, and easily manageable, ensuring the best care for shelter dogs and a seamless experience for users.