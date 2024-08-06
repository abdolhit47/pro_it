import Navbar from "../Navbar";
import { useNavigate} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify'
import React, {useEffect, useState} from "react";
import {baseurl} from "../../Baseurl/baseurl";
import axios from "axios";
import useFollowUp from "../../component/search";

function Order() {
    const {
        Data,
        filteredData,
        filter,
        setFilter,
        DataFilter,
        setDataFilter,
        applyFilters,
        getFollowUp
    } = useFollowUp("Order");

    const role = localStorage.getItem('role');
    const array = ["0", "1", "2", "3"];
    const navigate = useNavigate();
    const access = localStorage.getItem('access_token');
    useEffect(()=>{
        if (access === "0") {
            navigate('/profile');
        }
    })
    const handleshow = (id, event) => {
        event.preventDefault();
        if (id) {
            navigate(`/showorder/${id}/`);
        }
    };

     async function approve ($id){
        //console.log($id)
        await axios.put(baseurl+'approve/'+$id,{}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            if(response.data.message === "approved"){
                toast.success("تم الموافقة بنجاح");
                getFollowUp();
            }else if(response.data.message === 'already approved'){
                toast.success("تم الموافقة مسبقا");
                getFollowUp();
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        applyFilters(value, DataFilter);
    };

    const handleOfficeFilterChange = (e) => {
        const value = e.target.value;
        setDataFilter(value);
        applyFilters(filter, value);
    };
    const uniqueOffices = [...new Set(Data.map(item => item.name_office))];

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
                        {array.some(element => element === role) &&
                            <div className="px-6 py-4 flex  " dir={'rtl'}>
                                <label htmlFor="filter" className="mr-2 text-center flex items-center ml-3">بحث: </label>
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 p-2 rounded ml-3"
                                    placeholder="Filter"
                                    value={filter}
                                    onChange={handleFilterChange}
                                />
                                <select
                                    className="border-2 border-gray-300 p-2 rounded ml-2"
                                    value={DataFilter}
                                    onChange={handleOfficeFilterChange}
                                >
                                    <option value="">جميع الجهات</option>
                                    {uniqueOffices.map((office, index) => (
                                        <option key={index} value={office}>{office}</option>
                                    ))}
                                </select>
                            </div>
                        }
                        <div className="px-6 py-4 flex  " dir={'rtl'}>
                            <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-4xl" dir="rtl">
                                <thead className="flex w-full items-center ">
                                    <tr className="border-b text-center flex w-full px-2 mb-4">
                                        <th className="p-3 items-center w-1/8">#</th>
                                        <th className="p-3 items-center w-1/5">الاسم المواطن</th>
                                        <th className="p-3 items-center w-1/5">الجهة/المركز</th>
                                        <th className="p-3 items-center w-1/5">نوع خدمة</th>
                                        <th className="p-3 items-center w-1/5">التاريخ طلب</th>
                                        <th className="p-3 items-center w-1/5">العرض</th>

                                    </tr>
                                </thead>
                                <tbody className=" items-center overflow-y-auto h-auto max-h-80">
                                {
                                    filteredData.map((item,index)=>(
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
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer  position="top-left"/>
        </div>
        </>
    )
}
export default Order