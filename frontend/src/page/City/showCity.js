import Navbar from "../Navbar";
import React, {useState} from "react";
import axios from "axios";
import {baseurl} from "../../Baseurl/baseurl";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function City() {
    const [city, setcity] = useState([]);
    async function getcitys() {
        const res = await axios.get(baseurl + "getaddresses", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setcity(res.data);
    }
    const access = localStorage.getItem('access_token');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (access === "0") {
            navigate('/profile');
        }getcitys();
    }, []);
    const [value,setvalue] = useState({name: '',});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setvalue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const [error, setErrors] = useState(false);

    async function Addcity  (){
        if (!value.name) {
            setErrors(true);
            toast.error('يجب عليك تعبئة جميع الحقول');
            return;
        }
        const res = await axios.post(baseurl+"storeaddress",value,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        })
        if(res.status===201){
            toast.success('تم إضافة الخدمة بنجاح');
            getcitys();
            value.name = '';
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
                                <h1 className="text-2xl text-gray-900 text-right">البلدية</h1>
                            </div>
                            <div className=" px-3 mb-6 md:mb-0" dir="rtl">
                                <input type="text" id="name_model" name="name" value={value.name} onChange={handleChange}
                                       className=" border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-6" onClick={Addcity}>اضافة البلدية</button>
                            {error&& value.name===''&&<p className="block text-red-500 text-xs mr-4 mt-1 w-full">لا يمكن ترك هذا الحقل فارغًا.</p>}
                            </div>
                            <div className={"px-6 py-4 mt-6 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                                {city.map((item,index)=>(
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                        {item.name}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default City