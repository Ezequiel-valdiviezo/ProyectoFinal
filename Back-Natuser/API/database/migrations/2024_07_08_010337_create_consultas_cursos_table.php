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
        Schema::create('consultas_cursos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 256);
            $table->string('email', 256);
            $table->text('descripcion_servicio');
            $table->string('categoria', 256);
            $table->string('telefono', 256);
            $table->string('precio', 256);
            $table->string('imagen', 256)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas_cursos');
    }
};
