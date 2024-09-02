import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import React, { useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify'
import {useNavigate, useParams} from "react-router-dom";

export default function Uploadfiles({onClose,id}) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileErrors, setFileErrors] = useState({});

    const handleFileChange = (event)=> {
        const { name, files } = event.target;
        setSelectedFiles(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
        setFileErrors(prevState => ({
            ...prevState,
            [name]: false // Clear the error when the user selects a file
        }));
    };
    const closeModalTp = () => {
        onClose(false);
    };

    const [reqDocs, setReqDocs] = useState([]);
    async function getReqDocs ()  {
        try{
            const res =  await axios.get(baseurl + 'show_req_document/'+id.id_service,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
            });
            setReqDocs(res.data);
        }catch (error){
            toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
        }
    }

    useEffect(() => {
        getReqDocs();
    }, []);
    const navigate = useNavigate();
    const [error, setErrors] = useState(false);

    async function onSubmit ()  {
        let hasError = false;
        const errors = {};

        const validateFile = (file, name,meaning) => {
            if (!file) {
                errors[meaning] = true;
                toast.error(`يرجى تحميل ${name}`);
                hasError = true;
            } else if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'application/pdf') {
                errors[meaning] = true;
                toast.error(`صيغة ${name} غير مقبولة. يجب أن يكون الملف بصيغة PDF أو صورة`);
                hasError = true;
            }
        };

        if (reqDocs.ID_card) validateFile(selectedFiles.ID_card,'بطاقة الشخصية','ID_card');
        if (reqDocs.birth_certificate) validateFile(selectedFiles.birth_certificate, 'شهادة الميلاد','birth_certificate');
        if (reqDocs.license) validateFile(selectedFiles.license, 'رخصة القيادة','license');
        if (reqDocs.passport) validateFile(selectedFiles.passport, 'جواز سفر','passport');
        if (reqDocs.medical_certificate) validateFile(selectedFiles.medical_certificate, 'شهادة صحية','medical_certificate');
        if (reqDocs.family_status_certificate) validateFile(selectedFiles.family_status_certificate, 'شهادة وضع العائلة','family_status_certificate');

        setFileErrors(errors);
        console.log(fileErrors)
        if (hasError) return;

        const formData = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            formData.append('files[]', selectedFiles[key]);
        });
        formData.append('id_service',id.id_service);
        //console.log(formData)
        try{
            const res =  await axios.post(baseurl + 'storefollowup', formData,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',},
            });
            if(res.status===201){
                toast.success('تم تحميل وثيقة/وثائق بنجاح');

                setTimeout(() => {
                    onClose(false);
                    navigate(`/Trackorder`);
                }, 1250);
            }
        }catch (error){
            if(error?.response?.status === 403){
                toast.error('يجب تحميل صيغة pdf او الصورة');
            }else{
                toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
            }
        }

    }
    return (
    <div id="modelConfirm" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
        <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
            <div className=" p-2">
                <button onClick={closeModalTp} type="button"
                    className="top-right text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div className="pt-0 text-center">
                <div className="flex flex-col px-6 py-4 max-w-3xl">
                    <h1 className="text-2xl text-gray-900 text-right">{id.name} - {id.address}</h1>
                    <h1 className=" text-gray-900 text-right my-4" dir={"rtl"}>الخدمة: {id.service}</h1>
                    <h1 className=" text-gray-900 text-right my-2 font-bold" dir={"rtl"}>أوراق مطلوبة: </h1>
                    <ol className="text-gray-900 text-right my-2 flex-col gap-2 grid grid-cols-2" dir={'rtl'}>
                        {reqDocs.ID_card===1 ? <><li >بطاقة الشخصية</li>
                            <input type="file"  id="ID_card" name={'ID_card'} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"
                                   className={`form-input ${fileErrors.ID_card ? 'border-red-500 border-b-2' : ''}`}
                            />
                        </>:null}
                        {reqDocs.birth_certificate === 1 ? <><li >شهادة الميلاد</li>
                            <input type="file"  id="birth_certificate" name={'birth_certificate'} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"
                            className={`form-input ${fileErrors.birth_certificate ? 'border-red-500 border-b-2' : ''}`}
                            />
                        </> : null}
                        {reqDocs.license === 1 ? <><li >رخصة القيادة</li>
                            <input type="file"  id="license" name={'license'} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"
                            className={`form-input ${fileErrors.license ? 'border-red-500 border-b-2' : ''}`}
                            />
                        </>: null}
                        {reqDocs.passport === 1 ?<> <li >جواز سفر</li>
                            <input type="file"  id="passport" name={'passport'} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"
                            className={`form-input ${fileErrors.passport ? 'border-red-500 border-b-2' : ''}`}
                            />
                        </>: null}
                        {reqDocs.medical_certificate === 1 ? <><li >شهادة صحية</li>
                            <input type="file"  id="medical_certificate" name={'medical_certificate'} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"
                            className={`form-input ${fileErrors.medical_certificate ? 'border-red-500 border-b-2' : ''}`}
                            />
                        </> : null}
                        {reqDocs.family_status_certificate === 1 ? <><li >شهادة وضع العائلة</li>
                            <input type="file" id="family_status_certificate"  name={'family_status_certificate'} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"
                            className={`form-input ${fileErrors.family_status_certificate ? 'border-red-500 border-b-2' : ''}`}
                            />
                        </> : null}
                    </ol>

                        <div className="flex flex-row-reverse -mx-3 mb-4">
                        </div>
                        <div className="flex flex-row-reverse justify-center items-center mt-4 ">
                            <button onClick={onSubmit} type="submit" className="mb-2 p-1 text-white font-medium ml-28 border-solid border-2 rounded-md w-20 bg-[#5F82BA]">إضافة</button>
                            <button onClick={closeModalTp} className="mb-2 p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 ">رجوع</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
};