<?php

namespace App\Http\Controllers;

use App\Models\Service_Follow_Up;
use Illuminate\Http\Request;

class Servicefollow_upController extends Controller
{

    public function index()
    {
        $servicefollow_ups = Service_Follow_Up::with('services','files','mwatens')->latest()->take(5)->get();
        $service =  $servicefollow_ups->map(function ($service) {
            return (object) [
                'id' => $service->id,
                'name_service' => $service->services->name,
                'name_office' => $service->services->offices->name,
                'status' => $service->status == 0 ? 'في الانتظار' : ($service->status == 1 ? 'تحت المراجعة' : ($service->status == 2 ? 'قيد التنفيذ' : ($service->status == 3 ? 'مكتمل' : 'مرفوض'))),
                'data' => $service->documents != null ? $service->documents->path_file : null,
            ];
        });
        return response()->json($service);
    }
}
