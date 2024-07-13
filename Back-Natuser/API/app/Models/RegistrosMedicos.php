<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrosMedicos extends Model
{
    use HasFactory;

    protected $table = 'registros_medicos';

    // Especificar los campos que se pueden asignar masivamente
    protected $fillable = [
        'user_id',
        'file_path',
        'descripcion'
    ];

    // Definir la relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
