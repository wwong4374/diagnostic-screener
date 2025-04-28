# Diagnostic Screener

## Problem

Build a full stack web application that allows the user to fill out clinical assessments in the form of multiple choice questions. Each question is associated with a domain (depression, anxiety, etc.), has a title, has a unique ID, and can be answered with a value between 0 and 4, inclusive.

If the sum of a patient's answers for a given domain exceeds a certain threshold, we will assign them the corresponding Level 2 Assessment for that domain.

## Solution

## Database Setup

Start by setting up the `screener` database. This contains one table, `questions`, which contains a list of questions that can be included in the screener, along with each question's domain.

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

    Homebrew

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

    Node.js

    ```sh
    brew install node
    ```

    yarn

    ```sh
    brew install yarn
    ```

2. Build and start the server

    ```sh
    yarn build
    yarn start
    ```

3. The server should now be running on port 3000 and the terminal should have printed: "Success! Server is running on port: 3000"

## Web UI Setup

1. This assumes Homebrew, Node.js, and yarn were already installed in step 1 of Server Setup above
2. Build and start the app

    ```sh
    yarn build
    yarn start
    ```

3. The app should now be running on port 5173 and the terminal should have printed: "VITE vX.X.X ready in XXX ms"
4. Open a web browser and go to: http://localhost:5173/ to use the app
