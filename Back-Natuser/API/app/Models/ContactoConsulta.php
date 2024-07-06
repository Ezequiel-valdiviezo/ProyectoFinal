<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactoConsulta extends Model
{
    use HasFactory;

    protected $table = 'contacto_consultas';

    protected $fillable = [
        'email',
        'nombre',
        'mensaje',
    ];
}
