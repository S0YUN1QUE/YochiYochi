<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Itemreview extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'comment',
        'item_id',
        'user_id',
    ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function users()
    {
        return $this->belongsTo('\App\Models\User', 'user_id', 'id');
    }

    public function items()
    {
        return $this->belongsTo('\App\Models\Item', 'item_id','id');
    }
}