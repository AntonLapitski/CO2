<?php

namespace App\Core;

use App\Controllers\ControllerExecutor;
use App\Core\Http\HttpRequest;

/**
 * Class Router
 * @package app\Core
 */
class Router
{
    /**
     * @var array
     */
    public $routes = [];

    /**
     * @var string
     */
    public $controller = 'HomeController';

    /**
     * @var string
     */
    public $method = 'index';

    /**
     * @param $route
     * @param $controller
     */
    public function addRoute($route, $controller)
    {
        $this->routes[$route] = $controller;
    }

    /**
     * @param HttpRequest $request
     * @return ControllerExecutor
     * @throws \Exception
     */
    public function getExecutor(HttpRequest $request): ControllerExecutor
    {
        $route = $this->findRoute($request->getUrl());

        if (!is_bool($route)) {
            $controller = strtok($route, '@');
            $method = substr($route, strpos($route, '@') + 1);
            $this->controller = $controller;
            $this->method = $method;
        } else {
            throw new \Exception('Invalid route', 404);
        }

        $controllerObj = ControllerFactory::getController($this->controller);
        return new ControllerExecutor($controllerObj, $this->method);
    }

    /**
     * @param string $url
     * @return bool|string false if something wrong
     */
    private function findRoute(string $url)
    {
        /**
         * @TODO does not work if there is no default url
        */
       /* try {
            $resultRoute = $this->routes[$url];
            if (isset($resultRoute)) {
                return $resultRoute;
            }
        } catch (\Exception $e) {
            //return false;
            return $this->routes["/"];
        }

        return false;*/
       if(isset($this->routes[$url])){
           return $this->routes[$url];
       }else{
           return $this->routes["/"];
       }
    }
}

