<?php

namespace App\Tests\unit\app\models;

use PHPUnit\Framework\TestCase;
use App\Models\Logs;

class LogsTest extends TestCase
{
    protected $logsModel;

    protected function setUp()
    {
        $this->logsModel = new Logs;
    }

    /**
     * @covers Logs::isValidApiDataLogs
     * @dataProvider providerValidApiData
     * @param $apiData
     */
    public function testLogsIsValidApiDataLogs($apiData){
        $this->assertTrue($this->logsModel->isValidApiDataLogs($apiData));
    }


    /**
     * @dataProvider providerInValidApiData
     * @param $apiData
     */
    public function testLogsIsInValidApiDataLogs($apiData){
        $this->assertFalse($this->logsModel->isValidApiDataLogs($apiData));
    }

    /**
     * @dataProvider providerInValidApiData
     * @param $apiData
     */
    public function testLogsProcessingApiDataWithIncorrectData($apiData){
        $expectedLogs = [];

        $actualLogs = $this->logsModel->processing_api_data($apiData);
        $this->assertEquals($expectedLogs, $actualLogs);
    }

    /**
     * @dataProvider providerValidApiDataWAndCorrectResult
     * @param $apiData
     * @param $expectedLogs
     */
    public function testLogsProcessingApiDataWithCorrectData($apiData, $expectedLogs){
        $actualLogs = $this->logsModel->processing_api_data($apiData);
        $this->assertEquals($expectedLogs, $actualLogs);
    }

    /**
     * @dataProvider providerIncorrectDeviceIdAndCorrectLogs
     * @param $deviceId
     * @param $expectedLogs
     */
    public function testGetLastDeviceLogsIncorrectDevice($deviceId, $expectedLogs){

        $actualLogs = $this->logsModel->get_last_device_logs($deviceId, $expectedLogs);
        $this->assertEquals($expectedLogs, $actualLogs);
    }

    /**
     * @dataProvider providerDeviceId
     * @param $deviceId
     */
    public function testGetLastDeviceLogsCorrectDevice($deviceId){

        $actualLogs = $this->logsModel->get_last_device_logs($deviceId);
        $this->assertIsArray($actualLogs);
        $this->assertArrayHasKey("temperature", $actualLogs);
        $this->assertArrayHasKey("axesX", $actualLogs["temperature"]);
        $this->assertArrayHasKey("axesY", $actualLogs["temperature"]);
        $this->assertArrayHasKey("humidity", $actualLogs);
        $this->assertArrayHasKey("axesX", $actualLogs["humidity"]);
        $this->assertArrayHasKey("axesY", $actualLogs["humidity"]);
        $this->assertArrayHasKey("cO2", $actualLogs);
        $this->assertArrayHasKey("axesX", $actualLogs["cO2"]);
        $this->assertArrayHasKey("axesY", $actualLogs["cO2"]);
        $this->assertIsArray($actualLogs["temperature"]["axesX"]);
        $this->assertIsArray($actualLogs["temperature"]["axesY"]);
        $this->assertIsArray($actualLogs["humidity"]["axesX"]);
        $this->assertIsArray($actualLogs["humidity"]["axesY"]);
        $this->assertIsArray($actualLogs["cO2"]["axesX"]);
        $this->assertIsArray($actualLogs["cO2"]["axesY"]);
    }

    public function providerValidApiData()
    {
        return [
            [ [] ],
            [
                [
                    [
                        "createdOn" => "2018-12-04T23:59:33.134Z",
                        "data" => [ "humidity" => 1,"temperature" => 1,"cO2" => 1]
                    ],
                    [
                        "createdOn" => "2018-12-04T23:59:32.134Z",
                        "data" => ["humidity" => 2,"temperature" => 2,"cO2" => 2]
                    ],
                    [
                        "createdOn" => "2018-12-04T23:59:31.134Z",
                        "data" => ["humidity" => 3,"temperature" => 3,"cO2" => 3]
                    ]
                ]
            ],
            [
                [
                    [
                        "createdOn" => "2018-12-04T23:59:33.134Z",
                        "data" => ["humidity" => 1,"temperature" => 1,"cO2" => 1]
                    ]
                ]
            ]
        ];
    }

    public function providerInValidApiData()
    {
        return [
            [
                [
                    ["data" => ["createdOn" => "12"]],
                    ["data" => ["humidity" => 2]],
                    ["data" => ["temperature" => 3]],
                    ["data" => ["cO2" => 3]],
                ]
            ],
            [
                [
                    [
                        "createdOn" => "12",
                        "data" => ["humidity" => 1,"temperature" => 1,"cO2" => 2]
                    ],
                    [
                        "createdOn" => "12",
                        "data" => ["humidity" => 2,"cO2" => 2]
                    ],
                    [
                        "createdOn" => "12",
                        "data" => ["humidity" => 3,"temperature" => 3,"cO2" => 3]
                    ]
                ]
            ],
            [
                [
                    [
                        "createdOn" => "2018-12-04T23:59:33.134Z",
                        "data" => ["humidity" => 1,"temperature" => 1,"cO2" => 2]
                    ],
                    [
                        "data" => ["createdOn" => "12", "humidity" => 2,"temperature" => 2,"cO2" => 2]
                    ],
                    [
                        "createdOn" => "12",
                        "data" => ["humidity" => 3,"temperature" => 3,"cO2" => 3]
                    ]
                ]
            ],
            [
                [
                    ["data" => ["createdOn"]],
                    ["data" => []]
                ]
            ],
            [
                [
                    ["data"]
                ]
            ]
        ];
    }

    public function providerValidApiDataWAndCorrectResult(){
        return [
            [
                [
                    [
                        "createdOn" => "2018-12-04T23:59:33.134Z",
                        "data" => ["humidity" => 3,"temperature" => 3,"cO2" => 3]
                    ],
                    [
                        "createdOn" => "2018-12-04T23:59:32.134Z",
                        "data" => ["humidity" => 2,"temperature" => 2,"cO2" => 2]
                    ],
                    [
                        "createdOn" => "2018-12-04T23:59:31.134Z",
                        "data" => ["humidity" => 1,"temperature" => 1,"cO2" => 1]
                    ]
                ],
                [
                    "humidity" => [
                        "axesY" => [1,2,3],
                        "axesX" => ["2018-12-04T23:59:31.134Z","2018-12-04T23:59:32.134Z","2018-12-04T23:59:33.134Z"]
                    ],
                    "temperature" => [
                        "axesY" => [1,2,3],
                        "axesX" => ["2018-12-04T23:59:31.134Z","2018-12-04T23:59:32.134Z","2018-12-04T23:59:33.134Z"]
                    ],
                    "cO2" => [
                        "axesY" => [1,2,3],
                        "axesX" => ["2018-12-04T23:59:31.134Z","2018-12-04T23:59:32.134Z","2018-12-04T23:59:33.134Z"]
                    ],
                ]
            ]
        ];
    }

    public function providerIncorrectDeviceIdAndCorrectLogs(){
        return [
            [
                "deviceId",
                []
            ],
            [
                "!testDeviceId12325523f32f2",
                []
            ],
            [
                "1098765242526271828191927181927!testDeviceId12325523f32f2",
                []
            ],
        ];
    }

    public function providerDeviceId(){
        return [
            [
                "fa238a69-03ab-40d1-a51c-eb384844d243"
            ],
        ];
    }

}