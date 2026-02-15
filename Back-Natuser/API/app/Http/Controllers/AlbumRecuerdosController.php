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
        foreach ($album as $recuerdo) {
        $recuerdo->imagen_url2 = url('storage/' . $recuerdo->imagen2);
        }
        foreach ($album as $recuerdo) {
        $recuerdo->imagen_url3 = url('storage/' . $recuerdo->imagen3);
        }

        return response()->json($album, 200);
    }

    /**
   * Trae todos los recuerdos
   */
    public function mostrarRecuerdo($user_id){
        $album = AlbumRecuerdos::where('user_id', $user_id)->get();

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
        foreach ($album as $recuerdo) {
        $recuerdo->imagen_url = url('storage/' . $recuerdo->imagen2);
        }
        foreach ($album as $recuerdo) {
        $recuerdo->imagen_url = url('storage/' . $recuerdo->imagen3);
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
           'descripcion2' => 'max:256',
           'descripcion3' => 'max:256',
           'imagen' => 'required',
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
    $imagePath = null;
    if ($request->hasFile('imagen')) {
        $image = $request->file('imagen');
        $imageName = time() . '.1' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $imagePath = 'images/' . $imageName;
    }

    $imagePath2 = null;
    if ($request->hasFile('imagen2')) {
        $image = $request->file('imagen2');
        $imageName = time() . '.2' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $imagePath2 = 'images/' . $imageName;
    }

    $imagePath3 = null;
    if ($request->hasFile('imagen3')) {
        $image = $request->file('imagen3');
        $imageName = time() . '.3' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $imagePath3 = 'images/' . $imageName;
    }

    $recuerdos = AlbumRecuerdos::create([
        'user_id' => $request->user_id,
        'imagen' => $imagePath,
        'imagen2' => $imagePath2,
        'imagen3' => $imagePath3,
        'descripcion' => $request->descripcion,
        'descripcion2' => $request->descripcion2,
        'descripcion3' => $request->descripcion3,
    ]);

    if(!$recuerdos){
        $data = [
            'message' => 'Error al crear el recuerdo',
            'status' => 500
            ];
        return response()->json($data, 500, );
    }

    // Añadir la URL completa de la imagen
    $recuerdos->imagen_url = url($recuerdos->imagen);
    // $recuerdos->imagen_url2 = url($recuerdos->imagen2);
    // $recuerdos->imagen_url3 = url($recuerdos->imagen3);
    $recuerdos->imagen_url2 = $recuerdos->imagen2 ? url($recuerdos->imagen2) : null;
    $recuerdos->imagen_url3 = $recuerdos->imagen3 ? url($recuerdos->imagen3) : null;

    $data = [
        'recuerdos' => $recuerdos,
        'status' => 201
    ];

    return response()->json($data, 201);
    }
}
