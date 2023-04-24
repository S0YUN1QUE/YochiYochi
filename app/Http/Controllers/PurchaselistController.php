<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Purchaselist;
use Illuminate\Support\Facades\Auth;

class PurchaselistController extends Controller
{
    public function index()
    {
        $lists = Purchaselist::orderBy('created_at', 'desc')
            ->where('user_id', Auth::guard('api')->user()->id)
            ->get();

        return $lists;
    }
}