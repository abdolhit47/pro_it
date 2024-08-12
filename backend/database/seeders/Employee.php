<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Employee extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("employee")->delete();
        $employee =[[
            'id'=>'1',
            'ID_office'=>'1',

        ]];
        foreach ($employee as $key => $value)
            DB::table("employees")->insert($value);
    }
}
