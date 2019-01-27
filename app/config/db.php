<?php

return [
    "host"      => "mysql",
    "port"      => "3306",
    "dbname"    => "mastery-db",
    "user"      => "mastery-user",
    "password"  => "3e75bb819c57cfb9b13ecc3b3c79c851",
    "charset"   => "utf8",
    "opt"       => [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false
    ]
];