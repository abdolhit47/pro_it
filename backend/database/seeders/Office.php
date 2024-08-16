<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Office extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('office')->delete();
        $office =[[
            'id'=>'1',
            'name'=>'الوزارة',
            'description'=>'',
            'ID_address'=>'1'
        ]];
        foreach ($office as $off)
            DB::table('office')->insert($off);
    }
}
