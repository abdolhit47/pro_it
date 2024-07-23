<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $table = "chat";
    protected $primaryKey = "id";
    protected $fillable = ['Title','mwaten_id','ID_office','Status','date_start'];
    public $timestamps = true;

    public function mwatens(){
        return $this->belongsTo(Mwaten::class,"mwaten_id","id");
    }
    public function offices(){
        return $this->belongsTo(Office::class,"ID_office","id");
    }

    public function messages(){
        return $this->hasMany(Message::class,"ID_Chat","id");
    }
}
