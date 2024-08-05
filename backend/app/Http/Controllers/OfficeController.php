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
        $offices = Office::with('employees','addresses')->get();
        $office = $offices->map(function ($office) {
            return [
                'id' => $office->id,
                'name' => $office->name,
                'description' => $office->description,
                'address' => $office->addresses->name,
                'employee' => $office->employees->map(function ($office) {return $office->first_name." ".$office->last_name;})//." ".$office->employees->last_name,
            ];
        });
        return response()->json($office);
    }

    public function store(Request $request){
        try {
//            if(Auth::check()){
                $user = Auth::user();
                if(!in_array($user->role,[0,2])){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
//            }
            $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'address' => 'required|numeric',
                'user_name' => 'required|string',
                //'user_email' => 'required|email',
            ]);
            $user = User::where('name', $request->user_name)->orWhere('email', $request->user_name."@gmail.com")->first();
            if($user){
                return response()->json(['success' => "user exist"],400);
            }
            $office = new Office();
            $office->name = $request->name;
            $office->description = $request->description;
            $office->ID_address = $request->address;
            $office->save();

            $user = New User();
            $user->name = $request->user_name;
            $user->email = $request->user_name."@gmail.com";
            $user->role = 2;
            $user->password = Hash::make("123456789");
            $user->save();

            $employee = new Employee();
            $employee->ID_office = $office->id;
            $employee->id = $user->id; // Ensure your `Employee` model has a user_id column
            $employee->save();
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
            $office = Office::with('addresses','services')->where('id',$id)->first();

            $office = (object) [
                'id' => $office->id,
                'name' => $office->name,
                'description' => $office->description,
                'address' => $office->addresses->name,
                'services' => $office->services->map(function ($service) {
                    return (object) [
                        'id' => $service->id,
                        'name' => $service->name,
                        'description' => $service->description
                    ];
                })
            ];
            return response()->json($office,200);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }

    public function show_mes()
    {
        try {
//            if(Auth::check()){
                $user = Auth::user();
                if(!in_array($user->role, [0, 1, 2, 3, 4])){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
//            }
            $office = Office::all('id','name');
            return response()->json($office,200);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }

}
