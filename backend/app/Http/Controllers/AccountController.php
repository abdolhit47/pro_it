<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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


}
