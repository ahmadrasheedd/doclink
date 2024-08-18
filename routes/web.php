<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ClinicController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/signup', [Controller::class, 'signup']);
Route::post('/signin', [Controller::class, 'signin']);
Route::post('/clinics', [ClinicController::class, 'store']);
Route::get('/clinics', [ClinicController::class, 'getAllClinics']);
Route::get('/clinic/{doctorId}', [ClinicController::class, 'getDoctorClinic']);

Route::post('/patient-signup', [Controller::class, 'patientSignup']);
Route::post('/patient-signin', [Controller::class, 'patientSignin']);

Route::post('/book-visit', [ClinicController::class, 'bookVisit']);