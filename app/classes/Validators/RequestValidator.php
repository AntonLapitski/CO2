<?php

namespace App\Classes\Validators;

/**
 * Class RequestValidator
 * @package app\Classes
 */
class RequestValidator
{
    /**
     * @param $postDate
     * @return false|string
     */
    public function validateContact($postData)
    {

        if (isset($postData['from']) && isset($postData['to']) &&
            $postData['from'] != '' && $postData['to'] != '') {
            $from = trim(htmlspecialchars($postData['from']));
            $to = trim(htmlspecialchars($postData['to']));


            if ($from < $to) {
                $validator = new Validator;
                $fields = ['from' => $from, 'to' => $to];

                $rules = $validator->rules();
                $dateValidateResult = $validator->validate($fields, $rules);

                return $dateValidateResult;
            } else {
                return false;
            }
        } elseif (isset($postData['mode']) && $postData['mode'] != '') {
            $validator = new Validator;
            $fields = $postData['mode'];

            $rules = $validator->rules();
            $modeValidateResult = $validator->validate($fields, $rules);

            return $modeValidateResult;
        } else {
            return true;
        }
    }
}
