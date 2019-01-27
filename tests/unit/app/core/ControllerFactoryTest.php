<?php

namespace App\Tests;

use App\Core\ControllerFactory;
use PHPUnit\Framework\TestCase;

/**
 * Class ControllerFactoryTest
 * @package App\Tests
 */
class ControllerFactoryTest extends TestCase
{

    /**
     * @param $controller
     * @dataProvider provider
     * @throws \Exception
     */
    public function testGetController($controller): void
    {
        $controllerWithPath = "App\\Controllers\\" . $controller;
        $this->assertInstanceOf($controllerWithPath, ControllerFactory::getController($controller));
    }

    /**
     * @return array
     */
    public function provider(): array
    {
        return [
            ["HomeController"],
            ["AuthController"],
            ["WidgetController"]
        ];
    }
}