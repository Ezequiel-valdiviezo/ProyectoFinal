<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    use HasFactory;

    protected $table = 'Medicos';

    protected $fillable = [
        'nombre',
        'imagen',
        'descripcion',
        'especialidad',
        'email',
        'precio',
        'telefono',
    ];
}
