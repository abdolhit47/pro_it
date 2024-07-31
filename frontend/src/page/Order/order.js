import Navbar from "../Navbar";
import { useNavigate} from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { red } from '@mui/material/colors';

import React, {useEffect, useState} from "react";
import {baseurl} from "../../Baseurl/baseurl";
import axios from "axios";

function Order() {

    const navigate = useNavigate();
    const handleshow = (id, event) => {
        event.preventDefault();
        if (id) {
            navigate(`/showorder/${id}/`);
        }
    };
    const [serviceFollowUp, getserviceFollowUp] = useState([]);

    async function getfollowup(){
        const response = await axios.get(baseurl+'getfollowup', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        getserviceFollowUp(response.data);
    }

    useEffect(() => {
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
                            <h1 className="text-2xl text-gray-900 text-right">الطلبات</h1>
                            {/*<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>اضافة جهة</button>*/}
                        </div>
                        <div className="px-6 py-4 flex  " dir={'rtl'}>
                            <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-4xl" dir="rtl">
                                <thead className="flex w-full items-center ">
                                <tr className="border-b text-center flex w-full px-2 mb-4">
                                    <th className="p-3 items-center w-1/8">#</th>
                                    <th className="p-3 items-center w-1/5">الاسم المواطن</th>
                                    <th className="p-3 items-center w-1/5">الجهة/الركز</th>
                                    <th className="p-3 items-center w-1/5">نوع خدمة</th>
                                    <th className="p-3 items-center w-1/5">التاريخ طلب</th>
                                    <th className="p-3 items-center w-1/5">العرض</th>
                                    <th className="p-3 items-center w-1/5">قبول/الرفض</th>
                                    <th className="p-3 items-center w-1/5">إصدار الوثيقة</th>
                                </tr>
                                </thead>
                                <tbody className="flex items-center overflow-y-auto h-auto max-h-96">
                                {
                                    serviceFollowUp.map((item,index)=>(
                                        <tr className="text-center hover:bg-orange-100 flex w-full px-2">
                                            <td className="p-3 w-1/8 flex items-center justify-center">{index+1}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{item.name_mwaten}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{item.name_office}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{item.name_service}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{item.date}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">
                                                <button className="border-2 border-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded"
                                                        onClick={(event)=>handleshow(item.id,event)}>العرض</button>
                                            </td>
                                            <td className="p-3 w-1/5 flex items-center justify-between">
                                                <button ><CheckCircleOutlineIcon color="success" fontSize="large"/></button>
                                                <button  ><CancelIcon sx={{ color: red[500] }} fontSize="large"/></button>
                                            </td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">
                                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">إصدار الوثيقة</button>
                                            </td>
                                        </tr>
                                    ))
                                }

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
export default Order