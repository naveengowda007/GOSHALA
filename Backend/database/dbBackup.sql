DROP DATABSE IF EXISTS GOSHALA;
CREATE DATABSE GOSHALA;

USE GOSHALA;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR (50),
	email VARCHAR(50),
	password VARCHAR(100),
	user_mobile NUMERIC(10),
	user_profile VARCHAR(255),
	PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS admins;
CRATE TABLE admins (
	admin_id INT NOT NULL AUTO_INCREMENT,
	admin_name VARCHAR (50),
	admin_mobile NUMERIC(10),
	email VARCHAR(50),
	password VARCHAR(100),
	PRIMARY KEY (admin_id)
);

DROP TABLE IF EXISTS trip_types
CREATE TABLE trip_types (
	trip_type_id INT NOT NULL AUTO_INCREMENT,
	trip_type_name VARCHAR(100),
	PRIMARY KEY (trip_type_id)
);

DROP TABLE IF EXISTS members_list;
CREATE TABLE members_list(
	member_id INT NOT NULL AUTO_INCREMENT,
	member_name VARCHAR(50),
	memeber_gender VARCHAR(10),
	member_age NUMERIC(5),
	member_contact_number NUMERIC(10),
	associated_user_id INT,
	PRIMARY KEY (member_id),
	FOREIGN KEY (associated_user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS trips;
CREATE TABLE trips(
	trip_id INT NOT NULL AUTO_INCREMENT,
	trip_from VARCHAR (100),
	trip_to VARCHAR (100),
	intermideate_stops VARCHAR(255),
	trip_descriptions VARCHAR(255),
	start_date TIMESTAMP,
	end_date TIMESTAMP,
	price NUMERIC(10),
	trip_status VARCHAR(50),
	days_count NUMERIC(5),
	trip_type VARCHAR(100),
	PRIMARY KEY (trip_id)
);

DROP TABLE IF EXISTS user_travel_bookings;
CREATE TABLE user_travel_bookings(
	booking_id INT NOT NULL AUTO_INCREMENT,
	trip_id INT,
	user_id INT,
	member_id INT,
	paid_amount NUMERIC (10),
	PRIMARY KEY (booking_id),
	FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (member_id) REFERENCES members_list (member_id)
);

DROP TABLE IF EXISTS announcements;
CREATE TABLE announcements (
	announcement_id INT NOT NULL AUTO_INCREMENT,
	announcement_type VARCHAR (20),
	announcement_description VARCHAR (255),
	PRIMARY KEY (announcement_id)
);

DROP TABLE IF EXISTS payments;
CREATE TABLE payments (
	payment_id VARCHAR (255),
	payment_amount NUMERIC(10),
	payment_date TIMESTAMP,
	booking_id INT,
	PRIMARY KEY (payment_id),
	FOREIGN KEY (booking_id) REFERENCES user_travel_bookings (booking_id)
);


