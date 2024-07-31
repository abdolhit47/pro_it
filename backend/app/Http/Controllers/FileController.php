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
use Barryvdh\Dompdf\Facade as PDF;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function index()
    {
        $files = File::all();
        return response()->json($files);
    }

    public function store(Request $request)
    {
        try{
//            if(Auth::check()){
//                $user = Auth::user();
//                if($user->role != 0){
//                    return response()->json(['success' => "doesn't have permission"],403);
//                }
//            }
            $request->validate([
                'files' => 'required|array|max:2048',
                'files.*' => 'required|mimes:pdf,jpg,jpeg,png|max:2048'
            ]);

            $files = $request->file('files');
            $imagePaths = [];
            //dd($files[0]->getClientMimeType());
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
                // Dispatch job to queue with image paths
                GeneratePdfJob::dispatch($imagePaths, $destinationPath, $request->id_service);
                return response()->json(['message' => 'PDF generation in progress'], 201);
            }else{
                return response()->json(['message' => 'Invalid file type'], 403);
            }

        }catch (\Exception $e){
            return response()->json($e->getMessage(), 403);
        }
    }

    public function showe_service(){
        try {
            if(Auth::check()){
                $user = Auth::user();
                if($user->role != 0 && $user->role != 1 && $user->role != 2 && $user->role != 4){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
            }
            if(Auth::user()->role == 0){
                $service = Service_Follow_Up::where('approve', 0)->get();
                return response()->json($service,200);
            }
            if(Auth::user()->role == 1 || Auth::user()->role == 2){
                $service = Service_Follow_Up::where('approve', 1)->get();
                return response()->json($service,200);
            }
            if (Auth::user()->role == 4) {
                $service = Service_Follow_Up::with('services','files','mwatens')->where('mwaten_id', Auth::user()->mwaten->id)->get();
                $service =  $service->map(function ($service) {
                        return (object) [
                            'id' => $service->id,
                            'name_service' => $service->services->name,
                            'name_office' => $service->services->offices->name,
                            'status' => $service->status,
                            'notes' => $service->notes,
                            "id2" =>$service->services->offices->id,
                            'date' => Document::where('send_by',$service->services->offices->id)
                                ->where('resev_by',Auth::user()->mwaten->id)
                                ->first(),
                        ];
                    });
                //                $service = [];
//                foreach ($mwatens as $mwaten){
//                    $service[] = Service_Follow_Up::where('approve', 1)->where('mwaten_id', $mwaten->id)->get();
//                }
                return response()->json($service,200);
            }

        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }
    public function show($id)
    {
        $file = File::find($id);
        return response()->json($file);
    }



}
