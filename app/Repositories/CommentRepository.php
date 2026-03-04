<?php

namespace App\Repositories;

use App\Interfaces\Repositories\CommentRepositoryInterface;
use App\Models\Comment;

class CommentRepository implements CommentRepositoryInterface{
    
    /**
     * Get a comment by its ID
     * @param int $commentId
     * @return Comment
     */
    public function getCommentById($commentId){
        return Comment::findOrFail($commentId);
    }

    /**
     * Get all comments for a specific post
     * @param int $postId
     * @return \Illuminate\Database\Eloquent\Collection<int, Comment>
     */
    public function getPostComments($postId){
        return Comment::where('postId', $postId)
                      ->orderBy('created_at', 'desc')
                      ->get();
    }

    /**
     * Create a new comment with the provided data
     * @param array $comment Comment attributes to create
     * @return Comment
     */
    public function createComment(array $comment): Comment
    {
        return Comment::create($comment);
    }

    /**
     * Delete a comment by its ID
     * @param int $commentId
     * @return int Number of comments deleted
     */
    public function deleteComment($commentId){
        return Comment::destroy($commentId);
    }
}
