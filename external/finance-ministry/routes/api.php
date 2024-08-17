<?php

use App\Models\AutoNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/financeEnquiry/{nationalNumber}', function (Request $request, $nationalNumber) {
    if(!$request->has('apiKey') || $request->apiKey != env("API_KEY")) 
    {
        return response()->json([], 403);
    }

    $autoNumber = AutoNumber::where("national_number", $nationalNumber)->firstOrFail();

    return response()->json([
        "auto_number" => $autoNumber->auto_number,
        "national_id" => $autoNumber->national_number,
    ], 200);
});