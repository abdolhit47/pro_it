<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()#show all chats
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->role == 1) {
                $chats = Chat::where('ID_office', $user->emplyee->offices->id)->get();
                return response()->json($chats);
            }
            if ($user->role == 2) {
                $chats = Chat::with('messages','offices')->where('mwaten_id', $user->mwaten->id)
                    ->where('Status', 'Active')->get();
                return response()->json($chats);
            }
        }
        return response()->json(['success' => "doesn't have permission"], 403);
    }

    public function show_message($id)#show all messages in chat by admin
    {
        $user = Auth::user();
        if($user->role != 1){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $chat = Chat::with('messages')->where('id', $id)->get();
        return response()->json($chat);
    }

    public function new_chat(Request $request)
    {
        $user = Auth::user();
        if($user->role != 2){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        try{
            $request->validate([
                #'mwaten_id' => 'required|numeric',
                'ID_office' => 'required|numeric',
                'Title' => 'required|string',
                'message' => 'required|string',
            ]);
            $user = Auth::user();
            $chat = new Chat();
            $chat->mwaten_id = $user->mwaten->id;
            $chat->ID_office = $request->ID_office;
            $chat->Title = $request->Title;
            $chat->Status = 'Active';
            $chat->date_start = date('Y-m-d');
            $chat->save();
            $message = new Message();
            $message->ID_Chat = $chat->id;
            $message->type = $user->role == 2 ? 'Mwaten' : 'Office';#how sender
            $message->message = $request->message;
            $message->Status = 'Unread';
            $message->Date_send = date('Y-m-d');
            $chat->messages()->save($message);
            return response()->json(['success' => true],201);
        }catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }

    }

    public function sendmessage(Request $request){
        $user = Auth::user();
        $message = Message::where("ID_Chat",$request->ID_Chat)
            ->orderBy('Date_send', 'desc')
            ->first();
        //dd($message);
        if ($message)
        {
            if ($message->Status == 'Unread')
            {
                $message->Status = 'Read';
                $message->save();
            }
        }
        $message = new Message();

        $message->ID_Chat = $request->ID_Chat;
        $message->type = $user->role == 2 ? 'Mwaten' : 'Office';
        $message->message = $request->message;
        $message->Status = 'Unread';
        $message->Date_send = date('Y-m-d H:i:s');
        $message->save();
        return response()->json(['success' => true],201);
    }

    public function end_chat($id){
        $user = Auth::user();
        if($user->role != 1){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $chat = Chat::find($id);
        $chat->Status = 'Inactive';
        $chat->save();
        return response()->json(['success' => true],201);
    }
}
