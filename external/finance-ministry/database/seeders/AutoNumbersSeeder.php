<?php

namespace Database\Seeders;

use App\Models\AutoNumber;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AutoNumbersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // we will generate random national ids with auto numbers

        $malesCount = 100;
        $femalesCount = 100;

        $startYear = 1950;
        $endYear = 2000;

        $yearsRange = $endYear - $startYear;


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

            $autoNumber = new AutoNumber();
            $autoNumber->national_number = $nationalNumber;
            $autoNumber->auto_number = strrev($nationalNumber);
            $autoNumber->save();
        }
    }
}
