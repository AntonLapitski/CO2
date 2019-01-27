<?php

namespace App\Classes\Validators;

/**
 * Interface ValidatorInterface
 * @package app\Classes
 */
interface ValidatorInterface
{
    /**
     * @param $fields
     * @param $rules
     */
    public function validate($fields, $rules);

    /**
     * @return array
     */
    public function rules(): array;
}
