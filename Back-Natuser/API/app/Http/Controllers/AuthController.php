<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
// use \stdClass;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
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
        $user->foto_perfil = request()->foto_perfil ?? 'images/1720972789.png';
        $user->email = request()->email;
        $user->role = request()->role ?? 'user';
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

    public function users()
    {

        $users = User::all();

        if($users->isEmpty()){
            $data = [
                'message' => 'No se encontraron cursos',
                'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($users, 200);
    }

    public function userId($id)
    {

        $users = User::where('id', $id)->get();

        if($users->isEmpty()){
            $data = [
                'message' => 'No se encontraron cursos',
                'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($users, 200);
    }

    /**
   * Edita un usuario
   * @param Request $request
   * @param int $id
   */
    public function editarPerfil(Request $request, $id)
    {
        $usuario = User::find($id);

        if(!$usuario){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
        'name' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|max:255|unique:users,email,' . $usuario->id,
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => '404',
            ];
            return response()->json($data, 400);
        }

        // Actualizar los campos del usuario
        if ($request->has('name')) {
            $usuario->name = $request->name;
        }
        if ($request->has('email')) {
            $usuario->email = $request->email;
        }

        // Manejar la imagen
        if ($request->hasFile('foto_perfil')) {
            $image = $request->file('foto_perfil');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $usuario->foto_perfil = 'images/' . $imageName;
        }

            // $image = $request->file('foto_perfil');
            // $imageName = time() . '.' . $image->getClientOriginalExtension();
            // $image->move(public_path('images'), $imageName);
            // $usuario->foto_perfil = 'images/' . $imageName;
        }



        // if ($request->hasFile('foto_perfil')) {
        //     $usuario->foto_perfil = $request->foto_perfil;
        // }


        // Guardar los cambios en la base de datos
        $usuario->save();

        // Devolver la respuesta
        return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            'usuario' => $usuario,
            'status' => 200
        ], 200);

    }
}
