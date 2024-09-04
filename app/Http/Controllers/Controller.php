<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patient;
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
    



}
