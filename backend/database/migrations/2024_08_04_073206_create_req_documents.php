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
        Schema::create('req_documents', function (Blueprint $table) {
            $table->id();
            $table->integer('ID_card')->default(0);//بطاقة الشخصية
            $table->integer('birth_certificate')->default(0);//شهادة ميلاد
            $table->integer('passport')->default(0);//جواز السفر
            $table->integer('license')->default(0);//رخصة
            $table->integer('medical_certificate')->default(0);//شهادة طبية
            $table->integer('family_status_certificate')->default(0);//شهادة حالة العائلة
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')->references('id')->on('service')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('req_documents');
    }
};
