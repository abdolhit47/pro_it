<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $table = "document";
    protected $fillable =["name_document","type_document","path_file","date_document","ID_service_follow_up"];
    public $timestamps = true;

    public function documents(){
        return $this->belongsTo(Service_Follow_Up::class,"ID_service_follow_up","id");
    }

}
