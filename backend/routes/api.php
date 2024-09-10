<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\Servicefollow_upController;
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

    /***Account****/
    Route::post("/login", [AccountController::class, "login"]);
    Route::get("/logout", [AccountController::class, "logout"])->middleware('auth:sanctum');
    Route::post('/register', [AccountController::class, 'register']);
    Route::post('/chackemail',[AccountController::class,'chackemail']);
    Route::post('/passwordreset/{id}/{token}',[AccountController::class,'passwordreset']);


    Route::get("/Showemployee", [AccountController::class, "user"])->middleware('auth:sanctum');
    Route::post('/addEmployee', [AccountController::class, 'addEmployee'])->middleware('auth:sanctum');
    Route::put('/update/{id}', [AccountController::class, 'updateStatus'])->middleware('auth:sanctum');
    Route::get('/show_profile', [AccountController::class, 'show_profile'])->middleware('auth:sanctum');
    Route::post('/update_profile/{id}', [AccountController::class, 'update_profile'])->middleware('auth:sanctum');

    /****End Account****/


    /****Office****/
    Route::get("/showoffice", [OfficeController::class, "index"])->middleware('auth:sanctum');
    Route::get("/getshow", [OfficeController::class, "getshow"]);
    Route::get("/showofficeH/{id}", [OfficeController::class, "indexH"]);
    Route::get("/showoffice/{id}", [OfficeController::class, "show"])->middleware('auth:sanctum');
    Route::post("/storeoffice", [OfficeController::class, "store"])->middleware('auth:sanctum');
    Route::get('/show_mes', [OfficeController::class, 'show_mes'])->middleware('auth:sanctum');
    #Route::put("/updateoffice/{id}", [OfficeController::class, "update"])->middleware('auth:sanctum');
    Route::get('/countServiceFollowUp', [OfficeController::class, 'countServiceFollowUp'])->middleware('auth:sanctum');
    Route::post('/filter_countServiceFollowUp', [OfficeController::class, 'filter_countServiceFollowUp'])->middleware('auth:sanctum');
    Route::get('/show_filterServiceFollowUp', [OfficeController::class, 'show_filterServiceFollowUp'])->middleware('auth:sanctum');
    Route::get('/randomOffice', [OfficeController::class, 'randomOffice'])->middleware('auth:sanctum');
    /****End Office****/


    /****Service****/
    Route::get("/showservice", [ServiceController::class, "index"])->middleware('auth:sanctum');
    #Route::get("/showservice/{id}", [ServiceController::class, "show"])->middleware('auth:sanctum');
    Route::post("/storeservice", [ServiceController::class, "store"])->middleware('auth:sanctum');
    Route::get('/getService/{id}', [ServiceController::class, 'getService'])->middleware('auth:sanctum');
    Route::put('/updateService/{id}', [ServiceController::class, 'updateService'])->middleware('auth:sanctum');
    /****End Service****/


    /****Message Chat****/
    Route::get("/showchat", [ChatController::class, "index"])->middleware('auth:sanctum');
    Route::post("/storechat", [ChatController::class, "new_chat"])->middleware('auth:sanctum');
    Route::post("/sendmessage", [ChatController::class, "sendmessage"])->middleware('auth:sanctum');
    Route::get("/getmessages/{id}", [ChatController::class, "show_message"])->middleware('auth:sanctum');
    Route::put('endchat/{id}', [ChatController::class, 'end_chat'])->middleware('auth:sanctum');
    Route::get('/countMes', [ChatController::class, 'countMes'])->middleware('auth:sanctum');
    Route::put('/update_status2/{id}', [ChatController::class, 'update_status2'])->middleware('auth:sanctum');
    Route::put('/end_chat/{id}', [ChatController::class, 'end_chat'])->middleware('auth:sanctum');
    /****End Message Chat****/


    /****City****/
    Route::get('/getaddresses', [AddressController::class, "index"])->middleware('auth:sanctum');
    Route::post('/storeaddress', [AddressController::class, "store"])->middleware('auth:sanctum');
    /****End City****/


    /****File && Service Follow Up****/
    Route::post('/storefollowup', [FileController::class, 'store'])->middleware('auth:sanctum');//upload file and store service follow up
    Route::get('/getfollowup', [FileController::class, 'showe_service'])->middleware('auth:sanctum');
    Route::get('/gettrackorder', [FileController::class, 'showe_trackorder'])->middleware('auth:sanctum');
//    Route::put('/send_wezara/{id}', [FileController::class, 'send_wezara'])->middleware('auth:sanctum');
    Route::put('/approve/{id}', [FileController::class, 'approve'])->middleware('auth:sanctum');
    Route::post('/unapprove/{id}', [FileController::class, 'unapprove'])->middleware('auth:sanctum');
    Route::get("/getservicesfollow/{id}", [FileController::class, "getservicesfollow"])->middleware('auth:sanctum');
    Route::get('/download/{filename}/{id}', [FileController::class, 'downloadFile']);
    Route::post('/uploaddoc/{id}',[FileController::class,'uploadDoc'])->middleware('auth:sanctum');
    /****End File && Service Follow Up****/


    /****Req Document****/
    Route::get('/show_req_document/{id}', [ServiceController::class, 'show_req_document'])->middleware('auth:sanctum');
    /****End Req Document****/

    /****Service_Follow_Up****/
    Route::get('/showlast_service_follow_up', [Servicefollow_upController::class, 'index'])->middleware('auth:sanctum');
    /****End Service_Follow_Up****/

    // Enquiry
    Route::get('/civilRegistryEnquiry/{nationalNumber}', [EnquiryController::class, 'civilRegistryEnquiry'])->middleware('auth:sanctum');
    Route::get('/financeMinistryEnquiry/{nationalNumber}', [EnquiryController::class, 'financeMinistryEnquiry'])->middleware('auth:sanctum');
