<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'clinic_name',
        'location',
        'description',
        "doctor_id",
        "category"
    ];

    public function doctor()
    {
        return $this->belongsTo(User::class);
    }
}
