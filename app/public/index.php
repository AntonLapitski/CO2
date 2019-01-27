<?php

use App\Core\Application;
use App\Core\Router;
use App\Core\Http\HttpRequest;

ini_set('display_errors', 1);
require_once __DIR__ . '/../init.php';

$router = new Router();
$router->addRoute("/", "HomeController@index");
$router->addRoute("/contact", "ContactController@index");
$router->addRoute("/auth", "AuthController@index");
$router->addRoute("/widget", "WidgetController@index");

$request = HttpRequest::generate();

$app = new Application($router);

$app->setRequest($request);
$app->run();