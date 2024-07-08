<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultaCurso extends Model
{
    use HasFactory;

    protected $table = 'consultas_cursos';

    protected $fillable = [
        'nombre',
        'email',
        'descripcion_servicio',
        'categoria',
        'telefono',
        'precio',
        'imagen',
    ];
}
