<?php

namespace App\Core\Http;

/**
 * Class Response
 * @package app\Classes\Helpers
 */
class APIResponse extends HttpResponse
{
    /**
     * @var array
     */
    private $response = [
        "device" => [
            "deviceId" => "",
            "deviceData" => [],
        ],
        "errors" => [],
    ];

    /**
     * Set success response.
     *
     * @param string $deviceId
     * @param array $deviceData
     */
    public function setSuccessBody(string $deviceId, array $deviceData = []): void
    {
        $this->response["device"]["deviceId"] = $deviceId;
        $this->response["device"]["deviceData"] = $deviceData;

        parent::setBody(json_encode($this->response));
    }

    /**
     * Set error response.
     *
     * @param array $errors
     */
    public function setErrorBody(array $errors = ["Internal Server Error!"]): void
    {
        $this->response["errors"] = $errors;

        parent::setBody(json_encode($this->response));
    }
}
