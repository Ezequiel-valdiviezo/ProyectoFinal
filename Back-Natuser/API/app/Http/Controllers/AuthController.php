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
    /**
   * Registra un usuario
   * @param Request $request
   */
    public function registro(Request $request)
    {

        // Definir mensajes de error personalizados
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

        // Validar la solicitud de registro
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ], $messages);

        // Si la validación falla, devolver errores
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Crear el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Crear un token de autenticación
        $token = $user->createToken('auth_token')->plainTextToken;

         // Configura una cookie para el token
        $cookie = cookie('token', $token, 60*24, null, null, true, true); // Configuración de la cookie

        // Devuelve una respuesta con el usuario y el token en una cookie
        $response = response()->json([
            'message' => 'Bienvenido ' . $user->name,
            // 'accessToken' => $token,
            // 'token_type' => 'Bearer',
            'user' => $user,
        ]);
        return $response->cookie($cookie);
    }

    /**
   * Inicia sesion un usuario
   * @param Request $request
   */
    public function login(Request $request)
    {
        // Intenta autenticar al usuario con las credenciales proporcionadas
        if(!Auth::attempt($request->only('email', 'password')))
        {
            // Si la autenticación falla, devuelve un mensaje de error
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        // Obtiene el usuario por su email
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

    /**
   * Cierra sesion
   * @param Request $request
   */
    public function logout(Request $request)
    {
         // Elimina todos los tokens del usuario autenticado
        $request->user()->tokens()->delete();

        // Devuelve una respuesta de éxito
        return response()->json(['message' => 'Cerraste sesión correctamente']);
    }
}
