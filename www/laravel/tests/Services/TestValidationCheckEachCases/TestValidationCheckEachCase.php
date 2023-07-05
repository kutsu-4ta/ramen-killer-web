<?php
namespace Tests\Services\TestValidationCheckEachCases;

use Tests\Services\RedirectAtDocumentRoot;
use Tests\TestCase;

class TestValidationCheckEachCase implements TestValidationCheckEachCaseInterface
{
    use RedirectAtDocumentRoot;
    private TestCase $testCase;
    private array $requestDataWithAvailableValue=[];
    private array $requestDataEachTestCase=[];

    // TODO: phpを8.1にしたらreadOnlyにする
    public bool $isWorkedValidationCheck=false;
    public string $assertionMessage='';
    public array $validationErrors=[];

    /**
     * @param TestCase                             $testCase                                PHPUnitのテストクラス
     * @param ParameterForTestValidationCheckEachCase $ValidationCheckForEachTestCaseParams    テストケース毎の入力値
     */
    public function __construct(TestCase $testCase, ParameterForTestValidationCheckEachCase $ValidationCheckForEachTestCaseParams)
    {
        $this->testCase = $testCase;
        $this->requestDataWithAvailableValue = $ValidationCheckForEachTestCaseParams->requestDataWithAvailableValue;
        $this->requestDataEachTestCase = $ValidationCheckForEachTestCaseParams->requestDataEachTestCase;
    }

    /**
     * バリデーションチェックのテストを行う
     * @return void
     */
    public function doTestValidateCheck(): void
    {
        $assertionFailMessageList      = [];
        $assertionSuccessMessageList   = [];
        foreach ($this->requestDataEachTestCase as $testCaseLabel => $requestDataWithNotAvailableValue) {
            foreach ($requestDataWithNotAvailableValue as $key => $value) {
                $requestData = $this->requestDataWithAvailableValue;
                $requestData[$key] = $value;

                $requestUrl = $this->redirectAtDocumentRoot($this->testCase->endPoint);
                $response = $this->testCase->post($requestUrl, $requestData);
                $this->validationErrors[$testCaseLabel][] = $response->json('validation_errors');

                // 期待しない動作
                if (!$response->json('validation_errors')) {
                    $value = $value ? $value : 'null';
                    $failMessage = "【 $testCaseLabel 】" . "$key=>$value" . '： 追加されました。';
                    $assertionFailMessageList[] = $failMessage;
                    continue;
                }

                $validationErrorMessageOfKey = $response->json('validation_errors')[$key];
                if (count($validationErrorMessageOfKey)) {
                    // アサーションの結果にバリデーションメッセージを表示
                    foreach ($validationErrorMessageOfKey as $message)
                        $value = $value ? $value : 'null';
                    $successMessage = "【 $testCaseLabel 】" . "$key=>$value" . ": $message";
                    $assertionSuccessMessageList[] = $successMessage;
                }
            }
        }

        $assertionMessageString = $this->testCase->getName()."\n";
        // 失敗
        if(!empty($assertionFailMessageList)){
            foreach ($assertionFailMessageList as $i => $message){
                $count = $i+1;
                $assertionMessageString .= "$count 件目：". $message . "\n";
            }
            $this->assertionMessage = $assertionMessageString;
            $this->isWorkedValidationCheck = false;
            return;
        }

        // 成功
        foreach ($assertionSuccessMessageList as $i => $message) {
            $count = $i+1;
            $assertionMessageString .= "$count 件目：" . $message . "\n";
        }

        $this->assertionMessage = $assertionMessageString;
        $this->isWorkedValidationCheck = true;
        return;
    }
}
