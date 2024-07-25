<?php

use App\Http\Controllers\AlbumRecuerdosController;
use App\Http\Controllers\AnotadorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConsultaCursoController;
use App\Http\Controllers\ConsultaMedicoController;
use App\Http\Controllers\ContactoConsultaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CursosController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\RegistrosMedicosController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Cargar registro médico
Route::post('/registroMedico', [RegistrosMedicosController::class, 'guardar']);
// Trear registros por usuario
Route::get('/registroMedico/{id}', [RegistrosMedicosController:: class, 'mostrarRegistro']);
// ---------
Route::get('/registroMedico/descargar/{id}', [RegistrosMedicosController::class, 'download']);

//Enviar consulta en seccion contacto de la seccion informativa
Route::post('/consulta', [ContactoConsultaController::class, 'guardar']);
Route::get('/consulta', [ContactoConsultaController::class, 'index']);

//Muestra todas postulaciones médicos
Route::get('/consulta/medicos', [ConsultaMedicoController::class, 'index']);
//Enviar postulacion médicos
Route::post('/consulta/medicos', [ConsultaMedicoController::class, 'guardar']);
//Eliminar postulacion médico
Route::delete('/consulta/medicos/{id}', [ConsultaMedicoController::class, 'eliminarConsulta']);

//Muestra todas postulaciones cursos
Route::get('/consulta/cursos', [ConsultaCursoController::class, 'index']);
//Enviar postulacion cursos
Route::post('/consulta/cursos', [ConsultaCursoController::class, 'guardar']);
//Eliminar postulacion cursos
Route::delete('/consulta/cursos/{id}', [ConsultaCursoController::class, 'eliminarConsulta']);


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

//Mostrar Médicos
Route::get('/medicos', [MedicoController::class, 'index']);
//Mostrar curso por id
// Route::get('/cursos/{id}', [CursosController::class, 'mostrarCurso']);
//Guardar Médico
Route::post('/medicos', [MedicoController::class, 'guardar']);
//Actualizar curso
// Route::put('/cursos/{id}', [CursosController::class, 'editarCurso']);
//Borrar curso
Route::delete('/medicos/{id}', [MedicoController::class, 'eliminarMedico']);

//Mostrar blog
Route::get('/blogs', [BlogController::class, 'index']);
//Guardar una nota de blog
Route::post('/blogs', [BlogController::class, 'guardar']);
//Borrar nota de blog
Route::delete('/blogs/{id}', [BlogController::class, 'eliminarBlogs']);

//Anotador
Route::post('/anotador', [AnotadorController::class, 'guardar']);
//Mostrar notas activas
Route::get('/anotador/{id}', [AnotadorController::class, 'notasUsuario']);
//Mostrar notas terminadas
Route::get('/anotador/listo/{id}', [AnotadorController::class, 'notasTerminadas']);
//Marcar notas como terminadas
Route::put('/anotador/listo/{id}', [AnotadorController::class, 'notaTerminada']);
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
    //Trae todos los usuarios
    Route::get('/users', [AuthController::class, 'users']);
    Route::get('/user/{id}', [AuthController::class, 'userId']);
    Route::put('/user/{id}', [AuthController::class, 'editarPerfil']);
    Route::delete('/user/{id}', [AuthController::class, 'eliminarPerfil']);


// Trae todas las publicaciones y sus comentarios
Route::get('/foro', [PublicationController::class, 'index']);
// Trea publicaciones por usuario
Route::get('/foro/{id}', [PublicationController::class, 'PublicacionUsuario']);
// Guarda publicacion
Route::post('/foro/{id}', [PublicationController::class, 'guardar']);
// Guardar comentario
Route::post('/foro/{id}/comentario', [CommentController::class, 'guardar']);


// Email
Route::post('/enviar-email', [EmailController::class, 'enviarEmail']);
Route::post('/enviar-email2', [EmailController::class, 'enviarEmail2']);


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
