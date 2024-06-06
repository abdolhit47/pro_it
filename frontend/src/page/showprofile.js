import Navbar from "./Navbar";
import React, { useRef,useState,useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios';

function ShowProfile() {
    const tokenRef = useRef(localStorage.getItem('token'));
    const { id } = useParams();


    const [user,getuser] = useState([]);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    async function getuserInfo(){
        setIsLoading(true);
        try{
            const res = await axios.post(baseurl + `getuser/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${tokenRef.current}`,
                },
            });

            if(res.status===200){
                getuser(res.data);
            }
            else{
                ///error show data
            }
        }catch(error){
            //error
        }finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (tokenRef.current) {
            getuserInfo(tokenRef.current);
        } else {
            navigate("/");
            toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
        }
    }, [0]);
    const handelback = () => {
            navigate(`/user`);
    }
    return (
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    <Navbar />
                    <div className="content-center flex flex-row justify-between md:max-w-[calc(100vw-16rem)] mt-10">
                        <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  w-8/12">
                            <div class="flex flex-col p-8 max-w-3xl">
                                <h1 class="text-2xl text-gray-900 text-right mb-6">بياناتي الشخصية</h1>
                                {isLoading ? (
                                    <div className="flex items-center justify-center"> {/* Center the content horizontally */}
                                        <img className="w-12 h-12 animate-spin mr-4" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" /> {/* Add margin for spacing */}
                                        <span className="text-xl font-bold">جاري التحميل...</span>
                                    </div>
                                ) :(
                                    user.length>0 &&(
                                        <div>
                                            <div class="flex flex-row-reverse -mx-3 mb-4">
                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="firstName" class="block mb-2 text-gray-700 font-medium  text-right">الاسم</label>
                                                    <input disabled type="text" id="firstName" value={user[0].firstName} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>

                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="middleName" class="block mb-2 text-gray-700 font-medium  text-right">اسم الأب</label>
                                                    <input disabled type="text" id="middleName" value={user[0].middleName} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>

                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="lastName" class="block mb-2 text-gray-700 font-medium  text-right">اللقب</label>
                                                    <input disabled type="text" id="lastName" value={user[0].lastName} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                            </div>

                                            <div class=" flex flex-row-reverse -mx-3 mb-4">
                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="phone" class="block mb-2 text-gray-700 font-medium  text-right">رقم الهاتف</label>
                                                    <input disabled type="text" id="phone" value={user[0].phone} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>

                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="birthday" class="block mb-2 text-gray-700 font-medium  text-right">تاريخ الميلاد</label>
                                                    <input disabled type="date" id="birthday" value={user[0].birthday} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>

                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="placeOfBirth" class="block mb-2 text-gray-700 font-medium  text-right">مكان الميلاد</label>
                                                    <input disabled type="text" id="placeOfBirth" value={user[0].placeOfBirth} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                            </div>

                                            <div class="flex flex-row-reverse -mx-3 mb-4">
                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="gender" class="block mb-2 text-gray-700 font-medium  text-right">الجنس</label>
                                                    <input disabled type="text" id="gender" value={user[0].gender} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>

                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="address" class="block mb-2 text-gray-700 font-medium  text-right">عنوان السكن</label>
                                                    <input disabled type="text" id="address" value={user[0].address} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>

                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="closePhone" class="block mb-2 text-gray-700 font-medium  text-right">اسم القريب</label>
                                                    <input disabled type="text" id="closePhone" value={user[0].closePhone} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                            </div>

                                            <div class="flex flex-row-reverse -mx-3 mb-4">
                                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="NearPhone" class="block mb-2 text-gray-700 font-medium  text-right">رقم القريب</label>
                                                    <input disabled type="text" id="NearPhone" value={user[0].NearPhone} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                            </div>

                                            <h1 class="text-2xl text-gray-900  text-right mb-6">بيانات حسابي</h1>
                                            <div class="flex flex-col">
                                                <div class="flex flex-row-reverse -mx-3 mb-4">
                                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                        <label for="userName" class="block mb-2 text-gray-700 font-medium  text-right">اسم المستخدم</label>
                                                        <input disabled type="text" id="userName" value={user[0].userName} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                    </div>
                                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                        <label for="email" class="block mb-2 text-gray-700 font-medium  text-right">البريد الإلكتروني</label>
                                                        <input disabled type="text" id="email" value={user[0].email} class="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                    </div>
                                                </div>
                                                <div class=" flex flex-row-reverse -mx-3 mb-4">

                                                </div>
                                            </div>
                                            <h1 className="text-2xl text-gray-900  text-right mb-6">بيانات الإحصائية</h1>
                                            <div className="flex flex-col">
                                                <div className="flex flex-row-reverse -mx-3 mb-4">

                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                                }
                                <div class="flex flex-row-reverse justify-center items-center mt-4 ">
                                    <button class="mb-2 p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 " onClick={handelback}>رجوع</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <ToastContainer position="top-left" />
                </div>
            </div>
        </>
    )
}
export default ShowProfile