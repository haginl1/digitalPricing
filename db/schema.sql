### Schema

CREATE DATABASE digital_price_db;
USE digital_price_db;

CREATE TABLE HD_1080
(
	id int NOT NULL AUTO_INCREMENT,
	streams INT(11) unsigned CHECK(streams > 0),
	discount decimal (5,4) NOT NULL,
    year_1 decimal (13,2) NOT NULL,
    year_2 decimal (13,2) NOT NULL,
    year_3 decimal (13,2) NOT NULL,
	date TIMESTAMP not null default CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);