<?php

namespace App\Models;

use App\Core\Configurator;
use App\Core\Model;
use DateTime;
use RuntimeException;

/**
 * Class Logs
 * @package app\Models
 */
class Logs extends Model
{
    /**
     * @var string
     */
    private $apiUrl = "";
    /**
     * @var string
     */
    private $updateInterval = "";

    /**
     * Logs constructor.
     */
    function __construct()
    {
        $config = Configurator::getConfig();

        if (isset($config["url"]) && isset($config["latestUpdateInterval"])) {
            $this->apiUrl = $config["url"];
            $this->updateInterval = $config["latestUpdateInterval"];
        } else {
            throw new RuntimeException("Config loading exception!");
        }
    }


    /**
     * @param $apiData
     * @return bool
     */
    public function isValidApiDataLogs(array $apiData){
        if(empty($apiData))
        {
            return true;
        }

        for ($i = 0; $i < count($apiData); $i++) {
            if (!array_key_exists("data", $apiData[$i])) {
                return false;
            }
            if (!array_key_exists('createdOn', $apiData[$i])) {
                return false;
            }
            if (!array_key_exists('humidity', $apiData[$i]["data"])) {
                return false;
            }
            if (!array_key_exists('temperature', $apiData[$i]["data"])) {
                return false;
            }
            if (!array_key_exists('cO2', $apiData[$i]["data"])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @param $deviceId
     * @return array
     * @throws \Exception
     */
    public function get_last_device_logs($deviceId)
    {
        $fromDate = new DateTime("-$this->updateInterval seconds");
        $currentDate = new DateTime();

        $currentTime = date_format($currentDate, 'H:i:s');
        $fromTime = date_format($fromDate, 'H:i:s');

        $currentDate = date_format($currentDate, 'Y-m-d') . "T$currentTime";
        $fromDate = date_format($fromDate, 'Y-m-d') . "T$fromTime";

        $requestUrl = "$this->apiUrl?deviceId=" . trim($deviceId) . "&from=$fromDate&to=$currentDate";

        $data = @file_get_contents($requestUrl);

        if ($data === false) {
            return [];
        } else {
            $apiData = json_decode($data, true);
            return $this->processing_api_data($apiData);
        }
    }

    /**
     * @param $timeData
     * @return array
     */
    public function processing_api_data(array $timeData)
    {
        if(!$this->isValidApiDataLogs($timeData) || empty($timeData)){
            return [];
        }

        $timeData = array_reverse($timeData);

        $processedData = [
            "temperature" => ["axesY" => [], "axesX" => []],
            "humidity" => ["axesY" => [], "axesX" => []],
            "cO2" => ["axesY" => [], "axesX" => []],
        ];

        for ($i = 0; $i < count($timeData); $i++) {
            $time = $timeData[$i]["createdOn"];

            $processedData["temperature"]["axesX"][] = $time;
            $processedData["humidity"]["axesX"][] = $time;
            $processedData["cO2"]["axesX"][] = $time;

            $processedData["humidity"]["axesY"][] = $timeData[$i]["data"]["humidity"];
            $processedData["temperature"]["axesY"][] = $timeData[$i]["data"]["temperature"];
            $processedData["cO2"]["axesY"][] = $timeData[$i]["data"]["cO2"];
        }

        return $processedData;
    }
}