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
        $files = [];
        foreach ($request->all() as $key => $file) {
            error_log($file);
            if(strpos($key, 'files') === 0) {
                $file->store('public/uploads');
            }
        }


        }
}
