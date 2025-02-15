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

        $messages = [
            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.string' => 'El nombre debe ser una cadena de caracteres.',
            'nombre.max' => 'El nombre no puede tener más de 256 caracteres.',
            'especialidad.required' => 'La especialidad es obligatoria.',
            'especialidad.string' => 'La especialidad debe ser una cadena de caracteres.',
            'especialidad.max' => 'La especialidad no puede tener más de 256 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser una cadena de caracteres.',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.string' => 'La descripción debe ser una cadena de caracteres.',
            'imagen.required' => 'La imagen es obligatorio.',
            'precio.required' => 'El precio es obligatorio.',
            'telefono.required' => 'El teléfono es obligatorio.',
            'telefono.digits' => 'El teléfono debe tener 10 dígitos.',
        ];

        $imagePath = '';

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:256',
            'imagen' => 'required|max:256',
            'descripcion' => 'required',
            'especialidad' => 'required|max:256',
            'email' => 'required|max:256',
            'precio' => 'required',
            'telefono' => 'required|digits:10',
        ], $messages);

        if($validator->fails()){
            // $data = [
            //     'message' => 'Error en la validación de datos',
            //     'errors' => $validator->errors(),
            //     'status' => '404',
            // ];
            // return response()->json($data, 400);
            return response()->json($validator->errors(), 422);
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
            'fecha_vencimiento' => $request->fecha_vencimiento,
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

    public function put(Request $request, $id)
    {
        $medico = Medico::find($id);

        if (!$medico) {
            return response()->json([
                'message' => 'Médico no encontrado',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'fecha_vencimiento' => 'nullable|date_format:Y-m-d' // Asegurar formato correcto
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        // Manejar la actualización de la imagen
        if ($request->hasFile('imagen')) {
            if ($medico->imagen && file_exists(public_path($medico->imagen))) {
                unlink(public_path($medico->imagen));
            }

            $image = $request->file('imagen');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $medico->imagen = 'images/' . $imageName;
        }

        // Actualizar otros datos
        $medico->nombre = $request->nombre;
        $medico->descripcion = $request->descripcion;
        $medico->especialidad = $request->especialidad;
        $medico->email = $request->email;
        $medico->precio = $request->precio;
        $medico->telefono = $request->telefono;

        // Verificar si se envió la fecha y actualizarla
        if ($request->filled('fecha_vencimiento')) {
            $medico->fecha_vencimiento = $request->fecha_vencimiento;
        }

        $medico->save();

        return response()->json([
            'message' => 'Médico actualizado correctamente',
            'medico' => $medico,
            'status' => 200
        ], 200);
    }

}
