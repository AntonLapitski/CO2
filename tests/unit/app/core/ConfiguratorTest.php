<?php

namespace App\Tests;

use App\Core\Configurator;
use PHPUnit\Framework\TestCase;

/**
 * Class ConfiguratorTest
 * @package App\Tests
 */
class ConfiguratorTest extends TestCase
{
    public $appConfig;

    public $dbConfig;

    protected function setUp()
    {
        $this->appConfig = Configurator::getConfig();
        $this->dbConfig = Configurator::getDbConfig();
    }

    protected function tearDown()
    {
        $this->appConfig = null;
        $this->dbConfig = null;
    }

    /**
     * @return void
     */
    public function testGetConfig()
    {
        $appConfig = $this->appConfig;
        $this->assertIsArray($appConfig);
        $this->assertArrayHasKey('devices', $appConfig);
        $this->assertArrayHasKey('url', $appConfig);
        $this->assertArrayHasKey('latestUpdateInterval', $appConfig);
        $this->assertArrayHasKey('modes', $appConfig);
        $this->assertArrayHasKey('latestLogsUrl', $appConfig);
        $this->assertArrayHasKey('timezone', $appConfig);
        $this->assertArrayHasKey('step', $appConfig);
        $this->assertTrue(!empty($appConfig));
    }

    /**
     * @return void
     */
    public function testGetDbConfig()
    {
        $dbConfig = $this->dbConfig;
        $this->assertIsArray($dbConfig);
        $this->assertArrayHasKey('host', $dbConfig);
        $this->assertArrayHasKey('port', $dbConfig);
        $this->assertArrayHasKey('dbname', $dbConfig);
        $this->assertArrayHasKey('user', $dbConfig);
        $this->assertArrayHasKey('password', $dbConfig);
        $this->assertArrayHasKey('charset', $dbConfig);
        $this->assertArrayHasKey('opt', $dbConfig);
        $this->assertTrue(!empty($dbConfig));
    }
}