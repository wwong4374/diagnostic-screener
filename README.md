# Diagnostic Screener

## Problem

Build a full stack web application that allows the user to fill out clinical assessments in the form of multiple choice questions. Each question is associated with a domain (depression, anxiety, etc.), has a title, has a unique ID, and can be answered with a value between 0 and 4, inclusive.

If the sum of a patient's answers for a given domain exceeds a certain threshold, we will assign them the corresponding Level 2 Assessment for that domain.

## Solution

## DB Setup

1. Install [PostgreSQL](https://www.postgresql.org/download/) and ensure `psql` is in your PATH.
2. In server/src/db, make a copy of `.env.example` and save the new file as `.env`. If needed, edit the values to match your local Postgres credentials
3. Make the DB setup script excecutable and then run it:

   ```sh
   cd server/src/db
   chmod +x reset_db.sh
   ./reset_db.sh
   ```

## Server Setup

## Web UI Setup
