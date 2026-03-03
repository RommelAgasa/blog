<?php

namespace App\Interfaces;
use App\Models\Post;

interface PostRepositoryInterface {

    /**
     * Get all posts ordered by creation date in descending order
     * @return \Illuminate\Database\Eloquent\Collection<int, Post>
     */
    public function getAllPost();

    /**
     * Get a single post by its ID
     * @param int $postId
     * @return Post
     */
    public function getPostById($postId);

    /**
     * Create a new post with the provided data
     * @param array $post Post attributes to create
     * @return Post
     */
    public function createPost(array $post);

    /**
     * Update an existing post by its ID with the provided data
     * @param int $postId
     * @param array $post Post attributes to update
     * @return bool|int
     */
    public function updatePost($postId, array $post);

    /**
     * Delete a post by its ID
     * @param int $postId
     * @return int Number of posts deleted
     */
    public function deletePost($postId);
}