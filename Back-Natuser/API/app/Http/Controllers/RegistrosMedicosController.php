<?php

namespace App\Http\Controllers;

use App\Models\RegistrosMedicos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RegistrosMedicosController extends Controller
{
    public function guardar(Request $request)
    {
        // $imagePath = '';

        // $validator = Validator::make($request->all(), [
        //     // 'file' => 'required|mimes:png,jpg,pdf|max:2048',
        //     'descripcion' => 'required|max:256',
        //  ]);

        //  if($validator->fails()){
        //     $data = [
        //         'message' => 'Error en la validación de datos',
        //         'errors' => $validator->errors(),
        //         'status' => '404',
        //     ];
        //     return response()->json($data, 400);
        // }

        // // Maneja la subida de la imagen
        // if ($request->hasFile('imagen')) {
        //     $image = $request->file('imagen');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $image->move(public_path('images'), $imageName);
        //     $imagePath = 'images/' . $imageName;
        // }

        // $registros = RegistrosMedicos::create([
        //     'user_id' => $request->user_id,
        //     'file_path' => $imagePath,
        //     'descripcion' => $request->descripcion,
        // ]);

        // if(!$registros){
        //     $data = [
        //         'message' => 'Error al crear el registro',
        //         'status' => 500
        //         ];
        //     return response()->json($data, 500, );
        // }

        // // Añadir la URL completa de la imagen
        // $registros->imagen_url = url($registros->imagen);

        // $data = [
        //     'registros' => $registros,
        //     'status' => 201
        // ];

        // return response()->json($data, 201);






        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'file_path' => 'required|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'descripcion' => 'required|string|max:256',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        // Maneja la subida de la imagen
        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path');
            $fileName = time() . '_' . $file->getClientOriginalName(); // Genera un nombre único para el archivo
            $file->move(public_path('images'), $fileName); // Mueve el archivo a la carpeta 'public/images'
            $imagePath = 'images/' . $fileName; // Guarda la ruta del archivo en la base de datos
        } else {
            return response()->json([
                'message' => 'Archivo no encontrado en file_path',
                'status' => 400,
            ], 400);
        }
        // No muevas archivos aquí, ya que 'file_path' es un campo proporcionado directamente desde RapidAPI

        $registro = RegistrosMedicos::create([
            'user_id' => $request->user_id,
            'file_path' => $imagePath,
            'descripcion' => $request->descripcion,
        ]);

        if (!$registro) {
            return response()->json([
                'message' => 'Error al crear el registro',
                'status' => 500,
            ], 500);
        }

        return response()->json([
            'registro' => $registro,
            'status' => 201,
        ], 201);
}

    public function download($id)
    {
        $record = RegistrosMedicos::findOrFail($id);

        if ($record->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return Storage::download($record->file_path);
    }
}

