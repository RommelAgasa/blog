<?php

namespace App\Providers;

use App\Interfaces\Repositories\PostRepositoryInterface;
use App\Interfaces\Repositories\CommentRepositoryInterface;
use App\Interfaces\Services\PostServiceInterface;
use App\Interfaces\Services\CommentServiceInterface;
use App\Repositories\PostRepository;
use App\Repositories\CommentRepository;
use App\Services\PostService;
use App\Services\CommentService;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(
            PostRepositoryInterface::class,
            PostRepository::class
        );

        $this->app->singleton(
            PostServiceInterface::class,
            PostService::class
        );

        $this->app->singleton(
            CommentRepositoryInterface::class,
            CommentRepository::class
        );

        $this->app->singleton(
            CommentServiceInterface::class,
            CommentService::class
        );
    }   

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * This is a common pattern in Inertia.js apps to avoid repeatedly 
         * passing auth data from each controller action.
         */
        // Share authenticated user info with all Inertia responses
        Inertia::share([    
            'auth' => function () {
                return [
                    'user' => auth()->user(),
                ];
            },
        ]);
    }
}

