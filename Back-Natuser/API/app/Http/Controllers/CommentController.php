<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function guardar(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
        'comentario' => 'required|max:256',
    ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => '404',
            ];
            return response()->json($data, 400);
        }

        $comentario = new Comment();
        $comentario->comentario = $request->comentario;
        $comentario->user_id = $request->user_id;
        $comentario->publication_id = $id;
        $comentario->save();

        if(!$comentario){
            $data = [
                'message' => 'Error al crear el comentario',
                'status' => 500
            ];
            return response()->json($data, 500, );
        }

        $data = [
            'comentario' => $comentario,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
