import Navbar from "../Navbar";
import React, {useState} from "react";
import AddService from "../../component/addService";
import axios from "axios";
import {baseurl} from "../../Baseurl/baseurl";
import {toast} from "react-toastify";

function Service() {
    const [service, setservice] = useState([]);
    const [addService, setaddService] = useState(false);

    async function getServices() {
        const res = await axios.get(baseurl + "showservice", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setservice(res.data);
    }

    React.useEffect(() => {
        getServices();
    }, []);
    const [value,setvalue] = useState({name: '',});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setvalue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    async function AddService  (){
        const res = await axios.post(baseurl+"storeservice",value,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        })
        if(res.status===201){
            toast.success('تم إضافة الخدمة بنجاح');
            getServices();
        }
    }
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
                        <input type="text" id="name_model" name="name" value={value.name} onChange={handleChange}
                               className=" border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-6" onClick={AddService}>اضافة الخدمة</button>
                        </div>
                        {/*<div class="px-6 py-4 flex justify-center ">*/}
                            {/*<div className='w-16 text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl'>*/}
                            {/*    <p>asdashfdhjgasdhaf kjdshfdjskhfgkjshdfksdhf skdjhgfjhsdafdskjfhkj</p>*/}
                            {/*</div>*/}
                        {/*<div className=" gap-8 m-7 w-auto max-h-screen " dir={"rtl"}>*/}
                        {/*    <div className=" bg-amber-500 rounded-3xl h-[30rem] md:h-[32rem] px-3">*/}
                        <div className={"px-6 py-4 mt-6 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                            {service.map((item,index)=>(
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                        {item.name}
                                    </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/*{addService && <AddService setOpenModal={setaddService} id={id}/>}*/}
        </>
    )
}
export default Service