<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->role != 1) {
                return response()->json(['success' => "doesn't have permission"], 403);
            }
        }
        $services = Service::all();
        return response()->json($services);
    }

//    public function show($id)
//    {
//        $service = Service::all()->where('ID_office', $id);
//        return response()->json($service);
//    }

    public function store(Request $request){
        try {
            $request->validate([
                'name' => 'required',
            ]);
            if (Auth::check()) {
                $user = Auth::user();
                if ($user->role != 1) {
                    return response()->json(['success' => "doesn't have permission"], 403);
                }
            }
            $service = new Service();
            $service->name = $request->name;
            $service->ID_office = $user->emplyee->ID_office;
            $service->save();
            return response()->json(['success' => true],201);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => false],400);
        }
    }
}
