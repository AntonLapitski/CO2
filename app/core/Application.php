<?php

namespace App\Core;


use App\Classes\Helpers\ExceptionHandler;
use App\Core\Http\APIResponse;
use App\Core\Http\HttpRequest;

class Application
{
    /**
     * @var HttpRequest
     */
    private $request;
    private $response = null;
    private $router;

    public function __construct(Router $router)
    {
        $this->router = $router;
    }

    public function setRequest(HttpRequest $request)
    {
        $this->request = $request;
    }

    /**
     * @throws \Exception
     */
    public function run()
    {
        /**
         * @TODO make something with ExceptionHandler
         */
        /*$exceptionHandler = new ExceptionHandler($this->getResponse());
        set_exception_handler([$exceptionHandler, 'handleException']);*/

        $controllerExecutor = $this->router->getExecutor($this->request);
        $controller = $controllerExecutor->controller;
        $method = $controllerExecutor->method;
        $controller->$method($this->getRequest(), $this->getResponse());

        $this->getResponse()->render();
    }

    /**
     * @return HttpRequest
     */
    public function getRequest(): HttpRequest
    {
        return $this->request;
    }

    private function getResponse()
    {
        if (is_null($this->response)) {
            $this->response = new APIResponse();
        }

        return $this->response;
    }
}