CREATE DATABASE news

CREATE TABLE `news`.`user` 
( 
    `id` INT NOT NULL AUTO_INCREMENT,  
    `name` VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
    `email` VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
    `password` VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
    `pre_top` INT NOT NULL DEFAULT '0',  
    `pre_shehui` INT NOT NULL DEFAULT '0',  
    `pre_guonei` INT NOT NULL DEFAULT '0',  
    `pre_guoji` INT NOT NULL DEFAULT '0',  
    `pre_yule` INT NOT NULL DEFAULT '0',  
    `pre_tiyu` INT NOT NULL DEFAULT '0',  
    `pre_junshi` INT NOT NULL DEFAULT '0',  
    `pre_keji` INT NOT NULL DEFAULT '0',  
    `pre_caijing` INT NOT NULL DEFAULT '0',  
    `pre_shishang` INT NOT NULL DEFAULT '0',  
    `visit_top` INT NOT NULL DEFAULT '0',  
    `visit_shehui` INT NOT NULL DEFAULT '0',  
    `visit_guonei` INT NOT NULL DEFAULT '0',  
    `visit_guoji` INT NOT NULL DEFAULT '0',  
    `visit_yule` INT NOT NULL DEFAULT '0',  
    `visit_tiyu` INT NOT NULL DEFAULT '0',  
    `visit_junshi` INT NOT NULL DEFAULT '0',  
    `visit_keji` INT NOT NULL DEFAULT '0',  
    `visit_caijing` INT NOT NULL DEFAULT '0',  
    `visit_shishang` INT NOT NULL DEFAULT '0', 
    PRIMARY KEY  (`id`)
) ENGINE = InnoDB;

CREATE TABLE `news`.`news` 
( 
    `id` INT NOT NULL AUTO_INCREMENT,  
    `title` VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
    `time` VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
    `author` VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,    
    `url` VARCHAR(1000)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,    
    `image` VARCHAR(1000)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,    
    `type` VARCHAR(10)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
    `click_count` INT NOT NULL DEFAULT '0',  
    PRIMARY KEY  (`id`)
) ENGINE = InnoDB;
