<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ConsultaCurso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultaCursoController extends Controller
{
    /**
     * Trae todos los mensajes de consultas
     */
    public function index()
    {
        $mensajes = ConsultaCurso::all();

        if($mensajes->isEmpty()){
            $data = [
                'message' => 'No se encontraron consultas',
                'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($mensajes, 200);
    }


    /**
   * Crea una consulta de servicio cursos
   * @param Request $request
   */
  public function guardar(Request $request)
  {
      $validator = Validator::make($request->all(), [
          'nombre' => 'required|max:256',
          'email' => 'required|max:256',
          'descripcion_servicio' => 'required',
          'categoria' => 'required|max:256',
          'telefono' => 'required|max:256',
          'precio' => 'required|max:256',
      ]);

      if($validator->fails()){
          $data = [
              'message' => 'Error en la validación de datos',
              'errors' => $validator->errors(),
              'status' => '404',
          ];
          return response()->json($data, 400);
      }

      // Inicializa $imagePath en null por defecto
        $imagePath = null;

      // Maneja la subida de la imagen
      if ($request->hasFile('imagen')) {
          $image = $request->file('imagen');
          $imageName = time() . '.' . $image->getClientOriginalExtension();
          $image->move(public_path('images'), $imageName);
          $imagePath = 'images/' . $imageName;
      }

      $consulta = ConsultaCurso::create([
          'nombre' => $request->nombre,
          'email' => $request->email,
          'descripcion_servicio' => $request->descripcion_servicio ,
          'categoria' => $request->categoria,
          'telefono' => $request->telefono,
          'precio' => $request->precio,
          'imagen' => $imagePath,
      ]);

      if(!$consulta){
          $data = [
              'message' => 'Error al enviar consulta',
              'status' => 500
          ];
          return response()->json($data, 500, );
      }

      // Añadir la URL completa de la imagen
      $consulta->imagen_url = url($consulta->imagen);

      $data = [
          'Consulta' => $consulta,
          'status' => 201
      ];

      return response()->json($data, 201);
  }
}
