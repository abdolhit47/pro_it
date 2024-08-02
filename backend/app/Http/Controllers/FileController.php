<?php

namespace App\Http\Controllers;

use App\Jobs\GeneratePdfJob;
use App\Models\Document;
use App\Models\File;
use App\Models\Service_Follow_Up;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Dompdf\Dompdf;
use Dompdf\Options;
//use Barryvdh\Dompdf\Facade as PDF;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use function Laravel\Prompts\error;

class FileController extends Controller
{
    public function store(Request $request)
    {
        try{
            $user = Auth::user();
            if($user->role != 4){
                return response()->json(['success' => "doesn't have permission"],403);
            }
            $request->validate([
                'files' => 'required|array|max:2048',
                'files.*' => 'required|mimes:pdf,jpg,jpeg,png|max:2048'
            ]);

            $files = $request->file('files');
            $imagePaths = [];
            if($files[0]->getClientMimeType() == 'application/pdf'){
                $path = $files[0]->store('uploads');
                $file = new File();
                $file->name = basename($path); // اسم الملف الأصلي
                $file->size = filesize(public_path($path)); // حجم الملف
                $file->type = 'application/pdf'; // نوع الملف
                $file->path_file = $path; // المسار الذي تم تخزين الملف فيه
                $file->save(); // حفظ سجل الملف في قاعدة البيانات
                //error_log($request->service_id);
                $service_follow_up = new Service_Follow_Up();
                $service_follow_up->file_id = $file->id;
                $service_follow_up->mwaten_id = 2;
                $service_follow_up->service_id = $request->id_service;
                $service_follow_up->save();
                return response()->json(['message' => 'PDF generation in progress'], 201);
            }elseif ($files[0]->getClientMimeType() == 'image/png' || $files[0]->getClientMimeType() == 'image/jpeg' || $files[0]->getClientMimeType() == 'image/jpg') {
                foreach ($files as $file) {// Save the uploaded images and collect their paths
                    $path = $file->store('uploads');
                    $imagePaths[] = $path;
                }
                $destinationPath = 'uploads';
                GeneratePdfJob::dispatch($imagePaths, $destinationPath, $request->id_service);
                return response()->json(['message' => 'PDF generation in progress'], 201);
            }else{
                foreach ($imagePaths as $path) {
                    Storage::delete($path);
                }
                return response()->json(['message' => 'Invalid file type'], 403);
            }
        }catch (\Exception $e){
            return response()->json($e->getMessage(), 403);
        }
    }

    public function showe_service(){
        try {
            if(Auth::check()) {
                $user = Auth::user();
                if (!in_array($user->role, [0, 1, 2, 3])){
                    return response()->json(['success' => "doesn't have permission"], 403);
                }
                if (Auth::user()->role == 0 || Auth::user()->role == 1) {
                    $service = Service_Follow_Up::with('services', 'files', 'mwatens')->where('approve', 0)->get();
                    $service = $service->map(function ($service) {
                        return (object)[
                            'id' => $service->id,
                            'name_mwaten' => $service->mwatens->first_name . ' ' . $service->mwatens->last_name,
                            'name_service' => $service->services->name,
                            'name_office' => $service->services->offices->name,
                            'date' => $service->created_at->format('Y-m-d'),
                        ];
                    });
                    return response()->json($service, 200);
                }
                if (Auth::user()->role == 2 || Auth::user()->role == 3) {
                    $service = Service_Follow_Up::where('approve', 1)->get();
                    return response()->json($service, 200);
                }
            }
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['worning' => $e->getMessage()],400);
        }
    }
    public function showe_trackorder(){
        try {
            if(Auth::check()){
                $user = Auth::user();
                if($user->role != 4){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
            }
            $service = Service_Follow_Up::with('services','files','mwatens')->where('mwaten_id', Auth::user()->mwaten->id)->get();
            if($service->count() == 0){
                return response()->json(['success' => "no data"], 404);
            }
            $service =  $service->map(function ($service) {
                    return (object) [
                        'id' => $service->id,
                        'name_service' => $service->services->name,
                        'name_office' => $service->services->offices->name,
                        'status' => $service->status == 1 ? 'قيد المراجعة' : ($service->status == 2 ? 'تحت العمل' : ($service->status == 3 ? 'مكتمل' : 'مرفوض')),
                        'note' => $service->note,
                        'data' => $service->documents != null ? $service->documents->path_file : null,

                    ];
                });
            return response()->json($service,200);
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['worning' => $e->getMessage()],400);
        }
    }

//    public function showe_service_id($id){
//        try {
//            $service = Service_Follow_Up::with('services','files','mwatens')->where('id',$id)->get();
//            $service =  $service->map(function ($service) {
//                return (object) [
//                    'id' => $service->id,
//                    'name_mwaten' => $service->mwatens->first_name.' '.$service->mwatens->last_name,
//                    'name_service' => $service->services->name,
//                    'name_office' => $service->services->offices->name,
//                    'date' => $service->created_at->format('Y-m-d'),
//                ];
//            });
//            return response()->json($service,200);
//        }catch (\Exception $e) {
//            error_log($e->getMessage());
//            return response()->json(['success' => $e->getMessage()],400);
//        }
//    }

    public function approve($id){
        try {
            $user = Auth::user();
            if(!in_array($user->role, [0, 1])){
                return response()->json(['success' => "doesn't have permission"], 403);
            }

            $service = Service_Follow_Up::find($id);
            if($service->approve == 1){
                return response()->json(['message' => 'already approved'],200);
            }
            $service->status = 2;
            $service->approve = 1;
            $service->approve_by_wzara = Auth::user()->emplyee->offices->id;
            $service->data_approve = date('Y-m-d');
            $service->save();
            return response()->json(['message' => 'approved'],200);
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }
    public function unapprove($id,Request $request){
        try {
            $user = Auth::user();
            if(!in_array($user->role, [0, 1])){
                return response()->json(['success' => "doesn't have permission"], 403);
            }
            $service = Service_Follow_Up::find($id);
            if($service->approve == 2 || $service->approve == 1){
                return response()->json(['message' => 'already unapproved'],200);
            }
            $service->status = 4;
            $service->approve = 2;
            $service->note = $request->note;
            $service->approve_by_wzara = Auth::user()->emplyee->offices->id;
            $service->save();
            return response()->json(['message' => 'unapproved'],200);
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }

    public function downloadFile($filename,$id)
    {
        $user = Auth::user();
        if($user->role != 4){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $path = storage_path('app/' . $filename.'/'.$id);

        if (!file_exists($path)) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        return Response::download($path);
    }

}
