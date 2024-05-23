<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CursosController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/cursos', [CursosController::class, 'index']);

Route::get('/cursos/{id}', [CursosController::class, 'mostrarCurso']);
Route::post('/cursos', [CursosController::class, 'guardar']);
Route::put('/cursos/{id}', [CursosController::class, 'editarCurso']);
Route::delete('/cursos/{id}', [CursosController::class, 'eliminarCurso']);
