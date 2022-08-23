DROP DATABASE IF EXISTS schoolInternal;
CREATE DATABASE schoolInternal;
USE schoolInternal;

CREATE TABLE certificate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    student BOOL NOT NULL DEFAULT TRUE
);

CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) DEFAULT "",
    num CHAR(4) UNIQUE NOT NULL,
    cert_id INT,
    FOREIGN KEY(cert_id) REFERENCES certificate(id) ON DELETE CASCADE
);

CREATE TABLE relation (
    person_id INT,
    course_id INT,
    course_clear BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY(person_id) REFERENCES person(id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE CASCADE,
    PRIMARY KEY(person_id, course_id)
);