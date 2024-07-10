<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    /**
   * Trae todas las notas del blog
   */
    public function index()
    {
        $blogs = Blog::all();

        if($blogs->isEmpty()){
            $data = [
                'message' => 'No se encontró el blog',
                'status' => 200
            ];
            return response()->json($data);
        }

        // Añadir la URL completa de la imagen a cada curso
        foreach ($blogs as $blog) {
            $blog->imagen_url = url('storage/' . $blog->imagen);
            }

        return response()->json($blogs, 200);
    }

    /**
   * Crea un nuevo blog
   * @param Request $request
   */
    public function guardar(Request $request)
    {
        $imagePath = '';

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:256|unique:cursos',
            'contenido' => 'required',
            'autor' => 'required|max:256',
            'imagen' => 'required',
            'fecha_publicacion' => 'required',
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

        $blogs = Blog::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'autor' => $request->autor,
            'imagen' => $imagePath,
            'fecha_publicacion' => $request->fecha_publicacion,
        ]);

        if(!$blogs){
            $data = [
                'message' => 'Error al crear el curso',
                'status' => 500
            ];
            return response()->json($data, 500, );
        }

        // Añadir la URL completa de la imagen
        $blogs->imagen_url = url($blogs->imagen);

        $data = [
            'blogs' => $blogs,
            'status' => 201
        ];

        return response()->json($data, 201);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }


    /**
   * Elimina una nota
   * @param int $id
   */
    public function eliminarBlogs($id)
    {
        $nota = Blog::find($id);

        if(!$nota){
            $data = [
                'message' => 'Nota no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $nota->delete();

        $data = [
            'message' => 'Nota eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
