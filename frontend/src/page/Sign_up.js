import React, { useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form"

function Sign_up() {
    const navigate = useNavigate()

    const [value,setValues] = useState({
        firstName:'',
        middleName:'',
        lastName:'',
        phone:'',
        gender:'',
        maritalStatus:'',
        address:'',
        dateOfBirth:'',
        //placeOfBirth:'',
        name:'',
        email:'',
        password:'',
        confirmpassword:'',
    })
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const [chackpassword,setchackpassword] = useState(false);
    async function onSubmit ()  {
        try{
            if(value.password !== value.confirmpassword){
                toast.warning('كلمة المرور غير متطابقة');
                setchackpassword(true);
                return;
            }

            const res =  await axios.post(baseurl + 'register', value);
            if(res.status===201 ){
                toast.success('تم تسجيلك بنجاح');
                setTimeout(function(){
                    navigate("/login");
                }, 5000);


            }

        }catch (error){
            if(error?.response?.status === 401){
                toast.warning('تحقق من كلمة المرور او اسم المستخدم');
            }else  if(error.response.status===422){
                toast.warning('البريد الالكتروني مستخدم من قبل');
                setchackpassword(false);
            }else{

                toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
            }
        }
    }
    return(

        <div className="min-h-screen flex items-center justify-center w-full bg-yellow-800 ">
            <div className="bg-gray-100  shadow-md rounded-lg px-4 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-900" dir="rtl">تسجيل حساب جديد</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row-reverse -mx-3 mb-4">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label form="firstName" className="block mb-2 text-gray-700 font-medium  text-right">الاسم</label>
                        <input type="text" id="firstName" name='firstName'{...register("firstName", { required: true, maxLength: 20 })} value={value.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                    {errors.firstName&&<p className="block text-red-500 text-xs  text-right mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label form="middleName" className="block mb-2 text-gray-700 font-medium  text-right">اسم الأب</label>
                        <input type="text" id="middleName" name="middleName" {...register("middleName",{required:true, maxLength: 20})} value={value.middleName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                    {errors.middleName&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label form="lastName" className="block mb-2 text-gray-700 font-medium  text-right">اللقب</label>
                        <input type="text" id="lastName" name="lastName" {...register("lastName",{required:true, maxLength: 20})} value={value.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                    {errors.lastName&&<p className="block text-red-500 text-xs  text-right mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>
                </div>

                <div className=" flex flex-row-reverse -mx-3 mb-4">
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label form="dateOfBirth" className="block mb-2 text-gray-700 font-medium  text-right">تاريخ الميلاد</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" {...register("dateOfBirth",{required:true})} value={value.dateOfBirth} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                        {errors.dateOfBirth&&<p className="block text-red-500 text-xs  text-right mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label htmlFor="gender" className="block mb-2 text-gray-700 font-medium  text-right">الجنس</label>
                        <select  id="gender" name="gender" {...register("gender",{required:true})} value={value.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-md text-gray-700  text-right" dir='rtl'>
                            <option value=""></option>
                            <option value="1">ذكر</option>
                            <option value="2">انثى</option>
                        </select>
                        {errors.gender&&<p className="block text-red-500 text-xs  text-right mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label form="maritalStatus" className="block mb-2 text-gray-700 font-medium  text-right">حالة الإجتماعية</label>
                        <select id='maritalStatus' name='maritalStatus' {...register("maritalStatus",{required:true})} value={value.maritalStatus} onChange={handleChange}  className={'w-full border border-gray-300 rounded-md px-4 text-gray-700  text-right'}>
                            <option value=""></option>
                            <option value="1">أعزب</option>
                            <option value="2">متزوج</option>
                            <option value="3">مطلق</option>
                            <option value="4">أرمل</option>
                        </select>
                        {/*<input type="text" id="closePhone" name="closePhone" {...register("maritalStatus",{required:true})} value={value.maritslStatus} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />*/}
                        {errors.maritalStatus&&<p className="block text-red-500 text-xs  text-right mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>
                    {/*<div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">*/}
                    {/*    <label form="placeOfBirth" className="block mb-2 text-gray-700 font-medium  text-right">مكان الميلاد</label>*/}
                    {/*    <input type="text" id="placeOfBirth" name="placeOfBirth" {...register("placeOfBirth",{required:true})} value={value.placeOfBirth} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />*/}
                    {/*{errors.placeOfBirth&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}*/}
                    {/*</div>*/}

                </div>

                <div className="flex flex-row-reverse -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium  text-right">رقم الهاتف</label>
                        <input type="text" id="phone" name="phone" {...register("phone",{required:true,pattern: /^09[0-9]{8}$/, maxLength: 10})} value={value.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                        {errors.phone&&<p className="block text-red-500 text-xs  text-right  mt-1 w-full">يجب أن يحتوي رقم الهاتف على 10 أرقام.</p>}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                        <label form="address" className="block mb-2 text-gray-700 font-medium  text-right">عنوان السكن</label>
                        <input type="text" id="address" name="address" {...register("address",{required:true, maxLength: 20})} value={value.address} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                    {errors.address&&<p className="block text-red-500 text-xs text-right mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                    </div>


                </div>
                <div className="flex flex-col justify-between ">
                    <div className="flex flex-row-reverse -mx-3 mb-4 justify-between">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                            <label form="name" className="block mb-2 text-gray-700 font-medium  text-right">اسم المستخدم</label>
                            <input type="text" id="name" name="name" {...register("name",{required:true, maxLength: 20})} value={value.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 text-right" />
                        {errors.name&&<p className="block text-red-500 text-xs  text-right  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                            <label form="email" className="block mb-2 text-gray-700 font-medium  text-right">البريد الإلكتروني</label>
                            <input type="text" id="email" name="email" {...register("email",{required:true,pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} value={value.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 text-right" />
                            {errors.email && <p className="block text-red-500 text-xs  text-right mt-1 w-full">البريد الإلكتروني غير صالح.</p>}

                        </div>
                    </div>
                    <div className=" flex flex-row-reverse -mx-3 mb-4 justify-between">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                            <label form="password" className="block mb-2 text-gray-700 font-medium  text-right">كلمة السر</label>
                            <input type="password" id="password" name="password" {...register("password",{required:true, minLength: 8})} value={value.password} onChange={handleChange}
                                   className={`w-full border rounded-md py-1 px-4 text-gray-700  text-righ ${chackpassword===true?'border-red-700':'border-gray-300'}`} />
                        {errors.password&&<p className="block text-red-500 text-xs  text-right  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col  items-end">
                            <label form="confirmpassword" className="block mb-2 text-gray-700 font-medium  text-right">تأكيد الكلمة السر</label>
                            <input type="password" id="confirmpassword" name="confirmpassword" {...register("confirmpassword",{required:true, minLength: 8})} value={value.confirmpassword} onChange={handleChange}
                                   className={`w-full border rounded-md py-1 px-4 text-gray-700  text-righ ${chackpassword===true?'border-red-700':'border-gray-300'}`} />
                        {errors.confirmpassword&&<p className="block text-red-500 text-xs  text-right  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            {chackpassword&&<p className="block text-red-500 text-xs  text-right  mt-1 w-full">كلمة السر غير متطابقة.</p>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4"  dir="rtl">
                        <Link to="/login" aria-expanded="false" >
                            <span className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">هل لديك حساب بالفعل؟</span>
                        </Link>
                    </div>
                </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">تسجيل</button>
                </form>
            </div><ToastContainer position="top-left" />
        </div>

    )
}
export default Sign_up
