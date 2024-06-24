<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cursos extends Model
{
    use HasFactory;

    protected $table = 'Cursos';

    protected $fillable = [
        'titulo',
        'imagen',
        'descripcion_breve',
        'categoria',
        'descripcion_completa',
        'precio',
        'telefono',
    ];


}
