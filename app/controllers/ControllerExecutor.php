<?php

namespace App\Controllers;


use App\Core\Controller;

class ControllerExecutor
{
    /**
     * @var Controller
     */
    public $controller;
    public $method;

    public function __construct(Controller &$controllerObj, string $method)
    {
        $this->controller = $controllerObj;
        $this->method = $method;
    }
}