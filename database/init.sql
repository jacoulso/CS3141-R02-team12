-- All code to create/propgate tables should be called within here

CREATE DATABASE IF NOT EXISTS smartcal_mysqldb;

USE smartcal_mysqldb;

-- TODO : Replace with a functional login schema, this is for rapid-prototyping purposes
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username varchar(100) UNIQUE, 
    password varchar(256),
    email varchar(MAX) UNIQUE
);
