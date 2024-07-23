import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import React, { useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify'

export default function AddOffice({setOpenModal}) {
    const[value,setValues] = useState({
        name_model:'',
        version:'',
        release_date:'',
        documentation:''
    });
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
    const closeModalTp = () => {
        setOpenModal(false);

    };
    async function onSubmit ()  {
        try{
            const res =  await axios.post(baseurl + 'addmodel', value,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
            });
            if(res.status===201){
                toast.success('تم إضافة النموذج بنجاح');
                setOpenModal(false);
            }
        }catch (error){
            if(error?.response?.status === 422){
                toast.error('رقم الإصدار موجود بالفعل');
            }else{
                toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
            }
        }
    }
    return (
    <div id="modelConfirm" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
        <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

            <div className="flex justify-center p-4">
                <button onClick={closeModalTp} type="button"
                    className="flex text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm p-1.5 mr-auto  items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
                <h1 className="  mr-auto items-center font-bold text-xl">اضافة الجهة</h1>
            </div>
            <div className="pt-0 text-center">
                <div className="flex flex-col px-6 py-4 max-w-3xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-row-reverse -mx-3 mb-4">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label for="name_model" className="block mb-2 text-gray-700 font-medium  text-right">اسم الجهة</label>
                                <input type="text" id="name_model" {...register("name_model", { required: true })} name="name_model" value={value.name_model} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                {errors.name_model&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>

                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label for="version" className="block mb-2 text-gray-700 font-medium  text-right">العنوان</label>
                                <input type="text" id="version" {...register("version", { required: true })} name="version" value={value.version} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                {errors.version&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>
                        </div>
                        <div className="flex flex-row-reverse -mx-3 mb-4">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label for="release_date" className="block mb-2 text-gray-700 font-medium  text-right">اسم مستخدم</label>
                                <input type="text" id="version" {...register("version", { required: true })} name="version" value={value.version} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                {errors.version&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>

                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label for="documentation" className="block mb-2 text-gray-700 font-medium  text-right">الوصف</label>
                                <textarea  id="documentation" {...register("documentation", { required: true })} name="documentation" value={value.documentation} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                {errors.documentation&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>
                        </div>
                        <div className="flex flex-row-reverse justify-center items-center mt-4 ">
                            <button  type="submit" className="mb-2 p-1 text-white font-medium ml-28 border-solid border-2 rounded-md w-20 bg-green-700">إضافة</button>
                            <button onClick={closeModalTp} className="mb-2 p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 ">رجوع</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-left" />
        </div>
    </div>
  );
};