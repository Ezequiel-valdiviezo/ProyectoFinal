<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anotador extends Model
{
    use HasFactory;

    protected $table = 'Anotadors';

    protected $fillable = [
        'user_id',
        'nota',
        'estado',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
