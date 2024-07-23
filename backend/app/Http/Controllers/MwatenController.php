<?php

namespace App\Http\Controllers;

use App\Models\Mwaten;
use Illuminate\Http\Request;

class MwatenController extends Controller
{
    public function index()
    {
        
        $mwaten = Mwaten::all();
        return response()->json($mwaten);
    }
}
