<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContactoConsulta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactoConsultaController extends Controller
{
    /**
     * Trae todos los mensajes de consultas
     */
    public function index()
    {
        $mensajes = ContactoConsulta::all();

        if($mensajes->isEmpty()){
            $data = [
                'message' => 'No se encontraron consultas',
                'status' => 200
            ];
            return response()->json($data);
        }
    }

    public function guardar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'max:256',
            'nombre' => 'max:256',
            'mensaje' => 'max:256',
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => '404',
            ];
            return response()->json($data, 400);
        }

        $mensaje = ContactoConsulta::create([
            'email' => $request->email,
            'nombre' => $request->nombre,
            'mensaje' => $request->mensaje,
        ]);

        if(!$mensaje){
            $data = [
                'message' => 'Error al crear el curso',
                'status' => 500
            ];
            return response()->json($data, 500, );
        }

        $data = [
            'cursos' => $mensaje,
            'status' => 201
        ];

        return response()->json($data, 201);


    }
}
