import {  urls, baseurl } from '../Baseurl/baseurl';
import React, { useState } from "react";
import axios from 'axios';
import {  toast } from 'react-toastify'
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useNavigate} from "react-router-dom";
import Unapprove from "./unapproved";
import CancelIcon from "@mui/icons-material/Cancel";
import {red} from "@mui/material/colors";

export default function Showfiles({setOpenModal,path_file,id,status,approved}) {
    const navigate = useNavigate();
    console.log(id)
    const closeModalTp = () => {
        setOpenModal(false);
    };

    const [financeNationalNumber, setFinanceNationalNumber] = useState("");
    const [civilNationalNumber, setCivilNationalNumber] = useState("");

    const [civilData, setCivilData] = useState();
    const [financeData, setFinanceData] = useState();
    const getFinanceData = async () => {
        if (financeNationalNumber.trim() === "") {
            toast.error("الرجاء إدخال رقم السجل المالي");
            return;
        }
        try{
            const res =  await axios.get(baseurl + 'financeMinistryEnquiry/' + financeNationalNumber,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
            });
            
            if(res.status===200){
                setFinanceData(res.data)
            }
            else
            {
                setFinanceData(null);
            }
        }catch (error){
            setFinanceData(null);
        }
    }

    const geCivilData = async () => {
        if (civilNationalNumber.trim() === "") {
            toast.error("الرجاء إدخال رقم السجل المدني");
            return;
        }
        try{
            const res =  await axios.get(baseurl + 'civilRegistryEnquiry/' + civilNationalNumber,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
            });
            if(res.status===200){
                setCivilData(res.data)
            }
            else
            {
                setCivilData(null);
            }
        }catch (error){
            setCivilData(null);
        }
    }


    async function approve ($id){
        await axios.put(baseurl+'approve/'+$id,{}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            if(response.data.message === "approved"){
                toast.success("تم الموافقة بنجاح");
                setTimeout(() => {
                    navigate('/Order');
                }, 1000);
            }else if(response.data.message === 'already approved'){
                toast.success("تم الموافقة مسبقا");
                setTimeout(() => {
                    navigate('/Order');
                }, 1250);
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    const [unapprove, setunapprove] = useState(false);
    const [value, setvalue] = useState(0);
    const handleUnapprove = ($id,event)=>{
        event.preventDefault();
        setvalue($id)
        setunapprove(true)
    }
    const handleCloseUnapprove= () => {
        setunapprove(false);
        navigate('/Order');
    };

    console.log(status === "1" && approved===0)

    return (<>
    <div id="modelConfirm" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
        <div className="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-6xl">
            <div className=" p-2">
                <button onClick={closeModalTp} type="button"
                    className="top-right text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div className="pt-0 text-center  ">
                <div className="flex flex-row-reverse gap-3">
                    <div className="flex flex-row  w-full px-4">
                            <object
                                    data=
                                        {urls+path_file}
                                    type="application/pdf"
                                    height="500"
                                    width="100%"
                            >
                            </object>
                    </div>


                        <div className={'flex flex-col justify-center items-center w-full gap-6 border-1'}>
                        <div className={'flex flex-col items-center'}>
                            <label htmlFor="name" className={'mb-2'}>بحث في سجل المدني</label>
                            <div className={'flex'}>
                                <input type='text' className={'border-2 border-gray-300 p-2 rounded ml-3'}
                                       value={civilNationalNumber} onChange={(e) => {
                                    setCivilNationalNumber(e.target.value)
                                }}/>
                                <button onClick={geCivilData} className={'border-2 border-black-200 px-2'}>بحث</button>
                            </div>
                            {
                                civilData === null ? (
                                    <span className={'border-2 border-red-700 p-2 mt-4 w-full rounded'}>غير موجود</span>
                                ) : (
                                    civilData && (
                                        <div className={'border-2 border-green-700 p-2 mt-4 w-full rounded'}>
                                            <span className={'mt-2 text-green-700'}>موجود</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <label htmlFor="name" className={'mb-2'}>بحث في المالية</label>
                            <div className={'flex'}>
                                <input type='text' className={'border-2 border-gray-300 p-2 rounded ml-3'}
                                       value={financeNationalNumber} onChange={(e) => {
                                    setFinanceNationalNumber(e.target.value)
                                }}/>
                                <button onClick={getFinanceData} className={'border-2 border-black-200 px-2'}>بحث
                                </button>
                            </div>
                            {
                                financeData === null ? (
                                    <span className={'border-2 border-red-700 p-2 mt-4 w-full rounded'}>غير موجود</span>
                                ) : (
                                    financeData && (
                                        <div className={'border-2 border-green-700 p-2 mt-4 w-full rounded'}>
                                            <span className={'mt-2 text-green-700'}>موجود</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className="pt-0 text-center justify-center">
                <div className="flex flex-col py-4">
                    <div className="flex flex-row-reverse justify-center items-center gap-28">
                        {status === "1" && approved===0 &&(<div className="p-3 w-1/5 flex items-center justify-between">
                            <button onClick={() => approve(id)}><CheckCircleOutlineIcon color="success"fontSize="large"/>
                                القبول
                            </button>
                            <button onClick={(event) => handleUnapprove(id, event)}><CancelIcon sx={{color: red[500]}}fontSize="large"/>
                                الرفض
                            </button>
                        </div>)}
                        <button onClick={closeModalTp} className="mb-2 p-1 font-medium border-solid border-2 border-amber-700 rounded-md w-20 ">رجوع</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {unapprove && <Unapprove onClose={handleCloseUnapprove}  id={value} />}
    </>
  );
};