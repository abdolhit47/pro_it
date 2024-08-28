<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service_Follow_Up extends Model
{
    use HasFactory;

    protected $table = "service_follow_up";
    protected $primaryKey = "id";
    protected $fillable = ['task_id','service_id','file_id','mwaten_id','status','note','approve','approve_by_wzara','date_approve'];
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
    public function documents(){
        return $this->hasOne(Document::class,"ID_service_follow_up",'id');
    }
}
