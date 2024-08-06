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
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'password' => 'required',
        ]);
        $login_type = filter_var($request->input('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'name';
        $credentials = [
            $login_type => $request->input('login'),
            'password' => $request->input('password')
        ];

        $access_token = auth()->attempt($credentials);
        if (!$access_token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $token = auth()->user()->createToken('auth_token',expiresAt: now()->addDay())->plainTextToken;
        $user = auth()->user();
        $user->token = $token;
        return response()->json(['access_token' => $user->status,"username" => $user->name,"token" => $token,"role" => $user->role,"office" => $user->ID_office], 200);
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
//                'middle_name' => $request->middleName,
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
            $mwaten->middle_name = $request->middleName;
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
                'middle_name' => $user->mwaten->middle_name,
                'last_name' => $user->mwaten->last_name,
                'phone' => $user->mwaten->phone,
                'address' => $user->mwaten->address,
                'gender' => $user->mwaten->gender,
                'maritalStatus' => $user->mwaten->maritalStatus,
                'dateOfBirth' => $user->mwaten->dateOfBirth,
            ];
        }else{
            $user = User::with('emplyee')->find($user->id);
            $user = (object)[
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'first_name' => $user->emplyee->first_name,
                'middle_name' => $user->emplyee->middle_name,
                'last_name' => $user->emplyee->last_name,
                'phone' => $user->emplyee->phone,
                'address' => $user->emplyee->address,
                'gender' => $user->emplyee->gender,
                'maritalStatus' => $user->emplyee->maritalStatus,
                'dateOfBirth' => $user->emplyee->dateOfBirth,
            ];
        }

        return response()->json($user,200);
    }

    public function update_profile($id,Request $request){
        try {
            $user = Auth::user();
            if(!in_array($user->role, [0, 1, 2, 3, 4])){
                return response()->json(['success' => "doesn't have permission"],403);
            }
//            $request->validate([
//                'first_name' => 'required|string',
//                'middle_name' => 'required|string',
//                'last_name' => 'required|string',
//                'phone' => [
//                    'required',
//                    Rule::unique('mwaten', 'phone')->ignore($userToUpdate->mwaten?->id),
//                    Rule::unique('employee', 'phone')->ignore($userToUpdate->employee?->id)
//                ],                'dateOfBirth' => 'required|Date',
//                //'placeOfBirth' => 'required|string',
//                'gender' => 'required|string',
//                'address' => 'required|string',
//
//                'name' => 'required|string|unique:users,name,' . $user->id . ',id',
//                'email' => 'required|email|unique:users,email,' . $user->id . ',id',
//                'password' => 'required|min:8',
//            ]);
            if ($request->has('email') && $request->email != $user->email) {
                $validator = Validator::make($request->all(), [
                    'email' => 'required|email|unique:users,email,' . $user->id,
                ],[
                    'required' => 'هذا الحقل مطلوب',
                    'unique' => 'هذا مستعمل بالفعل',
                ]);

                if ($validator->fails()) {
                    return response()->json(['error' => $validator->errors()], 422);
                }
            }

            $userToUpdate = User::find($id);
            $userToUpdate->name = $request->name;
            $userToUpdate->email = $request->email;
            $userToUpdate->password = Hash::make($request->password);
            $userToUpdate->save();

            if ($userToUpdate->role == 4) {
                $mwaten = Mwaten::findOrFail($userToUpdate->mwaten->id);
                $mwaten->first_name = $request->first_name;
                $mwaten->middle_name = $request->middle_name;
                $mwaten->last_name = $request->last_name;
                $mwaten->phone = $request->phone;
                $mwaten->address = $request->address;
                $mwaten->gender = $request->gender;
                $mwaten->maritalStatus = $request->maritalStatus;
                $mwaten->dateOfBirth = $request->dateOfBirth;
                $userToUpdate->mwaten()->save($mwaten);
            } else {
                $employee = Employee::findOrFail($userToUpdate->employee->id);
                $employee->first_name = $request->first_name;
                $employee->middle_name = $request->middle_name;
                $employee->last_name = $request->last_name;
                $employee->phone = $request->phone;
                $employee->address = $request->address;
                $employee->gender = $request->gender;
                $employee->marital_status = $request->maritalStatus;
                $employee->dateOfBirth = $request->dateOfBirth;
                $userToUpdate->employee()->save($employee);
            }

            return response()->json(['message' => 'User updated successfully'], 201);
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }

    }

}
