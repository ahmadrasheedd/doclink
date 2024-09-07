<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Patient;
use App\Models\Condition;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        "patient_id",
        "clinic_id",
        "date",
        "time",
        "patient_name",
        "reservation_id",
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function condition()
    {
        return $this->hasMany(Condition::class);
    }
}
