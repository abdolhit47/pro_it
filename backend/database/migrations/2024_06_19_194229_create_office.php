<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("office",function (Blueprint $table){
            $table->id();
            $table->string("name");
            $table->string("description");
            $table->unsignedBigInteger("ID_address");
            $table->foreign("ID_address")->references("id")->on("address")->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office');
    }
};
