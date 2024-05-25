<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
// use \stdClass;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function registro(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized', 401]);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth-token')->plainTextToken;

        $cookie = cookie('token', $token, 60*24, null, null, true, true); // Configuración de la cookie
        $response = response()->json([
            'message' => 'Bienvenido ' . $user->name,
            // 'accessToken' => $token,
            // 'token_type' => 'Bearer',
            'user' => $user,
        ]);

        return $response->cookie($cookie);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'mesagge' => 'Cerraste sesión correctamente'
        ];
    }
}
