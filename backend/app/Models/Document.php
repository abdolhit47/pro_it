<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $table = "document";
    protected $fillable =["name_document","resev_by","send_by","date_aprove"];
    public $timestamps = true;

    public function office(){
        return $this->belongsTo(Office::class,"send_by","id");
    }

    public function mwaten(){
        return $this->belongsTo(Mwaten::class,"resev_by","id");
    }
}
