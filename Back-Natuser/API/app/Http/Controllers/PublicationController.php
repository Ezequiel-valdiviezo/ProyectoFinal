<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicationController extends Controller
{
    public function index()
    {
        $publicaciones = Publication::with('comments.user', 'user')->orderBy('created_at', 'desc')->get();

        if($publicaciones->isEmpty()){
            $data = [
                'message' => 'No se encontraron las publicaciones',
                'status' => 200
            ];
            return response()->json($data);
        }

        // Añadir la URL completa de la imagen a cada recuerdo
        // foreach ($publicaciones as $recuerdo) {
        //     $recuerdo->imagen = url('image/' . $recuerdo->imagen);
        //     }

            return response()->json($publicaciones, 200);
    }

    public function PublicacionUsuario($id)
    {
        $publicacion = Publication::with('comments.user', 'user')->where('user_id', $id)->get();

        if($publicacion->isEmpty()){
            $data = [
                'message' => 'No se encontraron las publicaciones',
                'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($publicacion, 200);
    }

    public function guardar(Request $request, $id)
    {
        $imagePath = '';

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:256',
            'contenido' => 'required|max:256',
            'imagen' => 'required|max:256'
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => '404',
            ];
            return response()->json($data, 400);
        }

        // Maneja la subida de la imagen
    if ($request->hasFile('imagen')) {
        $image = $request->file('imagen');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $imagePath = 'images/' . $imageName;
    }

    $publicacion = Publication::create([
        'user_id' => $id,
        'titulo' => $request->titulo,
        'contenido' => $request->contenido,
        'imagen' => $imagePath
    ]);

    if(!$publicacion){
        $data = [
            'message' => 'Error al crear la publicación',
            'status' => 500
            ];
        return response()->json($data, 500, );
    }

    // Añadir la URL completa de la imagen
    $publicacion->imagen_url = url($publicacion->imagen);

    $data = [
        'publicacion' => $publicacion,
        'status' => 201
    ];

    return response()->json($data, 201);

    }

    public function delete($id){
        $publicacion = Publication::find($id);

        if(!$publicacion){
            $data = [
                'message' => 'Publicación no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $publicacion->delete();

        $data = [
            'message' => 'Publicación eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }

}
