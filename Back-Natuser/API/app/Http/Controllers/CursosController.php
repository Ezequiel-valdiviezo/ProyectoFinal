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
