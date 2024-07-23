<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service_Follow_Up extends Model
{
    use HasFactory;

    protected $table = "service_follow_up";
    protected $primaryKey = "id";
    protected $fillable = ['service_id','file_id','mwaten_id','status'];
    public $timestamps = true;

    public function mwatens(){
        return $this->belongsTo(Mwaten::class,"mwaten_id",'id');
    }
    public function files(){
        return $this->belongsTo(File::class,"file_id",'id');
    }
    public function services(){
        return $this->belongsTo(Service::class,"service_id",'id');
    }
}
