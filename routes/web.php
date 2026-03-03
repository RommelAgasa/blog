<?php
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Login/Index');
});

Route::get('/signup', function () {
    return Inertia::render('Signup/Index');
});

// Auth Routes
Route::post('/auth/signup', [AuthController::class, 'signup']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

Route::apiResource('posts',PostController::class);
