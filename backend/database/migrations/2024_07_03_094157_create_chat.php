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
        Schema::create('chat', function (Blueprint $table) {
            $table->id();
            $table->string('Title');
            $table->unsignedBigInteger("mwaten_id");
            $table->foreign("mwaten_id")->references("id")->on("mwaten")->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger("ID_office");
            $table->foreign("ID_office")->references("id")->on("office")->onDelete('cascade')->onUpdate('cascade');
            $table->string('Status')->comment('Active, Inactive')->default('Active');
            $table->date('date_start');
            $table->date('date_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat');
    }
};
