<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/cursos', function () {
    return 'Lista de cursos';
});
Route::get('/cursos/{id}', function () {
    return 'Lista de 1 curso';
});
Route::post('/cursos', function () {
    return 'Creando cursos';
});
Route::put('/cursos/{id}', function () {
    return 'Actualizando cursos';
});
Route::delete('/cursos/{id}', function () {
    return 'Borrando cursos';
});
