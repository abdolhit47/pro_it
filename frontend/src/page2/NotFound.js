import React from 'react'
import 'react-toastify/dist/ReactToastify.css';


function NotFound() {
    
    return(
        <>
            <div className="min-h-screen flex items-center justify-center w-full bg-gray-900" dir="rtl">
                <div className="bg-gray-100 shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                    <h1 className="text-2xl text-center mb-4 text-gray-900 text-red-700">خطأ <span className="text-red-900 font-bold">404</span> الصفحة غير موجودة</h1>
                    <p className="text-2xl text-center mb-4 text-gray-900">لم يتم العثور على الصفحة التي طلبتها.</p>
                </div>
            </div>
        </>
    )
}
export default NotFound
