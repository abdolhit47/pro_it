<?php

namespace App\Jobs;

use App\Models\File;
use App\Models\Service_Follow_Up;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Dompdf\Dompdf;
use Dompdf\Options;
use iio\libmergepdf\Merger;


class GeneratePdfJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $imagePaths,$pdfPath,$destinationPath,$id_service,$id;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($imagePaths,$pdfPath, $destinationPath, $id_service,$id)
    {
        $this->imagePaths = $imagePaths;
        $this->pdfPath = $pdfPath;
        $this->destinationPath = $destinationPath;
        $this->id_service = $id_service;
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try{
            $dompdf = new Dompdf();
            $dompdf->setOptions(new Options(['isHtml5ParserEnabled' => true, 'isPhpEnabled' => true]));
            $html = '<html><body>';

            foreach ($this->imagePaths as $path) {
                $fileType = Storage::mimeType($path);
                $imageData = Storage::get($path);
                $html .= '<div>
                          <img src="data:image/' . ($fileType == 'image/jpeg' ? 'jpeg' : 'png') . ';base64,' . base64_encode($imageData) . '" style="width:100%;height:auto;"/>
                     </div>';
            }

            $html .= '</body></html>';

            $dompdf->loadHtml($html);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();

            $randomFileName = \Illuminate\Support\Str::random(20) . '.pdf';
            $storedPdfPath = $this->destinationPath . '/' . $randomFileName;
            file_put_contents(public_path($storedPdfPath), $dompdf->output());
            $merger = new Merger;
            $merger->addFile(public_path($storedPdfPath));
            foreach ($this->pdfPath as $path) {
                if (file_exists(public_path($path))) {
                    $merger->addFile(public_path($path));
                } else {
                    response()->json(['error' => 'File not found: ' . $path], 404);
                }
            }
            $mergedPdf = $merger->merge();
            $finalFileName = \Illuminate\Support\Str::random(20) . '_merged.pdf';
            $finalPdfPath = $this->destinationPath . '/' . $finalFileName;
            file_put_contents(public_path($finalPdfPath), $mergedPdf);
            foreach ($this->imagePaths as $path) {
                Storage::delete($path);
            }
            foreach ($this->pdfPath as $path) {
                Storage::delete($path);
            }

            $file = new File();
            $file->name = basename($finalPdfPath); // اسم الملف الأصلي
            $file->size = filesize(public_path($finalPdfPath)); // حجم الملف
            $file->type = 'application/pdf'; // نوع الملف
            $file->path_file = $finalPdfPath; // المسار الذي تم تخزين الملف فيه
            $file->save(); // حفظ سجل الملف في قاعدة البيانات
            $service_follow_up = new Service_Follow_Up();
            $service_follow_up->task_id = random_int(1000, 999999);
            $service_follow_up->file_id = $file->id;
            $service_follow_up->mwaten_id = $this->id;
            $service_follow_up->service_id = $this->id_service;
            $service_follow_up->save();

        }catch (\Exception $e){
            foreach ($this->imagePaths as $path) {
                Storage::delete($path);
            }
            foreach ($this->pdfPath as $path) {
                Storage::delete($path);
            }
        }

    }
}
