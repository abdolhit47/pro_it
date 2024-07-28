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
            if ($user->role == 0 || $user->role == 1|| $user->role == 2) {
                $chats = Chat::with('messages')->where('ID_office', $user->emplyee->offices->id)
                    ->get();
                $chat = $chats->map(function ($chat) {
                   return [
                       'id' => $chat->id,
                       'user' => $chat->mwatens->first_name.' '.$chat->mwatens->last_name,
                       'Title' => $chat->Title,
                       'Status' => $chat->Status,
                       'messages' => $chat->messages->sortByDesc('Date_send')->first(),

                   ];

                });
                return response()->json([$chat,'send' => 'Office']);
            }
            if ($user->role == 4) {
                $chats = Chat::with('messages','offices')->where('mwaten_id', $user->mwaten->id)
                    ->where('Status', 'Active')->get();
                $chat = $chats->map(function ($chat) {
                    return [
                        'id' => $chat->id,
                        'user' => $chat->offices->name,
                        'Title' => $chat->Title,
                        'Status' => $chat->Status,
                        'messages' => $chat->messages->sortByDesc('Date_send')->first(),
                    ];
                });
                return response()->json([$chat,'send' => 'Mwaten']);
            }
        }
        return response()->json(['success' => "doesn't have permission"], 403);
    }

    public function countMes(){
        try{
            $mes = Chat::where('Status', 'Active')
                ->whereHas('messages', function ($query) {
                    $query->where('Status', 'Unread');
                })->count();
            return response()->json($mes);
        }catch (\Exception $e){
            return response()->json($e->getMessage(), 403);

        }
    }

    public function update_status($id){
        $user = Auth::user();
        if($user->role != 0 || $user->role != 1|| $user->role != 2|| $user->role != 4){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $chat = Chat::find($id);
        $chat->Status = 'Inactive';
        $chat->save();
        return response()->json(['success' => true]);
    }

    public function update_status2($id){
        try {
            $user = Auth::user();
//            if($user->role != 0 || $user->role != 1|| $user->role != 2|| $user->role != 4){
//                return response()->json(['success' => "doesn't have permission"],403);
//            }
            Message::where('ID_Chat', $id)->where('Status', 'Unread')->update(['Status' => 'Read']);
            //return response()->json(['success' => true]);
        }catch (\Exception $e){
            return response()->json($e->getMessage(), 403);
        }
    }


    public function show_message($id)#show all messages in chat by admin
    {
        $user = Auth::user();
//        if($user->role != 0){
//            return response()->json(['success' => "doesn't have permission"],403);
//        }
        $chat = Chat::with('messages')->where('id', $id)->get();
        $chat = $chat->map(function ($chat) {
            return [
                'id' => $chat->id,
                'Title' => $chat->Title,
                'messages' => $chat->messages
            ];
        });
        return response()->json($chat);
    }

    public function new_chat(Request $request)
    {
        $user = Auth::user();
//        if($user->role != 2){
//            return response()->json(['success' => "doesn't have permission"],403);
//        }
        try{
            $request->validate([
                'office' => 'required|numeric',
                'title' => 'required|string',
                'message' => 'required|string',
            ]);
            $user = Auth::user();
            $chat = new Chat();
            $chat->mwaten_id = $user->mwaten->id;
            $chat->ID_office = $request->office;
            $chat->Title = $request->title;
            $chat->Status = 'Active';
            $chat->date_start = date('Y-m-d');
            $chat->save();
            $message = new Message();
            $message->ID_Chat = $chat->id;
            $message->type = $user->role == 4 ? 'Mwaten' : 'Office';#how sender
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
//        $message = Message::where("ID_Chat",$request->ID_Chat)
//            ->orderBy('Date_send', 'desc')
//            ->first();
//        //dd($message);
//        if ($message)
//        {
//            if ($message->Status == 'Unread')
//            {
//                $message->Status = 'Read';
//                $message->save();
//            }
//        }
        $message = new Message();
        $message->ID_Chat = $request->ID_Chat;
        $message->type = $user->role == 4 ? 'Mwaten' : 'Office';
        $message->message = $request->message;
        $message->Status = 'Unread';
        $message->Date_send = date('Y-m-d H:i:s');
        $message->save();
        return response()->json(['success' => true],201);
    }

    public function end_chat($id){
        $user = Auth::user();
        if($user->role != 1 || $user->role != 0){
            return response()->json(['success' => "doesn't have permission"],403);
        }
        $chat = Chat::find($id);
        $chat->Status = 'Inactive';
        $chat->save();
        return response()->json(['success' => true],201);
    }
}
