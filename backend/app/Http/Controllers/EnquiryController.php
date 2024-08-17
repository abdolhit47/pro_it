<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\Req_Document;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    public function civilRegistryEnquiry($nationalNumber)
    {
        $user = auth()->user();

        // allow all users but not civilians ( mowatens )
        if($user->role == 4)
        {
            return response()->json(["status" => "no_permissions"], 403);
        }

        $httpClient = new \GuzzleHttp\Client();

        try
        {
            $response = $httpClient->get(env("CIVIL_API").'/'.$nationalNumber.'?apiKey='.env('CIVIL_FINANCE_API_KEY'));
        
            if($response->getStatusCode() == 200)
            {
                return response()->json(['status'=> 'success', 'data'=> json_decode($response->getBody())],200);
            }
        }
        catch (Exception $e)
        {
        }

        return response()->json(['status'=> 'error'],404);

    }

    public function financeMinistryEnquiry($nationalNumber)
    {
        $user = auth()->user();

        // allow all users but not civilians ( mowatens )
        if($user->role == 4)
        {
            return response()->json(["status" => "no_permissions"], 403);
        }

        $httpClient = new \GuzzleHttp\Client();

        try
        {
            $response = $httpClient->get(env("FINANCE_API").'/'.$nationalNumber.'?apiKey='.env('CIVIL_FINANCE_API_KEY'));
        
            if($response->getStatusCode() == 200)
            {
                return response()->json(['status'=> 'success', 'data'=> json_decode($response->getBody())],200);
            }
        }
        catch (Exception $e)
        {
        }

        return response()->json(['status'=> 'error'],404);
    }
}
