import Navbar from "../Navbar";
import { useNavigate} from "react-router-dom";
import AddModel from "../../component/AddModel";

import AddIcon from '@mui/icons-material/Add';
import React, {useState} from "react";
import AddOffice from "../../component/addOffice";

function Order() {

    const navigate = useNavigate();
    const handleshow = () => {
        navigate('/office');
    };
    const [addOffice, setaddOffice] = useState(false);
    const handleadd = ()=>{
        setaddOffice(true)
    }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4  ">
                        <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 className="text-2xl text-gray-900 text-right">تتبع حالة الطلب </h1>
                            {/*<h1 className="text-2xl text-gray-900 text-right">الطلبات</h1>*/}
                            {/*<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>اضافة جهة</button>*/}
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl" onClick={handleshow}>طلب الخدمة<AddIcon/></button>
                        </div>
                        {/*<div className="px-6 py-4 flex  " dir={'rtl'}>*/}
                            <div className={"px-6 py-4  gap-3 flex  flex-col overflow-y-auto h-auto max-h-96 max-w-full"} dir={'rtl'}>
                                <div className={'flex flex-wrap col-span-4 gap-5 my-4'}>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        اسم الجهة
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        اسم الخدمة
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        حالة طلب
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        سبب الرفض
                                    </span>
                                    <button className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-3 w-1/5 rounded" >تحميل الوثيقة</button>
                                </div>
                                <div className={'flex flex-wrap col-span-4 gap-5 my-4'}>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        اسم الجهة
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        اسم الخدمة
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        حالة طلب
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        سبب الرفض
                                    </span>
                                    <button className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-3 w-1/5 rounded" >تحميل الوثيقة</button>
                                </div>
                                <div className={'flex flex-wrap col-span-4 gap-5 my-4'}>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        اسم الجهة
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        اسم الخدمة
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        حالة طلب
                                    </span>
                                    <span className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                        {/*سبب الرفض*/}
                                    </span>
                                    <button className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-3 w-1/5 rounded" >تحميل الوثيقة</button>
                                </div>

                            </div>


                            {/*<table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">*/}
                            {/*    <thead className="flex w-full ">*/}
                            {/*    <tr className="border-b text-center flex w-full px-2 mb-4">*/}
                            {/*        <th className="p-3 w-1/8">#</th>*/}
                            {/*        <th className="p-3 w-1/5">الاسم الجهة</th>*/}
                            {/*        <th className="p-3 w-1/5">وصف</th>*/}
                            {/*        <th className="p-3 w-1/5">المسؤول</th>*/}
                            {/*        <th className="p-3 w-1/5">العنوان</th>*/}
                            {/*        <th className="p-3 w-1/5">العرض</th>*/}
                            {/*        <th className="p-3 w-1/5">التعديل</th>*/}
                            {/*        <th className="p-3 w-1/5">إصدار</th>*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody className="flex flex-col items-center overflow-y-auto h-auto max-h-96">*/}
                            {/*        <tr className="text-center hover:bg-orange-100 flex w-full px-2">*/}
                            {/*            <td className="p-3 w-1/8 flex items-center justify-center">1</td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">test</td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">test</td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">test</td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">test</td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">*/}
                            {/*                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>العرض</button>*/}
                            {/*            </td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">*/}
                            {/*                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">التعديل</button>*/}
                            {/*            </td>*/}
                            {/*            <td className="p-3 w-1/5 flex items-center justify-center">*/}
                            {/*                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">إصدار الوثيقة</button>*/}
                            {/*            </td>*/}
                            {/*        </tr>*/}
                            {/*    </tbody>*/}
                            {/*</table>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
            {addOffice && <AddModel setOpenModal={setaddOffice}/>}

        </>
    )
}
export default Order