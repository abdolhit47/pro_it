import Navbar from "../Navbar";
import React, {useState} from "react";
import axios from "axios";
import {baseurl} from "../../Baseurl/baseurl";
import {useNavigate} from "react-router-dom";
import AddService from "../../component/addservice";
function Service() {
    const [service, setservice] = useState([]);
    const [addService, setAddService] = useState(false);
    const access = localStorage.getItem('access_token');
    const navigate = useNavigate()

    const handleAdd = () => {
        setAddService(true);
    };
    const handleCloseAddService = () => {
        setAddService(false);
        // Fetch data again after AddService closes for guaranteed update
        getServices();
    };
    async function getServices() {
        const res = await axios.get(baseurl + "showservice", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setservice(res.data);
    }

    React.useEffect(() => {
        if (access === "0") {
            navigate("/profile");
        }
        getServices();
    }, []);

    return (
        <>
        <div className="flex h-screen">
            <div className="flex-grow bg-gray-100 h-lvh">
                <Navbar />
                <div className="flex flex-grow flex-row-reverse text-right inset-y-14 h-auto max-h-screen md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4  ">
                        <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 className="text-2xl text-gray-900 text-right">الخدمات</h1>
                        </div>
                        <div className=" px-3 mb-6 md:mb-0" dir="rtl">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-6" onClick={handleAdd}>اضافة الخدمة</button>
                        </div>
                        <div className={"px-6 py-4 mt-6 grid gap-4 justify-start overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                            {service.map((item,index)=>(<>
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*        {item.name}*/}
                                {/*    </span>*/}
                                {/*<p className={"mr-5 text-sm pl-3 truncate hover:text-wrap hover:text-clip"}>{item.description}</p>*/}
                                <div className={"ml-6  relative h-auto w-full  flex-shrink-0"}>
                                    <div className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 ml-2 w-full">
                                        <label htmlFor={"service"} className={'mr-2 font-bold'}>{item.name}</label>
                                        <p className={"mr-5 text-sm pl-3 truncate hover:text-wrap hover:text-clip"}>{item.description}</p>
                                    </div>
                                </div>
                            </>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {addService && <AddService onClose={handleCloseAddService} />}
        </>
    )
}
export default Service