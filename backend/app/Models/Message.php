<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = "message";
    protected $primaryKey = "id";
    protected $fillable = ['ID_Chat','type','message','Status','Date_send'];
    public $timestamps = true;

    public function chat(){
        return $this->belongsTo(Chat::class,"ID_chat","id");
    }

}
