import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import React from "react";

function Chackemail(){

    return(
        <div className="min-h-screen flex items-center justify-center w-full bg-yellow-800">
            <div className="bg-gray-100 shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-900" dir="rtl">شكرا لتسجيلك في موقعنا!</h1>
                    <div className="mb-4"  dir="rtl">
                        <h1 className="text-sm font-medium text-gray-700 mb-2" dir="rtl">تم ارسال رابط التفعيل الى بريدك الالكتروني.</h1>
                        <h1 className="text-sm font-medium text-gray-700 mb-2" dir="rtl">يرجى التحقق من بريدك الالكتروني.</h1>
                    </div>
                    <div className="mb-4"  dir="rtl">
                    </div>
                    <div className="flex items-center justify-between mb-4"  dir="rtl">
                        <Link to="/login" aria-expanded="false" >
                            <span className="text-xl text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">تسجيل الدخول</span>
                        </Link>
                    </div>
            </div>
        </div>
    )
}
export default Chackemail