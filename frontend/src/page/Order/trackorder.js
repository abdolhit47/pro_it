import Navbar from "../Navbar";
import { useNavigate} from "react-router-dom";
import AddModel from "../../component/AddModel";

import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseurl,urls} from "../../Baseurl/baseurl";

function Order() {
    const access = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const handleshow = () => {
        navigate('/office');
    };
    const [addOffice, setaddOffice] = useState(false);
    const handleadd = ()=>{
        setaddOffice(true)
    }
    const [serviceFollowUp, getserviceFollowUp] = useState([]);

    async function getfollowup(){
        await axios.get(baseurl+'gettrackorder', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            getserviceFollowUp(response.data);
        }).catch((error) => {
            console.log(error);

        })
        // if(response.states === 200){
        //     getserviceFollowUp(response.data);
        // }else if(response.states === 404){
        //     getserviceFollowUp([]);
        // }

    }

    useEffect(() => {
        if (access ==='0') {
            navigate('/profile');
        }
        getfollowup();
    }, []);

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

                        {serviceFollowUp.length > 0 ?
                            <div className={'flex flex-wrap col-span-4 gap-5 my-4'} dir={'rtl'}>
                                <span className=" font-bold text-black border-b-2 border-gray-300 px-3 py-2 w-1/6">
                                    رقم الطلب
                                </span>
                                <span className=" font-bold text-black border-b-2 border-green-500 px-3 py-2 w-1/6">
                                                    نوع الخدمة
                                </span>
                                <span className=" font-bold text-black border-b-2 border-green-500 px-3 py-2 w-1/6">
                                                    المركز/الجهة
                                </span>
                                <span className={" font-bold border-red-500 text-black border-b-2 px-3 py-2 w-1/6"}>
                                                    الحالة
                                </span>
                            </div>:null
                        }
                        <div className={"px-6 py-4  gap-3 flex  flex-col overflow-y-auto h-auto max-h-96 max-w-full"} dir={'rtl'}>
                                {
                                    serviceFollowUp.length === 0 ? (
                                        <div className={'flex flex-wrap col-span-4 gap-5 my-4'}>
                                            <span className="bg-gray-100  text-black text-center rounded-md px-3 py-2 w-full text-3xl">
                                                لا يوجد طلبات
                                            </span>
                                        </div>
                                    ):

                                    (<>

                                        {serviceFollowUp.map((item, index) => (
                                                <div className={'flex flex-wrap col-span-4 gap-5 my-4 '}>
                                                <span
                                                    className="bg-gray-100  text-black border-r-8 border-gray-300 rounded-md px-3 py-2 w-1/6">
                                                    {item.ticket}
                                                </span>

                                                    <span
                                                        className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                                    {item.name_office}
                                                </span>

                                                    <span
                                                        className="bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6">
                                                    {item.name_service}
                                                </span>

                                                    <span
                                                        className={`${item.status === "مرفوض" ? "bg-gray-100 border-red-500 text-black border-r-8 rounded-md px-3 py-2 w-1/6" : (item.status === "مكتمل" ? "bg-gray-100  text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/6" : "bg-gray-100  text-black border-r-8 border-amber-500 rounded-md px-3 py-2 w-1/6")}`}>
                                                    {item.status}
                                                </span>

                                                    <span
                                                        className={`${item.note == null ? "  px-3 py-2 w-1/6" : "bg-gray-100  text-black border-2 border-red-500 rounded-md px-3 py-2 w-1/6"}`}>
                                                    {item.note}
                                                </span>

                                                    {item.data != null && item.status === "مكتمل" ? (
                                                        <button
                                                            className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-3 w-1/5 rounded">
                                                            <a href={`${baseurl}download/${item.data}`} download>تحميل
                                                                الوثيقة</a>
                                                        </button>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </>)
                                }

                </div>
                    </div>
                </div>
            </div>
        </div>
            {addOffice && <AddModel setOpenModal={setaddOffice}/>}

        </>
    )
}
export default Order