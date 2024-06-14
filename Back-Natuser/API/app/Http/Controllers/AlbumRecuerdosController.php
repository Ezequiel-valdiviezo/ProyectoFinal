<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AlbumRecuerdos;
use Illuminate\Http\Request;

class AlbumRecuerdosController extends Controller
{
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
}
