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
        Schema::create("mwaten",function (Blueprint $table){//المواطن
            $table->id('id');
            $table->foreign('id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string("first_name");
            $table->string("middle_name");
            $table->string("last_name");
            $table->integer("phone");
            $table->integer("gender")->comment('ذكر= 1, أنثى=2 ');/*الجنس*/
            $table->integer("maritalStatus")->comment('أعزب=1,متزوج=2,مطلق=3,أرمل=4');/* الحالة الاجتماعية*/
            $table->string("address");/* مكان السكن*/
            $table->date("dateOfBirth");/*تاريخ الميلاد*/
//            $table->integer("role");
//            $table->unsignedBigInteger("ID_office");
//            $table->foreign("ID_office")->references("id")->on("office")->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mwaten');
    }
};
