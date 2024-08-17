<?php

namespace Database\Seeders;

use App\Models\CivilRecord;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CivilRecordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // generate random civil records

        $malesCount = 100;
        $femalesCount = 100;

        $startYear = 1950;
        $endYear = 2000;

        $yearsRange = $endYear - $startYear;
        
        $martialStatuses = ['married', 'divorced', 'widowed', 'single'];

        for($i = 0; $i < ($malesCount + $femalesCount); $i++)
        {
            $firstDigit = "1";

            if($i >= ($malesCount - 1))
            {
                $firstDigit = "2";
            }

            $year = $startYear + (int)($i / (($malesCount + $femalesCount) / $yearsRange));

            $paddedIndex = str_pad($i, 3,"0", STR_PAD_LEFT);

            $nationalNumber = $firstDigit.$year.$paddedIndex."1234";

            $civilRecord = new CivilRecord();
            $civilRecord->national_number = $nationalNumber;
            $civilRecord->martial_status = $martialStatuses[$i % 4];
            $civilRecord->has_disability = $i % 2 == 0 ? true : false;

            $civilRecord->save();   
        }
    }
}
