<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Office;
use App\Models\Service;
use App\Models\Service_Follow_Up;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OfficeController extends Controller
{
    public function index()
    {
        $offices = Office::with('employees','addresses')->get();
        $office = $offices->map(function ($office) {
            return [
                'id' => $office->id,
                'name' => $office->name,
                'description' => $office->description,
                'address' => $office->addresses->name,
                'employee' => $office->employees->map(function ($office) {return $office->first_name." ".$office->last_name;})//." ".$office->employees->last_name,
            ];
        });
        return response()->json($office);
    }

    public function store(Request $request){
        try {
//            if(Auth::check()){
                $user = Auth::user();
                if(!in_array($user->role,[0,2])){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
//            }
            $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
                'address' => 'required|numeric',
                'user_name' => 'required|string',
                //'user_email' => 'required|email',
            ]);
            $user = User::where('name', $request->user_name)->orWhere('email', $request->user_name."@gmail.com")->first();
            if($user){
                return response()->json(['success' => "user exist"],400);
            }
            $office = new Office();
            $office->name = $request->name;
            $office->description = $request->description;
            $office->ID_address = $request->address;
            $office->save();

            $user = New User();
            $user->name = $request->user_name;
            $user->email = $request->user_name."@gmail.com";
            $user->role = 2;
            $user->password = Hash::make("123456789");
            $user->save();

            $employee = new Employee();
            $employee->ID_office = $office->id;
            $employee->id = $user->id; // Ensure your `Employee` model has a user_id column
            $employee->save();
            return response()->json(['success' => true],201);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }

    public function show($id)
    {
        try {
//            if(Auth::check()){
//                $user = Auth::user();
//                if($user->role != 0){
//                    return response()->json(['success' => "doesn't have permission"],403);
//                }
//            }
            $office = Office::with('addresses','services')->where('id',$id)->first();

            $office = (object) [
                'id' => $office->id,
                'name' => $office->name,
                'description' => $office->description,
                'address' => $office->addresses->name,
                'services' => $office->services->map(function ($service) {
                    return (object) [
                        'id' => $service->id,
                        'name' => $service->name,
                        'description' => $service->description
                    ];
                })
            ];
            return response()->json($office,200);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }

    public function show_mes()
    {
        try {
//            if(Auth::check()){
                $user = Auth::user();
                if(!in_array($user->role, [0, 1, 2, 3, 4])){
                    return response()->json(['success' => "doesn't have permission"],403);
                }
//            }
            $office = Office::all('id','name');
            return response()->json($office,200);
        }catch (Exception $e) {
            error_log($e->getMessage());
            return response()->json(['success' => $e->getMessage()],400);
        }
    }


    public function countServiceFollowUp(){
        $statusDescriptions = [//قيم ابتدائية
            0 => 'في الانتظار',
            1 => 'تحت المراجعة',
            2 => 'قيد التنفيذ',
            3 => 'مكتمل',
            4 => 'مرفوض'
        ];
        $statusesCount = collect($statusDescriptions)->mapWithKeys(function ($description, $status) {
            return [
                $status => [
                    'description' => $description,
                    'count' => 0
                ]
            ];
        });

        $existingStatuses = Service_Follow_Up::whereHas('services', function ($query) {
            $query->where('ID_office', Auth::user()->emplyee->ID_office);
        })->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        $statusesCount = $statusesCount->transform(function ($item, $key) use ($existingStatuses) {
            $statusItem = $existingStatuses->firstWhere('status', $key);
            if ($statusItem) {
                $item['count'] = $statusItem->count;
            }
            return $item;
        });
        $totalCount = Service_Follow_Up::whereHas('services', function ($query) {//count total
            $query->where('ID_office', Auth::user()->emplyee->ID_office);
        })->count();

        $response = [
            'statuses' => $statusesCount,
            'total' => $totalCount
        ];
        return response()->json($response, 200);
    }

    public function filter_countServiceFollowUp(Request $request) {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $filterType = $request->input('filterType'); // either 'month' or 'year'

        $statusDescriptions = [
            0 => 'في الانتظار',
            1 => 'تحت المراجعة',
            2 => 'قيد التنفيذ',
            3 => 'مكتمل',
            4 => 'مرفوض'
        ];

        $statusesCount = collect($statusDescriptions)->mapWithKeys(function ($description, $status) {
            return [
                $status => [
                    'description' => $description,
                    'count' => []
                ]
            ];
        });

        $query = Service_Follow_Up::whereHas('services', function ($query) {
            $query->where('ID_office', Auth::user()->emplyee->ID_office);
        });

        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        if ($filterType === 'month') {
            $query->select(
                DB::raw('DATE(created_at) as date'),
                'status',
                DB::raw('count(*) as count')
            )->groupBy('status', 'date');
        } else if ($filterType === 'year') {
            $query->select(
                DB::raw('MONTH(created_at) as month'),
                'status',
                DB::raw('count(*) as count')
            )->groupBy('status', 'month');
        }

        $existingStatuses = $query->get();

        $statusesCount = $statusesCount->transform(function ($item, $key) use ($existingStatuses, $filterType) {
            $statusItems = $existingStatuses->where('status', $key);
            if ($statusItems->isNotEmpty()) {
                $item['count'] = $statusItems->pluck('count');
                if ($filterType === 'month') {
                    $item['labels'] = $statusItems->pluck('date');
                } else if ($filterType === 'year') {
                    $item['labels'] = $statusItems->pluck('month');
                }
            }
            return $item;
        });

        $totalCountQuery = Service_Follow_Up::whereHas('services', function ($query) {
            $query->where('ID_office', Auth::user()->emplyee->ID_office);
        });

        if ($startDate && $endDate) {
            $totalCountQuery->whereBetween('created_at', [$startDate, $endDate]);
        }

        $totalCount = $totalCountQuery->count();

        $response = [
            'statuses' => $statusesCount,
            'total' => $totalCount
        ];
        return response()->json($response, 200);
    }

    public function show_filterServiceFollowUp() {

        $query = Office::query()
            ->leftJoin('service', 'office.id', '=', 'service.ID_office') // استخدام left join لضمان جلب جميع المكاتب
            ->leftJoin('service_follow_up', 'service.id', '=', 'service_follow_up.service_id') // ربط جدول Service_Follow_Up بجدول services
            ->select(
                'office.id', // تحديد المكتب
                'office.name as office_name', // تحديد اسم المكتب
                DB::raw('count(service_follow_up.id) as total_requests') // حساب العدد الإجمالي للطلبات
            )
            ->groupBy('office.id', 'office.name'); // تجميع النتائج حسب المكتب

        $existingStatuses = $query->get();

        return response()->json($existingStatuses, 200);

    }
}
