import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import React, { useEffect, useState,useRef} from "react";
import { ToastContainer, toast } from 'react-toastify'
import Select from "react-select";

export default function AddOffice({onClose}) {

    const [value, setValue] = useState({
        name: '',
        description: '',
        ID_card: false, // Checkbox values are initially false (unchecked)
        birth_certificate: false,
        passport: false,
        license: false,
        medical_certificate: false,
        family_status_certificate: false,
    });
    const closeModalTp = () => {
        onClose(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValue((prevState) => ({
            ...prevState,
            [name]: value, // Update state for text inputs (name, description)
        }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setValue((prevState) => ({
            ...prevState,
            [name]: checked, // Update state for checkboxes (0 or 1)
        }));
    };

    // async function onSubmit ()  {
    //     try{
    //         const res =  await axios.post(baseurl + 'storeoffice', value,{
    //             headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
    //         });
    //         if(res.status===201){
    //             toast.success('تم إضافة الجهة بنجاح');
    //         }
    //     }catch (error){
    //         if(error?.response?.status === 400){
    //             toast.error('اسم مستخدم الجهة موجود مسبقا');
    //         }else{
    //             toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
    //         }
    //     }setOpenModal(false);
    // }
    const [error, setErrors] = useState(false);

    async function onSubmit  (){
        if(!value.name || !value.description ||
            (!value.ID_card && !value.birth_certificate && !value.passport &&
                !value.license && !value.medical_certificate && !value.family_status_certificate)){
            setErrors(true);
            toast.error('يجب عليك تعبئة جميع الحقول');
            return;
        }
        const res = await axios.post(baseurl+"storeservice",value,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        })
        if(res.status===201){
            toast.success('تم إضافة الخدمة بنجاح');
            onClose(false);
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
                <h1 className="  mr-auto items-center font-bold text-xl">اضافة الخدمة</h1>
            </div>
            <div className="pt-0 text-center">
                <div className="flex flex-col px-6 py-4 max-w-3xl">
                        <div className="flex flex-row-reverse -mx-3 mb-4">
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label form="name" className="block mb-2 text-gray-700 font-medium  text-right">اسم الخدمة</label>
                                <input type="text" id="name" name="name" value={value.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                {error&& value.name===''&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>
                            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                <label form="description" className="block mb-2 text-gray-700 font-medium  text-right">الوصف الخدمة</label>
                                <textarea  id="description" name="description" value={value.description} onChange={handleInputChange} dir={'rtl'}
                                           className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                {error&& value.description===''&&<p className="block text-red-500 text-xs  mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>
                        </div>

                        <p className="block mb-2 font-medium text-right">:المرفقات مطلوبة</p>
                    {error&& (value.ID_card===false || value.birth_certificate===false || value.license===false || value.medical_certificate===false
                        || value.license===false || value.medical_certificate===false )&&<p className="block text-red-500 text-xs  mt-1 w-full">يجب إختيار مرفق واحد على أقل</p>}
                        <div className="flex flex-row-reverse justify-centeritems-center -mx-3 mb-4">
                            <div className="w-full md:w-2/4 md:mb-0 flex" dir={'rtl'}>
                                <input type={'checkbox'} id={"service"} name={"ID_card"} value={'value.ID_card'} onChange={handleCheckboxChange}/>
                                <label htmlFor={"ID_card"} className={'mr-2 inline-flex'}>بطاقة الشخصية</label>
                            </div>
                            <div className="w-full md:w-2/4 md:mb-0 flex" dir={'rtl'}>
                                <input type={'checkbox'} id={"service"} name={"birth_certificate"} value={'value.birth_certificate'} onChange={handleCheckboxChange}/>
                                <label htmlFor={"birth_certificate"} className={'mr-2 inline-flex'}>شهادة ميلاد</label>
                            </div>
                            <div className="w-full md:w-2/4 md:mb-0 flex" dir={'rtl'}>
                                <input type={'checkbox'} id={"service"} name={"passport"} value={'value.passport'}  onChange={handleCheckboxChange}/>
                                <label htmlFor={"passport"} className={'mr-2 inline-flex'}>جواز السفر</label>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse justify-center items-center -mx-3 mb-4">
                            <div className="w-full md:w-2/4 md:mb-0 flex" dir={'rtl'}>
                                <input type={'checkbox'} id={"service"} name={"license"} value={'value.license'}  onChange={handleCheckboxChange}/>
                                <label htmlFor={"license"} className={'mr-2 inline-flex'}>رخصة</label>
                            </div>
                            <div className="w-full md:w-2/4 md:mb-0 flex" dir={'rtl'}>
                                <input type={'checkbox'} id={"service"} name={"medical_certificate"} value={'value.medical_certificate'}  onChange={handleCheckboxChange}/>
                                <label htmlFor={"medical_certificate"} className={'mr-2 inline-flex'}>إثبات طبي</label>
                            </div>
                            <div className="w-full md:w-2/4 md:mb-0 flex" dir={'rtl'}>
                                <input type={'checkbox'} id={"service"} name={"family_status_certificate"} value={'value.family_status_certificate'}  onChange={handleCheckboxChange}/>
                                <label htmlFor={"family_status_certificate"} className={'mr-2 inline-flex'}>شهادة وضع العائلة</label>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse justify-center items-center mt-4 ">
                            <button onClick={onSubmit} type="submit" className="mb-2 p-1 text-white font-medium ml-28 border-solid border-2 rounded-md w-20 bg-green-700">إضافة</button>
                            <button onClick={closeModalTp} className="mb-2 p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 ">رجوع</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
};