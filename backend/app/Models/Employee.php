<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $table = "employee";
    protected $primaryKey = "id";
    protected $fillable = [
        'first_name','middle_name','last_name','gender','date_of_birth','marital_status','phone','address','ID_office','change_password',
    ];

    public $timestamps = true;

    public function offices()
    {
        return $this->belongsTo(Office::class, 'ID_office', 'id');
    }
    public function users(){
        return $this->belongsTo(User::class,"id","id");
    }
}
