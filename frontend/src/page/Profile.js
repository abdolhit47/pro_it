import Navbar from "./Navbar";
import React, { useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import {baseurl} from "../Baseurl/baseurl";

function Profile() {

    const [user, setUser] = useState({})

    async function getUser() {
        const response = await axios.get(baseurl+'show_profile',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.error) {
            toast.error(response.data.error)
            return
        }
        setUser(response.data)
    }
    useEffect(()=>{
        getUser()
    },[0])
    const navigate = useNavigate()
    const handelback = () => {
        navigate(`/Dashboard`);
    }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-10">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-auto">
                        <div className="flex flex-col p-8 max-w-3xl">
                            <h1 className="text-2xl text-gray-900 text-right mb-6">بياناتي الشخصية</h1>
                                <div>
                                    <div className="flex flex-row-reverse -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="firstName" className="block mb-2 text-gray-700 font-medium  text-right">الاسم</label>
                                            <input type="text" id="firstName" name='firstName' value={user.first_name} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="middleName" className="block mb-2 text-gray-700 font-medium  text-right">اسم الأب</label>
                                            <input type="text" id="middleName" name='middleName' value={user.miden_name}  className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="lastName" className="block mb-2 text-gray-700 font-medium  text-right">اللقب</label>
                                            <input type="text" id="lastName" name="lastName" value={user.last_name} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                        </div>
                                    </div>

                                    <div className=" flex flex-row-reverse -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="phone" className="block mb-2 text-gray-700 font-medium  text-right">رقم الهاتف</label>
                                            <input type="text" id="phone" name="phone" value={user.phone} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="birthday" className="block mb-2 text-gray-700 font-medium  text-right">تاريخ الميلاد</label>
                                            <input type="date" id="birthday" name="birthday" value={user.dateOfBirth} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                        </div>

                                        {/*<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">*/}
                                        {/*    <label for="placeOfBirth" className="block mb-2 text-gray-700 font-medium  text-right">مكان الميلاد</label>*/}
                                        {/*    <input type="text" id="placeOfBirth" name="placeOfBirth"  className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />*/}
                                        {/*</div>*/}
                                    </div>

                                    <div className="flex flex-row-reverse -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="gender" className="block mb-2 text-gray-700 font-medium  text-right">الجنس</label>
                                            <input type="text" id="gender" name="gender" value={user.gender} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="address" className="block mb-2 text-gray-700 font-medium  text-right">عنوان السكن</label>
                                            <input type="text" id="address" name="address" value={user.address} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                        </div>
                                    </div>

                                    <h1 className="text-2xl text-gray-900  text-right mb-6">بيانات حسابي</h1>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="userName" className="block mb-2 text-gray-700 font-medium  text-right">اسم المستخدم</label>
                                                <input type="text" id="userName" name="userName" value={user.name} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="email" className="block mb-2 text-gray-700 font-medium  text-right">البريد الإلكتروني</label>
                                                <input type="text" id="email" name="email" value={user.email} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                        </div>
                                        <div className=" flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="password" className="block mb-2 text-gray-700 font-medium  text-right">كلمة السر الجديدة</label>
                                                <input type="password" name="password" id="password"   className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="confirmpassword" className="block mb-2 text-gray-700 font-medium  text-right">تأكيد الكلمة السر</label>
                                                <input type="password" name="confirmpassword" id="confirmpassword"  className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="flex flex-row-reverse justify-center items-center mt-4 ">
                                <button className="mb-2 p-1 text-white font-medium ml-28 border-solid border-2 rounded-md w-20 bg-[#5F82BA]">تعديل</button>
                                <button className="mb-2 p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 " onClick={handelback}>رجوع</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div><ToastContainer position="top-left" />
        </div>

        </>
    )
}
export default Profile