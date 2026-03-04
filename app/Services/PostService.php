<?php

namespace App\Services;

use App\Http\Resources\PostResource;
use App\Interfaces\Repositories\PostRepositoryInterface;
use App\Interfaces\Services\PostServiceInterface;
use App\Models\Post;

class PostService implements PostServiceInterface
{
    protected PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function getAllPosts()
    {
        $posts = $this->postRepository->getAllPost();
        return PostResource::collection($posts);
    }

    public function getUserPosts($userId)
    {
        $posts = $this->postRepository->getUserPosts($userId);
        return PostResource::collection($posts);
    }

    public function getPostById(Post $post)
    {
        return new PostResource($post);
    }

    public function createPost(array $postDetails): Post
    {
        return $this->postRepository->createPost($postDetails);
    }

    public function updatePost(int $postId, array $postDetails): bool
    {
        return $this->postRepository->updatePost($postId, $postDetails);
    }

    public function deletePost(int $postId): bool
    {
        return $this->postRepository->deletePost($postId);
    }
}
