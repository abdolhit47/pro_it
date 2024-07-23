<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Office;
use App\Models\Service;
use App\Models\Service_Follow_Up;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class OfficeController extends Controller
{
    public function index()
    {
        $offices = Office::all();
        return response()->json($offices);
    }

    public function store(Request $request){
        try {
            if(Auth::check()){
                $user = Auth::user();
                if($user->role != 0){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
            }
            $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'address' => 'required|numeric',
                'user_name' => 'required|string',
                'user_email' => 'required|email',
            ]);
            $office = new Office();
            $office->name = $request->name;
            $office->description = $request->description;
            $office->ID_address = $request->address;
            $office->save();
            $user = New User();
            $user->name = $request->user_name;
            $user->email = $request->user_email;
            $user->role = 1;

            $user->password = Hash::make("123456789");


            $office->employees()->save($user);
//            Employee::create(
//                [
//                    'id' => $user->id,
//                    'ID_office' => $office->id,
//                ]
//            );
            return response()->json(['success' => true],201);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }

    public function show($id)
    {
        try {
//            if(Auth::check()){
//                $user = Auth::user();
//                if($user->role != 0){
//                    return response()->json(['success' => "doesn't have permission"],403);
//                }
//            }
            $office = Office::with('addresses','services')->where('id',$id)->get();
            $service = $office->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'address' => $service->addresses->name,
                    'services' => $service->services->map(function ($service) {
                        return [
                            'name' => $service->name,
                        ];
                    }),
                ];
            });
            return response()->json([ "offices" => $service]);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }

    }

    public function getservicesfollow(){
        $services = Service_Follow_Up::with("mwatens","services")->get();
        $service = $services->map(function ($service) {
            return [
                'id' => $service->id,
                'name_services' => $service->services->name,
                'name_mwaten' => $service->mwatens->first_name." ".$service->mwatens->last_name,
                'name_office' => $service->services->office->name,
                'name_file' => $service->files->name,
                'status' => $service->status,

            ];
        });
//        $service = $services->map(function ($service) {
//            return [
//                'id' => $service->id,
//                'name' => $service->name,
//            ];
//        });
        return response()->json($service);
    }
}
