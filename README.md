# Diagnostic Screener

## Problem

Build a full stack web application that allows the user to fill out clinical assessments in the form of multiple choice questions. Each question is associated with a domain (depression, anxiety, etc.), has a title, has a unique ID, and can be answered with a value between 0 and 4, inclusive.

If the sum of a patient's answers for a given domain exceeds a certain threshold, we will assign them the corresponding Level 2 Assessment for that domain.

## Solution

Built a full stack web application that fulfills the requirements - since this app will be used by people seeking mental health support, a soothing light blue theme was chosen to put the user at ease.

The languages, frameworks, and libraries that comprise the app are listed below, along with the rationale for choosing each technology. To run the app locally, complete the Database, Server, and Frontend Setup sections below.

**Database (DB):** PostgreSQL

Created a PostgreSQL database to persist the mappings between question ID and domain.

PostgreSQL was chosen because:

1. It is a relational DBMS. There is a many-to-one relationship between questions and domains, making PostgreSQL an appropriate choice for modeling this data.
2. It supports user defined enums, which I used to enumerate the allowed values for each question's domain.
3. It is reliable and stable. It is well documented and widely used, resulting in strong community support for troubleshooting and debugging.
4. It is scalable - we can easily more tables and columns as our application evolves.

**Backend Server:** TypeScript, Node, Express, Knex

There are two endpoints in the backend server:

1. GET /screener returns the screener that the patient is asked to complete.
2. POST /assessment accepts the patient's answers to the initial screener questions. It scores these answers and returns the Level 2 Assessment(s) that should be assigned.

TypeScript was chosen to provide static type safety, readability, and maintainability. Node is fast and widely used for building APIs. Express is simple, supports API routing, and supports middleware for authentication, logging, and error handling, which we might add in the future. Knex removes the need for raw SQL, reducing the risk of SQL injection. Knex improves readability and maintainability by abstracting raw SQL into TypeScript code.

**Frontend:** TypeScript, React, Material UI (MUI), Vite

**Web UI:**

TypeScript was chosen for the same reasons as in the backend server. React is responsive, enables quick development, provides state management, and is widely used. Material UI provides pre-built React components for a modern, polished UI and faster development. Vite is quick to build and reload upon code updates.

TypeScript is used on both the frontend and backend to remove context switching between different languages. This allows for a faster and more enjoyable developer experience.

## Deliverables

Link to to the hosted application (if there is one): N/A, application is not hosted.

Instructions for running the code locally (if not hosted): See the Database Setup, Server Setup, and Web UI Setup sections below.

Description of the problem and solution: See Problem and Solution sections above.

Reasoning behind your technical choices: See Solution section above.

Describe how you would deploy this as a true production app on the platform of your choice:

1. Deploy the frontend as a static website on AWS S3. Use a Content Delivery Network (CDN) like AWS CloudFront to cache the website and distribute across geographies for faster loading.
2. For the backend, first containerize with Docker so the app runs the same on any machine. Then, deploy the Docker image using AWS EC2, which allows for autoscaling as traffic grows.
3. Host the database on AWS Relational Database Service (RDS), which provides automated backups and replication across geographies.

How would ensure the application is highly available and performs well?

1. For the frontend, AWS S3 already provides high availability, so I would deploy the website to AWS S3. The CDN would provide further availability by serving cached content from locations closest to users.
2. For the backend, deploy to to multiple EC2 instances to provide redundancy if one server goes down. Enable auto-scaling to automatically start more instances when traffic grows. Also, implement a load balancer to balance traffic between servers.
3. For the database, deploy to AWS RDS across multiple avability zones for redundancy. Enable read replicas to support high volumes of read requests.

How would you secure it?

