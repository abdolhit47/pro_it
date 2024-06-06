
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify'
import { baseurl } from '../Baseurl/baseurl';
import axios from 'axios';
import React, {useEffect, useState, useRef, useCallback} from "react";
import AddModal from '../component/AddModel';
import { useNavigate } from 'react-router-dom'
// const tele = window.Telegram.WebApp;

function Modele() {
    const tokenRef = useRef(localStorage.getItem('token'));
    const navigate = useNavigate()
    const role = localStorage.getItem('role');
    const[newModel,setAddModel] = useState( false);
    const [models, getmodels] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    // const onSendData = useCallback(() => {
    //     const data =
    //         [
    //             { name: 'Product 1', count: 0, id: 0, price: 12 },
    //             { name: 'Product 2', count: 0, id: 1, price: 13 },
    //             { name: 'Product 3', count: 0, id: 2, price: 14 },
    //             { name: 'Product 4', count: 0, id: 3, price: 15 }
    //         ]   

    //     tele.sendData(JSON.stringify(data));
    // }, [])
    // tele.MainButton.show();
    // useEffect(() => {
    //     tele.onEvent('mainButtonClicked', onSendData)
    //     return () => {
    //         tele.offEvent('mainButtonClicked', onSendData)
    //     }
    // }, [onSendData])


    async function getallmodel() {
        setIsLoading(true);
        try {

            const res =await axios.get(baseurl + "showmodel", {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
            });
            if(res.status===200){
                getmodels(res.data);
            }else{
                //error show data
            }
        } catch (error) {
            //error
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        // tele.ready();
        if (tokenRef.current) {
            if (role == 0) {
                toast.warning('حدث خطأ. الرجاء المحاولة مرة أخرى.');
                navigate("/Dashboard");
            }else
                getallmodel(tokenRef.current);
        } else {
            navigate("/");
            toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
        }
    }, [0]);
    const handleClick = () => {
        // tele.MainButton.text = "test app";
        // tele.MainButton.show();
        // tele.MainButton.enable();
        //tele.sendData()
        // tele.MainButton.onClick(function(){
        //     window.Telegram.WebApp.sendData(JSON.stringify());
        // })

        setAddModel(true);
    }

    return (    
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100vw-16rem)] mt-10">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12">
                        <div class="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-2xl text-gray-900 text-right">النموذج</h1>
                            <button type="button" className="text-white font-medium border-solid border-2 rounded-md w-20 bg-[#5F82BA]" onClick={handleClick}>إضافة</button> 
                        </div>
                        <div class="px-6 py-4 flex justify-center">
                            {isLoading ? (
                                <div className="flex items-center"> {/* Center the content horizontally */}
                                    <img className="w-12 h-12 animate-spin mr-4" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" /> {/* Add margin for spacing */}
                                    <span className="text-xl font-bold">جاري التحميل...</span>
                                </div>
                                ):(
                            <table class="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                <thead className="flex w-full ">
                                    <tr class="border-b text-center flex w-full  mb-4">
                                        <th class="p-3 w-1/5">#</th>
                                        <th class="p-3 w-1/5">اسم النموذج</th>
                                        <th class="p-3 w-1/5">رقم الاصدار</th>
                                        <th class="p-3 w-1/5">تاريخ الاصدار</th>
                                        <th class="p-3 w-1/5">التوثيق</th>
                                    </tr>
                                </thead>
                                <tbody className="flex flex-col items-center overflow-y-scroll h-auto max-h-96">
                                    {Array.isArray(models)&&(models.map((model,index)=>(
                                        <tr className="text-center hover:bg-orange-100 flex w-full">
                                            <td class="p-3 w-1/5 flex items-center justify-center">{index+1}</td>
                                            <td class="p-3 w-1/5 flex items-center justify-center">{model.name_model}</td>
                                            <td class="p-3 w-1/5 flex items-center justify-center">{model.version}</td>
                                            <td class="p-3 w-1/5 flex items-center justify-center">{model.release_date}</td>
                                            <td class="p-3 w-1/5 flex items-center justify-center"><a href={model.documentation}>عرض</a></td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                            )}
                        </div>
                    </div>
                </div>
            </div><ToastContainer position="top-left" />
        </div>
        {newModel &&(<AddModal setOpenModal={setAddModel}/>)}

        </>
    )
}
export default Modele 