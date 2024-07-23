import Navbar from "./Navbar";
import React, {useState} from "react";
import AddOffice from "../component/addOffice";
import {useNavigate} from "react-router-dom";
function Office() {
    const [Model, setModel] = useState([]);
    const [addOffice, setaddOffice] = useState(false);
    const handleadd = ()=>{
        setaddOffice(true)
    }
    const navigate = useNavigate()

    const handleshow = ()=>{
        navigate('/showoffice/1')
    }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  ">
                        <div class="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-2xl text-gray-900 text-right">الجهة/المركز</h1>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleadd}>اضافة جهة</button>
                        </div>
                        <div class="px-6 py-4 flex justify-center">
                            <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                <thead className="flex w-full ">
                                <tr className="border-b text-center flex w-full px-2 mb-4">
                                    <th className="p-3 w-1/8">#</th>
                                    <th className="p-3 w-1/5">الاسم الجهة</th>
                                    <th className="p-3 w-1/5">وصف</th>
                                    <th className="p-3 w-1/5">المسؤول</th>
                                    <th className="p-3 w-1/5">العنوان</th>
                                    <th className={"p-3 w-1/5"}>العرض</th>
                                    <th className="p-3 w-1/5">التعديل</th>
                                </tr>
                                </thead>
                                <tbody className="flex flex-col items-center overflow-y-auto h-auto max-h-96">
                                <tr className="text-center hover:bg-orange-100 flex w-full px-2">
                                    <td className="p-3 w-1/8 flex items-center justify-center">1</td>
                                    <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                    <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                    <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                    <td className="p-3 w-1/5 flex items-center justify-center">test</td>
                                    <td className="p-3 w-1/5 flex items-center justify-center">
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>العرض</button>
                                    </td>
                                    <td className="p-3 w-1/5 flex items-center justify-center">
                                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">التعديل</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {addOffice && <AddOffice setOpenModal={setaddOffice}/>}
        </>
    )
}
export default Office