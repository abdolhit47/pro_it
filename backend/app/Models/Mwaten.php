<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mwaten extends Model
{
    use HasFactory;
    protected $table = "mwaten";
    protected $primaryKey = "id";
    protected $fillable = ['first_name', 'miden_name', 'last_name', 'phone', 'gender', 'maritalStatus', 'address', 'dateOfBirth'
        //,'placeOfBirth','nationalNumber'
    ];
    public $timestamps = true;
    public function Service_Follow_Up()
    {
        return $this->hasMany( Service_Follow_Up::class);
    }
    public function documents(){
        return $this->hasMany(Document::class);
    }
    public function chats(){
        return $this->hasMany(Chat::class);
    }
    public function users(){
        return $this->belongsTo(User::class,"id","id");
    }
}
