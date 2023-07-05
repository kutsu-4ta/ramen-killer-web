<?php

use App\Http\Controllers\Api\v1\SignIn\SignInController;
use \App\Http\Controllers\Api\v1\SignUp\SignUpController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signUp', [SignUpController::class, 'register'])->name('signup_register');
Route::post('/signIn', [SignInController::class, 'logIn'])->name('signin_login');
Route::post('/signOut', [SignInController::class, 'logOut'])->name('signin_logout');
