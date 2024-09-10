import Navbar from "./Navbar";
import React, { useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import {baseurl} from "../Baseurl/baseurl";

function Profile() {
    const access = localStorage.getItem('access_token');

    const [user, setUser] = useState({
        first_name:'',
        middle_name:'',
        last_name:'',
        phone:'',
        address:'',
        gender:'',
        maritalStatus:'',
        dateOfBirth:'',
        name:'',
        email:'',
        password:'',
        confirmpassword:'',
    })
    const handelChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
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
    const [errors, setErrors] = useState({});

    const validate = () => {
        let validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^09[0-9]{8}$/;
        if (!user.first_name) validationErrors.first_name = 'الاسم الأول مطلوب';
        if (!user.middle_name) validationErrors.middle_name = 'اسم الأب مطلوب';
        if (!user.last_name) validationErrors.last_name = 'اللقب مطلوب';
        if (!user.phone) validationErrors.phone = 'رقم الهاتف مطلوب';
        if (!user.email) validationErrors.email = 'البريد الإلكتروني مطلوب';
        if (!user.address) validationErrors.address = 'عنوان السكن مطلوب';
        if (!user.gender) validationErrors.gender = 'الجنس مطلوب';
        if (!user.maritalStatus) validationErrors.maritalStatus = 'الحالة الاجتماعية مطلوبة';
        if (!user.dateOfBirth) validationErrors.dateOfBirth = 'تاريخ الميلاد مطلوب';
        if (!user.name) validationErrors.name = 'اسم المستخدم مطلوب';
        if (user.email && !emailRegex.test(user.email)) {
            validationErrors.email = 'البريد الإلكتروني غير صالح';
        }
        if (user.phone && !phoneRegex.test(user.phone)) {
            validationErrors.phone = 'رقم الهاتف يجب أن يكون مكونًا من 10 أرقام';
        }
        if (user.password && user.password !== user.confirmpassword) {
            validationErrors.confirmpassword = 'كلمة المرور غير متطابقة';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const validateupdate = (data) => {
        let validationErrors = {};
        if(data.error.email) validationErrors.email = 'البريد الإلكتروني مستخدم من قبل';
        if(data.error.phone) validationErrors.phone = 'رقم الهاتف مستخدم من قبل';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }
    async function onSubmit ()  {
        if (!validate()) {
            return;
        }
        try{
            const res =  await axios.post(baseurl + `update_profile/${user.id}`, user,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
            });
            if(res.status===201 ){
                toast.success('تم تحديث بياناتك بنجاح');
                localStorage.setItem('access_token',res.access_token);
                // setTimeout(function(){
                //     window.location.reload();
                // }, 2000);
            }

        }catch (error){
            if(error?.response?.status === 401){
                toast.warning('تحقق من كلمة المرور او اسم المستخدم');
            }else  if(error.response.status===422){
                validateupdate(error.response.data);
                toast.warning('تحقق من البيانات المدخلة');
            }
        }
    }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] xl:mt-10 md:mt-5 sm:mt-5">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-auto">
                        <div className="flex flex-col p-3 max-w-3xl">
                            {access === "0" ?? <h1 className="text-xl text-red-900 text-center mb-4">يجب ملء جميع الحقول حتى تتمكن من
                                استخدام النظام</h1>}
                            <h1 className="text-2xl text-gray-900 text-right mb-4">بياناتي الشخصية</h1>
                                <div>
                                    <div className="flex flex-row-reverse -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="first_name" className="block mb-2 text-gray-700 font-medium  text-right">الاسم</label>
                                            <input type="text" id="first_name" name='first_name' value={user.first_name} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                                            {errors.first_name && <p className="text-red-500 text-xs text-right">{errors.first_name}</p>}
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="middle_name" className="block mb-2 text-gray-700 font-medium  text-right">اسم الأب</label>
                                            <input type="text" id="middle_name" name='middle_name' value={user.middle_name}  onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            {errors.middle_name && <p className="text-red-500 text-xs text-right">{errors.middle_name}</p>}
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="last_name" className="block mb-2 text-gray-700 font-medium  text-right">اللقب</label>
                                            <input type="text" id="last_name" name="last_name" value={user.last_name} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            {errors.last_name && <p className="text-red-500 text-xs text-right">{errors.last_name}</p>}
                                        </div>
                                    </div>

                                    <div className=" flex flex-row-reverse -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="phone" className="block mb-2 text-gray-700 font-medium  text-right">رقم الهاتف</label>
                                            <input type="text" id="phone" name="phone" value={user.phone} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            {errors.phone && <p className="text-red-500 text-xs text-right">{errors.phone}</p>}
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="dateOfBirth" className="block mb-2 text-gray-700 font-medium  text-right">تاريخ الميلاد</label>
                                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={user.dateOfBirth} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            {errors.dateOfBirth && <p className="text-red-500 text-xs text-right">{errors.dateOfBirth}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-row-reverse -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="gender" className="block mb-2 text-gray-700 font-medium  text-right">الجنس</label>
                                            {/*<input type="text" id="gender" name="gender" value={user.gender} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />*/}
                                            <select className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right"
                                                    name="gender" id="gender"
                                                    value={user.gender} onChange={handelChange}>
                                                <option value="">اختر الجنس</option>
                                                <option value="1">ذكر</option>
                                                <option value="2">انثي</option>
                                            </select>
                                            {errors.gender && <p className="text-red-500 text-xs text-right">{errors.gender}</p>}
                                        </div>

                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label for="address" className="block mb-2 text-gray-700 font-medium  text-right">عنوان السكن</label>
                                            <input type="text" id="address" name="address" value={user.address} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            {errors.address && <p className="text-red-500 text-xs text-right">{errors.address}</p>}
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label htmlFor="maritalStatus" className="block mb-2 text-gray-700 font-medium  text-right">حالة الإجتماعية</label>
                                            <select className={'w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right'}
                                                id='maritalStatus' name='maritalStatus'
                                                value={user.maritalStatus} onChange={handelChange} >
                                                <option value="">اختر حالة الإجتماعية</option>
                                                <option value="1">أعزب</option>
                                                <option value="2">متزوج</option>
                                                <option value="3">مطلق</option>
                                                <option value="4">أرمل</option>
                                            </select>
                                            {errors.maritalStatus && <p className="text-red-500 text-xs text-right">{errors.maritalStatus}</p>}
                                        </div>
                                    </div>

                                    <h1 className="text-2xl text-gray-900  text-right mb-4">بيانات حسابي</h1>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="name" className="block mb-2 text-gray-700 font-medium  text-right">اسم المستخدم</label>
                                                <input type="text" id="name" name="name" value={user.name} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                {errors.name && <p className="text-red-500 text-xs text-right">{errors.name}</p>}
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="email" className="block mb-2 text-gray-700 font-medium  text-right">البريد الإلكتروني</label>
                                                <input type="text" id="email" name="email" value={user.email} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                {errors.email && <p className="text-red-500 text-xs text-right">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className=" flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="password" className="block mb-2 text-gray-700 font-medium  text-right">كلمة السر الجديدة</label>
                                                <input type="password" name="password" id="password"  value={user.password} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />

                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="confirmpassword" className="block mb-2 text-gray-700 font-medium  text-right">تأكيد الكلمة السر</label>
                                                <input type="password" name="confirmpassword" id="confirmpassword" value={user.confirmpassword} onChange={handelChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                {errors.confirmpassword && <p className="text-red-500 text-xs text-right">{errors.confirmpassword}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="flex flex-row-reverse justify-center items-center mt-2 ">
                                <button className="  p-1 text-white font-medium ml-28 border-solid border-2 rounded-md w-20 bg-[#5F82BA]" onClick={onSubmit}>تعديل</button>
                                <button className="  p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 " onClick={handelback}>رجوع</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default Profile