<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role == 0 || $user->role == 1 || $user->role == 2 || $user->role == 4) {
            $addresses = Address::all();
            return response()->json($addresses);
        }
        return response()->json(['success' => "doesn't have permission"], 403);
    }

    public function store(Request $request)
    {
        try{
            $user = Auth::user();
            if ($user->role != 0) {
                return response()->json(['success' => "doesn't have permission"], 403);
            }
            $request->validate([
                'name' => 'required',
            ]);
            $address = new Address();
            $address->name = $request->name;
            $address->save();
            return response()->json(['success' => true],201);
        }catch (\Exception $e) {
            return response()->json(['worning' => $e->getMessage()], 500);
        }

    }
}
