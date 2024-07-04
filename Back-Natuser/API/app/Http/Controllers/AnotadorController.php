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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Anotador $anotador)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Anotador $anotador)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Anotador $anotador)
    {
        //
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
