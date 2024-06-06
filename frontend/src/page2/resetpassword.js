import React, { useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form"

function Resetpassword() {
    const { id, token } = useParams();
    const navigate = useNavigate()
    const [value,setValues] = useState({
        password:'',
        confirmpassword:'',
    })
    const [chackpassword,setchackpassword] = useState(false);
    const [chach, setchach] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    async function handleSubmit ()  {
        if(value.password !== value.confirmpassword){
            toast.warning('كلمة المرور غير متطابقة');
            setchackpassword(true);
            return;
        }
        try {
            const res = await axios.post(baseurl + `passwordreset/${id}/${token}`,value);
            if (res.status === 201) {
                setchach(true);
                setchackpassword(false);
                toast.success('تم تغيير كلمة المرور');

            } else if (res.status === 203) {
                setchach(false);
            }
        } catch (e) {
            if (e?.response?.status === 404) {
                toast.warning('مشكلة في تغيير كلمة المرور');
            }
            if (e?.response?.status === 400) {
                toast.warning('تم تغيير كلمة المرور سابقا');
            }
        }
        //navigate("/chackemail/message?email=" + value.email);
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
                {chach===false?(<>
                    <h1 class="text-2xl font-bold text-center mb-4 text-gray-900" dir="rtl">إعادة تعيين الكلمة المرور جديدة</h1>
                    <p class="text-sm font-bold mb-4 text-gray-900" dir="rtl">قم بكتاية كلمة المرور جديدة</p>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label for="password" className="block mb-2 text-gray-700 font-medium  text-right">كلمة المرور</label>
                        <input type="password" id="password" name="password"  value={value.password} onChange={handleChange}
                               className={`w-full border rounded-md py-1 px-4 text-gray-700  text-righ ${chackpassword===true?'border-red-700':'border-gray-300'}`} />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label htmlFor="confirmpassword" className="block mb-2 text-gray-700 font-medium  text-right">تأكيد الكلمة المرور</label>
                        <input type="password" id="confirmpassword" name="confirmpassword" value={value.confirmpassword} onChange={handleChange}
                               className={`w-full border rounded-md py-1 px-4 text-gray-700  text-righ ${chackpassword===true?'border-red-700':'border-gray-300'}`} />
                    </div>
                    <button onClick={handleSubmit} type="submit" class="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">اعادة تعيين</button>
                    <div className="flex items-center justify-center py-2 pt-4 "  dir="rtl">
                        <Link to="/Login" aria-expanded="false" >
                            <button  className="text-3xs  w-full flex justify-center font-medium text-indigo-500 hover:text-indigo-700 ">رجوع</button>
                        </Link>
                    </div>
                    </>):(
                        <>
                            <h1 className="text-2xl font-bold text-center mb-4 text-green-700" dir="rtl">تم تغيير كلمة المرور بنجاح</h1>
                            <h1 className="text-xl font-medium text-gray-700 mb-2" dir="rtl">يمكنك <Link to="/login" aria-expanded="false" >
                                <span className="text-xl text-indigo-700 hover:text-green-700 ">تسجيل الدخول</span>
                            </Link>
                            </h1>
                        </>
                )}
                <ToastContainer position="top-left" />
            </div>
        </div>

    )
}
export default Resetpassword
