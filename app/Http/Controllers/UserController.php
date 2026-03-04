<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Interfaces\Services\PostServiceInterface;
use Inertia\Inertia;

class UserController extends Controller
{
    protected PostServiceInterface $postService;

    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Display user profile with their posts
     */
    public function profile(User $user)
    {
        $posts = $this->postService->getUserPosts($user->id);

        return Inertia::render('Profile/Index', [
            'profile' => $user,
            'posts' => $posts,
            'isOwnProfile' => auth()->check() && auth()->id() === $user->id,
        ]);
    }
}
