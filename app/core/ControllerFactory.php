<?php

namespace App\Core;

use App\Classes\Helpers\ExceptionHandler;
use App\Classes\Validators\RequestValidator;
use App\Classes\Validators\Validator;
use App\Controllers\AuthController;
use App\Controllers\ContactController;
use App\Controllers\HomeController;
use App\Controllers\WidgetController;
use App\Core\Http\APIResponse;
use App\Models\Device;
use App\Models\Logs;

/**
 * Class ControllerFactory
 * @package app\Core
 */
class ControllerFactory
{
    /**
     * @param $controllerName
     * @return AuthController|ContactController|HomeController|WidgetController
     * @throws \Exception
     */
    public static function getController($controllerName): Controller
    {
        switch ($controllerName) {
            case 'HomeController':
                return new HomeController();
                break;
            case 'AuthController':
                return new AuthController(new Validator());
                break;
            case 'ContactController':
                return new ContactController(new RequestValidator(), new Device());
                break;
            case 'WidgetController':
                return new WidgetController(new Validator(), new Logs());
                break;
            default:
                throw new \Exception('Invalid controller');
        }
    }
}