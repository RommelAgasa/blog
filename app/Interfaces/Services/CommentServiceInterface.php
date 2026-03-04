<?php

namespace App\Interfaces\Services;

use App\Models\Comment;

interface CommentServiceInterface
{
    /**
     * Get a comment by ID.
     */
    public function getCommentById(int $commentId): Comment;

    /**
     * Get all comments for a specific post.
     */
    public function getPostComments(int $postId);

    /**
     * Create a new comment.
     */
    public function createComment(array $commentDetails): Comment;

    /**
     * Delete a comment.
     */
    public function deleteComment(int $commentId): bool;
}
