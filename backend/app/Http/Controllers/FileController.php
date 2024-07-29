<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Dompdf\Dompdf;
use Dompdf\Options;
use Barryvdh\Dompdf\Facade as PDF;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index()
    {
        $files = File::all();
        return response()->json($files);
    }

    public function store(Request $request)
    {
        $images = $request->file('files');
        $imagePaths = [];

        // Save the uploaded images and collect their paths
        foreach ($images as $image) {
            $path = $image->store('uploads');
            $imagePaths[] = $path;
        }

        // Generate PDF with images
        $dompdf = new Dompdf();

        // Enable error reporting for Dompdf
        $dompdf->set_option('isHtml5ParserEnabled', true);
        $dompdf->set_option('isRemoteEnabled', true);

        $html = '<html><body>';

        foreach ($imagePaths as $path) {
            $imageUrl = Storage::disk('public')->url($path);
            dd($imageUrl);
            $html .= '<img src="' . $imageUrl . '" style="width: 100%; margin-bottom: 20px;" />';
        }

        $html .= '</body></html>';

        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        $output = $dompdf->output();
        $pdfPath = storage_path('app/public/images2.pdf');
        file_put_contents($pdfPath, $output);

        return response()->json(['pdf_url' => asset('storage/images2.pdf')]);
    }

}
