<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Http\APIResponse;
use App\Core\Http\HttpRequest;
use App\Models\Logs;
use App\Classes\Validators\Validator;

/**
 * Class WidgetController
 * @package app\Controllers
 */
class WidgetController extends Controller
{
    /**
     * @var
     */
    public $validator;

    /**
     * @var
     */
    public $logModel;

    /**
     * LogsController constructor.
     * @param Validator $validator
     * @param Logs $logModel
     */
    public function __construct(Validator $validator, Logs $logModel)
    {
        $this->validator = $validator;
        $this->logModel = $logModel;
    }

    /**
     * @param HttpRequest $request
     * @param APIResponse $response
     * @throws \Exception
     */
    public function index(HttpRequest $request, APIResponse $response)
    {
        $params = $request->getVariables();
        $response->addHeader("Content-Type", "application/json");

        if (isset($params["deviceId"])) {
            $deviceData = $this->logModel->get_last_device_logs($params["deviceId"]);
            $response->setSuccessBody($params["deviceId"], $deviceData);
        } else {
            $response->setErrorBody(["Field deviceId has not been given!"]);
        }
    }
}
