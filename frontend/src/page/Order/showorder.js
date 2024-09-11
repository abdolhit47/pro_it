import Navbar from "../Navbar";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {baseurl} from "../../Baseurl/baseurl";
import axios from "axios";
import Showfile from "../../component/showfiles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import {red} from "@mui/material/colors";
import {ToastContainer,toast} from "react-toastify";
import Unapprove from "../../component/unapproved";
import PreviewIcon from '@mui/icons-material/Preview';
import Uploadfiles from "../../component/uploadfiles";
import UploadDoc from "../../component/uploadDoc";

function ShowOrder() {
    const { id } = useParams();
    const [Order, setOrder] = useState([]);
    const role = localStorage.getItem('role');
    const array = ["2", "3"];
    const access = localStorage.getItem('access_token');

    async function getOffice() {
        const res =  await axios.get(baseurl + 'getservicesfollow/' + id, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        setOrder(res.data)
    }
    const [OpenModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (access === "0") {
            navigate('/profile');
        }
        getOffice();
    }, [OpenModal]);

    const handleShow = ()=>{
        setOpenModal(true);

    }


    const [value, setvalue] = useState(0);
    const [uploaddocs, setuploaddocs] = useState(false); //uploaddocs
    const handleUploadDoc = ($id,event)=>{
        event.preventDefault();
        setvalue($id)
        setuploaddocs(true)
    }
    const navigate = useNavigate();
    const handleshow = () => {
            navigate(`/Order`);
    };
    const handleCloseUploadDoc= () => {
        setuploaddocs(false);

    };

    // async function send($id){
    //     await axios.put(baseurl + 'send_wezara/'+$id,{}, {
    //         headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
    //     }).then((response) => {
    //         if(response.status === 200){
    //             toast.success("تم الارسال بنجاح");
    //             setTimeout(() => {
    //                 navigate('/Order');
    //             }, 1000);
    //         }
    //     }).catch( (error) => {
    //         console.log(error);
    //     });
    //
    // }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4 h-auto">
                        {Order.length === 0 ? ( <div dir="rtl" className={'flex-col flex items-center justify-center text-2xl h-96'}>
                            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8" style={{borderTopColor: '#c88903'}} />
                            رجاء الانتظار...
                            </div>):
                            (<>
                                <div className="p-4 px-5 flex content-center justify-between  mt-2" dir="rtl">
                                    <h1 className="text-3xl text-gray-900 text-right">{Order.name_mwaten}</h1>
                                </div>
                                <div className="px-6 py-4" dir={'rtl'}>
                                    <p className={"mr-4"}>وصف/معلومات:</p>
                                    <p className={"mr-4 mt-6"}>اتقدم أنا المواطن/ة<span className={"mx-2 font-bold"}>{Order.name_mwaten}</span>
                                        بالطلب خدمة <span className={"mx-2 font-bold"}>{Order.name_service}</span>
                                        التي تتبع الجهة <span className={"mx-2 font-bold"}>{Order.name_office}</span>
                                        الواقع في المنطقة <span className={"mx-2 font-bold"}>{Order.city}</span>
                                    </p>
                                    <div className={"my-16 px-2 py-2 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 w-2/6 "} dir={'rtl'}>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md  w-1/5">
                                    <label className={'mr-2 ml-3'}>الملف</label>
                                    <button className=" text-black font-bold py-2 px-4 rounded"  onClick={handleShow}><PreviewIcon sx={{ fontSize: 30 }}/></button>
                                </span>
                                    </div>
                                    {/*<p className={"my-10 mr-4"}>وعليه تم قبول طلبه من قبل الوزارة والرجاء من الجهة المعنية تنفيد الطلب. </p>*/}
                                    <div className="flex flex-row justify-center items-center mt-4 ">
                                        {Order.status === "2" ?
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={(event) => handleUploadDoc(id, event)}>
                                                إصدار الوثيقة
                                            </button>: null
                                            // <button
                                            //     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            //     //onClick={() => send(id)}
                                            //     >
                                            //     إرسال إلى الوزارة</button>
                                        }

                                        <button className="mr-44 py-2 px-4 font-bold border-solid border-2 border-amber-700 hover:bg-amber-700 hover:text-white rounded-md " onClick={handleshow} >رجوع</button>
                                    </div>
                                </div>
                            </>)
                        }

                    </div>
                </div>
            </div>
            {/*<ToastContainer  position="top-left" />*/}
        </div>
            {OpenModal &&<Showfile setOpenModal={setOpenModal} path_file={Order.name_file} id={id} status={Order.status} approved={Order.approve}/>}

            {uploaddocs && <UploadDoc onClose={handleCloseUploadDoc} id={value}/>}
        </>
    )
}
export default ShowOrder