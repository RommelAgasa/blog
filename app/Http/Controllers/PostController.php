<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Inertia\Inertia;

class PostController extends Controller
{

    protected PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository){
        $this->postRepository = $postRepository;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = $this->postRepository->getAllPost();

        return Inertia::render('Posts/Index', [
            'posts' => PostResource::collection($posts)
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
        $request->validated();

        $postDetails = $request->only([
            'userId',
            'title',
            'body'
        ]);

        $post = $this->postRepository->createPost($postDetails);
        // $post->load('user');

        return redirect()->route('posts.index')
            ->with('message', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => new PostResource($post)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => new PostResource($post)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $request->validated();

        $postDetails = $request->only([
            'title',
            'body'
        ]);

        $this->postRepository->updatePost($post->id, $postDetails);

        // return redirect()->route('posts.index', $post->id);

        return response()->json(['message' => 'Post successfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $isDeleted = $this->postRepository->deletePost($post->id);
        // return redirect()->route('posts.index')
        //     ->with('message', 'Post deleted successfully!');

        return response()->json(['message' => 'Post successfully deleted'], 200);
    }
}
