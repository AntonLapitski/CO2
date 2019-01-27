<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Classes\Validators\Validator;
use App\Classes\Helpers\Response;
use App\Core\Http\APIResponse;
use App\Core\Http\HttpRequest;

/**
 * Class AuthController
 * @package app\Controllers
 */
class AuthController extends Controller
{
    /**
     * @var Validator
     */
    public $validator;

    /**
     * AuthController constructor.
     * @param Validator $validator
     */
    public function __construct(Validator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * Echoes authentication info
     * @param APIResponse $response
     * @return void
     */
    public function index(HttpRequest $request, APIResponse $response)
    {
        $postData = $_POST;
        $rules = $this->validator->rules();
        $authValidateResult = $this->validator->validate($postData, $rules);

        $response->addHeader("Content-Type", "application/json");

        if ($authValidateResult) {
            $response->setSuccessBody($postData['deviceId']);
        } else {
            $response->setErrorBody(['Invalid device ID']);
        }
    }
}
