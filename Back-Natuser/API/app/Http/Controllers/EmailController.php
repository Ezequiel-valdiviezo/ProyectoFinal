<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\NombreDelMailable;
use App\Mail\NombreDelMailable2;
use App\Mail\NombreDelMailableConsulta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function enviarEmail(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
        ]);

        $email = $request->input('email');

        $correo = new NombreDelMailable();

        Mail::to($email)->send($correo);

        return response()->json(['message' => 'Emial enviado con éxito'], 200);
    }

    public function enviarEmail2(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
        ]);

        $email = $request->input('email');

        $correo = new NombreDelMailable2();

        Mail::to($email)->send($correo);

        return response()->json(['message' => 'Emial enviado con éxito'], 200);
    }

    public function enviarEmailConsultas(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
            'respuesta'=> 'required',
        ]);

        $email = $request->input('email');
        $respuesta = $request->input('respuesta');

        $correo = new NombreDelMailableConsulta($email, $respuesta);

        Mail::to($email)->send($correo);

        return response()->json(['message' => 'Email enviado con éxito'], 200);
    }
}
