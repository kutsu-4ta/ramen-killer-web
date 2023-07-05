<?php

namespace App\Http\Controllers\Api\v1\SignUp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class SignUpController extends Controller
{

    private $registerProperties;

    public function __construct()
    {
        $this->registerProperties = [
            'name',
            'email',
            'password',
            'reinputPassword'
        ];
    }

    public function register(Request $request){

        $request->only($this->registerProperties);

        $validator = Validator::make($request->all(), [
            'uid'=>'required|max:191|min:6|unique:users,uid',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>405,
                'message'=>'validation Error',
                'validation_errors'=>$validator->messages(),
            ]);
        }

        $isSafeReinputPassword = $request->get('password') === $request->get('reinputPassword');
        if(!$isSafeReinputPassword){
            return response()->json([
                'status'=>405,
                'message'=>'password is not match with reinput'
            ]);
        }

        $user = User::create([
            'uid'=>$request->uid,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status'=>200,
            'username'=>$user->name,
            'token'=>$token,
            'message'=>'Registerd Successfully'
        ]);
    }
}
