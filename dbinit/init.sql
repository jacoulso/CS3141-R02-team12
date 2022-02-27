-- All code to create/propgate tables should be called within here

CREATE DATABASE IF NOT EXISTS smartcal_mysqldb;

USE smartcal_mysqldb;

-- TODO : Replace with a functional login schema, this is for rapid-prototyping purposes
DROP TABLE IF EXISTS login;
CREATE TABLE login (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);
