<?php

namespace App\Interfaces\Services;

use App\Models\Post;

interface PostServiceInterface
{
    /**
     * Get all posts.
     */
    public function getAllPosts();

    /**
     * Get posts by a specific user.
     */
    public function getUserPosts($userId);

    /**
     * Get a single post by ID.
     */
    public function getPostById(Post $post);

    /**
     * Create a new post.
     */
    public function createPost(array $postDetails): Post;

    /**
     * Update an existing post.
     */
    public function updatePost(int $postId, array $postDetails): bool;

    /**
     * Delete a post.
     */
    public function deletePost(int $postId): bool;
}
