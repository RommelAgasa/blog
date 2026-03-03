<?php

namespace App\Repositories;

use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;

class PostRepository implements PostRepositoryInterface{
    
/**
     * Get all posts from all users with pagination
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAllPost(){
        return Post::orderBy('created_at', 'desc')->paginate(10);
    }

    /**
     * Get posts by a specific user with pagination
     * @param int $userId
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getUserPosts($userId){
        return Post::where('userId', $userId)
                   ->orderBy('created_at', 'desc')
                   ->paginate(10);
    }

    /**
     * Get blog by postId
     * @param int $postId
     * @return Post|\Illuminate\Database\Eloquent\Collection<int, Post>
     */
    public function getPostById($postId){
        return Post::findOrFail($postId);
    }

    /**
     * Insert new post
     * @param array Post $newPost
     * @return Post
     */
    public function createPost(array $newPost): Post
    {
        return Post::create($newPost);
    }

    /**
     * This function will update the post based on the postId and requires to
     * get the updated post for the update
     * @param int $postId
     * @param array Posts $post
     * @return bool|int
     */
    public function updatePost($postId, array $post){
        return Post::where('id', $postId)->update($post);
    }

    /**
     * This function will delete the post based on the postId
     * @param int $postId
     * @return int
     */
    public function deletePost($postId){
        return Post::destroy($postId);
    }
}