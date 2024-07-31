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
        Schema::create('message', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ID_Chat');
            $table->foreign('ID_Chat')->references('id')->on('chat')->onDelete('cascade')->onUpdate('cascade');
            $table->string("type")->comment('Mwaten, Office');
            $table->string('Message');
            $table->string('Status')->comment('Read, Unread')->default('Unread');
            $table->dateTime('Date_send');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message');
    }
};
