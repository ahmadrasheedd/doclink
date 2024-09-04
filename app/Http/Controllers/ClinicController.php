<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clinic;
use App\Models\User;
use App\Models\Patient;
use App\Models\Condition;
use App\Models\Reservation;


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

public function bookVisit(Request $request) 
{
    $patient = Patient::find($request->patient_id);
    $reservation = Reservation::create([
        "patient_id" => $request->patient_id,
        "patient_name" => $patient->name,
        "clinic_id" => $request->clinic_id,
        "date" => $request->date,
        "time" => $request->time,
    ]);
    return response()->json(['message' => 'Reservation created successfully', 'reservation' => $reservation], 201);

}

public function getClinicReservations ($clinicId)
{
    $reservation = Reservation::where("clinic_id" , $clinicId)->get();
    return response()->json($reservation, 200);

}

public function getClinicPatients($clinicId)
{
    $reservations = Reservation::where("clinic_id", $clinicId)->get();
    $patientIds = $reservations->pluck('patient_id');
    $patients = Patient::whereIn('id', $patientIds)->get();
    return response()->json($patients, 200);
}

public function addCondition(Request $request, $clinicId)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'patient_id' => 'required|exists:patients,id',
        'patient_name' => 'required|string|max:255',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
    ]);

    // Create a new condition record
    $condition = new Condition();
    $condition->clinic_id = $clinicId;
    $condition->patient_id = $validatedData['patient_id'];
    $condition->patient_name = $validatedData['patient_name'];
    $condition->title = $validatedData['title'];
    $condition->description = $validatedData['description'];

    // Save the condition to the database
    if ($condition->save()) {
        return response()->json(['message' => 'Condition added successfully'], 200);
    } else {
        return response()->json(['message' => 'Failed to add condition'], 500);
    }
}













    
}
