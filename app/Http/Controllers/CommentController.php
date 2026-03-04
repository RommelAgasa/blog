<?php

namespace App\Http\Controllers;

use App\Interfaces\Services\CommentServiceInterface;
use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Inertia\Inertia;

class CommentController extends Controller
{
    protected CommentServiceInterface $commentService;

    public function __construct(CommentServiceInterface $commentService)
    {
        $this->commentService = $commentService;
    }

    /**
     * Display a listing of comments for a specific post.
     */
    public function index($postId)
    {
        $comments = $this->commentService->getPostComments($postId);

        return Inertia::render('Comments/Index', [
            'comments' => $comments,
            'postId' => $postId
        ]);
    }


    /**
     * Store a newly created comment in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        $commentDetails = $request->validated();
        
        // Override userId with the authenticated user's ID
        $commentDetails['userId'] = auth()->id();

        $comment = $this->commentService->createComment($commentDetails);

        return response()->json([
            'message' => 'Comment created successfully',
            'comment' => $comment
        ], 201);
    }


    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment)
    {
        // Authorization: only the comment owner can delete it
        if ($comment->userId !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $this->commentService->deleteComment($comment->id);

        return response()->json(['message' => 'Comment successfully deleted'], 200);
    }
}

