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
        Schema::create("service",function (Blueprint $table){
            $table->id();
            $table->string("name");
//            $table->unsignedBigInteger("add_by");
//            $table->foreign("add_by")->references("id")->on("users")->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger("ID_office");
            $table->foreign("ID_office")->references("id")->on("office")->onDelete('cascade')->onUpdate('cascade');
            $table->string("description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service');
    }
};
