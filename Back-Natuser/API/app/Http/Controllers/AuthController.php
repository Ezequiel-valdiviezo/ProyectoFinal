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
        $messages = [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de caracteres.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser una cadena de caracteres.',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres.',
            'email.unique' => 'El correo electrónico ya está en uso.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser una cadena de caracteres.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
        ];

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // return response()->json([
        //     'data' => $user,
        //     'access_token' => $token,
        //     'token_type' => 'Bearer',
        // ], 201);

        $cookie = cookie('token', $token, 60*24, null, null, true, true); // Configuración de la cookie
        $response = response()->json([
            'message' => 'Bienvenido ' . $user->name,
            // 'accessToken' => $token,
            // 'token_type' => 'Bearer',
            'user' => $user,
        ]);
        return $response->cookie($cookie);
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        //Genera el token
        $token = $user->createToken('auth-token')->plainTextToken;

        //Configura la cookie con HttpOnly y Secure
        $cookie = cookie('token', $token, 60*24, null, null, true, true);
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

        // return [
        //     'mesagge' => 'Cerraste sesión correctamente'
        // ];
        return response()->json(['message' => 'Cerraste sesión correctamente']);
    }
}
