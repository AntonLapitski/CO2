CREATE TABLE IF NOT EXISTS devices (
    `device_id` VARCHAR(36),
    `title` VARCHAR(255),
    `created_at` DATE,
    `updated_at` DATE,
    PRIMARY KEY (`device_id`)
)  ENGINE=INNODB;