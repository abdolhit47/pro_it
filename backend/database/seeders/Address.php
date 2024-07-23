<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Address extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('address')->delete();
        $address =[['name'=>'طرابلس']];
        foreach ($address as $ad)
            DB::table('address')->insert($ad);

    }
}
