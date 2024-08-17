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
        Schema::create('civil_records', function (Blueprint $table) {
            $table->id();

            $table->string('national_number')->unique()->index();

            $table->enum('martial_status', ['married', 'divorced', 'widowed', 'single'])->default('single');

            $table->boolean('has_disability')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('civil_records');
    }
};
