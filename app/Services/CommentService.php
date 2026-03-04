<?php

namespace App\Services;

use App\Interfaces\Repositories\CommentRepositoryInterface;
use App\Interfaces\Services\CommentServiceInterface;
use App\Models\Comment;

class CommentService implements CommentServiceInterface
{
    protected CommentRepositoryInterface $commentRepository;

    /**
     * Initialize the CommentService with a CommentRepository dependency.
     * @param CommentRepositoryInterface $commentRepository
     */
    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * Retrieve a comment by its ID.
     * @param int $commentId The ID of the comment to retrieve
     * @return Comment
     */
    public function getCommentById(int $commentId): Comment
    {
        return $this->commentRepository->getCommentById($commentId);
    }

    /**
     * Retrieve all comments for a specific post.
     * @param int $postId The ID of the post
     * @return \Illuminate\Database\Eloquent\Collection<int, Comment>
     */
    public function getPostComments(int $postId)
    {
        return $this->commentRepository->getPostComments($postId);
    }

    /**
     * Create a new comment with the provided details.
     * @param array $commentDetails The comment attributes (userId, postId, comment)
     * @return Comment
     */
    public function createComment(array $commentDetails): Comment
    {
        return $this->commentRepository->createComment($commentDetails);
    }

    /**
     * Delete a comment by its ID.
     * @param int $commentId The ID of the comment to delete
     * @return bool True if the comment was deleted
     */
    public function deleteComment(int $commentId): bool
    {
        return (bool) $this->commentRepository->deleteComment($commentId);
    }
}
