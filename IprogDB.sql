--
-- File generated with SQLiteStudio v3.2.1 on Sa Jan 5 11:37:51 2019
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Personen
CREATE TABLE Personen (Name VARCHAR(35) PRIMARY KEY, position VARCHAR(35));

-- Table: Produkte
CREATE TABLE Produkte (Pname VARCHAR(35) PRIMARY KEY, Mbeitrag INT, d1 VARCHAR(35), d2 VARCHAR(35), d3 VARCHAR(35), d4 VARCHAR(35));

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
