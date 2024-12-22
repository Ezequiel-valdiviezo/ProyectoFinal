<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('album_recuerdos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // clave foránea a la tabla de usuarios
            $table->string('imagen', 256);
            $table->string('imagen2', 256)->nullable();
            $table->string('imagen3', 256)->nullable();
            $table->string('descripcion', 256);
            $table->string('descripcion2', 256)->nullable();;
            $table->string('descripcion3', 256)->nullable();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('album_recuerdos');
    }
};
