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
        Schema::create('anotadors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // clave foránea a la tabla de usuarios
            $table->string('nota', 256);
            $table->date('fecha');
            $table->string('estado', 256);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anotadors');
    }
};
