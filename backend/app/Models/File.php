<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $table = "file";
    protected $fillable =["name","type","size","path_file","description","status"];
    public $timestamps = true;

    public function Service_Follow_Up()
    {
        return $this->hasMany( Service_Follow_Up::class);
    }
}
