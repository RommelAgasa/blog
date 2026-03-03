<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'userId',
        'title',
        'body'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

}
