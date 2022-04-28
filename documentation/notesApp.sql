CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE users(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,    
	created_at TIMESTAMP NOT NULL
);

CREATE TABLE notes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    image_url VARCHAR(250),
    visibility VARCHAR(10),
	FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE categories(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED,
	name VARCHAR(20),
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id)
);

ALTER TABLE notes ADD (id_category INT UNSIGNED,
    FOREIGN KEY (id_category) REFERENCES categories (id)
);