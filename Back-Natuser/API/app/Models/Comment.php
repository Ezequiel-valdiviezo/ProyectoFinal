<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'publication_id',
        'comentario'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function publications()
    {
        return $this->belongsTo(Publication::class);
    }
}
