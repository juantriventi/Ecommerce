-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_mike
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_mike
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_mike` DEFAULT CHARACTER SET utf8mb4 ;
USE `db_mike` ;

-- -----------------------------------------------------
-- Table `db_mike`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`brands` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`colors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`sizes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `stock` INT(11) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NULL DEFAULT NULL,
  `brandId` INT(11) NULL DEFAULT NULL,
  `categoryId` INT(11) NULL DEFAULT NULL,
  `sizeId` INT(11) NULL DEFAULT NULL,
  `colorId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `brandId` (`brandId` ASC) VISIBLE,
  INDEX `categoryId` (`categoryId` ASC) VISIBLE,
  INDEX `sizeId` (`sizeId` ASC) VISIBLE,
  INDEX `colorId` (`colorId` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`brandId`)
    REFERENCES `db_mike`.`brands` (`id`),
  CONSTRAINT `products_ibfk_2`
    FOREIGN KEY (`categoryId`)
    REFERENCES `db_mike`.`categories` (`id`),
  CONSTRAINT `products_ibfk_3`
    FOREIGN KEY (`sizeId`)
    REFERENCES `db_mike`.`sizes` (`id`),
  CONSTRAINT `products_ibfk_4`
    FOREIGN KEY (`colorId`)
    REFERENCES `db_mike`.`colors` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `productId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productId` (`productId` ASC) VISIBLE,
  CONSTRAINT `images_ibfk_1`
    FOREIGN KEY (`productId`)
    REFERENCES `db_mike`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`migrations` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_mike`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NULL DEFAULT NULL,
  `lastName` VARCHAR(255) NULL DEFAULT NULL,
  `userName` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `number` INT(11) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `state` VARCHAR(255) NULL DEFAULT NULL,
  `floor` INT(11) NULL DEFAULT NULL,
  `apartment` VARCHAR(255) NULL DEFAULT NULL,
  `cp` VARCHAR(255) NULL DEFAULT NULL,
  `phone_number` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`statuses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `number` INT(11) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `total` DECIMAL(10,0) NULL DEFAULT NULL,
  `paymentId` INT(11) NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  `statusId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `statusId` (`statusId` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `db_mike`.`users` (`id`),
  CONSTRAINT `orders_ibfk_2`
    FOREIGN KEY (`statusId`)
    REFERENCES `db_mike`.`statuses` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_mike`.`orderdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`orderdetails` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity` DECIMAL(10,0) NULL DEFAULT NULL,
  `subtotal` DECIMAL(10,0) NULL DEFAULT NULL,
  `productId` INT(11) NULL DEFAULT NULL,
  `orderId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productId` (`productId` ASC) VISIBLE,
  INDEX `orderId` (`orderId` ASC) VISIBLE,
  CONSTRAINT `orderdetails_ibfk_1`
    FOREIGN KEY (`productId`)
    REFERENCES `db_mike`.`products` (`id`),
  CONSTRAINT `orderdetails_ibfk_2`
    FOREIGN KEY (`orderId`)
    REFERENCES `db_mike`.`orders` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
