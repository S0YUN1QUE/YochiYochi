<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Noticecategory;
use App\Models\Qnacategory;
use App\Models\Itemcategory;
use App\Models\Gamecategory;

class CategoryController extends Controller
{
    public function GameCategoryindex(Request $request)
    {  
        $categories = Gamecategory::OrderBy('id', 'desc')->get();

        return $categories;
    }

    public function ItemCategoryindex(Request $request)
    {  
        $categories = Itemcategory::OrderBy('id', 'desc')->get();

        return $categories;
    }
    
    public function QnaCategoryindex(Request $request)
    {  
        $categories = Qnacategory::OrderBy('id', 'desc')->get();

        return $categories;
    }

    public function NoticeCategoryindex(Request $request)
    {  
        $categories = Noticecategory::OrderBy('id', 'desc')->get();

        return $categories;
    }
}