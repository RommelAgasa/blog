<?php
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Login/Index');
});

Route::get('/signup', function () {
    return Inertia::render('Signup/Index');
});


Route::apiResource('posts',PostController::class);
