<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Medico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicos = Medico::all();

        if($medicos->isEmpty()){
            $data = [
                'message' => 'No se encontraron médicos',
                'status' => 200
            ];
            return response()->json($data);
        }

        // Añadir la URL completa de la imagen a cada curso
        foreach ($medicos as $medico) {
            $medico->imagen_url = url('storage/' . $medico->imagen);
            }

        return response()->json($medicos, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function guardar(Request $request)
    {
        $imagePath = '';

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:256',
            'imagen' => 'required|max:256',
            'descripcion' => 'required',
            'especialidad' => 'required|max:256',
            'email' => 'required|max:256',
            'precio' => 'required',
            'telefono' => 'required|digits:10',
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

        $medicos = Medico::create([
            'nombre' => $request->nombre,
            'imagen' => $imagePath,
            'descripcion' => $request->descripcion,
            'especialidad' => $request->especialidad,
            'email' => $request->email,
            'precio' => $request->precio,
            'telefono' => $request->telefono,
        ]);

        if(!$medicos){
            $data = [
                'message' => 'Error al crear un médico',
                'status' => 500
            ];
            return response()->json($data, 500, );
        }

        // Añadir la URL completa de la imagen
        $medicos->imagen_url = url($medicos->imagen);

        $data = [
            'medico' => $medicos,
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }


    /**
   * Elimina un medico
   * @param int $id
   */
    public function eliminarMedico($id)
    {
        $medicos = Medico::find($id);

        if(!$medicos){
            $data = [
                'message' => 'Médico no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $medicos->delete();

        $data = [
            'message' => 'Médico eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
