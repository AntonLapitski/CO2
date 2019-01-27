<?php

require __DIR__ . '/../../vendor/autoload.php';

use App\Classes\Helpers\DbConnector;

$instance = DbConnector::getInstance();
$connect = $instance->getConnection();

foreach (glob(__DIR__. "/*.sql") as $filename) {
    $query = file_get_contents($filename);
    $connect->query($query);
}
