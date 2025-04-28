DROP DATABASE IF EXISTS screener;
CREATE DATABASE screener;

\c screener

CREATE TYPE domain AS ENUM ('DEPRESSION', 'MANIA', 'ANXIETY', 'SUBSTANCE_USE');

CREATE TABLE questions (
    "questionId" TEXT PRIMARY KEY,
    domain domain NOT NULL
);

INSERT INTO questions ("questionId", domain) VALUES
    ('question_1', 'DEPRESSION'),
    ('question_2', 'MANIA'),
    ('question_3', 'ANXIETY'),
    ('question_4', 'SUBSTANCE_USE');
