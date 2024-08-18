<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name');
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('clinic_id');
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade'); // Add the foreign key constraint
            $table->foreign('clinic_id')->references('id')->on('clinics')->onDelete('cascade'); // Add the foreign key constraint
            $table->string('date');
            $table->string('time');
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
        //
    }
};
