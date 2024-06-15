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
        $cursos = Cursos::all();

        if($cursos->isEmpty()){
            $data = [
                'message' => 'No se encontraron cursos',
                'status' => 200
            ];
            return response()->json($data);
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

        $cursos = Cursos::create([
            'titulo' => $request->titulo,
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
