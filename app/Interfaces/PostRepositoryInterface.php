<?php

namespace App\Interfaces;

interface PostRepositoryInterface {

    public function getAllPost();
    public function getPostById($postId);
    public function createPost(array $post);
    public function updatePost($postId, array $post);
    public function deletePost($postId);
}