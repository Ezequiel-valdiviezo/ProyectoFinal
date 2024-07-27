<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NombreDelMailableConsulta extends Mailable
{
    use Queueable, SerializesModels;

    public $respuesta;
    public $email;

    /**
     * Create a new message instance.
     */
    public function __construct($email, $respuesta)
    {
        $this->email = $email;
        $this->respuesta = $respuesta;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.simple_email_consulta')
                    ->subject('Respuesta a su consulta - NatUser')
                    ->with([
                        'respuesta' => $this->respuesta,
                        'email' => $this->email,
                    ])
                    ->attach(public_path('images/logo.png'), [
                        'as' => 'imagen.jpg',
                        'mime' => 'image/jpeg',
                    ]);
}


}
