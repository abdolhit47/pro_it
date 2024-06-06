
import axios from "axios";
import Navbar from "./Navbar";
import { baseurl } from '../Baseurl/baseurl';
import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify";

function User() {
    const navigate = useNavigate()
    const handleshow = (index, event) => {
        event.preventDefault();
        if (index) {
            navigate(`/showprofile/${index}/`);
        }
    };

    return (    
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between mt-20 h-auto w-[calc(100%-16rem)]">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  ">
                        <div class="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-2xl text-gray-900 text-right">الموظفون</h1> 
                        </div>
                        <div class="px-6 py-4 flex justify-center">
                            <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                <thead className="flex w-full ">
                                    <tr className="border-b text-center flex w-full  mb-4">
                                        <th className="p-3 w-1/8">#</th>
                                        <th className="p-3 w-1/5">الاسم</th>
                                        <th className="p-3 w-1/5">رقم الهاتف</th>
                                        <th className="p-3 w-1/5">الجنس</th>
                                        <th className="p-3 w-1/5">اسم المستخدم</th>
                                        <th className="p-3 w-1/5">العرض</th>
                                    </tr>
                                </thead>
                                <tbody className="flex flex-col items-center overflow-y-scroll h-auto max-h-96">
                                    <tr className="text-center hover:bg-orange-100 flex w-full">
                                        <td className="p-3 w-1/8 flex items-center justify-center">1</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">العرض</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default User 