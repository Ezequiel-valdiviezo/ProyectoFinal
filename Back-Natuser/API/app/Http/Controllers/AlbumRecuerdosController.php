<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AlbumRecuerdos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AlbumRecuerdosController extends Controller
{
    /**
   * Trae todos los recuerdos
   */
    public function Index(){
        $album = AlbumRecuerdos::all();

        if($album->isEmpty()){
            $data = [
                'message' => 'No se encontraro el album',
                'status' => 200
            ];
            return response()->json($data);
        }

        // Añadir la URL completa de la imagen a cada recuerdo
        foreach ($album as $recuerdo) {
        $recuerdo->imagen_url = url('storage/' . $recuerdo->imagen);
        }

        return response()->json($album, 200);
    }

    /**
   * Elimina un recuerdo
   * @param int $id
   */
    public function eliminar($id)
    {
        $album = AlbumRecuerdos::find($id);

        if(!$album){
            $data = [
                'message' => 'Recuerdo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $album->delete();

        $data = [
            'message' => 'Recuerdo eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
    * Guarda recuerdo
    * @param Request $request
    */
    public function guardar(Request $request)
    {
        $validator = Validator::make($request->all(), [
           'descripcion' => 'required|max:256',
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

    $recuerdos = AlbumRecuerdos::create([
        'imagen' => $imagePath,
        'descripcion' => $request->descripcion,
    ]);

    if(!$recuerdos){
        $data = [
            'message' => 'Error al crear el curso',
            'status' => 500
            ];
        return response()->json($data, 500, );
    }

    // Añadir la URL completa de la imagen
    $recuerdos->imagen_url = url($recuerdos->imagen);

    $data = [
        'recuerdos' => $recuerdos,
        'status' => 201
    ];

    return response()->json($data, 201);
    }
}
