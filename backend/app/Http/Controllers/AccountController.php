<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Mwaten;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
    public function register(Request $request){
        try {
            $validator =Validator::make($request->all(),[
                'firstName' => 'required|string',
                'middleName' => 'required|string',
                'lastName' => 'required|string',
                'phone' => 'required|unique:mwaten',
                'dateOfBirth' => 'required|Date',
                //'placeOfBirth' => 'required|string',
                'gender' => 'required|string',
                'address' => 'required|string',

                'name' => 'required|string|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:8',
            ],[
                'required' => 'هذا الحقل مطلوب',
                'unique' => 'هذا مستعمل بالفعل',
            ]);
            if ($validator->fails()) {
                error_log($validator->errors());
                return response()->json(['error' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 4,
            ]);
//            $mwaten = Mwaten::create([
//                'first_name' => $request->firstName,
//                'miden_name' => $request->middleName,
//                'last_name' => $request->lastName,
//                'phone' => $request->phone,
//                'address' => $request->address,
//                'gender' => $request->gender,
//                'maritalStatus' => $request->maritalStatus,
//                'dateOfBirth' => $request->dateOfBirth,
//                'placeOfBirth' => $request->placeOfBirth,
//            ]);
            $mwaten = new Mwaten();
            $mwaten->first_name = $request->firstName;
            $mwaten->miden_name = $request->middleName;
            $mwaten->last_name = $request->lastName;
            $mwaten->phone = $request->phone;
            $mwaten->address = $request->address;
            $mwaten->gender = $request->gender;
            $mwaten->maritalStatus = $request->maritalStatus;
            $mwaten->dateOfBirth = $request->dateOfBirth;
            //$mwaten->placeOfBirth = $request->placeOfBirth;
            $mwaten->save();
            $token = Str::uuid();
            $user->verification_token = $token;
            $user->mwaten()->save($mwaten);

            if($user == null) {
                return response()->json(['message' => 'البيانات غير صحيحة'], 400);
            }
//            $type = 'verifyemail';
//            Mail::to($user->email)->send(new UserVerificationEmail($user,$type));

            return response()->json(['message' => 'تمت الاضافة'], 201);
        }catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
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
        if($user->role == 4){
            $user = User::with('mwaten')->find($user->id);
            $user = (object)[
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,

                'first_name' => $user->mwaten->first_name,
                'miden_name' => $user->mwaten->miden_name,
                'last_name' => $user->mwaten->last_name,
                'phone' => $user->mwaten->phone,
                'address' => $user->mwaten->address,
                'gender' => $user->mwaten->gender==1 ? "ذكر" : "انثى",
                'maritalStatus' => $user->mwaten->maritalStatus==2 ? "متزوج" : "مطلق",
                'dateOfBirth' => $user->mwaten->dateOfBirth,


            ];
        }else{
            $user = User::with('emplyee')->find($user->id);
        }

        return response()->json($user,200);
    }

    public function update_profile($id,Request $request){
        try {
            $user = Auth::user();
            if(!in_array($user->role, [0, 1, 2, 3, 4])){
                return response()->json(['success' => "doesn't have permission"],403);
            }
           // dd($request->first_name);
            $request->validate([
                'first_name' => 'required|string',
                'miden_name' => 'required|string',
                'last_name' => 'required|string',
                'phone' => 'required|unique:mwaten,phone,' . $user->mwaten->id . ',id|unique:employee,phone', // Assuming phone is unique in both tables
                'dateOfBirth' => 'required|Date',
                //'placeOfBirth' => 'required|string',
                'gender' => 'required|string',
                'address' => 'required|string',

                'name' => 'required|string|unique:users,name,' . $user->id . ',id',
                'email' => 'required|email|unique:users,email,' . $user->id . ',id',
                'password' => 'required|min:8',
            ]);
            if($user->role == 4){
                $user = User::with('mwaten')->find($id);
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->save();
                $mwaten = Mwaten::find($user->mwaten->id);
                // dd($mwaten);
                $mwaten->first_name = $request->first_name;
                $mwaten->miden_name = $request->miden_name;
                $mwaten->last_name = $request->last_name;
                $mwaten->phone = $request->phone;
                $mwaten->address = $request->address;
                $mwaten->gender = $request->gender;
                $mwaten->maritalStatus = $request->maritalStatus;
                $mwaten->dateOfBirth = $request->dateOfBirth;
                $user->mwaten()->save($mwaten);
            }else{
                $user = User::with('emplyee')->find($id);
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->save();
                $employee = Employee::find($user->emplyee->id);
                $employee->first_name = $request->first_name;
                $employee->miden_name = $request->miden_name;
                $employee->last_name = $request->last_name;
                $employee->phone = $request->phone;
                $employee->address = $request->address;
                $employee->gender = $request->gender;
                $employee->maritalStatus = $request->maritalStatus;
                $employee->dateOfBirth = $request->dateOfBirth;
                $user->emplyee()->save($employee);
            }

            return response()->json(['message' => 'User updated successfully'], 201);
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }

    }

}
