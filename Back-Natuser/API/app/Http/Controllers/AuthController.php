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
//     /**
//    * Registra un usuario
//    * @param Request $request
//    */
//     public function registro(Request $request)
//     {

//         // Definir mensajes de error personalizados
//         $messages = [
//             'name.required' => 'El nombre es obligatorio.',
//             'name.string' => 'El nombre debe ser una cadena de caracteres.',
//             'name.max' => 'El nombre no puede tener más de 255 caracteres.',
//             'email.required' => 'El correo electrónico es obligatorio.',
//             'email.string' => 'El correo electrónico debe ser una cadena de caracteres.',
//             'email.max' => 'El correo electrónico no puede tener más de 255 caracteres.',
//             'email.unique' => 'El correo electrónico ya está en uso.',
//             'password.required' => 'La contraseña es obligatoria.',
//             'password.string' => 'La contraseña debe ser una cadena de caracteres.',
//             'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
//         ];

//         // Validar la solicitud de registro
//         $validator = Validator::make($request->all(),[
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|max:255|unique:users',
//             'password' => 'required|string|min:8',
//         ], $messages);

//         // Si la validación falla, devolver errores
//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         // Crear el nuevo usuario
//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password)
//         ]);

//         // Crear un token de autenticación
//         $token = $user->createToken('auth_token')->plainTextToken;

//          // Configura una cookie para el token
//         $cookie = cookie('token', $token, 60*24, null, null, true, true); // Configuración de la cookie

//         // Devuelve una respuesta con el usuario y el token en una cookie
//         $response = response()->json([
//             'message' => 'Bienvenido ' . $user->name,
//             // 'accessToken' => $token,
//             // 'token_type' => 'Bearer',
//             'user' => $user,
//         ]);
//         return $response->cookie($cookie);
//     }

//     /**
//    * Inicia sesion un usuario
//    * @param Request $request
//    */
//     public function login(Request $request)
//     {
//         // Intenta autenticar al usuario con las credenciales proporcionadas
//         if(!Auth::attempt($request->only('email', 'password')))
//         {
//             // Si la autenticación falla, devuelve un mensaje de error
//             return response()
//                 ->json(['message' => 'Unauthorized'], 401);
//         }

//         // Obtiene el usuario por su email
//         $user = User::where('email', $request['email'])->firstOrFail();

//         //Genera el token
//         $token = $user->createToken('auth-token')->plainTextToken;

//         //Configura la cookie con HttpOnly y Secure
//         $cookie = cookie('token', $token, 60*24, null, null, true, true);
//         $response = response()->json([
//             'message' => 'Bienvenido ' . $user->name,
//             // 'accessToken' => $token,
//             // 'token_type' => 'Bearer',
//             'user' => $user,
//         ]);

//         return $response->cookie($cookie);
//     }

//     /**
//    * Cierra sesion
//    * @param Request $request
//    */
//     public function logout(Request $request)
//     {
//          // Elimina todos los tokens del usuario autenticado
//         $request->user()->tokens()->delete();

//         // Devuelve una respuesta de éxito
//         return response()->json(['message' => 'Cerraste sesión correctamente']);
//     }

/**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register() {

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




        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ] , $messages);

        // if($validator->fails()){
        //     return response()->json($validator->errors()->toJson(), 400);
        // }
        // Si la validación falla, devolver errores
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = new User;
        $user->name = request()->name;
        $user->email = request()->email;
        $user->password = bcrypt(request()->password);
        $user->save();

        return response()->json($user, 201);
    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Crear la cookie con el token
        $cookie = cookie('token', $token, 60*24, null, null, true, true, false, 'strict'); // 60*24 es 1 día

        // return $this->respondWithToken($token)->cookie($cookie);
        $user = auth()->user();

        return response()->json([
            'token' => $token,
            'user' => $user
        ])->cookie($cookie);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
