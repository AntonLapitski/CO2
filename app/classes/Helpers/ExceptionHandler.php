<?php

namespace App\Classes\Helpers;

use App\Core\Http\APIResponse;
use \Exception;

/**
 * Class ExceptionHandler
 * @package App\Classes\Helpers
 */
class ExceptionHandler
{
    /**
     * @var APIResponse
     */
    protected $response;

    /**
     * ExceptionHandler constructor
     * @param APIResponse $response
     */
    public  function  __construct(APIResponse $response)
    {
        $this->response = $response;
    }

    /**
     * Switch type of exception.
     *
     * @param Exception $exception
     *  return void
     */
    public function handleException(Exception $exception)
    {
        $this->response->addHeader("Content-Type", "application/json");

        switch (get_class($exception)) {
            case "InvalidArgumentException":
                $this->response->setStatusCode($exception->getCode());
                $this->response->setErrorBody([$exception->getMessage()]);
                echo $this->response->getBody();
                break;
            default:
                $this->response->setErrorBody([$exception->getMessage()]);
                echo $this->response->getBody();
                break;
        }
    }
}