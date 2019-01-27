<?php

namespace App\Models;

use App\Classes\Helpers\ApiHelper;
use App\Core\Model;
use DateTime;
use App\Classes\Helpers\DbConnector;
use http\Exception\RuntimeException;

/**
 * Class Device
 * @package app\Models
 */
class Device extends Model
{
    /**
     * @var \PDO
     */
    protected $connection;

    /**
     * @var ApiHelper
     */
    protected $helper;

    /**
     * Device constructor.
     */
    public function __construct()
    {
        $instance = DbConnector::getInstance();
        $this->connection = $instance->getConnection();
        $this->helper = new ApiHelper();
    }

    /**
     * Return co2_data.
     *
     * @param string $deviceId
     * @param $from
     * @param $to
     * @return false|string
     * @throws \Exception
     */
    public function getData(string $deviceId, $from, $to)
    {
        //cache device
        if (!$this->isExists($deviceId)) {
            $this->setDevice($deviceId);
        }

        $selectQuery = "SELECT * FROM co2_data WHERE `from` = '$from' AND `to` = '$to'";
        $result = $this->connection->query($selectQuery)->fetch();
        if (!$result) {

            $dataFromApi = $this->helper->getMicroclimateData($this->helper->createApiUrl($deviceId, $from, $to));
            $insertQuery = "INSERT INTO co2_data (device_id, `from`, `to`, `data`) VALUES
                ('$deviceId', '$from', '$to', '$dataFromApi')";
            $this->connection->query($insertQuery);

            return $dataFromApi;
        }

        return $result['data'];

    }

    /**
     * Insert device.
     *
     * @param string $deviceId
     * @throws \Exception
     */
    private function setDevice(string $deviceId)
    {
        $now = new DateTime('now', new \DateTimeZone('UTC'));

        $queryInsertDevice = "INSERT INTO `devices` (device_id, title, created_at, updated_at) VALUES
                ('$deviceId', 'Somewhere in Silver Tower', '" . $now->format('Y-m-d') . "', '" . $now->format('Y-m-d') . "')";

        $statement = $this->connection->query($queryInsertDevice);
        if (!$statement) {
            throw new RuntimeException("Device $deviceId hasn't been created!");
        }
    }

    /**
     * Check device existing.
     *
     * @param string $deviceId
     * @return bool
     */
    public function isExists(string $deviceId): bool
    {
        $query = "SELECT `device_id` FROM devices WHERE `device_id` = '$deviceId'";
        $result = $this->connection->query($query)->fetch();

        if($result){
            return true;
        }

        return false;
    }
}
