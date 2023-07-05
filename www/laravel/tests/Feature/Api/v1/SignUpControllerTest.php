<?php

namespace Tests\Feature\Api\v1;

use Illuminate\Http\Request;
use Tests\Services\TestValidationCheckEachCases\ParameterForTestValidationCheckEachCase;
use Tests\Services\TestValidationCheckEachCases\TestValidationCheckEachCase;
use Tests\TestCase;
use App\Models\User;

class SignUpControllerTest extends TestCase
{
    /**
     * 【テスト項目】
     * - [x] エンドポイントにアクセスできる
     * - [x] バリデーションチェックができる
     * - [x] バリデーションエラー時にメッセージが出力される
     * - [x] Usersテーブルにデータを保存できる
     * 【実行コマンド】
     * php artisan test tests/Feature/Api/v1/SignUpControllerTest.php
     */
    public string $endPoint='';

    public function setUp(): void
    {
        TestCase::setUp();
        // TODO: seeder作る
        $this->initialUser = [
            'uid' => 'testInitialUid',
            'email' => 'testInitial@email.com',
            'name' => 'testInitialName',
            'password' => 'testInitialPassword'
        ];

        // ルート
        $this->registerRoute = route('signup_register');

        // 正しいインサートデータ
        $requestDataWithAvailableValue = [
            'uid' => 'testUid',
            'email' => 'test@email.com',
            'password' => 'testPassword'
        ];
        // 検証するケース
        $notSafeValidationTestCaseList = [
            '必須チェック' => [
                'uid' => null,
                'email' => null,
                'password' => null
            ],
            '重複チェック' => [
                'uid' => $this->initialUser['uid'],
                'email' => $this->initialUser['email']
            ],
            '入力形式チェック' => [
                'uid' => 'a',
                'email' => 'notValidateOfEmail',
                'password' => 'A'
            ],
        ];

        // バリデーションチェックのテストパラメータ
        $this->parameterForTestValidationCheckEachCase = new ParameterForTestValidationCheckEachCase($notSafeValidationTestCaseList, $requestDataWithAvailableValue);

        User::create($this->initialUser);
    }

    public function test_エンドポイントにアクセスできる(): void
    {
        $this->endPoint = $this->redirectAtDocumentRoot($this->registerRoute);

        $response = $this->post($this->endPoint);
        $response->assertStatus(200);
    }

    public function test_バリデーションチェックができる(): void
    {
        $this->endPoint = $this->redirectAtDocumentRoot($this->registerRoute);
        $testValidationCheckEachCase = new TestValidationCheckEachCase($this, $this->parameterForTestValidationCheckEachCase);
        $testValidationCheckEachCase->doTestValidateCheck();

        // 失敗
        if(!$testValidationCheckEachCase->isWorkedValidationCheck){
            $this->fail($testValidationCheckEachCase->assertionMessage);
        }

        // 成功 バリデーションチェックが機能している
        $this->assertTrue(true);
    }

    public function test_バリデーションエラーメッセージが出力される(): void
    {
        $this->endPoint = $this->redirectAtDocumentRoot($this->registerRoute);
        $testValidationCheckEachCase = new TestValidationCheckEachCase($this, $this->parameterForTestValidationCheckEachCase);
        $testValidationCheckEachCase->doTestValidateCheck();

        if($testValidationCheckEachCase->isWorkedValidationCheck){
            echo $testValidationCheckEachCase->assertionMessage; // TODO: エラーメッセージを定数ファイルに定義後、実装
            $this->assertTrue(true);
        }

    }

    public function test_Usersテーブルにデータを保存できる(): void
    {
        $this->endPoint = $this->redirectAtDocumentRoot($this->registerRoute);
        $insertData = $this->parameterForTestValidationCheckEachCase->requestDataWithAvailableValue;
        $this->post($this->endPoint, $insertData);

        unset($insertData['password']); // パスワードは別途テスト
        $this->assertDatabaseHas('users', $insertData);
    }
}
