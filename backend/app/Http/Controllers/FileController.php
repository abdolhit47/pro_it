<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Dompdf\Dompdf;
use Dompdf\Options;

class FileController extends Controller
{
    public function index()
    {
        $files = File::all();
        return response()->json($files);
    }

    public function store(Request $request)
    {
        // التحقق من صحة البيانات مع تحديد أنواع الملفات المسموح بها
        $request->validate([
            'files.*' => 'required|file|mimes:pdf,jpg,jpeg,png', // تحديد أنواع الملفات المسموح بها
            'id_service' => 'required',
        ]);

        // الحصول على المستخدم الحالي
        $user = Auth::user(); // للحصول على معرف المستخدم

        // الحصول على الملفات من الطلب
        $uploadedFiles = $request->file('file');

        // تحديد مكان تخزين الملفات
        $destinationPath = 'uploads'; // يمكنك تعديل هذا المسار حسب الحاجة

//        $pdf = new Dompdf();
//        $pdf->setOptions(new Options(['isHtml5ParserEnabled' => true, 'isPhpEnabled' => true]));

        // متغير لتحديد نوع الملف الذي سيتم تخزينه
        $storedPdfPath = null;
    $files = $uploadedFiles->getFileInfo();
        // تحديد ما إذا كانت هناك صور لتحويلها إلى PDF
    dd($files);
                // إذا كان الملف PDF، قم بتخزينه مباشرة
        foreach ($files as $file) {
                $storedPdfPath = $file->store($destinationPath);

        }




        // تخزين بيانات الملف في قاعدة البيانات
        if ($storedPdfPath) {
            $file = new File();
            //$file->user_id = $user->mwaten->id;
            $file->name = basename($storedPdfPath); // اسم الملف الأصلي
            $file->size = filesize(public_path($storedPdfPath)); // حجم الملف
            $file->type = 'application/pdf'; // نوع الملف
            $file->path_file = $storedPdfPath; // المسار الذي تم تخزين الملف فيه
            //$file->id_service = $request->input('id_service'); // معرف الخدمة
            $file->save(); // حفظ سجل الملف في قاعدة البيانات
        }

        // رد إيجابي بعد نجاح العملية
        return response()->json([
            'success' => true,
            'message' => 'File processed and stored successfully!',
            'file' => $storedPdfPath
        ]);
    }
}
