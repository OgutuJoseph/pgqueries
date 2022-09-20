CREATE DATABASE pgqueries;

CREATE TABLE tbl_students(
student_id serial PRIMARY KEY,
full_name VARCHAR NOT NULL,
teacher_id INT
department VARCHAR NOT NULL,
);

CREATE TABLE tbl_teachers(
teacher_id serial PRIMARY KEY,
full_name VARCHAR NOT NULL,
department_id VARCHAR NOT NULL,
);

CREATE TABLE tbl_departments(
department_id VARCHAR NOT NULL,
teacher_id serial PRIMARY KEY,
department_name VARCHAR NOT NULL,
);

CREATE TABLE tbl_scores(
student_id VARCHAR NOT NULL,
teacher_id serial PRIMARY KEY,
department_id VARCHAR NOT NULL,
Score VARCHAR NOT NULL,
);