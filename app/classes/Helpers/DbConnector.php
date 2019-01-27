<?php

namespace App\Classes\Helpers;

use App\Core\Configurator;

/**
 * Class DbConnector
 * @package App\Classes\Helpers
 */
class DbConnector
{
    /**
     * @var null
     */
    private static $instance = null;
    /**
     * @var \PDO
     */
    private $connection;

    /**
     * DbConnector constructor.
     */
    private function __construct()
    {
        $config = Configurator::getDbConfig();
        $dsn    = "mysql:host=$config[host];port=$config[port];dbname=$config[dbname];charset=$config[charset]";
        $this->connection = new \PDO($dsn, $config['user'], $config['password'], $config['opt']);
    }

    /**
     * @return DbConnector|null
     */
    public static function getInstance()
    {
        if(!self::$instance)
        {
            self::$instance = new DbConnector();
        }

        return self::$instance;
    }

    /**
     * @return \PDO
     */
    public function getConnection()
    {
        return $this->connection;
    }
}