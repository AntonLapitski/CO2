<?php

namespace App\Core;

/**
 * Class Controller
 * @package app\Core
 */
class Controller
{
    /**
     * @param $view
     * @return mixed
     */
    protected function view($view)
    {
        return require __DIR__ . '/../views/' . $view . '.php';
    }
}
