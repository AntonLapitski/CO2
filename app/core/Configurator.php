<?php

namespace App\Core;

/**
 * Class Configurator
 * @package app\Core
 */
class Configurator
{
    /**
     * @return array
     */
    public static function getConfig()
    {
        return require __DIR__ . "/../config/app.php";
    }

    /**
     * @return array
     */
    public static function getDbConfig()
    {
        return require __DIR__ . "/../config/db.php";
    }
}
