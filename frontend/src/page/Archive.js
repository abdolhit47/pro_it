import Navbar from "./Navbar";
import {Link, useLocation} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

function Archive(props) {
    const location = useLocation()
    const { from } = location.state;
    return (
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    <Navbar />
                    <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  ">
                            <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                                <h1 className="text-2xl text-gray-900 text-right">أرشيف الطلبات</h1>
                                {/*<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>اضافة جهة</button>*/}
                            </div>
                            <div className="px-6 py-4 flex justify-center">
                                <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                    <thead className="flex w-full ">
                                    <tr className="border-b text-center flex w-full px-2 mb-4">
                                        <th className="p-3 w-1/8">#</th>
                                        <th className="p-3 w-1/5">اسم الجهة</th>
                                        <th className="p-3 w-1/5">الخدمة</th>
                                        <th className="p-3 w-1/5">المواطن</th>
                                        <th className="p-3 w-1/5">الموظف</th>
                                        <th className="p-3 w-1/5">الحدث</th>
                                    </tr>
                                    </thead>
                                    <tbody className="flex flex-col items-center overflow-y-auto h-auto max-h-96">
                                    <tr className="text-center hover:bg-orange-100 flex w-full px-2">
                                        <td className="p-3 w-1/8 flex items-center justify-center">1</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                        <td className="p-3 w-1/5 flex items-center justify-center">ok/worning</td>

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
export default Archive