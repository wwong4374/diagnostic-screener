# Diagnostic Screener

## Problem

Build a full stack web application that allows the user to fill out clinical assessments in the form of multiple choice questions. Each question is associated with a domain (depression, anxiety, etc.), has a title, has a unique ID, and can be answered with a value between 0 and 4, inclusive.

If the sum of a patient's answers for a given domain exceeds a certain threshold, we will assign them the corresponding Level 2 Assessment for that domain.

## Solution

Frameworks/Libraries Used:

Database: PostgreSQL

Backend: Node.js, Express, TypeScript, Knex

Frontend: React, TypeScript, Vite, Material UI

**Database:**

Question-to-domain mappings are persisted in a PostgreSQL database. The schema is defined in SQL and seeded via a script for easy local setup.

PostgreSQL was chosen for its reliability, stability, and strong community support due to widespread adoption. Each question is associated with a domain, meaning the data is relational, making the relational PostgreSQL DBMS an appropriate choice. It also supports user-defined enum data types, which was used to enumerate the list of allowed domains. Finally, PostgreSQL is scalable because we can easily add more tables and columns as our application evolves.

**Server:**

The backend is built with Node.js, Express, TypeScript, and Knex.js. There are two endpoints:

1. GET /screener returns the screener that the patient is asked to complete. The screener questions are currently hardcoded.
2. POST /assessment accepts an array of the patient's answers to the screener questions. It scores these answers and returns a list of the Level 2 Assessments that should then be assigned to the patient.

Node.js is fast and allows access to a large package ecosystem via npm, ensuring that the code is extensible in the future if authentication or testing needs to be added. Express is a simple and extensible framework that allows developers to define middleware for authentication, logging, and error handling, which also ensures maintainable and extensible code. Finally, Knex.js removes the need for raw SQL and therefore helps prevent SQL injection attacks. It also abstracts raw SQL into TypeScript/JavaScript, providing readability and maintainability.

**Web UI:**

The frontend is built with React and TypeScript, using Vite for fast development and Material UI (MUI) for consistent, modern components. Data fetching is managed with React Query.

TypeScript is used on both the frontend and backend to prevent context switching between different languages. This allows for faster and more enjoyable developer experience.

## Deliverables

Link to to the hosted application (if there is one): N/A, application is not hosted

Instructions for running the code locally (if not hosted): See the database, server, and web UI setup sections below

Description of the problem and solution: See Problem and Solution sections above

Reasoning behind your technical choices: See Solution section

Describe how you would deploy this as a true production app on the platform of your choice:

How would ensure the application is highly available and performs well?

How would you secure it?

What would you add to make it easier to troubleshoot problems while it is running live?

Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project:

Link to other code you're particularly proud of:

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

4. The output should indicate that the existing screener DB, if any, was dropped. It should also state that a new screener DB with one type, one table, and 4 rows was created:

    ```sql
    DROP DATABASE
    CREATE DATABASE
    You are now connected to database "screener" as user ....
    CREATE TYPE
    CREATE TABLE
    INSERT 0 4
    ```

## Server Setup

1. First, install Homebrew, Node.js, and yarn if needed:

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install node
    brew install yarn
    ```

2. Build and start the server:

    ```sh
    yarn build
    yarn start
    ```

3. The server should now be running on port 3000 and the terminal should have printed: "Success! Server is running on port: 3000"

## Web UI Setup

1. This assumes Homebrew, Node.js, and yarn were already installed in step 1 of Server Setup above
2. Build and start the web app:

    ```sh
    yarn build
    yarn start
    ```

3. The app should now be running on port 5173 and the terminal should have printed: "VITE vX.X.X ready in XXX ms"
4. Open a web browser and go to: <http://localhost:5173/> to use the app
