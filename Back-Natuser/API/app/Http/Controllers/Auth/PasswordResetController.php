<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends Controller
{
    // 1. Envía el mail con el token
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // El "broker" maneja la generación del token y el envío del mail
        $status = Password::broker()->sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Enlace enviado al mail.'], 200)
            : response()->json(['message' => 'No se pudo enviar el mail.'], 400);
    }

    // 2. Procesa el cambio de contraseña real
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => bcrypt($password)])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Contraseña actualizada con éxito.'], 200)
            : response()->json(['message' => 'El token o el email son inválidos.'], 400);
    }
}
