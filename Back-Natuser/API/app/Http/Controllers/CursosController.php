<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cursos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CursosController extends Controller
{
    /**
   * Trae todos los cursos
   */
    public function index()
    {

        // if (!auth()->check()) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        $cursos = Cursos::all();

        if($cursos->isEmpty()){
            $data = [
                'message' => 'No se encontraron cursos',
                'status' => 200
            ];
            return response()->json($data);
        }

        // Añadir la URL completa de la imagen a cada curso
        foreach ($cursos as $curso) {
            $curso->imagen_url = url('storage/' . $curso->imagen);
            }

        return response()->json($cursos, 200);
    }

    /**
   * Crea un nuevo curso
   * @param Request $request
   */
    public function guardar(Request $request)
    {
        $messages = [
            'titulo.required' => 'El titulo es obligatorio.',
            'titulo.string' => 'El titulo debe ser una cadena de caracteres.',
            'titulo.max' => 'El titulo no puede tener más de 256 caracteres.',
            'titulo.unique' => 'El titulo debe ser único.',
            'descripcion_breve.required' => 'La descripcion_breve es obligatoria.',
            'descripcion_breve.string' => 'La descripcion_breve debe ser una cadena de caracteres.',
            'descripcion_completa.required' => 'La descripcion_completa es obligatoria.',
            'descripcion_completa.string' => 'La descripcion_completa debe ser una cadena de caracteres.',
            'categoria.required' => 'La categoria es obligatorio.',
            'categoria.string' => 'La categoria debe ser una cadena de caracteres.',
            'categoria.max' => 'La categoria no puede tener más de 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.string' => 'La descripción debe ser una cadena de caracteres.',
            'precio.required' => 'El precio es obligatorio.',
            'telefono.required' => 'El teléfono es obligatorio.',
            'telefono.digits' => 'El teléfono debe tener 10 dígitos.',
        ];

        $imagePath = '';

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:256|unique:cursos',
            'descripcion_breve' => 'required',
            'categoria' => 'required',
            'descripcion_completa' => 'required',
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

        $cursos = Cursos::create([
            'titulo' => $request->titulo,
            'imagen' => $imagePath,
            'descripcion_breve' => $request->descripcion_breve,
            'categoria' => $request->categoria,
            'descripcion_completa' => $request->descripcion_completa,
            'precio' => $request->precio,
            'telefono' => $request->telefono,
            'fecha_vencimiento' => $request->fecha_vencimiento,
        ]);

        if(!$cursos){
            $data = [
                'message' => 'Error al crear el curso',
                'status' => 500
            ];
            return response()->json($data, 500, );
        }

        // Añadir la URL completa de la imagen
        $cursos->imagen_url = url($cursos->imagen);

        $data = [
            'cursos' => $cursos,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    /**
   * Muestra un curso
   * @param int $id
   */
    public function mostrarCurso($id)
    {
        $cursos = Cursos::find($id);

        if(!$cursos){
            $data = [
                'message' => 'Curso no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'curso' => $cursos,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
   * Elimina un curso
   * @param int $id
   */
    public function eliminarCurso($id)
    {
        $cursos = Cursos::find($id);

        if(!$cursos){
            $data = [
                'message' => 'Curso no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $cursos->delete();

        $data = [
            'message' => 'Curso eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    /**
   * Edita un curso
   * @param Request $request
   * @param int $id
   */
    public function editarCurso(Request $request, $id)
    {
        $cursos = Cursos::find($id);

        if(!$cursos){
            $data = [
                'message' => 'Curso no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:256|unique:cursos',
            'descripcion_breve' => 'required',
            'categoria' => 'required',
            'descripcion_completa' => 'required',
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

        $cursos->titulo = $request->titulo;
        $cursos->descripcion_breve = $request->descripcion_breve;
        $cursos->categoria = $request->categoria;
        $cursos->descripcion_completa = $request->descripcion_completa;
        $cursos->precio = $request->precio;
        $cursos->telefono = $request->telefono;

        $cursos->save();

        $data = [
            'message' => 'Estudiante actualizado',
            'cursos' => $cursos,
            'status' => '200',
        ];
        return response()->json($data, 200);
    }
}
