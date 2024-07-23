import Navbar from "./Navbar";
import React, {useState} from "react";
import AddOffice from "../component/addOffice";
function ShowOrder() {

    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4 h-auto">
                        <div class="p-4 px-5 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-3xl text-gray-900 text-right">اسم مواطن</h1>
                        </div>
                        <div class="px-6 py-4" dir={'rtl'}>
                            <p className={"mr-4"}>وصف/معلومات:</p>
                            <p className={"mr-4 mt-6"}>اتقدم أنا المواطن/ة ...........بالطلب خدمة ...... التي تتبع الجهة .... الواقع في المنطقة ....</p>
                            <div className={"my-16 px-6 py-4 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <label className={'mr-2'}>الملف</label>
                                </span>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <label className={'mr-2'}>الملف</label>
                                </span>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <label className={'mr-2'}>الملف</label>
                                </span>
                            </div>
                            <p className={"my-10 mr-4"}>وعليه تم قبول طلبه من قبل الوزارة والرجاء من الجهة المعنية تنفيد الطلب. </p>
                            <div className="flex flex-row justify-center items-center mt-4 ">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  >إصدار الوثيقة</button>
                            <button className="mr-44 py-2 px-4 font-bold border-solid border-2 border-amber-700 hover:bg-amber-700 hover:text-white rounded-md ">رجوع</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ShowOrder