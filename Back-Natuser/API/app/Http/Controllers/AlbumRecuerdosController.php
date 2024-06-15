<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AlbumRecuerdos;
use Illuminate\Http\Request;

class AlbumRecuerdosController extends Controller
{
    /**
   * Trae todos los recuerdos
   */
    public function Index(){
        $album = AlbumRecuerdos::all();

        if($album->isEmpty()){
            $data = [
                'message' => 'No se encontraro el album',
                'status' => 200
            ];
            return response()->json($data);
        }

        return response()->json($album, 200);
    }

    /**
   * Elimina un recuerdo
   * @param int $id
   */
    public function eliminar($id)
    {
        $album = AlbumRecuerdos::find($id);

        if(!$album){
            $data = [
                'message' => 'Recuerdo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $album->delete();

        $data = [
            'message' => 'Recuerdo eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
