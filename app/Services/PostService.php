<?php

namespace App\Services;

use App\Http\Resources\PostResource;
use App\Interfaces\Repositories\PostRepositoryInterface;
use App\Interfaces\Services\PostServiceInterface;
use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class PostService implements PostServiceInterface
{
    protected PostRepositoryInterface $postRepository;

    /**
     * Create a new PostService instance
     *
     * @param PostRepositoryInterface $postRepository
     */
    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * Get all posts
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getAllPosts()
    {
        return Cache::remember('posts.index', 3600, function () {
            $posts = $this->postRepository->getAllPost();
            return PostResource::collection($posts);
        });
    }

    /**
     * Get all posts for a specific user
     *
     * @param int $userId
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getUserPosts($userId)
    {
        $posts = $this->postRepository->getUserPosts($userId);
        return PostResource::collection($posts);
    }

    /**
     * Get a specific post by ID
     *
     * @param Post $post
     * @return PostResource
     */
    public function getPostById(Post $post)
    {
        return Cache::remember("post.{$post->id}", 3600, function () use ($post) {
            return new PostResource($post);
        });
    }

    /**
     * Create a new post
     *
     * @param array $postDetails
     * @return Post
     */
    public function createPost(array $postDetails): Post
    {
        $post = $this->postRepository->createPost($postDetails);
        
        // Invalidate the posts listing cache since a new post was added
        Cache::forget('posts.index');
        
        return $post;
    }

    /**
     * Update an existing post
     *
     * @param int $postId
     * @param array $postDetails
     * @return bool
     */
    public function updatePost(int $postId, array $postDetails): bool
    {
        $result = $this->postRepository->updatePost($postId, $postDetails);
        
        // Invalidate both the specific post cache and the listing cache
        Cache::forget("post.{$postId}");
        Cache::forget('posts.index');
        
        return $result;
    }

    /**
     * Delete a post
     *
     * @param int $postId
     * @return bool
     */
    public function deletePost(int $postId): bool
    {
        $result = $this->postRepository->deletePost($postId);
        
        // Invalidate both the specific post cache and the listing cache
        Cache::forget("post.{$postId}");
        Cache::forget('posts.index');
        
        return $result;
    }
}
