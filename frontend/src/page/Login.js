import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {Link} from 'react-router-dom'
//import { useForm } from "react-hook-form"
import NavBarHome from "../page/NavBarHome";
function Login({office}) {
    const [value,setValues] = useState({
        login:'',
        password:''
    });
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

      const navigate = useNavigate()

     async function onSubmit ()  { 
        try{
            const res =  await axios.post(baseurl + 'login', value);

            if(res.status===200 && res.data.token){
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('Office', res.data.Office);
                toast.success('مرحبا');
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1000);
            }else{
               toast.warning('تحقق من كلمة المرور او اسم المستخدم');
            }

        }catch (error){
            if(error?.response?.status === 401){
                toast.warning('تحقق من كلمة المرور او اسم المستخدم');
            }else if(error?.response?.status === 402){
                toast.warning('حسابك غير مؤكد، رجاء تأكيده');
            }else {
                toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
            }
        }
      }
    return(
        <>
            <NavBarHome office={office}/>
            <div className="h-full flex items-center justify-center w-full  my-20 md:mt-36 sm:mt-5 bg-white-800">
                <div className="bg-gray-100 shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-900" dir="rtl">مرحبا بك!</h1>
                        <div className="mb-4"  dir="rtl">
                            <label form="login" className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
                            <input type="text" id="login" name='login' value={value.login} onChange={handleChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ahmed, Ali...etc"/>
                            {/* {errors.userName&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>} */}
                        </div>
                        <div className="mb-4"  dir="rtl">
                            <label form="password" className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                            <input type="password" id="password" name='password' value={value.password} onChange={handleChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="أدخل كلمة المرور"/>
                            {/* {errors.password &&<p className="text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>} */}

                        </div>
                        <div className="flex items-center justify-between mb-4"  dir="rtl">
                            <Link to="/passwordreset" aria-expanded="false" >
                                <span className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">نسيت كلمة المرور؟</span>
                            </Link>
                            <Link to="/Signup" aria-expanded="false" >
                                <span className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">تسجيل حساب جديد</span>
                            </Link>
                        </div>
                        <button onClick={onSubmit} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">تسجيل الدخول</button>
                    <ToastContainer position="top-left" />
                </div>
            </div>
        </>
    )
}
export default Login
