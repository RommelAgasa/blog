<?php

namespace App\Interfaces\Repositories;
use App\Models\Comment;

interface CommentRepositoryInterface {

    /**
     * Get a single comment by its ID
     * @param int $commentId
     * @return Comment
     */
    public function getCommentById($commentId);

    /**
     * Get all comments for a specific post
     * @param int $postId
     * @return \Illuminate\Database\Eloquent\Collection<int, Comment>
     */
    public function getPostComments($postId);

    /**
     * Create a new comment with the provided data
     * @param array $comment Comment attributes to create
     * @return Comment
     */
    public function createComment(array $comment);

    /**
     * Delete a comment by its ID
     * @param int $commentId
     * @return int Number of comments deleted
     */
    public function deleteComment($commentId);
}
