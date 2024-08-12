<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClinicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->id();
            $table->string('clinic_name');
            $table->string('location');
            $table->text('description')->nullable();
            $table->string('category');
            $table->unsignedBigInteger('doctor_id'); // Add the doctor_id column
            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('cascade'); // Add the foreign key constraint
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clinics');
    }
}
