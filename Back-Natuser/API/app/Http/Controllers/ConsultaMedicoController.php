<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ConsultaMedico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultaMedicoController extends Controller
{
    public function index(){
        $consultas = ConsultaMedico::all();

        if($consultas->isEmpty()){
            $data = [
                'message' => 'No se encontraron cursos',
                'status' => 200
            ];
            return response()->json($data);
        }

        // Añadir la URL completa de la imagen a cada curso
        foreach ($consultas as $consulta) {
            $consulta->imagen_url = url('storage/' . $consulta->imagen);
            }

        return response()->json($consultas, 200);
    }


     /**
   * Crea una consulta de médicos
   * @param Request $request
   */
  public function guardar(Request $request)
  {
      $validator = Validator::make($request->all(), [
          'nombre' => 'required|max:256',
          'email' => 'required|max:256',
          'especialidad' => 'required|max:256',
          'descripcion_servicio' => 'required',
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

      $consulta = ConsultaMedico::create([
          'nombre' => $request->nombre,
          'email' => $request->email,
          'especialidad' => $request->especialidad,
          'descripcion_servicio' => $request->descripcion_servicio ,
          'matricula' => $imagePath,
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
