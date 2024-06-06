import Navbar from './Navbar'
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import axios from "axios";
import { baseurl } from '../Baseurl/baseurl';
function Dashboard() {
    const tokenRef = useRef(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const role = localStorage.getItem('role');

    return (
    <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100vw-16rem)] mt-10">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12 ">
                        <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            {
                                role == 1 ? (
                                        <h1 class="text-2xl text-gray-900 text-right ">البيانات الإحصائية</h1>
                                ):(
                                        <h1 class="text-2xl text-gray-900 text-right ">الدليل</h1>
                                )
                            }
                        </div>
                        <div class="px-3 py-4 flex justify-center">
                            {isLoading ? (
                                <div className="flex items-center">
                                    <img className="w-12 h-12 animate-spin mr-4" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" /> {/* Add margin for spacing */}
                                    <span className="text-xl font-bold">جاري التحميل...</span>
                                </div>
                                ) : (role == 1 ?(
                                    <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                        <thead className="flex w-full ">
                                        <tr className="border-b text-center flex w-full  mb-4">
                                            <th className="p-3 w-1/8">#</th>
                                            <th className="p-3 w-1/4">اسم المستخدم</th>
                                            <th className="p-3 w-1/4">اسم النموذج</th>
                                            <th className="p-3 w-1/4">عدد الرسائل</th>
                                            <th className="p-3 w-1/4">التاريخ</th>
                                        </tr>
                                        </thead>
                                        <tbody className="flex flex-col items-center overflow-y-scroll h-auto max-h-96">
                                        <tr className="text-center hover:bg-orange-100 flex w-full">
                                            <td className="p-3 w-1/8 flex items-center justify-center">1</td>
                                            <td className="p-3 w-1/4 flex items-center justify-center">1</td>
                                            <td className="p-3 w-1/4 flex items-center justify-center">1</td>
                                            <td className="p-3 w-1/4 flex items-center justify-center">1</td>
                                            <td className="p-3 w-1/4 flex items-center justify-center">1</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                ):(
                                    <span className="text-xl font-bold">قريبا...</span>
                                )

                                )
                            }
                        </div>
                    </div>         
                </div><ToastContainer position="top-left" />
            </div>
        </div>
        </>
    );
}
export default Dashboard