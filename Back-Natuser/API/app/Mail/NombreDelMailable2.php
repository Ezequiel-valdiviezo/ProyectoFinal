<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NombreDelMailable2 extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.simple_email2')
                    ->subject('Fuiste aceptado para ofrecer tu servicio - NatUser')
                    ->attach(public_path('images/logo.png'), [
                        'as' => 'imagen.jpg',
                        'mime' => 'image/jpeg',
                    ]);
}


}
