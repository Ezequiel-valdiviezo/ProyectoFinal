<?php

use App\Http\Controllers\AlbumRecuerdosController;
use App\Http\Controllers\AnotadorController;
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

//Anotador
Route::post('/anotador', [AnotadorController::class, 'guardar']);
//Anotador
Route::get('/anotador/{id}', [AnotadorController::class, 'notasUsuario']);
//eliminar nota
Route::delete('/anotador/{id}', [AnotadorController::class, 'eliminar']);

//Album recuerdos
Route::get('/album', [AlbumRecuerdosController:: class, 'index']);
//Mostrar recuerdo por id
Route::get('/album/{id}', [AlbumRecuerdosController:: class, 'mostrarRecuerdo']);
//Borrar recuerdo
Route::delete('/album/{id}', [AlbumRecuerdosController::class, 'eliminar']);
//Guardar recuerdo
Route::post('/album', [AlbumRecuerdosController::class, 'guardar']);

    Route::group([
        'middleware' => 'api',
        'prefix' => 'auth'
    ], function ($router) {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
        Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
        // Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
        Route::get('/me', [AuthController::class, 'me']);
    });








//Registro usuario
// Route::post('/registro', [AuthController::class, 'registro']);
//Login usuario
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout']);

//Peticiones "Privadas" solo acceso con token
Route::middleware(['auth:sanctum'])->group(function (){
    //Logout usuario
    // Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/cursos', [CursosController::class, 'index']);
    });
