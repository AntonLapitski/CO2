<?php

namespace App\Classes\Helpers;

use App\Core\Configurator;
use DateTime;
use DateTimeZone;

/**
 * Class ApiHelper
 * @package app\Classes
 */
class ApiHelper
{
    /**
     * @var
     */
    public $config;

    /**
     * ApiHelper constructor.
     */
    public function __construct()
    {
        $this->config = Configurator::getConfig();
    }

    /**
     * Generate api url.
     *
     * @param $deviceId
     * @param $from
     * @param $to
     * @return string
     */
    public function createApiUrl($deviceId, $from, $to)
    {
        $url = $this->config["url"];

        $url = $url .
            "?deviceId=" . $deviceId .
            "&from=" . rawurlencode($from) .
            "&to=" . rawurlencode($to);

        return $url;
    }


    /**
     * Generate microclimate data.
     *
     * @param $apiUrl
     * @return string
     * @throws \Exception
     */
    public function getMicroclimateData($apiUrl)
    {
        $timezone = $this->config["timezone"];
        $step = $this->config["step"];

        if (!$microclimateData = @file_get_contents($apiUrl)) {
            return false;
        }

        if (!$microclimateData = json_decode($microclimateData, true)) {
            return false;
        }

        $microclimateApiData = [];
        $microclimateData = array_reverse($microclimateData);

        foreach ($microclimateData as $index => $data) {
            if ($index % $step == 0) {
                $createdAt = new DateTime($data['createdOn'], new DateTimeZone($timezone));
                $createdAt = $createdAt->format('H:i');
                $microclimateApiData['CO2']['axesX'][] = $createdAt;
                $microclimateApiData['CO2']['axesY'][] = $data['data']['cO2'];
                $microclimateApiData['temperature']['axesX'][] = $createdAt;
                $microclimateApiData['temperature']['axesY'][] = $data['data']['temperature'];
                $microclimateApiData['humidity']['axesX'][] = $createdAt;
                $microclimateApiData['humidity']['axesY'][] = $data['data']['humidity'];
            }
        }

        return json_encode($microclimateApiData);
    }
}