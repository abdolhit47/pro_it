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
        $services = Service::select('id','name','description')->where('ID_office', $user->emplyee->ID_office)->get();
        if($services->isEmpty()){
            return response()->json(0, 202);
        }
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


    public function show_req_document($id)
    {
        try {
            $user = Auth::user();
            if ($user->role != 4) {
                return response()->json(['success' => "doesn't have permission"], 403);
            }
            $req_document = Req_Document::all()->where('service_id', $id)->first();
            return response()->json($req_document);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => false],400);
        }
    }



    public function getService($id)
    {
        $req_document = Req_Document::with('service')->where('service_id', $id)->first();
        $service = (object)[
            'ID_card' => $req_document->ID_card,
            'birth_certificate' => $req_document->birth_certificate,
            'passport' => $req_document->passport,
            'license' => $req_document->license,
            'medical_certificate' => $req_document->medical_certificate,
            'family_status_certificate' => $req_document->family_status_certificate,
            'service_id' => $req_document->service->id,
            'name' => $req_document->service->name,
            'description' => $req_document->service->description,
        ];

        return response()->json($service,200);
    }

    public function updateService(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required',

            ]);
//            $user = Auth::user();
//            if ($user->role != 1) {
//                return response()->json(['success' => "doesn't have permission"], 403);
//            }
            $service = Service::find($id);
            $service->name = $request->name;
            $service->description = $request->description;
            $service->save();
            $req_document = Req_Document::all()->where('service_id', $id)->first();
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
