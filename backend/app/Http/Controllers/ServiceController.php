<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\Req_Document;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function index()
    {
//        if (Auth::check()) {
//            $user = Auth::user();
//            if ($user->role != 0) {
//                return response()->json(['success' => "doesn't have permission"], 403);
//            }
//        }
        $user = Auth::user();
        $services = Service::select('name','description')->where('ID_office', $user->emplyee->ID_office)->get();
        return response()->json($services);
    }

//    public function show($id)
//    {
//        $service = Service::all()->where('ID_office', $id);
//        return response()->json($service);
//    }

    public function store(Request $request){
        try {
            $request->validate([
                'name' => 'required',
            ]);
//            if (Auth::check()) {
//
//                if ($user->role != 1) {
//                    return response()->json(['success' => "doesn't have permission"], 403);
//                }
//            }
            $user = Auth::user();
            $service = new Service();
            $service->name = $request->name;
            $service->description = $request->description;
            $service->ID_office = $user->emplyee->ID_office;
            $service->save();
            $req_document = new Req_Document();
            $req_document->ID_card = $request->ID_card?:0;
            $req_document->birth_certificate = $request->birth_certificate?:0;
            $req_document->passport = $request->passport?:0;
            $req_document->license = $request->license?:0;
            $req_document->medical_certificate = $request->medical_certificate?:0;
            $req_document->family_status_certificate = $request->family_status_certificate?:0;
            $req_document->service_id = $service->id;
            $service->req_documents()->save($req_document);
            return response()->json(['success' => true],201);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => false],400);
        }
    }
}
