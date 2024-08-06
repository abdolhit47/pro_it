<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Req_Document extends Model
{
    use HasFactory;

    protected $table = 'req_documents';

    protected $primaryKey = 'id';
    protected $fillable = [
        'ID_card',
        'birth_certificate',
        'passport',
        'license',
        'medical_certificate',
        'family_status_certificate',
        'service_id',
    ];
    public $timestamps = true;


    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
