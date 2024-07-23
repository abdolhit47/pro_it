<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class User extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("users")->delete();
        $user =[[
            'name'=>'abdolhit',
            'email'=>'dogy2026@gmail.com',
            'password'=>Hash::make('123456789'),
            'role'=>0
        ]];
        foreach ($user as $key => $value)
            DB::table("users")->insert($value);
    }
}
