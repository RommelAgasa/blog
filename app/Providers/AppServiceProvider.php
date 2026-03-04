<?php

namespace App\Providers;

use App\Interfaces\Repositories\PostRepositoryInterface;
use App\Interfaces\Services\PostServiceInterface;
use App\Repositories\PostRepository;
use App\Services\PostService;
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
    }   

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
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

