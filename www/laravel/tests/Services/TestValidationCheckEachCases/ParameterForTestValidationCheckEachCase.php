<?php
namespace Tests\Services\TestValidationCheckEachCases;

class ParameterForTestValidationCheckEachCase
{
    // TODO: phpを8.1にしたらreadOnlyにする
    public array $requestDataEachTestCase;
    public array $requestDataWithAvailableValue;

    public function __construct(array $requestDataEachTestCase, array $requestDataWithAvailableValue)
    {
        $this->requestDataEachTestCase = $requestDataEachTestCase;
        $this->requestDataWithAvailableValue = $requestDataWithAvailableValue;
    }
}
