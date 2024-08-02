import Navbar from "../Navbar";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { baseurl } from '../../Baseurl/baseurl';
import axios from 'axios';
import Uploadfiles from "../../component/uploadfiles";
function ShowOffice() {

    const { id } = useParams();
    const [office, setOffice] = useState([]);


    async function getOffice() {
        const res =  await axios.get(baseurl + 'showoffice/' + id, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        setOffice(res.data)
    }
    useEffect(() => {
        getOffice();
    }, []);


    const [uploadfiles, setUploadfiles] = useState(false);
    const handleadd = ()=>{
        setUploadfiles(true)
    }

    const [value, setValue] = useState({
        id_service: '',
        name: '',
        address: '',
        service: '',
    });
    const handleset = (id_service,name) => {
        setValue({
            id_service: id_service,
            name: office.name,
            address: office.address,
            service: name,
        });
    }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4 h-auto">
                        <div class="p-4 px-5 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-3xl text-gray-900 text-right">{office.name}</h1>
                        </div>
                        <div class="px-6 py-4" dir={'rtl'}>
                            <p className={"text-right text-xl"}>وصف/المعلومات عن الجهة:</p>
                            <p className={"mt-4 mr-4"}>{office.description}</p>

                            <div className=" mt-10">
                                <h1 className="text-xl text-gray-900 text-right">العنوان</h1>
                            </div>
                            <div className={"px-6 py-4 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    {/*<input type={'radio'} id={"test"} name={"city"}/>*/}
                                    <label htmlFor={"test"} className={'mr-2'}>{office.address}</label>
                                </span>
                            </div>

                            <div className=" mt-10">
                                <h1 className="text-xl text-gray-900 text-right">الخدمات</h1>
                            </div>
                            <div className={"overflow-y-auto h-auto max-h-96"}>
                                <ol className="list-inside list-decimal mt-6  m-2">
                                    {office.services &&
                                        office.services.map((service) => (
                                            <li className={"mr-5 inline-block  relative  h-fit"}>
                                                <div className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5 inline">
                                                    <input type={'radio'} id={"service"} name={"service"} onClick={()=>handleset(service.id,service.name)}/>
                                                    <label htmlFor={"service"} className={'mr-2 inline-block font-bold'}>{service.name}</label>
                                                    <p className={"mr-5 text-sm"}>{service.description}</p></div>

                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-6 rounded" onClick={handleadd} >طلب الخدمة</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {uploadfiles && <Uploadfiles setOpenModal={setUploadfiles} id={value}/>}

        </>
    )
}
export default ShowOffice