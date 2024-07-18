<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumRecuerdos extends Model
{
    use HasFactory;

    protected $table = 'album_recuerdos';

    protected $fillable = [
        'user_id',
        'imagen',
        'imagen2',
        'imagen3',
        'descripcion'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
