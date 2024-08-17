<?php

use App\Models\CivilRecord;
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

Route::get('/civilEnquiry/{nationalNumber}', function (Request $request, $nationalNumber) {
    if(!$request->has('apiKey') || $request->apiKey != env("API_KEY")) 
    {
        return response()->json([], 403);
    }

    $civilRecord = CivilRecord::where("national_number", $nationalNumber)->firstOrFail();

    return response()->json([
        "national_id" => $civilRecord->national_number,
        "martial_status" => $civilRecord->martial_status,
        "has_disability" => $civilRecord->has_disability
    ], 200);
});