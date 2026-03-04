<?php

namespace App\Http\Controllers;

use App\Interfaces\Services\PostServiceInterface;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use Inertia\Inertia;

class PostController extends Controller
{
    protected PostServiceInterface $postService;

    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = $this->postService->getAllPosts();

        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $postDetails = $request->validated();

        $post = $this->postService->createPost($postDetails);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => new PostResource($post)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Posts/Show', [
            'post' => $this->postService->getPostById($post)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $this->postService->getPostById($post)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $postDetails = $request->validated();

        $this->postService->updatePost($post->id, $postDetails);
        
        // Refresh the post to get updated data
        $post->refresh();

        return response()->json([
            'message' => 'Post successfully updated',
            'post' => new PostResource($post)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->postService->deletePost($post->id);

        return response()->json(['message' => 'Post successfully deleted'], 200);
    }
}
