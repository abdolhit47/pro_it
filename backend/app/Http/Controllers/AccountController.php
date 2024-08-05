<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $check_user = $request->only('email', 'password');
        $access_token = auth()->attempt($check_user);#true or false to access_token
        if (!$access_token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $token = auth()->user()->createToken('auth_token',expiresAt: now()->addDay())->plainTextToken;
        $user = auth()->user();
        $user->token = $token;
        return response()->json(['access_token' => $access_token,"username" => $user->name,"token" => $token,"role" => $user->role,"office" => $user->ID_office], 200);
    }

    public function logout()
    {
        if(!auth()->check()){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        #auth()->user()->currentAccessToken()->delete(); #delete current token
        auth()->user()->tokens()->delete(); #delete all tokens
        return response()->json(['message' => 'Logout successfully'], 200);
    }

    public function user()
    {
        $user = Auth::user();
        if(!in_array($user->role, [0, 2])){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $users = Employee::with('users')->where('ID_office',$user->emplyee->ID_office)->where('id','!=',$user->emplyee->id)->get();
        $users = $users->map(function ($users){
            return(object) [
                'id' => $users->id,
            'name' => $users->first_name . " " . $users->last_name,
                'address' => $users->address,
             'user' => $users->users->name,
                'status' => $users->users->status == 1 ? 'مفعل' : 'غير مفعل',
            ];
        });
        return response()->json($users,200);
    }

//    public function store(Request $request){
//        $user = Auth::user();
//        if(!in_array($user->role, [0, 2])){
//            return response()->json(['success' => "doesn't have permission"],403);
//        }
//        $request->validate([
//            'name' => 'required',
//            'email' => 'required',
//            'password' => 'required',
//            'role' => 'required',
//            'ID_office' => 'required',
//        ]);
//        $user = new User();
//        $user->name = $request->name;
//        $user->email = $request->email;
//        $user->password = bcrypt($request->password);
//        $user->role = $request->role;
//        $user->ID_office = $request->ID_office;
//        $user->save();
//        return response()->json(['message' => 'User created successfully'], 200);
//    }

    public function addEmployee(Request $request){
        $user = Auth::user();
        if(!in_array($user->role, [0, 2])){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $request->validate([
            'name' => 'required',
        ]);
        $users = new User();
        $users->name = $request->name;
        $users->password = Hash::make("123456789");
        $users->role = $user->role == 0 ? 1 : 3;

        $users->save();
        $employee = new Employee();
        $employee->ID_office = $user->emplyee->ID_office;
        $users->emplyee()->save($employee);
        return response()->json(['message' => 'User created successfully'], 200);
    }
    public function updateStatus($id){
        $user = Auth::user();
        if(!in_array($user->role, [0, 2])){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $user = User::find($id);

        $user->status = $user->status==0 ? 1 : 0;
        $user->save();
        return response()->json(['message' => 'User updated successfully'], 200);
    }

    public function show_profile(){
        $user = Auth::user();
        if(!in_array($user->role, [0, 1, 2, 3, 4])){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        

        return response()->json($user,200);
    }

}
