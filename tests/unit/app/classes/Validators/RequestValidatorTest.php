<?php

namespace App\Tests;

use App\Classes\Validators\RequestValidator;
use PHPUnit\Framework\TestCase;

/**
 * Class RequestValidatorTest
 * @package App\Tests
 */
class RequestValidatorTest extends TestCase
{
    public $fixture;

    protected function setUp()
    {
        $this->fixture = new RequestValidator();
    }

    protected function tearDown()
    {
        $this->fixture = null;
    }

    /**
     * @param $postData
     * @dataProvider provider
     */
    public function testValidateContact($postData)
    {
        $this->assertTrue($this->fixture->validateContact($postData["testForTrue"]));
        $this->assertFalse($this->fixture->validateContact($postData["testForFalse"]));
        $this->assertTrue($this->fixture->validateContact($postData["testEmptyArray"]));
        $this->assertTrue($this->fixture->validateContact($postData["testModeWeek"]["mode"]));
        $this->assertTrue($this->fixture->validateContact($postData["testModeDay"]["mode"]));
        $this->assertTrue($this->fixture->validateContact($postData["testModeHour"]["mode"]));
    }

    /**
     * @return array
     */
    public function provider(): array
    {
        return [
            [
                [
                    "testForTrue" => [
                        "from" => "2018-12-12",
                        "to" => "2018-12-13"
                    ],
                    "testForFalse" => [
                        "from" => "2018-12-13",
                        "to" => "2018-12-12"
                    ],
                    "testEmptyArray" => [
                        "from" => "",
                        "to" => ""
                    ],
                    "testModeWeek" => [
                        "mode" => "week"
                    ],
                    "testModeDay" => [
                        "mode" => "day"
                    ],
                    "testModeHour" => [
                        "mode" => "hour"
                    ]
                ]
            ]
        ];
    }
}