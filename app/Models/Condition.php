<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reservation;

class Condition extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'description',
        'patient_name',
        'patient_id', 
        'clinic_id'
    ];
    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