1. First, require login on the UI. Assuming we have patient information, require that patients provide their email/phone number, last name, date of birth, and two factor authentication code to log in. This ensures that only the patient or guardian can open the screener. Upon login, server issues a JWT (JSON Web Token) token, which frontend will later use to make HTTP requests. 
2. Next, secure the API endpoints. Implement a CORS (Cross-Origin Resource Sharing) restriction in the server to only allow HTTP requests that come from the web UI. Also, require that each request includes a valid JWT token in the headers. This ensures that only authenticated users can hit our API endpoints.
3. Finally, secure the database. Knex is already implemented on the server to prevent developers from writing raw SQL, helping to prevent SQL injection attacks. Credentials are saved in environment variables and not hardcoded in code. For further security, I would add a database password and only accept connections that come from the backend server. Lastly, create a "patient" level role that only allows reading and upserting data and rejects any schema alertions or drop commands.

What would you add to make it easier to troubleshoot problems while it is running live?

The main addition I would make is logging throughout the frontend and backend to document what is happening in the app. These logs could be surfaced and persisted to a cloud provider like GCP or AWS for debugging purposes. I would add trace IDs to allow for tracing a request from frontend to backend to DB.

I would also implement Sentry to track errors and performance on the frontend and send automated alerts if a serious issue occurs. Similarly, I would implement Prometheus metrics on the backend.

Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project:

Given the time constraint, I made technical choices in pursuit of faster development and focused on delivering the project requirements. Therefore, I chose to use TypeScript in both the frontend and backend code to avoid context switching between different languages. I also chose widely adopted frameworks and languages that are simple and enable quick development. For example, MUI's pre-built React components remove the need for custom CSS.

If given additional time, I would:

1. Update the GET /screener endpoint so the screener lives in and is fetched from the DB, rather than being hardcoded.
2. Extend the data model. For example, I envision separate entities for users, questions, answers, and screeners.
3. Implement authentication and authorization throughout the app. Require user login on the frontend, add authentication middleware in the API endpoints, and create different user types, like admin and patient, that have different permission levels.
4. Add tests to both frontend and backend. Start with unit tests around the functions and endpoints. Also add end-to-end tests that confirm the app works as expected when given certain user inputs.
5. Actually host the app.
6. Add more error handling through the app.

Link to other code you're particularly proud of: All of the code that I'm most proud of is in private repositories, but I enjoyed creating this app to track the rewards points in a shopping app: <https://github.com/wwong4374/rewards-points>

Link to your resume or public profile: <https://www.linkedin.com/in/wilson-ka-wong/>

## Database Setup

Start by setting up the screener database. This contains one table, questions, which contains a list of questions that can be included in the screener, along with each question's domain.

1. Install [PostgreSQL](https://www.postgresql.org/download/) and ensure `psql` is in your PATH.
2. In server/src/db, make a copy of `.env.example` and save the new file as `.env`. If needed, edit the values to match your local Postgres credentials
3. Make the DB setup script excecutable and then run it. This will reset and seed the DB:

    ```sh
    cd server/src/db
    chmod +x reset_db.sh
    ./reset_db.sh
    ```

4. The output should indicate that a new screener DB with one type, one table, and 4 rows was created:

    ```sql
    DROP DATABASE
    CREATE DATABASE
    You are now connected to database "screener" as user ....
    CREATE TYPE
    CREATE TABLE
    INSERT 0 4
    ```

## Server Setup

1. Install Homebrew, Node.js, and yarn if needed:

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install node
    brew install yarn
    ```

2. Build and start the server:

    ```sh
    cd server
    yarn build
    yarn start
    ```

3. The server should now be running on port 3000 and the terminal should have printed: "Success! Server is running on port: 3000"

## Web UI Setup

1. This assumes Homebrew, Node.js, and yarn were already installed in step 1 of Server Setup above
2. Build and start the web app:

    ```sh
    cd web
    yarn build
    yarn start
    ```

3. The app should now be running on port 5173 and the terminal should have printed: "VITE vX.X.X ready in XXX ms"
4. Open a web browser and go to: <http://localhost:5173/> to use the app
