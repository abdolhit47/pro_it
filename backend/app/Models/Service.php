<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table = "service";
    protected $primaryKey = "id";
    protected $fillable = ["name","ID_office"];
    public $timestamps = true;

    public function offices(){
        return $this->belongsTo(Office::class,"ID_office",'id');
    }

    public function Service_Follow_Up()
    {
        return $this->hasMany( Service_Follow_Up::class);
    }

}
