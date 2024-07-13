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
        Schema::create('registros_medicos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // clave foránea a la tabla de usuarios
            $table->string('file_path');
            $table->string('descripcion', 256);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registros_medicos');
    }
};
