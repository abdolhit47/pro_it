<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;
    protected $table = "office";
    protected $primaryKey = "id";
    protected $fillable =["name","description","ID_address"];
    public $timestamps = true;


    public function services(){
        return $this->hasMany(Service::class,"ID_office",'id');
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }

    public function chats(){
        return $this->hasMany(Chat::class);
    }

    public function employees(){
        return $this->hasMany(Employee::class,"ID_office",'id');
    }

    public function addresses(){
        return $this->belongsTo(Address::class,"ID_address",'id');
    }
}
