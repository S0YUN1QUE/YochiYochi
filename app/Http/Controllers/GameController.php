<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GameController extends Controller
{
    public function index($id){
        $games = Game::OrderBy('created_at', 'desc')->where('category', $id)->get();

        return $games;
    }
}