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
        Schema::create('document', function (Blueprint $table) {
            $table->id();
            $table->string("name_document");
            $table->string("type_document");
            $table->string('path_file');
            $table->dateTime('date_document');
            $table->unsignedBigInteger("ID_service_follow_up");
            $table->foreign("ID_service_follow_up")->references("id")->on("service_follow_up")->onDelete('cascade')->onUpdate('cascade');

//            $table->unsignedBigInteger("resev_by");
//            $table->foreign("resev_by")->references("id")->on("mwaten")->onDelete('cascade')->onUpdate('cascade');
//            $table->unsignedBigInteger("send_by")->nullable();
//            $table->foreign("send_by")->references("id")->on("office")->onDelete('cascade')->onUpdate('cascade');
//            $table->date("date_Send")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document');
    }
};
