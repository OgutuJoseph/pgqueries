CREATE DATABASE pgqueries;

CREATE TABLE tbl_students(
_id serial PRIMARY KEY,
full_name VARCHAR NOT NULL,
teacher_id INT,
department_id VARCHAR NOT NULL
);

CREATE TABLE tbl_teachers(
_id serial PRIMARY KEY,
full_name VARCHAR NOT NULL,
department_id VARCHAR NOT NULL
);

CREATE TABLE tbl_departments(
_id serial PRIMARY KEY,
teacher_id VARCHAR NOT NULL,
department_name VARCHAR NOT NULL
);

CREATE TABLE tbl_scores(
_id serial PRIMARY KEY,
student_id VARCHAR NOT NULL,
teacher_id VARCHAR NOT NULL,
department_id VARCHAR NOT NULL,
Score VARCHAR NOT NULL
);