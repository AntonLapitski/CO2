<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Http\APIResponse;
use App\Core\Http\HttpRequest;

/**
 * Class HomeController
 * @package app\Controllers
 */
class HomeController extends Controller
{
    /**
     * Renders view
     * @param HttpResponse $response
     * @return void
     */
    public function index(HttpRequest $request, APIResponse $response)
    {
        $response->setBody($this->view('home/index'));
    }
}