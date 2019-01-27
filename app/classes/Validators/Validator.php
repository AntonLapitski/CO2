<?php

namespace App\Classes\Validators;

use App\Core\Configurator;

/**
 * Class Validator
 * @package app\Classes
 */
class Validator implements ValidatorInterface
{
    /**
     * @param $validatedData
     * @param $rules
     * @return void
     */
    public function checkRules($validatedData, $rules)
    {
        foreach ($validatedData as $item => $content) {
            if (!array_key_exists($item, $rules)) {
                throw new \RuntimeException("There are no rules for the '{$item}'");
            }
        }
    }

    /**
     * @param $fields
     * @param $rules
     * @return bool
     */
    public function validate($fields, $rules)
    {
        $switcher = true;
        try {
            $this->checkRules($fields, $rules);
            foreach ($fields as $key => $content) {
                $rule = explode('|', $rules[$key]);
                foreach ($rule as $method) {
                    $funcResult = call_user_func_array([__CLASS__, $method], [$content]);
                    if ($funcResult === false) {
                        $switcher = false;
                    }
                }
            }

            return $switcher;
        } catch (\RuntimeException $exception) {
            echo $exception->getMessage();
        }
        $switcher = false;

        return $switcher;
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'deviceId' => 'required|validateType|checkPattern',
            'from' => 'required',
            'to' => 'required',
            'mode' => 'required|checkArray'
        ];
    }

    /**
     * @param $content
     * @return bool
     */
    public function required($content)
    {
        if (empty($content)) {
            return false;
        }

        return true;
    }

    /**
     * @param $content
     * @return bool
     */
    public function validateType($content)
    {
        if (gettype($content) != 'string') {
            return false;
        }

        return true;
    }

    /**
     * @param $content
     * @return bool
     */
    public function checkPattern($content)
    {
        $pattern = "/^(\w{8})-((\w{4}-){3})(\w{12})$/";
        $pregChecker = preg_match($pattern, $content);
        if ($pregChecker == 0) {
            return false;
        }

        return true;
    }

    /**
     * @param $content
     * @return bool
     */
    public function checkArray($content)
    {
        $config = Configurator::getConfig();
        if (!in_array($content, $config['modes'])) {
            return false;
        }

        return true;
    }
}
