<?php

namespace App\Http\Controllers;

use App\Models\Anotador;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class AnotadorController extends Controller
{
    /**
     * Trae las notas activas.
     */
    public function notasUsuario($id)
    {
        $notas = Anotador::where('user_id', $id)
                            ->where('estado', 'activo')
                            ->get();

        if($notas->isEmpty()){
            $data = [
                'message' => 'No se encontraron las notas',
                'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($notas, 200);
    }

    /**
     * Trae las notas terminadas.
     */
    public function notasTerminadas($id)
    {
        $notasTerminadas = Anotador::where('user_id', $id)
                                    ->where('estado', 'terminado')
                                    ->get();

        if($notasTerminadas->isEmpty()){
            $data = [
            'message' => 'No se encontraron las notas terminadas',
            'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($notasTerminadas, 200);
    }


    /**
     * Guarda nota
     * @param Request $request
     */
    public function guardar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nota' => 'required|max:256',
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en el envio de datos',
                'errors' => $validator->errors(),
                'status' => '404',
            ];
            return response()->json($data, 400);
        }

        $nota = Anotador::create([
            'user_id' => $request->user_id,
            'nota' => $request->nota,
            'estado' => $request->estado,
        ]);

        if(!$nota){
            $data = [
                'message' => 'Error al crear nota',
                'status' => 500
                ];
            return response()->json($data, 500, );
        }

        $data = [
            'nota' => $nota,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function notaTerminada(Request $request, $id){
        $nota = Anotador::find($id);

        if(!$nota){
            $data = [
                'message' => 'Nota no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // $validator = Validator::make($request->all(), [
        //     'nota' => 'required|max:256',
        // ]);

        // if($validator->fails()){
        //     $data = [
        //         'message' => 'Error en el envio de datos',
        //         'errors' => $validator->errors(),
        //         'status' => '404',
        //     ];
        //     return response()->json($data, 400);
        // }

        // if($request->has('nota')){
        //     $nota->nota = $request->nota;
        // }
        if ($request->has('estado')) {
            $nota->estado = $request->estado;
        }

        // Guardar los cambios en la base de datos
        $nota->save();

        // Devolver la respuesta
        return response()->json([
            'message' => 'Nota marcado como terminada exitosamente',
            'usuario' => $nota,
            'status' => 200
        ], 200);
    }

    /**
     * Eliminar nota
     * @param int $id
     */
    public function eliminar($id)
    {
        $notas = Anotador::find($id);

        if(!$notas){
            $data = [
                'message' => 'Nota no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $notas->delete();

        $data = [
            'message' => 'nota eliminada',
            'status' => 200
        ];
        return response()->json($data, 200);

    }
}
