<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'userId',
        'postId',
        'comment'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'userId', 'id');
    }

    public function post(){
        return $this->belongsTo(Post::class, 'postId', 'id');
    }
}
