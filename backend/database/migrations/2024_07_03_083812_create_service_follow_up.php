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
        Schema::create('service_follow_up', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')->references('id')->on('service')->onDelete('cascade');

            $table->unsignedBigInteger('file_id');
            $table->foreign('file_id')->references('id')->on('file')->onDelete('cascade');

            $table->unsignedBigInteger("mwaten_id");
            $table->foreign("mwaten_id")->references("id")->on("mwaten")->onDelete('cascade')->onUpdate('cascade');

            $table->string('status')->comment('في الانتظار=0,تحت المراجعة=1,قيد التنفيذ=2,مكتمل=3,رفض=4')->default(0);#تتبع الخدمة للمواطن
            $table->boolean('approve')->comment('رفض=2,قبول=1,قيد المراجعة=0')->default(0);#موافقة من الوزارة
            $table->string('note')->nullable();#ملاحظات

            $table->unsignedBigInteger('approve_by_wzara')->nullable(); #موافقة من الوزارة
            $table->foreign('approve_by_wzara')->references("id")->on("office")->onDelete('cascade')->onUpdate('cascade');

            $table->date('data_approve')->nullable();#تاريخ الموافقة
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_follow_up');
    }
};
