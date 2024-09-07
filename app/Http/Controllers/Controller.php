<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patient;
use App\Models\Reservation;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function signup(Request $request)
    {
       

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,  // Ensure you have a column 'clinic_name' in your users table
            'password' => Hash::make($request->password),
        ]);

        // Return a success response
        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }


    public function signin(Request $request)
    {
    

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Authentication was successful
            $user = Auth::user();
            return response()->json(['message' => 'Sign in successful', 'user' => $user, 'clinic' => $user->clinic], 200);
        } else {
            // Authentication failed
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }



    public function patientSignup(Request $request)
    {
        $dateOfBirth = Carbon::parse($request->date_of_birth);
    $age = $dateOfBirth->age;

        // Create a new patient
        $user = Patient::create([
            'name' => $request->name,
            'email' => $request->email,
            'age' => $age,  
            'address' => $request->address,
            'password' => $request->password,
            'phone_number' => $request->phoneNumber
        ]);

        // Return a success response
        return response()->json(['message' => 'Patient created successfully', 'patient' => $user], 201);
    }

    public function patientSignin(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
    
        // Attempt to authenticate the patient using the 'patient' guard
        if (Auth::guard('patient')->attempt(['email' => $request->email, 'password' => $request->password])) {
            // Authentication was successful
            $user = Auth::guard('patient')->user();
            return response()->json(['message' => 'Sign in successful', 'patient' => $user], 200);
        } else {
            // Authentication failed
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }


    public function getUserClinicStats($userId)
    {
        // Fetch the clinics associated with the user
        $user = User::with('clinic')->find($userId);
    
        if (!$user || !$user->clinic) {
            return response()->json(['message' => 'User or clinic not found'], 404);
        }
    
        // Fetch the clinic IDs
        $clinicIds = $user->clinic->pluck('id');
    
        // Get the number of unique patients from the reservations table
        $uniquePatientsCount = Reservation::whereIn('clinic_id', $clinicIds)
                                          ->distinct('patient_id')
                                          ->count('patient_id');
    
        // Get the total number of reservations for the user's clinics
        $totalReservationsCount = Reservation::whereIn('clinic_id', $clinicIds)
                                             ->count();
    
        return response()->json([
            'unique_patients' => $uniquePatientsCount,
            'total_reservations' => $totalReservationsCount,
            'user_name' => $user->name,
            'clinic_category' => $user->clinic->category,
            'user_email' => $user->email,
            'user_phone' => $user->phone
        ], 200);
    }
    public function updateUser(Request $request, $userId)
{
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $user->name = $request->input('name');
    $user->phone = $request->input('phone');
    $user->email = $request->input('email');

    if ($request->input('password')) {
        $user->password = bcrypt($request->input('password'));
    }

    $user->save();

    return response()->json(['message' => 'User details updated successfully!'], 200);
}
    



}
