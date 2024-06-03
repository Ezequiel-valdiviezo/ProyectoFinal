<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CursosController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


//Mostrar cursos
Route::get('/cursos', [CursosController::class, 'index']);
//Mostrar curso por id
Route::get('/cursos/{id}', [CursosController::class, 'mostrarCurso']);
//Guardar curso
Route::post('/cursos', [CursosController::class, 'guardar']);
//Actualizar curso
Route::put('/cursos/{id}', [CursosController::class, 'editarCurso']);
//Borrar curso
Route::delete('/cursos/{id}', [CursosController::class, 'eliminarCurso']);


//Registro usuario
Route::post('/registro', [AuthController::class, 'registro']);
//Login usuario
Route::post('/login', [AuthController::class, 'login']);

//Peticiones "Privadas" solo acceso con token
Route::middleware(['auth:sanctum'])->group(function (){
    //Logout usuario
    Route::get('/logout', [AuthController::class, 'logout']);
    // Route::get('/cursos', [CursosController::class, 'index']);

});
