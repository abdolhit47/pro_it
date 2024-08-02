<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ServiceController;
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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


    Route::post("/login", [AccountController::class, "login"]);
    Route::get("/logout", [AccountController::class, "logout"])->middleware('auth:sanctum');


    Route::get("/showoffice", [OfficeController::class, "index"])->middleware('auth:sanctum');
    Route::get("/showoffice/{id}", [OfficeController::class, "show"])->middleware('auth:sanctum');
    Route::post("/storeoffice", [OfficeController::class, "store"])->middleware('auth:sanctum');
    Route::get('/show_mes', [OfficeController::class, 'show_mes'])->middleware('auth:sanctum');
    #Route::put("/updateoffice/{id}", [OfficeController::class, "update"])->middleware('auth:sanctum');

    Route::get("/showservice", [ServiceController::class, "index"])->middleware('auth:sanctum');
    #Route::get("/showservice/{id}", [ServiceController::class, "show"])->middleware('auth:sanctum');
    Route::post("/storeservice", [ServiceController::class, "store"])->middleware('auth:sanctum');

    Route::get("/showchat", [ChatController::class, "index"])->middleware('auth:sanctum');
    Route::post("/storechat", [ChatController::class, "new_chat"])->middleware('auth:sanctum');
    Route::post("/sendmessage", [ChatController::class, "sendmessage"])->middleware('auth:sanctum');
    Route::get("/getmessages/{id}", [ChatController::class, "show_message"])->middleware('auth:sanctum');
    Route::put('endchat/{id}', [ChatController::class, 'end_chat'])->middleware('auth:sanctum');
    Route::get('/countMes', [ChatController::class, 'countMes'])->middleware('auth:sanctum');
    Route::put('/update_status2/{id}', [ChatController::class, 'update_status2'])->middleware('auth:sanctum');


    Route::get('/getaddresses', [AddressController::class, "index"])->middleware('auth:sanctum');
    Route::post('/storeaddress', [AddressController::class, "store"])->middleware('auth:sanctum');

    Route::get("/getservicesfollow", [OfficeController::class, "getservicesfollow"]);

    Route::post('/storefollowup', [FileController::class, 'store']);
    Route::get('/getfollowup', [FileController::class, 'showe_service'])->middleware('auth:sanctum');
    Route::get('/gettrackorder', [FileController::class, 'showe_trackorder'])->middleware('auth:sanctum');
    Route::put('/approve/{id}', [FileController::class, 'approve'])->middleware('auth:sanctum');
    Route::post('/unapprove/{id}', [FileController::class, 'unapprove'])->middleware('auth:sanctum');

Route::get('/download/{filename}/{id}', [FileController::class, 'downloadFile']);
