<?php

namespace App\Tests;

use App\Classes\Validators\Validator;
use http\Exception\RuntimeException;
use mysql_xdevapi\Exception;
use PHPUnit\Framework\TestCase;

class ValidatorTest extends TestCase
{
    /**
     * @param $validatedKeyRules
     * @return array
     */
    public function validatedKeyRulesProvider()
    {
        return [
            [
                [
                    'incorrectKeyRules' => [
                        'deviceId' => '',
                        'from' => '',
                        'to' => '',
                        'mode' => '',
                        'abc' => ''
                    ],
                    'expectedKeyRules' => [
                        'deviceId' => '',
                        'from' => '',
                        'to' => '',
                        'mode' => ''
                    ],
                    'incorrectMethods' => [
                        'deviceId' => 'required1|validateType1|checkPattern1',
                        'from' => 'required1',
                        'to' => 'required1',
                        'mode' => 'required1|checkArray1'
                    ],
                    'correctRules' => [
                        'deviceId' => 'required|validateType|checkPattern',
                        'from' => 'required',
                        'to' => 'required',
                        'mode' => 'required|checkArray'
                    ],
                    'correctMethods' => [
                        'deviceId' => 'required',
                        'from' => 'required',
                        'to' => 'required',
                        'mode' => 'checkArray'
                    ]
                ]
            ]
        ];
    }

    /**
     * @dataProvider validatedKeyRulesProvider
     */
    public function testCheckRules($validatedKeyRules)
    {
        $validator = new Validator;
        $this->expectException('RuntimeException');
        $validatedDataTest = $validatedKeyRules['incorrectKeyRules'];
        $rulesTest = $validatedKeyRules['expectedKeyRules'];
        $validator->checkRules($validatedDataTest, $rulesTest);
    }

    /**
     * @dataProvider validatedKeyRulesProvider
     */
    public function testValidateNegative($validatedKeyRules)
    {
        $validator = new Validator;
        $fields = $validatedKeyRules['incorrectMethods'];
        $rules = $validatedKeyRules['correctRules'];
        $this->assertFalse($validator->validate($fields, $rules));
    }

    /**
     * @dataProvider validatedKeyRulesProvider
     */
    public function testValidatePositive($validatedKeyRules)
    {
        $validator = new Validator;
        $fields = $validatedKeyRules['correctMethods'];
        $rules = $validatedKeyRules['correctRules'];
        $this->assertFalse($validator->validate($fields, $rules));
    }

    public function testRules()
    {
        $validator = new Validator;
        $this->assertInternalType('array', $validator->rules());
    }

    public function testRequiredPositive()
    {
        $validator = new Validator;
        $testContent = 'there is smth';
        $this->assertTrue($validator->required($testContent));
    }

    public function testRequiredNegative()
    {
        $validator = new Validator;
        $testContent = '';
        $this->assertFalse($validator->required($testContent));
    }

    public function testValidateTypePositive()
    {
        $validator = new Validator;
        $testContent = '';
        $this->assertTrue($validator->validateType($testContent));
    }

    public function testValidateTypeNegative()
    {
        $validator = new Validator;
        $testContent = [];
        $this->assertFalse($validator->validateType($testContent));
    }

    /**
     * @param $content
     * @return array
     */
    public function contentProvider()
    {
        return [
            [
                [
                    'incorrectContent' => 'smth',
                    'existContent' => 'fa238a69-03ab-40d1-a51c-eb384844d243',
                    'possibleContent' => 'qwertyui-1234-QWER-1234-123456789012',
                ]
            ]
        ];
    }

    /**
     * @dataProvider contentProvider
     */
    public function testCheckPatternNegative($content)
    {
        $validator = new Validator;
        $testContent = $content['incorrectContent'];
        $this->assertFalse($validator->checkPattern($testContent));
    }

    /**
     * @dataProvider contentProvider
     */
    public function testCheckPatternPositive($content)
    {
        $validator = new Validator;
        $testContent = $content['existContent'];
        $this->assertTrue($validator->checkPattern($testContent));
    }

    /**
     * @dataProvider contentProvider
     */
    public function testCheckPatternPositivePossible($content)
    {
        $validator = new Validator;
        $testContent = $content['possibleContent'];
        $this->assertTrue($validator->checkPattern($testContent));
    }

    /**
     * @param $modes
     * @return array
     */
    public function validatedModesPositiveProvider()
    {
        return [
            [
                [
                    'hour',
                    'day',
                    'week'
                ]
            ]
        ];
    }

    /**
     * @dataProvider validatedModesPositiveProvider
     */
    public function testCheckArrayPositive($modes)
    {
        $validator = new Validator;
        $validatedKeyRules = $modes[0];
        $this->assertTrue($validator->checkArray($validatedKeyRules));
    }

    public function testCheckArrayNegative()
    {
        $validator = new Validator;
        $validatedKeyRules = 'smth';
        $this->assertFalse($validator->checkArray($validatedKeyRules));
    }
}