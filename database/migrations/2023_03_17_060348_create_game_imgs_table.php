<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_imgs', function (Blueprint $table) {
            $table->id();
            $table->string('imgpath');
            $table->unsignedBigInteger('game_id');
            $table->unsignedBigInteger('category');
            $table->timestamps();

            $table->foreign('game_id')->references('id')->on('games');
            $table->foreign('category')->references('id')->on('contentcategories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_imgs');
    }
};