import React, { useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form"

function Forgottenpass() {
    const navigate = useNavigate()
    const [value,setValues] = useState({
        email:'',
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [chack, setChack] = useState(false);
    const [error, setError] = useState(false);
   async function handleSubmit ()  {
        if(!value.email || !value.email.includes('@') || !value.email.includes('.com')){
            toast.warning('ادخل البريد الالكتروني بشكل صحيح');
            return;
        }
        try {
            console.log(value.email)
            const res = await axios.post(baseurl + 'chackemail', value);
            if(res.status===201){
                setChack(true);
            }else{
                toast.warning('تحقق من كتابة البريد الالكتروني');
            }
        }catch (error){
            if(error?.response?.status === 422){
                toast.warning('تحقق من كتابة البريد الالكتروني');
            }
            else {
                setError(true);
            }
        }
    }
    // async function onSubmit ()  {
    //     try{
    //         const res =  await axios.post(baseurl + 'login', value);
    //         if(res.status===200 && res.data.token){
    //             localStorage.setItem('token', res.data.token);
    //             localStorage.setItem('username', res.data.userName);
    //             toast.success('مرحبا');
    //             navigate("/Dashboard");
    //         }else{
    //             toast.warning('تحقق من كلمة المرور او اسم المستخدم');
    //         }
    //
    //     }catch (error){
    //         if(error?.response?.status === 401){
    //             toast.warning('تحقق من كلمة المرور او اسم المستخدم');
    //         }else{
    //
    //             toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
    //         }
    //     }
    // }
    return(

        <div class="min-h-screen flex items-center justify-center w-full bg-gray-900">
            <div className="bg-gray-100 shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h1 class="text-2xl font-bold text-center mb-4 text-gray-900" dir="rtl">هل نسيت كلمة المرور!</h1>
                { chack===false ? (<>
                    <p class="text-sm font-bold mb-4 text-gray-900" dir="rtl">لا تقلق، أدخل عنوان البريد الإلكتروني الذي استخدمته لحسابك، وسنرسل لك بريدًا إلكترونيًا لإعادة تعيينه!</p>
                    <div class="mb-4"  dir="rtl">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <span className="text-red-500"> {error && 'البريد الالكتروني غير موجود'} </span>
                        <input type="email" id="email" name='email' value={value.email} onChange={handleChange}
                        class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300"/>
                    </div>
                    <button onClick={handleSubmit} type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">ارسال</button>
                    </>):(
                        <p class="text-xl font-bold mb-4 text-green-700 text-center" dir="rtl">سيتم ارسال رسالة إلى بريدك الالكتروني</p>
                    )
                }
                <div className="flex items-center justify-center py-2 pt-4 "  dir="rtl">
                    <Link to="/Login" aria-expanded="false" >
                        <button  className="text-3xs  w-full flex justify-center font-medium text-indigo-500 hover:text-indigo-700 ">رجوع</button>
                    </Link>
                </div>
                <ToastContainer position="top-left" />
            </div>
        </div>

    )
}
export default Forgottenpass
