-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_line_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `quantity` INTEGER NULL,
    `unit_price_amount` DECIMAL(10, 0) NULL,
    `total_line_amount` DECIMAL(10, 0) NULL,
    `order_id` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `order_id_idx`(`order_id`),
    INDEX `product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `status` VARCHAR(45) NULL,
    `order_date` DATE NULL,
    `price_amount` DECIMAL(10, 0) NULL,
    `price_currency` VARCHAR(5) NULL,
    `shipping_street` VARCHAR(45) NULL,
    `shipping_city` VARCHAR(45) NULL,
    `shipping_postal_code` VARCHAR(45) NULL,
    `shipping_country` VARCHAR(45) NULL,
    `special_instructions` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `price` DECIMAL(10, 0) NULL,
    `description` VARCHAR(255) NULL,
    `ingredients` VARCHAR(255) NULL,
    `picture_link` VARCHAR(255) NULL,
    `category_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pizza_id` INTEGER NULL,
    `rating` DOUBLE NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `pizza_id_idx`(`pizza_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `username` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `password` VARCHAR(90) NULL,
    `is_admin` TINYINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_line_item` ADD CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_line_item` ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pizza` ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
