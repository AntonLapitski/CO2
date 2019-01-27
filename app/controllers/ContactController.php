<?php

namespace App\Controllers;

use App\Classes\Validators\RequestValidator;
use App\Core\Http\APIResponse;
use App\Core\Http\HttpRequest;
use App\Models\Device;
use App\Core\Controller;

/**
 * Class ContactController
 * @package app\Controllers
 */
class ContactController extends Controller
{
    /**
     * @var RequestValidator
     */
    public $requestValidator;

    /**
     * @var Device
     */
    public $device;

    /**
     * ContactController constructor.
     *
     * @param RequestValidator $requestValidator
     * @param Device           $device
     */
    public function __construct(RequestValidator $requestValidator, Device $device)
    {
        $this->requestValidator = $requestValidator;
        $this->device = $device;
    }

    /**
     * Get co2 data.
     *
     * @param HttpRequest $request
     * @param APIResponse $response
     * @return void
     * @throws \Exception
     */
    public function index(HttpRequest $request, APIResponse $response)
    {
        $params = $request->getVariables();
        $validRequest = $this->requestValidator->validateContact($params);
        $response->addHeader("Content-Type", "application/json");

        if ($validRequest) {
            $from = new \DateTime($params['from'], new \DateTimeZone('UTC'));
            $to = new \DateTime($params['to'], new \DateTimeZone('UTC'));

            $deviceData = $this->device->getData($params['deviceId'], $from->format('Y-m-d'), $to->format('Y-m-d'));

            $response->setSuccessBody($params['deviceId'], json_decode($deviceData, true));
        } else {
            $response->setErrorBody(['Bad Request!'], $params['deviceId']);
        }
    }
}
