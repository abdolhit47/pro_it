<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::all();
        return response()->json($documents);
    }

    public function show($id)
    {
        $document = Document::find($id);
        return response()->json($document);
    }

//    public function store(Request $request)
//    {
//        $request->validate([
//            'name_document' => 'required',
//        ]);
//        $document = Document::create($request->name_document);
//        return response()->json($document, 201);
//    }
}
