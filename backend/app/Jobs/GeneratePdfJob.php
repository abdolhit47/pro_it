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

class GeneratePdfJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $imagePaths,$destinationPath,$id_service,$id;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($imagePaths, $destinationPath, $id_service,$id)
    {
        $this->imagePaths = $imagePaths;
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
            //dd($storedPdfPath);
            file_put_contents(public_path($storedPdfPath), $dompdf->output());
            $file = new File();
            $file->name = basename($storedPdfPath); // اسم الملف الأصلي
            $file->size = filesize(public_path($storedPdfPath)); // حجم الملف
            $file->type = 'application/pdf'; // نوع الملف
            $file->path_file = $storedPdfPath; // المسار الذي تم تخزين الملف فيه
            $file->save(); // حفظ سجل الملف في قاعدة البيانات
            // Delete images after PDF is generated
            $service_follow_up = new Service_Follow_Up();
            $service_follow_up->task_id = random_int(1000, 999999);
            $service_follow_up->file_id = $file->id;
            $service_follow_up->mwaten_id = $this->id;
            $service_follow_up->service_id = $this->id_service;
            $service_follow_up->save();
            foreach ($this->imagePaths as $path) {
                Storage::delete($path);
            }
        }catch (\Exception $e){
            foreach ($this->imagePaths as $path) {
                Storage::delete($path);
            }
        }

    }
}
