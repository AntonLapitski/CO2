CREATE TABLE IF NOT EXISTS co2_data (
    `id` INT(11) AUTO_INCREMENT,
    `device_id` VARCHAR(36),
    `from` DATE,
    `to` DATE,
    `data` TEXT,
    PRIMARY KEY(`id`),
    FOREIGN KEY fk_device_co2_data(`device_id`)
    REFERENCES devices(`device_id`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
)  ENGINE=INNODB;

