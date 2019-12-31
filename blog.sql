CREATE DATABASE `blog`;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`firstName` VARCHAR(50) NOT NULL,
	`lastName` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`gender` VARCHAR(10) NOT NULL,
	`bio` VARCHAR(255) NOT NULL,
	`age` INT NOT NULL,
	`createdAt` TIMESTAMP NOT NULL,
	`updatedAt` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `posts` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL ,
	`description` VARCHAR(1000) NOT NULL,
	`author` VARCHAR(50) NOT NULL,
	`likes` INT NULL DEFAULT '0',
	`imageUrl` VARCHAR(100) NULL ,
	`createdAt` TIMESTAMP NOT NULL,
	`updatedAt` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
);


CREATE TABLE `comments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`postId` INT NOT NULL,
	`commentBy` VARCHAR(50) NOT NULL,
	`comment` VARCHAR(255) NOT NULL,
	`createdAt` TIMESTAMP NOT NULL,
	`updatedAt` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
);