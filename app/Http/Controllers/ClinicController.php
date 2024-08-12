<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clinic;
use App\Models\User;

class ClinicController extends Controller
{
    /**
     * Store a newly created clinic in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        

        // Create a new clinic
        $clinic = Clinic::create([
            'clinic_name' => $request->clinic_name,
            'location' => $request->location,
            'description' => $request->description,
            'doctor_id' => $request->doctor_id,
            'category'=> $request->category
        ]);

        // Return a success response
        return response()->json(['message' => 'Clinic created successfully', 'clinic' => $clinic], 201);
    }

    public function getAllClinics()
    {
        $clinics = Clinic::with('doctor')->get();
        return response()->json([$clinics]);
    }

    public function getDoctorClinic($doctorId)
{
    // Find the doctor by ID
    $doctor = User::find($doctorId);

    if (!$doctor) {
        // If the doctor is not found, return a 404 response
        return response()->json(['error' => 'Doctor not found'], 404);
    }

    // Check if the doctor has an associated clinic
    $clinic = $doctor->clinic;

    if ($clinic) {
        // If a clinic is found, return the clinic data
        return response()->json($clinic);
    } else {
        // If no clinic is associated, return a message indicating this
        return response()->json(['message' => 'No clinic associated with this doctor']);
    }
}
    
}
