-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema db_mike
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_mike
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_mike` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`dirs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`dirs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NOT NULL,
  `number` INT NOT NULL,
  `cp` INT NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `floor` INT NULL,
  `dpt` VARCHAR(45) NULL,
  `phone` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `lats_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `dirs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `dirs_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  INDEX `fk_users_dirs1_idx` (`dirs_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_dirs1`
    FOREIGN KEY (`dirs_id`)
    REFERENCES `mydb`.`dirs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_roles_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_roles_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order` (
  `id` INT NOT NULL,
  `order_number` INT NOT NULL,
  `total` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `users_id` INT NOT NULL,
  `users_dirs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `users_dirs_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `order_number_UNIQUE` (`order_number` ASC) VISIBLE,
  INDEX `fk_order_users1_idx` (`users_id` ASC, `users_dirs_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_users1`
    FOREIGN KEY (`users_id` , `users_dirs_id`)
    REFERENCES `mydb`.`users` (`id` , `dirs_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categories` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`size` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`products` (
  `id` INT NOT NULL,
  `prod_name` VARCHAR(45) NOT NULL,
  `desciption` VARCHAR(1) NOT NULL,
  `price` INT NOT NULL,
  `stock` INT NOT NULL,
  `categories_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `order_users_id` INT NOT NULL,
  `order_users_dirs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `categories_id`, `size_id`, `order_id`, `order_users_id`, `order_users_dirs_id`),
  UNIQUE INDEX `idproducts_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_products_categories1_idx` (`categories_id` ASC) VISIBLE,
  INDEX `fk_products_size1_idx` (`size_id` ASC) VISIBLE,
  INDEX `fk_products_order1_idx` (`order_id` ASC, `order_users_id` ASC, `order_users_dirs_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `mydb`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_size1`
    FOREIGN KEY (`size_id`)
    REFERENCES `mydb`.`size` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_order1`
    FOREIGN KEY (`order_id` , `order_users_id` , `order_users_dirs_id`)
    REFERENCES `mydb`.`order` (`id` , `users_id` , `users_dirs_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`brands` (
  `products_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`products_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_brands_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `mydb`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`images` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `products_id` INT NOT NULL,
  `products_categories_id` INT NOT NULL,
  `products_size_id` INT NOT NULL,
  `products_order_id` INT NOT NULL,
  `products_order_users_id` INT NOT NULL,
  `products_order_users_dirs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `products_id`, `products_categories_id`, `products_size_id`, `products_order_id`, `products_order_users_id`, `products_order_users_dirs_id`),
  INDEX `fk_images_products1_idx` (`products_id` ASC, `products_categories_id` ASC, `products_size_id` ASC, `products_order_id` ASC, `products_order_users_id` ASC, `products_order_users_dirs_id` ASC) VISIBLE,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_id` , `products_categories_id` , `products_size_id` , `products_order_id` , `products_order_users_id` , `products_order_users_dirs_id`)
    REFERENCES `mydb`.`products` (`id` , `categories_id` , `size_id` , `order_id` , `order_users_id` , `order_users_dirs_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`colors` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `products_id` INT NOT NULL,
  `products_categories_id` INT NOT NULL,
  `products_size_id` INT NOT NULL,
  `products_order_id` INT NOT NULL,
  `products_order_users_id` INT NOT NULL,
  `products_order_users_dirs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `products_id`, `products_categories_id`, `products_size_id`, `products_order_id`, `products_order_users_id`, `products_order_users_dirs_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_colors_products1_idx` (`products_id` ASC, `products_categories_id` ASC, `products_size_id` ASC, `products_order_id` ASC, `products_order_users_id` ASC, `products_order_users_dirs_id` ASC) VISIBLE,
  CONSTRAINT `fk_colors_products1`
    FOREIGN KEY (`products_id` , `products_categories_id` , `products_size_id` , `products_order_id` , `products_order_users_id` , `products_order_users_dirs_id`)
    REFERENCES `mydb`.`products` (`id` , `categories_id` , `size_id` , `order_id` , `order_users_id` , `order_users_dirs_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

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
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_mike`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`payments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
  `adress` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `cp` VARCHAR(255) NULL DEFAULT NULL,
  `state` VARCHAR(255) NULL DEFAULT NULL,
  `phone` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


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
  INDEX `paymentId` (`paymentId` ASC) VISIBLE,
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `statusId` (`statusId` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`paymentId`)
    REFERENCES `db_mike`.`payments` (`id`),
  CONSTRAINT `orders_ibfk_2`
    FOREIGN KEY (`userId`)
    REFERENCES `db_mike`.`users` (`id`),
  CONSTRAINT `orders_ibfk_3`
    FOREIGN KEY (`statusId`)
    REFERENCES `db_mike`.`statuses` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_mike`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`sequelizemeta` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_mike`.`shippings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_mike`.`shippings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `number` INT(11) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `state` VARCHAR(255) NULL DEFAULT NULL,
  `floor` INT(11) NULL DEFAULT NULL,
  `apartment` VARCHAR(255) NULL DEFAULT NULL,
  `cp` VARCHAR(255) NULL DEFAULT NULL,
  `phone_number` INT(11) NULL DEFAULT NULL,
  `price` INT(11) NULL DEFAULT NULL,
  `orderId` INT(11) NULL DEFAULT NULL,
  `orderPaymentId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `orderId` (`orderId` ASC) VISIBLE,
  INDEX `orderPaymentId` (`orderPaymentId` ASC) VISIBLE,
  CONSTRAINT `shippings_ibfk_1`
    FOREIGN KEY (`orderId`)
    REFERENCES `db_mike`.`orders` (`id`),
  CONSTRAINT `shippings_ibfk_2`
    FOREIGN KEY (`orderPaymentId`)
    REFERENCES `db_mike`.`orders` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
