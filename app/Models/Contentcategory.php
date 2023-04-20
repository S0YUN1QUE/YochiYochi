<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contentcategory extends Model
{
    use HasFactory;

    protected $table = "contentcategories";

    protected $primaryKey = 'id';

    protected $fillable = [
        
        'name'
      
    ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function gameimgs()
    {
        return $this->hasMany('\App\Models\Gameimg', 'category', 'id');
    }

    public function gamewords()
    {
        return $this->hasMany('\App\Models\Gamewords', 'category', 'id');
    }

    public function customimgs()
    {
        return $this->hasMany('\App\Models\CustomImg', 'category', 'id');
    }

    public function customwords()
    {
        return $this->hasMany('\App\Models\CustomWord', 'category', 'id');
    }
    
}