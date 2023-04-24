<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\PurchaseList;
use Illuminate\Support\Facades\Auth;

class PurchaselistController extends Controller
{
    public function PurchaseList(){ // 구매목록
        
        $lists = PurchaseList::OrderBy('created_at', 'desc')->where('user_id',Auth::guard('api')->user()->id)->get();
        
       
        $returnJson = json_encode($lists);
       

        return $returnJson;
    }
}