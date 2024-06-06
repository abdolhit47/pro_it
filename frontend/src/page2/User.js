
import axios from "axios";
import Navbar from "./Navbar";
import { baseurl } from '../Baseurl/baseurl';
import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify";

function User() {
    const tokenRef = useRef(localStorage.getItem('token'));
    const navigate = useNavigate()
    const role = localStorage.getItem('role');
    const [users,getusers]=useState([]);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    async function getalluser(){
        setIsLoading(true);
        try{
            const res = await axios.get(baseurl+"showUser",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });
            if(res.status===200){
                getusers(res.data);
            }else{
                //error show data
            }
        }catch(error){
            //error
        }finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (tokenRef.current) {
            if (role == 0) {
                navigate("/Dashboard");
            }else
                getalluser(tokenRef.current);
        } else {
            navigate("/");
            toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
        }
      }, [0]);

    const handleshow = (index, event) => {
        event.preventDefault();
        if (index) {
            navigate(`/showprofile/${index}/`);
        }
    };

    return (    
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100vw-16rem)] mt-10">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12 ">
                        <div class="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-2xl text-gray-900 text-right">مستخدمون</h1> 
                        </div>
                        <div class="px-6 py-4 flex justify-center">
                            {isLoading ? (
                                    // Display loading indicator while data is being fetched
                                <div className="flex items-center"> {/* Center the content horizontally */}
                                    <img className="w-12 h-12 animate-spin mr-4" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" /> {/* Add margin for spacing */}
                                    <span className="text-xl font-bold">جاري التحميل...</span>
                                </div>
                                ) : (
                                <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                    <thead className="flex w-full ">
                                    <tr className="border-b text-center flex w-full  mb-4">
                                        <th className="p-3 w-1/8">#</th>
                                        <th className="p-3 w-1/5">الاسم</th>
                                        <th className="p-3 w-1/5">رقم الهاتف</th>
                                        <th className="p-3 w-1/5">الجنس</th>
                                        <th className="p-3 w-1/5">اسم المستخدم</th>
                                        <th className="p-3 w-1/5">العرض</th>
                                    </tr>
                                    </thead>
                                    <tbody className="flex flex-col items-center overflow-y-scroll h-auto max-h-96">
                                    {Array.isArray(users)&&(users.map((user,index)=>(
                                        <tr className="text-center hover:bg-orange-100 flex w-full">
                                            <td className="p-3 w-1/8 flex items-center justify-center">{index+1}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{user.firstName + " " +user.middleName+ " " + user.lastName}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{user.phone}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{user.gender}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{user.userName}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={(event) =>handleshow(user.id, event)}>العرض</button>
                                            </td>
                                        </tr>
                                    )))}

                                    </tbody></table>
                                )}


                        </div>
                    </div>
                </div>


            </div>
        </div>
        </>
    )
}
export default User 