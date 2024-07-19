<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\NombreDelMailable;
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
}
